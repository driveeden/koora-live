import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  ESPN_SUMMARY, HEADERS, STAT_LABELS, STAT_ORDER, leagueChannel,
} from "./_shared.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).end();
  }
  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: "id required" });

  try {
    const url = `${ESPN_SUMMARY}?event=${id}`;
    const upstream = await fetch(url, { headers: HEADERS });
    const data = (await upstream.json()) as Record<string, unknown>;

    const gameInfo = data.gameInfo as Record<string, unknown> | undefined;
    const venue = (gameInfo?.venue as Record<string, unknown> | undefined)?.fullName ?? null;
    const attendance = (gameInfo?.attendance as number) ?? null;
    const officials = (gameInfo?.officials as Array<Record<string, unknown>>) ?? [];
    const referee =
      officials.find((o) => String((o.position as Record<string, unknown>)?.id) === "1")
        ?.displayName ?? null;

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
    const seasonSlug =
      (header?.season as Record<string, unknown>)?.slug as string | undefined ?? "";
    const fallbackChannel = leagueChannel(seasonSlug);
    const broadcast =
      broadcastNames.length > 0 ? broadcastNames.join(" / ") : fallbackChannel ?? null;

    const boxTeams =
      ((data.boxscore as Record<string, unknown>)?.teams as Array<Record<string, unknown>>) ?? [];
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

    const keyEvents = (data.keyEvents as Array<Record<string, unknown>>) ?? [];
    const ALLOWED_TYPES = ["goal", "yellow-card", "red-card", "substitution"];

    const incidents = keyEvents
      .filter((e) => {
        const t = String((e.type as Record<string, unknown>)?.type ?? "");
        return ALLOWED_TYPES.includes(t);
      })
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

        const isHome = homeTeamName
          ? teamName.toLowerCase() === homeTeamName.toLowerCase()
          : true;

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

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.json({ incidents, venue, attendance, referee, broadcast, statistics });
  } catch {
    return res.status(502).json({ error: "upstream error" });
  }
}
