import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  boolean,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

// ── Sessions ──────────────────────────────────────────────────────────────────
export const analyticsSessions = pgTable(
  "analytics_sessions",
  {
    id: text("id").primaryKey(), // uuid from client
    ip: text("ip"),
    country: text("country"),
    countryCode: text("country_code"),
    city: text("city"),
    deviceType: text("device_type"), // desktop | mobile | tablet
    browser: text("browser"),
    os: text("os"),
    firstSeen: timestamp("first_seen", { withTimezone: true }).defaultNow().notNull(),
    lastSeen: timestamp("last_seen", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [index("sessions_last_seen_idx").on(t.lastSeen)],
);

// ── Pageviews ─────────────────────────────────────────────────────────────────
export const analyticsPageviews = pgTable(
  "analytics_pageviews",
  {
    id: serial("id").primaryKey(),
    sessionId: text("session_id")
      .notNull()
      .references(() => analyticsSessions.id, { onDelete: "cascade" }),
    page: text("page").notNull(),
    referrer: text("referrer"),
    referrerType: text("referrer_type"), // google | youtube | facebook | twitter | telegram | instagram | tiktok | direct | internal | other
    referrerDomain: text("referrer_domain"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [
    index("pageviews_session_idx").on(t.sessionId),
    index("pageviews_created_at_idx").on(t.createdAt),
    index("pageviews_page_idx").on(t.page),
  ],
);

// ── Schemas ───────────────────────────────────────────────────────────────────
export const insertSessionSchema = createInsertSchema(analyticsSessions);
export const insertPageviewSchema = createInsertSchema(analyticsPageviews).omit({ id: true });

export type Session = typeof analyticsSessions.$inferSelect;
export type Pageview = typeof analyticsPageviews.$inferSelect;
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type InsertPageview = z.infer<typeof insertPageviewSchema>;
