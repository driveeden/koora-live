import { Router } from "express";

const router = Router();

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer";
const ESPN_SUMMARY = "https://site.api.espn.com/apis/site/v2/sports/soccer/all/summary";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json",
};

function slugToName(slug: string): string {
  const exact: Record<string, string> = {
    "group-stage": "دور المجموعات",
    "regular-season": "الدوري",
    "knockout-round": "دور الإقصاء",
    "round-of-16": "دور الـ 16",
    "round-of-32": "دور الـ 32",
    "quarterfinal": "ربع النهائي",
    "quarterfinals": "ربع النهائي",
    "semifinal": "نصف النهائي",
    "semifinals": "نصف النهائي",
    "final": "النهائي",
    "playoff": "الدوري التمهيدي",
    "playoffs": "الدوري التمهيدي",
    "promotion-finals": "نهائيات الصعود",
    "promotion-playoff": "ملحق الصعود",
    "relegation-playoff": "ملحق الهبوط",
    "first-stage": "الدور الأول",
    "second-stage": "الدور الثاني",
    "third-stage": "الدور الثالث",
    "championship-round": "دور البطولة",
  };
  if (exact[slug]) return exact[slug];

  // Pattern-based fallback — replace hyphens, strip year, use as-is
  const leagueNames: Record<string, string> = {
    "premier-league": "الدوري الإنجليزي الممتاز",
    "la-liga": "الدوري الإسباني",
    "bundesliga": "الدوري الألماني",
    "serie-a": "الدوري الإيطالي",
    "ligue-1": "الدوري الفرنسي",
    "champions-league": "دوري أبطال أوروبا",
    "europa-league": "الدوري الأوروبي",
    "world-cup": "كأس العالم",
    "euro": "بطولة أوروبا",
    "copa-america": "كأس أمريكا",
    "copa-del-rey": "كأس الملك",
    "fa-cup": "كأس الاتحاد الإنجليزي",
    "brasileirao": "الدوري البرازيلي",
    "brasileiro": "الدوري البرازيلي",
    "serie-b": "الدوري البرازيلي الدرجة الثانية",
    "primera-division": "الدوري الأرجنتيني",
    "liga-profesional": "الدوري المحترفين",
    "bolivian": "الدوري البوليفي",
  };

  for (const [key, name] of Object.entries(leagueNames)) {
    if (slug.includes(key)) return name;
  }

  // Last resort: clean up slug
  return slug.replace(/-\d{4}$/, "").replace(/-/g, " ");
}

function espnStatusToType(state: string): "inprogress" | "finished" | "upcoming" {
  if (state === "in") return "inprogress";
  if (state === "post") return "finished";
  return "upcoming";
}

interface NormalizedMatch {
  id: string;
  homeTeam: { id: string; name: string; logo: string };
  awayTeam: { id: string; name: string; logo: string };
  homeScore: number;
  awayScore: number;
  status: "inprogress" | "finished" | "upcoming";
  statusDesc: string;
  startTime: string | null;
  league: string;
}

function normalizeEvent(event: Record<string, unknown>): NormalizedMatch | null {
  try {
    const competitions = (event.competitions as unknown[]);
    if (!competitions?.length) return null;
    const comp = competitions[0] as Record<string, unknown>;
    const competitors = comp.competitors as Array<Record<string, unknown>>;
    if (!competitors?.length) return null;

    const homeComp = competitors.find((c) => c.homeAway === "home");
    const awayComp = competitors.find((c) => c.homeAway === "away");
    if (!homeComp || !awayComp) return null;

    const homeTeamData = homeComp.team as Record<string, unknown>;
    const awayTeamData = awayComp.team as Record<string, unknown>;
    const statusData = event.status as Record<string, unknown>;
    const statusType = statusData.type as Record<string, unknown>;
    const seasonData = event.season as Record<string, unknown> | undefined;

    const league = seasonData?.slug
      ? slugToName(seasonData.slug as string)
      : "كرة القدم";

    return {
      id: String(event.id),
      homeTeam: {
        id: String(homeTeamData.id),
        name: String(homeTeamData.displayName || homeTeamData.name),
        logo: String(homeTeamData.logo || ""),
      },
      awayTeam: {
        id: String(awayTeamData.id),
        name: String(awayTeamData.displayName || awayTeamData.name),
        logo: String(awayTeamData.logo || ""),
      },
      homeScore: Number(homeComp.score) || 0,
      awayScore: Number(awayComp.score) || 0,
      status: espnStatusToType(String(statusType.state)),
      statusDesc: String(statusType.detail || statusType.description || ""),
      startTime:
        statusType.state === "pre"
          ? String(comp.date || event.date || "")
          : null,
      league,
    };
  } catch {
    return null;
  }
}

