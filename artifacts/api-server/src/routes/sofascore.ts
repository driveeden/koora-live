import { Router } from "express";

const router = Router();

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer";
const ESPN_SUMMARY = "https://site.api.espn.com/apis/site/v2/sports/soccer/all/summary";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  "Accept": "application/json",
};

// ─── League slug → Arabic name ────────────────────────────────────────────────
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
  const patterns: [string, string][] = [
    ["premier-league", "الدوري الإنجليزي الممتاز"],
    ["la-liga", "الدوري الإسباني"],
    ["bundesliga", "الدوري الألماني"],
    ["serie-a", "الدوري الإيطالي"],
    ["ligue-1", "الدوري الفرنسي"],
    ["champions-league", "دوري أبطال أوروبا"],
    ["europa-league", "الدوري الأوروبي"],
    ["world-cup", "كأس العالم"],
    ["euro", "بطولة أوروبا"],
    ["copa-america", "كأس أمريكا"],
    ["copa-del-rey", "كأس الملك"],
    ["fa-cup", "كأس الاتحاد الإنجليزي"],
    ["brasileirao", "الدوري البرازيلي"],
    ["brasileiro", "الدوري البرازيلي"],
    ["serie-b", "الدوري البرازيلي الدرجة الثانية"],
    ["primera-division", "الدوري الأرجنتيني"],
    ["liga-profesional", "الدوري المحترفين"],
    ["bolivian", "الدوري البوليفي"],
    ["saudi", "الدوري السعودي للمحترفين"],
    ["egyptian", "الدوري المصري"],
  ];
  for (const [k, v] of patterns) {
    if (slug.includes(k)) return v;
  }
  return slug.replace(/-\d{4}$/, "").replace(/-/g, " ");
}

// ─── Fallback broadcast channels by league keyword ────────────────────────────
const LEAGUE_CHANNELS: [string, string][] = [
  ["premier-league", "beIN Sports 1"],
  ["la-liga", "beIN Sports 2"],
  ["champions-league", "beIN Sports 3"],
  ["saudi", "SSC Sport 1"],
  ["egyptian", "ON Sport"],
  ["serie-a", "beIN Sports 4"],
  ["bundesliga", "beIN Sports 5"],
  ["ligue-1", "beIN Sports 6"],
  ["europa-league", "beIN Sports 7"],
  ["world-cup", "beIN Sports 1"],
  ["copa-america", "beIN Sports 1"],
  ["euro", "beIN Sports 1"],
];

function leagueChannel(slug: string): string | null {
  for (const [k, ch] of LEAGUE_CHANNELS) {
    if (slug.includes(k)) return ch;
  }
  return null;
}

// ─── Status normalizer ────────────────────────────────────────────────────────
function espnStatusToType(state: string): "inprogress" | "finished" | "upcoming" {
  if (state === "in") return "inprogress";
  if (state === "post") return "finished";
  return "upcoming";
}

// ─── Stat names → Arabic ──────────────────────────────────────────────────────
const STAT_LABELS: Record<string, string> = {
  possessionPct: "الاستحواذ %",
  totalShots: "التسديدات",
  shotsOnTarget: "التسديدات على المرمى",
  wonCorners: "الركنيات",
  foulsCommitted: "الأخطاء",
  totalPasses: "التمريرات",
  accuratePasses: "التمريرات الدقيقة",
  yellowCards: "البطاقات الصفراء",
  redCards: "البطاقات الحمراء",
  offsides: "التسلل",
  saves: "التصدي",
};

const STAT_ORDER = [
  "possessionPct",
  "totalShots",
  "shotsOnTarget",
  "wonCorners",
  "foulsCommitted",
  "offsides",
  "saves",
  "totalPasses",
];

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
    const competitions = event.competitions as unknown[];
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
    const league = seasonData?.slug ? slugToName(seasonData.slug as string) : "كرة القدم";
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
      startTime: statusType.state === "pre" ? String(comp.date || event.date || "") : null,
      league,
    };
  } catch {
    return null;
  }
}

