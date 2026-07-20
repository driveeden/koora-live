import { Router, type Request, type Response } from "express";
import { db } from "@workspace/db";
import {
  analyticsSessions,
  analyticsPageviews,
} from "@workspace/db";
import { eq, gte, sql, desc, count } from "drizzle-orm";

const router = Router();

// ── Geo lookup cache (IP → country) ──────────────────────────────────────────
const geoCache = new Map<string, { country: string; countryCode: string; city: string }>();

async function getGeo(ip: string) {
  if (!ip || ip === "::1" || ip === "127.0.0.1") {
    return { country: "Local", countryCode: "LO", city: "Localhost" };
  }
  if (geoCache.has(ip)) return geoCache.get(ip)!;
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city,status`, {
      signal: AbortSignal.timeout(3000),
    });
    const data = (await res.json()) as { status: string; country: string; countryCode: string; city: string };
    const geo = data.status === "success"
      ? { country: data.country, countryCode: data.countryCode, city: data.city }
      : { country: "Unknown", countryCode: "XX", city: "" };
    geoCache.set(ip, geo);
    return geo;
  } catch {
    return { country: "Unknown", countryCode: "XX", city: "" };
  }
}

// ── Referrer classifier ───────────────────────────────────────────────────────
function classifyReferrer(referrer: string, host: string): { type: string; domain: string } {
  if (!referrer) return { type: "direct", domain: "" };
  try {
    const url = new URL(referrer);
    const d = url.hostname.replace(/^www\./, "");
    if (d.includes(host)) return { type: "internal", domain: d };
    if (d.includes("google.")) return { type: "google", domain: "Google" };
    if (d.includes("youtube.") || d.includes("youtu.be")) return { type: "youtube", domain: "YouTube" };
    if (d.includes("facebook.") || d === "fb.com" || d.includes("fb.me")) return { type: "facebook", domain: "Facebook" };
    if (d.includes("twitter.") || d === "t.co" || d.includes("x.com")) return { type: "twitter", domain: "Twitter/X" };
    if (d.includes("instagram.")) return { type: "instagram", domain: "Instagram" };
    if (d.includes("tiktok.")) return { type: "tiktok", domain: "TikTok" };
    if (d.includes("t.me") || d.includes("telegram.")) return { type: "telegram", domain: "Telegram" };
    if (d.includes("bing.")) return { type: "bing", domain: "Bing" };
    if (d.includes("yahoo.")) return { type: "yahoo", domain: "Yahoo" };
    if (d.includes("reddit.")) return { type: "reddit", domain: "Reddit" };
    if (d.includes("whatsapp.")) return { type: "whatsapp", domain: "WhatsApp" };
    return { type: "other", domain: d };
  } catch {
    return { type: "other", domain: referrer.slice(0, 50) };
  }
}

// ── Device / Browser parser ───────────────────────────────────────────────────
function parseUA(ua: string) {
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(ua);
  const isTablet = /iPad|Tablet/i.test(ua);
  const deviceType = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  let browser = "Other";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua)) browser = "Opera";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua)) browser = "Safari";

  let os = "Other";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/iPhone|iPad/i.test(ua)) os = "iOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  return { deviceType, browser, os };
}

// ── POST /api/analytics/track ─────────────────────────────────────────────────
router.post("/analytics/track", async (req: Request, res: Response) => {
  try {
    const { sessionId, page, referrer } = req.body as {
      sessionId: string;
      page: string;
      referrer?: string;
    };

    if (!sessionId || !page) {
      res.status(400).json({ error: "missing fields" });
      return;
    }

    const ip =
      (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      "";

    const ua = req.headers["user-agent"] || "";
    const host = req.headers["host"]?.split(":")[0] || "";
    const { deviceType, browser, os } = parseUA(ua);
    const { type: referrerType, domain: referrerDomain } = classifyReferrer(referrer || "", host);

    // Upsert session
    const existing = await db.query.analyticsSessions.findFirst({
      where: eq(analyticsSessions.id, sessionId),
    });

    if (!existing) {
      const geo = await getGeo(ip);
      await db.insert(analyticsSessions).values({
        id: sessionId,
        ip,
        country: geo.country,
        countryCode: geo.countryCode,
        city: geo.city,
        deviceType,
        browser,
        os,
        firstSeen: new Date(),
        lastSeen: new Date(),
      });
    } else {
      await db
        .update(analyticsSessions)
        .set({ lastSeen: new Date() })
        .where(eq(analyticsSessions.id, sessionId));
    }

    // Insert pageview
    await db.insert(analyticsPageviews).values({
      sessionId,
      page,
      referrer: referrer || null,
      referrerType,
      referrerDomain,
      createdAt: new Date(),
    });

    res.json({ ok: true });
  } catch (err) {
    req.log.error(err, "analytics track error");
    res.status(500).json({ error: "internal" });
  }
});

// ── GET /api/analytics/stats ──────────────────────────────────────────────────
router.get("/analytics/stats", async (req: Request, res: Response) => {
  // Simple secret check
  const secret = req.headers["x-analytics-key"] || req.query["key"];
  const expectedKey = process.env.ANALYTICS_KEY || "koora2026admin";
  if (secret !== expectedKey) {
    res.status(401).json({ error: "unauthorized" });
    return;
  }

  try {
    const now = new Date();
    const onlineThreshold = new Date(now.getTime() - 5 * 60 * 1000); // 5 min
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now);
    monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);

    // Online now
    const [onlineResult] = await db
      .select({ count: count() })
      .from(analyticsSessions)
      .where(gte(analyticsSessions.lastSeen, onlineThreshold));

    // Total visitors (all time)
    const [totalResult] = await db.select({ count: count() }).from(analyticsSessions);

    // Today visitors
    const [todayResult] = await db
      .select({ count: count() })
      .from(analyticsSessions)
      .where(gte(analyticsSessions.firstSeen, todayStart));

    // This week
    const [weekResult] = await db
      .select({ count: count() })
      .from(analyticsSessions)
      .where(gte(analyticsSessions.firstSeen, weekStart));

    // This month
    const [monthResult] = await db
      .select({ count: count() })
      .from(analyticsSessions)
      .where(gte(analyticsSessions.firstSeen, monthStart));

    // Total pageviews
    const [totalPVResult] = await db.select({ count: count() }).from(analyticsPageviews);

    // Today pageviews
    const [todayPVResult] = await db
      .select({ count: count() })
      .from(analyticsPageviews)
      .where(gte(analyticsPageviews.createdAt, todayStart));

    // Countries (top 15)
    const countries = await db
      .select({
        country: analyticsSessions.country,
        countryCode: analyticsSessions.countryCode,
        count: count(),
      })
      .from(analyticsSessions)
      .groupBy(analyticsSessions.country, analyticsSessions.countryCode)
      .orderBy(desc(count()))
      .limit(15);

    // Referrer types (top 10)
    const referrers = await db
      .select({
        type: analyticsPageviews.referrerType,
        domain: analyticsPageviews.referrerDomain,
        count: count(),
      })
      .from(analyticsPageviews)
      .groupBy(analyticsPageviews.referrerType, analyticsPageviews.referrerDomain)
      .orderBy(desc(count()))
      .limit(20);

    // Top pages (top 10)
    const topPages = await db
      .select({ page: analyticsPageviews.page, count: count() })
      .from(analyticsPageviews)
      .groupBy(analyticsPageviews.page)
      .orderBy(desc(count()))
      .limit(10);

    // Devices
    const devices = await db
      .select({ deviceType: analyticsSessions.deviceType, count: count() })
      .from(analyticsSessions)
      .groupBy(analyticsSessions.deviceType)
      .orderBy(desc(count()));

    // Browsers
    const browsers = await db
      .select({ browser: analyticsSessions.browser, count: count() })
      .from(analyticsSessions)
      .groupBy(analyticsSessions.browser)
      .orderBy(desc(count()))
      .limit(8);

    // Hourly pageviews for today (24h chart)
    const hourlyRows = await db
      .select({
        hour: sql<number>`EXTRACT(HOUR FROM ${analyticsPageviews.createdAt})`.as("hour"),
        count: count(),
      })
      .from(analyticsPageviews)
      .where(gte(analyticsPageviews.createdAt, todayStart))
      .groupBy(sql`EXTRACT(HOUR FROM ${analyticsPageviews.createdAt})`)
      .orderBy(sql`EXTRACT(HOUR FROM ${analyticsPageviews.createdAt})`);

    const hourly = Array.from({ length: 24 }, (_, h) => ({
      hour: h,
      count: hourlyRows.find((r) => Number(r.hour) === h)?.count ?? 0,
    }));

    // Daily pageviews last 7 days
    const dailyRows = await db
      .select({
        day: sql<string>`DATE(${analyticsPageviews.createdAt})`.as("day"),
        count: count(),
      })
      .from(analyticsPageviews)
      .where(gte(analyticsPageviews.createdAt, weekStart))
      .groupBy(sql`DATE(${analyticsPageviews.createdAt})`)
      .orderBy(sql`DATE(${analyticsPageviews.createdAt})`);

    // Online sessions (last 20)
    const onlineSessions = await db
      .select({
        id: analyticsSessions.id,
        country: analyticsSessions.country,
        countryCode: analyticsSessions.countryCode,
        city: analyticsSessions.city,
        deviceType: analyticsSessions.deviceType,
        browser: analyticsSessions.browser,
        os: analyticsSessions.os,
        lastSeen: analyticsSessions.lastSeen,
      })
      .from(analyticsSessions)
      .where(gte(analyticsSessions.lastSeen, onlineThreshold))
      .orderBy(desc(analyticsSessions.lastSeen))
      .limit(20);

    res.json({
      online: onlineResult.count,
      total: totalResult.count,
      today: todayResult.count,
      week: weekResult.count,
      month: monthResult.count,
      totalPageviews: totalPVResult.count,
      todayPageviews: todayPVResult.count,
      countries,
      referrers,
      topPages,
      devices,
      browsers,
      hourly,
      daily: dailyRows,
      onlineSessions,
    });
  } catch (err) {
    req.log.error(err, "analytics stats error");
    res.status(500).json({ error: "internal" });
  }
});

export default router;
