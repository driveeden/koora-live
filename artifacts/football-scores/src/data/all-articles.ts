import { articles } from "./articles";
import type { Article } from "./articles";
import { wc2026ArArticles } from "./articles-wc2026-ar";
import { wc2026EnArticles } from "./articles-wc2026-en";
import {
  wc2026EsArticles,
  wc2026FrArticles,
  wc2026PtArticles,
  wc2026DeArticles,
  wc2026JaArticles,
} from "./articles-wc2026-multilang";

export type { Article };

export { CATEGORIES } from "./articles";

export const LANGUAGES = [
  { code: "all", label: "🌍 الكل" },
  { code: "ar", label: "🇸🇦 العربية" },
  { code: "en", label: "🇬🇧 English" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "pt", label: "🇧🇷 Português" },
  { code: "de", label: "🇩🇪 Deutsch" },
  { code: "ja", label: "🇯🇵 日本語" },
];

export const allArticles: Article[] = [
  ...articles,
  ...wc2026ArArticles,
  ...wc2026EnArticles,
  ...wc2026EsArticles,
  ...wc2026FrArticles,
  ...wc2026PtArticles,
  ...wc2026DeArticles,
  ...wc2026JaArticles,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return allArticles.filter((a) => a.category === category);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  const current = getArticleBySlug(slug);
  if (!current) return allArticles.slice(0, count);
  return allArticles
    .filter(
      (a) =>
        a.slug !== slug &&
        a.category === current.category &&
        (a.lang ?? "ar") === (current.lang ?? "ar")
    )
    .slice(0, count);
}
