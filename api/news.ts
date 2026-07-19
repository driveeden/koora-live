import type { VercelRequest, VercelResponse } from "@vercel/node";
import { HEADERS } from "./_shared.js";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const NEWS_URL =
      "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnews.google.com%2Frss%2Fsearch%3Fq%3D%D9%83%D8%B1%D8%A9%2B%D8%A7%D9%84%D9%82%D8%AF%D9%85%26hl%3Dar%26gl%3DEG%26ceid%3DEG%3Aar";
    const upstream = await fetch(NEWS_URL, { headers: { "User-Agent": HEADERS["User-Agent"] } });
    const data = await upstream.json();
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.json(data);
  } catch {
    return res.status(502).json({ error: "upstream error" });
  }
}
