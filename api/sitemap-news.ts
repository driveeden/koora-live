import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ARTICLE_SLUGS } from "./_shared.js";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const baseUrl = "https://koora-live--driveeden.replit.app";
  const today = new Date().toISOString().split("T")[0];
  const urls = ARTICLE_SLUGS.slice(0, 20)
    .map(
      (slug) =>
        `<url><loc>${baseUrl}/blog/${slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    )
    .join("\n  ");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400");
  return res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urls}
</urlset>`);
}