router.get("/matches", async (req, res) => {
  try {
    const date = (req.query.date as string) || new Date().toISOString().slice(0, 10);
    const espnDate = date.replace(/-/g, "");
    const url = `${ESPN_BASE}/all/scoreboard?dates=${espnDate}&limit=200`;
    const upstream = await fetch(url, { headers: HEADERS });
    const data = (await upstream.json()) as { events?: unknown[] };
    const events = (data.events || []) as Array<Record<string, unknown>>;
    const normalized = events.map(normalizeEvent).filter(Boolean);
    res.json({ matches: normalized });
  } catch (err) {
    req.log.error({ err }, "espn matches proxy error");
    res.status(502).json({ error: "upstream error" });
  }
});

router.get("/match/:id/incidents", async (req, res) => {
  try {
    const url = `${ESPN_SUMMARY}?event=${req.params.id}`;
    const upstream = await fetch(url, { headers: HEADERS });
    const data = (await upstream.json()) as Record<string, unknown>;

    const plays = (data.plays as Array<Record<string, unknown>>) || [];
    const incidents = plays
      .filter((p) => {
        const t = String(p.type?.text || "");
        return (
          t.includes("Goal") ||
          t.includes("Yellow") ||
          t.includes("Red") ||
          t.includes("Substitution")
        );
      })
      .map((p) => {
        const typeText = String(p.type?.text || "").toLowerCase();
        let incidentType = "other";
        let incidentClass: string | undefined;
        if (typeText.includes("goal")) incidentType = "goal";
        else if (typeText.includes("yellow")) {
          incidentType = "card";
          incidentClass = "yellow";
        } else if (typeText.includes("red")) {
          incidentType = "card";
          incidentClass = "red";
        } else if (typeText.includes("substitution")) incidentType = "substitution";

        const athletes = (p.participants as Array<Record<string, unknown>>) || [];
        const player = athletes[0]?.athlete as Record<string, unknown> | undefined;

        return {
          incidentType,
          incidentClass,
          time: Math.round(Number(p.clock?.value || 0) / 60),
          player: { shortName: String(player?.shortName || player?.displayName || "—") },
          isHome: Boolean(p.homeAway === "home"),
          homeScore: p.homeScore,
          awayScore: p.awayScore,
        };
      });

    res.json({ incidents });
  } catch (err) {
    req.log.error({ err }, "espn incidents proxy error");
    res.status(502).json({ error: "upstream error" });
  }
});

router.get("/news", async (req, res) => {
  try {
    const NEWS_URL =
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D%D9%83%D8%B1%D8%A9%2B%D8%A7%D9%84%D9%82%D8%AF%D9%85%26hl%3Dar%26gl%3DEG%26ceid%3DEG%3Aar";
    const upstream = await fetch(NEWS_URL, {
      headers: { "User-Agent": HEADERS["User-Agent"] },
    });
    const data = await upstream.json();
    res.json(data);
  } catch (err) {
    req.log.error({ err }, "news proxy error");
    res.status(502).json({ error: "upstream error" });
  }
});

export default router;
