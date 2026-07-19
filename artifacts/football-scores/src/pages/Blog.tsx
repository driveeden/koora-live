import { useState, useMemo } from "react";
import { Link } from "wouter";
import { articles, CATEGORIES } from "../data/articles";
import { articlesEN, CATEGORIES_EN } from "../data/articles-en";
import { getLang } from "../i18n";

export default function Blog() {
  const lang = getLang();
  const isAr = lang === "ar";
  const isFr = lang === "fr";

  const allArticles = useMemo(() => {
    if (isAr || isFr) return articles;
    return articlesEN as any[];
  }, [isAr, isFr]);

  const allCategories = isAr || isFr ? CATEGORIES : CATEGORIES_EN;
  const allLabel = isAr || isFr ? "الكل" : "All";
  const searchPlaceholder = isAr ? "🔍 ابحث في المقالات..." : isFr ? "🔍 Rechercher..." : "🔍 Search articles...";
  const countLabel = isAr || isFr ? "مقالة" : "articles";
  const prevLabel = isAr ? "◀ السابق" : isFr ? "◀ Précédent" : "◀ Prev";
  const nextLabel = isAr ? "التالي ▶" : isFr ? "Suivant ▶" : "Next ▶";
  const minuteLabel = isAr ? "دقائق" : isFr ? "min" : "min";

  const [activeCategory, setActiveCategory] = useState(allLabel);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    let list = [...allArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (activeCategory !== allLabel) list = list.filter(a => a.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, search, allArticles, allLabel]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featured = [...allArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const dateLocale = isAr ? "ar-EG" : isFr ? "fr-FR" : "en-GB";

  return (
    <div className="blog-page" dir={isAr ? "rtl" : "ltr"} lang={lang}>
      {/* Hero Featured */}
      <div className="blog-hero">
        <Link href={`/blog/${featured.slug}`}>
          <img src={featured.image} alt={featured.imageAlt} className="blog-hero-img" />
          <div className="blog-hero-overlay">
            <span className="blog-hero-cat">{featured.category}</span>
            <h1 className="blog-hero-title">{featured.title}</h1>
            <p className="blog-hero-desc">{featured.description}</p>
            <span className="blog-hero-meta">
              {new Date(featured.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
              &nbsp;·&nbsp;{featured.readTime} {minuteLabel}
            </span>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="blog-search-wrap">
        <input
          className="blog-search"
          type="text"
          placeholder={searchPlaceholder}
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Category Filters */}
      <div className="blog-cats">
        {[allLabel, ...allCategories].map(cat => (
          <button
            key={cat}
            className={`blog-cat-btn ${activeCategory === cat ? "blog-cat-active" : ""}`}
            onClick={() => { setActiveCategory(cat); setPage(1); }}
          >{cat}</button>
        ))}
      </div>

      {/* Results count */}
      <div className="blog-count">{filtered.length} {countLabel}</div>

      {/* Grid */}
      <div className="blog-grid">
        {paged.map(article => (
          <Link key={article.id} href={`/blog/${article.slug}`}>
            <article className="blog-card">
              <div className="blog-card-img-wrap">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="blog-card-img"
                  loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1574629810360-7efbbe195018?fm=webp&w=400&q=60"; }}
                />
                <span className="blog-card-cat">{article.category}</span>
              </div>
              <div className="blog-card-body">
                <h2 className="blog-card-title">{article.title}</h2>
                <p className="blog-card-desc">{article.description}</p>
                <div className="blog-card-meta">
                  <span>{new Date(article.date).toLocaleDateString(dateLocale, { year: "numeric", month: "short", day: "numeric" })}</span>
                  <span>{article.readTime} {minuteLabel}</span>
                </div>
                <div className="blog-card-tags">
                  {article.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="blog-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="blog-pagination">
          <button
            className="blog-page-btn"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >{prevLabel}</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`blog-page-btn ${page === p ? "blog-page-active" : ""}`}
              onClick={() => setPage(p)}
            >{p}</button>
          ))}
          <button
            className="blog-page-btn"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >{nextLabel}</button>
        </div>
      )}
    </div>
  );
}
