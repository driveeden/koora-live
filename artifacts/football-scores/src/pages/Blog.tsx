import { useState, useMemo } from "react";
import { Link } from "wouter";
import { allArticles, CATEGORIES, LANGUAGES } from "../data/all-articles";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const [activeLang, setActiveLang] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const filtered = useMemo(() => {
    let list = [...allArticles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (activeLang === "all") {
      list = list.filter(a => !a.lang || a.lang === "ar");
    } else {
      list = list.filter(a => (a.lang ?? "ar") === activeLang);
    }
    if (activeCategory !== "الكل") list = list.filter(a => a.category === activeCategory);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, activeLang, search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const featured = [...allArticles]
    .filter(a => !a.lang || a.lang === "ar")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="blog-page">
      {/* Hero Featured */}
      <div className="blog-hero">
        <Link href={`/blog/${featured.slug}`}>
          <img src={featured.image} alt={featured.imageAlt} className="blog-hero-img" />
          <div className="blog-hero-overlay">
            <span className="blog-hero-cat">{featured.category}</span>
            <h1 className="blog-hero-title">{featured.title}</h1>
            <p className="blog-hero-desc">{featured.description}</p>
            <span className="blog-hero-meta">
              {new Date(featured.date).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
              &nbsp;·&nbsp;{featured.readTime} دقائق قراءة
            </span>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="blog-search-wrap">
        <input
          className="blog-search"
          type="text"
          placeholder="🔍 ابحث في المقالات..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>

      {/* Language Filter */}
      <div className="blog-langs">
        {LANGUAGES.map(lang => (
          <button
            key={lang.code}
            className={`blog-lang-btn ${activeLang === lang.code ? "blog-lang-active" : ""}`}
            onClick={() => { setActiveLang(lang.code); setActiveCategory("الكل"); setPage(1); }}
          >{lang.label}</button>
        ))}
      </div>

      {/* Category Filters — only for Arabic */}
      {(activeLang === "all" || activeLang === "ar") && (
        <div className="blog-cats">
          {["الكل", ...CATEGORIES].map(cat => (
            <button
              key={cat}
              className={`blog-cat-btn ${activeCategory === cat ? "blog-cat-active" : ""}`}
              onClick={() => { setActiveCategory(cat); setPage(1); }}
            >{cat}</button>
          ))}
        </div>
      )}

      {/* Results count */}
      <div className="blog-count">{filtered.length} مقالة</div>

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
                  <span>{new Date(article.date).toLocaleDateString("ar-EG", { year: "numeric", month: "short", day: "numeric" })}</span>
                  <span>{article.readTime} دقائق</span>
                </div>
                <div className="blog-card-tags">
                  {article.tags.slice(0, 3).map(t => (
                    <span key={t} className="blog-tag">{t}</span>
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
          >◀ السابق</button>
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
          >التالي ▶</button>
        </div>
      )}
    </div>
  );
}
