// ── Koora Live Analytics Tracker ─────────────────────────────────────────────
// Sends lightweight pageview beacons to the API server.

const SESSION_KEY = "kl_sid";
const API_URL = "/api/analytics/track";

function getOrCreateSession(): string {
  let sid = localStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

export function trackPageview(page: string) {
  try {
    const sessionId = getOrCreateSession();
    const referrer = document.referrer || "";

    // Fire and forget — don't await
    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, page, referrer }),
      keepalive: true,
    }).catch(() => {
      // Silently ignore tracking errors
    });
  } catch {
    // Never throw from tracking
  }
}
