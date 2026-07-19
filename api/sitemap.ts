import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ARTICLE_SLUGS } from "./_shared.js";

export default function handler(_req: VercelRequest, res: VercelResponse) {
  const baseUrl = "https://koora-live--driveeden.replit.app";
  const today = new Date().toISOString().split("T")[0];
  const urls = [
    `<url><loc>${baseUrl}/</loc><lastmod>${today}</lastmod><changefreq>hourly</changefreq><priority>1.0</priority></url>`,
    `<url><loc>${baseUrl}/blog</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>`,
    ...ARTICLE_SLUGS.map(
      (slug) =>
        `<url><loc>${baseUrl}/blog/${slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`
    ),
  ].join("\n  ");

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=86400");
  return res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls}
</urlset>`);
}
