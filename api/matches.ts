import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ESPN_BASE, HEADERS, slugToName, espnStatusToType } from "./_shared.js";

function normalizeEvent(event: Record<string, unknown>) {
  try {
    const competitions = event.competitions as unknown[];
    if (!competitions?.length) return null;
    const comp = competitions[0] as Record<string, unknown>;
    const competitors = comp.competitors as Array<Record<string, unknown>>;
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).end();
  }
  try {
    const date = (req.query.date as string) || new Date().toISOString().slice(0, 10);
    const espnDate = date.replace(/-/g, "");
    const url = `${ESPN_BASE}/all/scoreboard?dates=${espnDate}&limit=200`;
    const upstream = await fetch(url, { headers: HEADERS });
    const data = (await upstream.json()) as { events?: unknown[] };
    const events = (data.events || []) as Array<Record<string, unknown>>;
    const matches = events.map(normalizeEvent).filter(Boolean);
    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.json({ matches });
  } catch {
    return res.status(502).json({ error: "upstream error" });
  }
}
