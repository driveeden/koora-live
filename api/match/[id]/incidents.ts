const ESPN_SUMMARY = "https://site.api.espn.com/apis/site/v2/sports/soccer/all/summary";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
};

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
];

function leagueChannel(slug: string): string | null {
  for (const [k, ch] of LEAGUE_CHANNELS) {
    if (slug.includes(k)) return ch;
  }
  return null;
}

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

const STAT_ORDER = ["possessionPct","totalShots","shotsOnTarget","wonCorners","foulsCommitted","offsides","saves","totalPasses"];

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "GET") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  try {
    const url = new URL(req.url);
    const parts = url.pathname.split("/");
    const id = parts[parts.indexOf("match") + 1];

    const upstream = await fetch(`${ESPN_SUMMARY}?event=${id}`, { headers: HEADERS });
    const data = (await upstream.json()) as Record<string, unknown>;

    const gameInfo = data.gameInfo as Record<string, unknown> | undefined;
    const venue = (gameInfo?.venue as Record<string, unknown> | undefined)?.fullName ?? null;
    const attendance = (gameInfo?.attendance as number) ?? null;
    const officials = (gameInfo?.officials as Array<Record<string, unknown>>) ?? [];
    const referee = officials.find(
      (o) => String((o.position as Record<string, unknown>)?.id) === "1"
    )?.displayName ?? null;

    const rawBroadcasts = (data.broadcasts as Array<Record<string, unknown>>) ?? [];
    const broadcastNames = rawBroadcasts
      .map((b) => String((b.media as Record<string, unknown>)?.name || ""))
      .filter(Boolean);

    const header = data.header as Record<string, unknown> | undefined;
    const headerComps = (header?.competitions as Array<Record<string, unknown>>) ?? [];
    const competitors = (headerComps[0]?.competitors as Array<Record<string, unknown>>) ?? [];
    const homeTeamName = String(
      (competitors.find((c) => c.homeAway === "home") as Record<string, unknown> | undefined)
        ?.team?.displayName ?? ""
    );
    const seasonSlug = (header?.season as Record<string, unknown>)?.slug as string | undefined ?? "";
    const fallbackChannel = leagueChannel(seasonSlug);
    const broadcast = broadcastNames.length > 0 ? broadcastNames.join(" / ") : fallbackChannel ?? null;

    const boxTeams = ((data.boxscore as Record<string, unknown>)?.teams as Array<Record<string, unknown>>) ?? [];
    const homeBoxTeam = boxTeams.find((t) => t.homeAway === "home");
    const awayBoxTeam = boxTeams.find((t) => t.homeAway === "away");
    const statistics: { name: string; label: string; home: string; away: string }[] = [];
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

    const keyEvents = (data.keyEvents as Array<Record<string, unknown>>) ?? [];
    const ALLOWED_TYPES = ["goal", "yellow-card", "red-card", "substitution"];

    const incidents = keyEvents
      .filter((e) => ALLOWED_TYPES.includes(String((e.type as Record<string, unknown>)?.type ?? "")))
      .map((e) => {
        const typeSlug = String((e.type as Record<string, unknown>)?.type ?? "");
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

        let playerName = "—";
        const goalMatch = text.match(/^Goal[^.]*\.\s*([^(]+)\(([^)]+)\)/);
        const playerMatch = text.match(/^([^(]+)\(([^)]+)\)/);
        if (goalMatch) playerName = goalMatch[1].trim();
        else if (playerMatch) playerName = playerMatch[1].trim();
        else {
          const subIn = text.match(/\.\s*(.+?) replaces/);
          if (subIn) playerName = subIn[1].trim();
        }

        let playerOut: string | undefined;
        if (incidentType === "substitution") {
          const outMatch = text.match(/replaces (.+?)\.?\s*$/);
          if (outMatch) playerOut = outMatch[1].trim();
        }

        let scoreAfter: string | undefined;
        if (incidentType === "goal") {
          const scoreMatch = text.match(/Goal!\s*[^,]+\s+(\d+),\s*[^.]+\s+(\d+)\./);
          if (scoreMatch) scoreAfter = `${scoreMatch[1]}-${scoreMatch[2]}`;
        }

        const isHome = homeTeamName ? teamName.toLowerCase() === homeTeamName.toLowerCase() : true;

        return {
          incidentType, incidentClass,
          time: String(clock?.displayValue ?? ""),
          clockValue: Number(clock?.value ?? 0),
          period,
          player: { shortName: playerName },
          playerOut: playerOut ? { shortName: playerOut } : undefined,
          isHome, teamName,
          ownGoal: Boolean(e.ownGoal),
          penaltyKick: Boolean(e.penaltyKick),
          scoreAfter, text,
        };
      });

    return new Response(JSON.stringify({ incidents, venue, attendance, referee, broadcast, statistics }), {
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
