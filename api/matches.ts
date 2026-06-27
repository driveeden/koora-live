const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
};

function slugToName(slug: string): string {
  const exact: Record<string, string> = {
    "group-stage": "دور المجموعات",
    "regular-season": "الدوري",
    "knockout-round": "دور الإقصاء",
    "round-of-16": "دور الـ 16",
    "round-of-32": "دور الـ 32",
    quarterfinal: "ربع النهائي",
    quarterfinals: "ربع النهائي",
    semifinal: "نصف النهائي",
    semifinals: "نصف النهائي",
    final: "النهائي",
    playoff: "الدوري التمهيدي",
    playoffs: "الدوري التمهيدي",
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
    ["saudi", "الدوري السعودي للمحترفين"],
    ["egyptian", "الدوري المصري"],
  ];
  for (const [k, v] of patterns) {
    if (slug.includes(k)) return v;
  }
  return slug.replace(/-\d{4}$/, "").replace(/-/g, " ");
}

function espnStatusToType(state: string): "inprogress" | "finished" | "upcoming" {
  if (state === "in") return "inprogress";
  if (state === "post") return "finished";
  return "upcoming";
}

function normalizeEvent(event: Record<string, unknown>) {
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
      startTime:
        statusType.state === "pre" ? String(comp.date || event.date || "") : null,
      league,
    };
  } catch {
    return null;
  }
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const url = new URL(req.url);
    const date = url.searchParams.get("date") || new Date().toISOString().slice(0, 10);
    const espnDate = date.replace(/-/g, "");
    const espnUrl = `${ESPN_BASE}/all/scoreboard?dates=${espnDate}&limit=200`;
    const upstream = await fetch(espnUrl, { headers: HEADERS });
    const data = (await upstream.json()) as { events?: unknown[] };
    const events = (data.events || []) as Array<Record<string, unknown>>;
    const matches = events.map(normalizeEvent).filter(Boolean);
    return new Response(JSON.stringify({ matches }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=30" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "upstream error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export const config = { runtime: "edge" };