// ─── Routes ───────────────────────────────────────────────────────────────────

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

    // ── Game info: venue, attendance, officials ──
    const gameInfo = data.gameInfo as Record<string, unknown> | undefined;
    const venue = (gameInfo?.venue as Record<string, unknown> | undefined)?.fullName ?? null;
    const attendance = (gameInfo?.attendance as number) ?? null;
    const officials = (gameInfo?.officials as Array<Record<string, unknown>>) ?? [];
    const referee = officials.find(
      (o) => String((o.position as Record<string, unknown>)?.id) === "1"
    )?.displayName ?? null;

    // ── Broadcasts ──
    const rawBroadcasts = (data.broadcasts as Array<Record<string, unknown>>) ?? [];
    const broadcastNames = rawBroadcasts
      .map((b) => String((b.media as Record<string, unknown>)?.name || ""))
      .filter(Boolean);

    // ── Season slug for fallback channel ──
    const header = data.header as Record<string, unknown> | undefined;
    const headerComps = (header?.competitions as Array<Record<string, unknown>>) ?? [];
    const competitors = (headerComps[0]?.competitors as Array<Record<string, unknown>>) ?? [];
    const homeTeamName = String(
      (competitors.find((c) => c.homeAway === "home") as Record<string, unknown> | undefined)
        ?.team?.displayName ?? ""
    );

    // Try to detect league from season
    const seasonSlug = (header?.season as Record<string, unknown>)?.slug as string | undefined ?? "";
    const fallbackChannel = leagueChannel(seasonSlug);
    const broadcast =
      broadcastNames.length > 0 ? broadcastNames.join(" / ") : fallbackChannel ?? null;

    // ── Statistics from boxscore ──
    const boxTeams = ((data.boxscore as Record<string, unknown>)?.teams as Array<Record<string, unknown>>) ?? [];
    const homeBoxTeam = boxTeams.find((t) => t.homeAway === "home");
    const awayBoxTeam = boxTeams.find((t) => t.homeAway === "away");

    type StatItem = { name: string; label: string; home: string; away: string };
    const statistics: StatItem[] = [];

    if (homeBoxTeam && awayBoxTeam) {
      const homeStats = (homeBoxTeam.statistics as Array<Record<string, unknown>>) ?? [];
      const awayStats = (awayBoxTeam.statistics as Array<Record<string, unknown>>) ?? [];
      const awayMap = new Map(awayStats.map((s) => [String(s.name), String(s.displayValue)]));

      for (const statName of STAT_ORDER) {
        const homeStat = homeStats.find((s) => String(s.name) === statName);
        if (!homeStat) continue;
        const awayVal = awayMap.get(statName);
        if (!awayVal) continue;
        statistics.push({
          name: statName,
          label: STAT_LABELS[statName] ?? String(homeStat.label),
          home: String(homeStat.displayValue),
          away: awayVal,
        });
      }
    }

    // ── Key events: goals, cards, subs ──
    const keyEvents = (data.keyEvents as Array<Record<string, unknown>>) ?? [];

    const ALLOWED_TYPES = ["goal", "yellow-card", "red-card", "substitution"];

    const incidents = keyEvents
      .filter((e) => {
        const t = String((e.type as Record<string, unknown>)?.type ?? "");
        return ALLOWED_TYPES.includes(t);
      })
      .map((e) => {
        const typeObj = e.type as Record<string, unknown>;
        const typeSlug = String(typeObj?.type ?? "");
        const clock = e.clock as Record<string, unknown> | undefined;
        const text = String(e.text ?? "");
        const teamName = String((e.team as Record<string, unknown>)?.displayName ?? "");
        const period = Number((e.period as Record<string, unknown>)?.number ?? 1);

        let incidentType = "other";
        let incidentClass: string | undefined;
        if (typeSlug === "goal") incidentType = "goal";
        else if (typeSlug === "yellow-card") { incidentType = "card"; incidentClass = "yellow"; }
        else if (typeSlug === "red-card") { incidentType = "card"; incidentClass = "red"; }
        else if (typeSlug === "substitution") incidentType = "substitution";

        // Extract player name from text
        let playerName = "—";
        const goalMatch = text.match(/^Goal[^.]*\.\s*([^(]+)\(([^)]+)\)/);
        const playerMatch = text.match(/^([^(]+)\(([^)]+)\)/);
        if (goalMatch) {
          playerName = goalMatch[1].trim();
        } else if (playerMatch) {
          playerName = playerMatch[1].trim();
        } else {
          const subIn = text.match(/\.\s*(.+?) replaces/);
          if (subIn) playerName = subIn[1].trim();
        }

        let playerOut: string | undefined;
        if (incidentType === "substitution") {
          const outMatch = text.match(/replaces (.+?)\.?\s*$/);
          if (outMatch) playerOut = outMatch[1].trim();
        }

        // Extract score after goal from text e.g. "Netherlands 3, Sweden 0"
        let scoreAfter: string | undefined;
        if (incidentType === "goal") {
          const scoreMatch = text.match(/Goal!\s*[^,]+\s+(\d+),\s*[^.]+\s+(\d+)\./);
          if (scoreMatch) scoreAfter = `${scoreMatch[1]}-${scoreMatch[2]}`;
        }

        const ownGoal = Boolean(e.ownGoal);
        const penaltyKick = Boolean(e.penaltyKick);
        const isHome = homeTeamName
          ? teamName.toLowerCase() === homeTeamName.toLowerCase()
          : true;

        return {
          incidentType,
          incidentClass,
          time: String(clock?.displayValue ?? ""),
          clockValue: Number(clock?.value ?? 0),
          period,
          player: { shortName: playerName },
          playerOut: playerOut ? { shortName: playerOut } : undefined,
          isHome,
          teamName,
          ownGoal,
          penaltyKick,
          scoreAfter,
          text,
        };
      });

    res.json({
      incidents,
      venue,
      attendance,
      referee,
      broadcast,
      statistics,
    });
  } catch (err) {
    req.log.error({ err }, "espn incidents proxy error");
    res.status(502).json({ error: "upstream error" });
  }
});

