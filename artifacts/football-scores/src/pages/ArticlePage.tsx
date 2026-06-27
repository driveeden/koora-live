import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { getArticleBySlug, getRelatedArticles } from "../data/all-articles";

export default function ArticlePage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const article = getArticleBySlug(slug);
  const related = article ? getRelatedArticles(slug, 3) : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (article) {
      document.title = `${article.title} | كورة لايف`;
    }
    return () => { document.title = "كورة لايف"; };
  }, [slug, article]);

  if (!article) {
    return (
      <div className="article-not-found">
        <div className="article-not-found-inner">
          <span style={{ fontSize: 60 }}>⚽</span>
          <h2>المقالة غير موجودة</h2>
          <p>ربما تم نقل المقالة أو حذفها.</p>
          <Link href="/blog" className="btn-back">← العودة للمقالات</Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("ar-EG", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  // Structured data for SEO
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.date,
    "author": { "@type": "Organization", "name": "كورة لايف" },
    "publisher": { "@type": "Organization", "name": "كورة لايف" },
    "inLanguage": "ar",
    "keywords": article.tags.join(", "),
  });

  return (
    <div className="article-page">
      {/* SEO structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />

      {/* Breadcrumb */}
      <nav className="article-breadcrumb">
        <Link href="/">الرئيسية</Link>
        <span> / </span>
        <Link href="/blog">المقالات</Link>
        <span> / </span>
        <span>{article.category}</span>
      </nav>

      {/* Hero Image */}
      <div className="article-hero-wrap">
        <img
          src={article.image}
          alt={article.imageAlt}
          className="article-hero-img"
          width={800}
          height={450}
        />
        <div className="article-hero-cat">{article.category}</div>
      </div>

      {/* Article Container */}
      <div className="article-container">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="article-meta-bar">
            <div className="article-meta-item">
              <span className="article-meta-icon">📅</span>
              <span>{formattedDate}</span>
            </div>
            <div className="article-meta-item">
              <span className="article-meta-icon">⏱️</span>
              <span>{article.readTime} دقائق قراءة</span>
            </div>
            <div className="article-meta-item">
              <span className="article-meta-icon">🏷️</span>
              <span>{article.category}</span>
            </div>
          </div>
          <div className="article-tags">
            {article.tags.map(tag => (
              <span key={tag} className="article-tag">{tag}</span>
            ))}
          </div>
        </header>

        {/* Article Body */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Share */}
        <div className="article-share">
          <span className="article-share-label">شارك المقالة:</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-twitter"
          >𝕏 تويتر</a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + window.location.href)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-whatsapp"
          >📱 واتساب</a>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="related-section">
            <h2 className="related-title">📖 مقالات ذات صلة</h2>
            <div className="related-grid">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.slug}`}>
                  <div className="related-card">
                    <img
                      src={r.image}
                      alt={r.imageAlt}
                      className="related-card-img"
                      loading="lazy"
                    />
                    <div className="related-card-body">
                      <span className="related-card-cat">{r.category}</span>
                      <h3 className="related-card-title">{r.title}</h3>
                      <span className="related-card-time">{r.readTime} دقائق</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Link href="/blog" className="btn-back">← العودة لجميع المقالات</Link>
        </div>
      </div>
    </div>
  );
}