// ─── Sitemap XML ──────────────────────────────────────────────────────────────
const ARTICLE_SLUGS = [
  "lionel-messi-greatest-of-all-time","cristiano-ronaldo-portuguese-phenomenon","mbappe-future-of-football","mohamed-salah-egyptian-king","erling-haaland-goal-machine","neymar-jr-brazilian-magic","kevin-de-bruyne-assist-king","virgil-van-dijk-best-defender","luka-modric-the-maestro","robert-lewandowski-serial-scorer","vinicius-junior-real-madrid-wing","harry-kane-england-captain","sadio-mane-african-star","karim-benzema-ballon-dor-winner","jude-bellingham-new-generation","rodri-best-midfielder-2024","pedri-barcelona-midfield-maestro","bukayo-saka-arsenal-heart","trent-alexander-arnold-revolutionary-fullback","phil-foden-city-gem","premier-league-overview","la-liga-overview","bundesliga-overview","serie-a-overview","ligue-1-overview","saudi-pro-league","egypt-football-history","champions-league-format","champions-league-top-scorers","africa-football-rise","morocco-world-cup-2022","world-cup-2026-preview","world-cup-2022-analysis","world-cup-records","football-biggest-upsets","tiki-taka-explained","high-press-tactics","pep-guardiola-philosophy","mourinho-defensive-tactics","false-nine-role","modern-fullback-role","counter-attack-football","442-formation","catenaccio-italian-defense","var-controversy","brazil-five-world-cups","real-madrid-european-history","ajax-total-football","football-evolution-tactics","hungary-golden-team","real-madrid-greatest-club","fc-barcelona-history","manchester-city-rise","liverpool-european-tradition","juventus-italian-giant","all-time-top-scorers","transfer-market-records","football-attendance-records","goalkeeper-records","transfer-market-how-it-works","best-free-transfers","football-analytics-revolution","women-football-rise","football-nutrition-fitness","football-stadiums-future","mental-health-football","goalline-technology","football-documentaries","football-referees","african-champions-league-history","saudi-arabia-football-development","arab-football-history","football-esports","atletico-madrid-defensive-masters","paris-saint-germain-transformation","world-cup-host-cities-2026","most-assists-football","europa-league-overview","world-cup-1990-italia","football-coaching-courses","world-cup-finals-history","premier-league-classic-moments","la-liga-classic-derbies","copa-america-history","euro-championship-history","pele-greatest-legacy","zidane-player-coach","serie-b-promotion-battles","football-injuries-recovery","football-youth-academies","bundesliga-rivalries","football-gambling-problem","world-cup-young-stars","chelsea-abramovich-era","arsenal-history","football-world-cup-2018-review","bayern-munich-dominance","football-greatest-rivalries","world-cup-most-successful-nations","football-future-trends"
];

router.get("/sitemap.xml", (_req, res) => {
  const baseUrl = "https://koora-live.replit.app";
  const today = new Date().toISOString().split("T")[0];
  const urls = [
    `<url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${baseUrl}/blog</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    ...ARTICLE_SLUGS.map(slug =>
      `<url><loc>${baseUrl}/blog/${slug}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`
    ),
  ].join("\n  ");
  res.header("Content-Type", "application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`);
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
