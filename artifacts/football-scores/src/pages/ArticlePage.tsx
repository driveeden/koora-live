import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { getArticleBySlug, getRelatedArticles } from "../data/articles";
import { getArticleENBySlug, getRelatedArticlesEN } from "../data/articles-en";
import { getLang } from "../i18n";

export default function ArticlePage() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug ?? "";
  const lang = getLang();
  const isAr = lang === "ar" || lang === "fr";

  const article = isAr ? getArticleBySlug(slug) : (getArticleENBySlug(slug) || getArticleBySlug(slug));
  const related = isAr
    ? (article ? getRelatedArticles(slug, 3) : [])
    : (article ? getRelatedArticlesEN(slug, 3) : []);

  const minuteLabel = lang === "ar" ? "دقائق قراءة" : lang === "fr" ? "min de lecture" : "min read";
  const backLabel = lang === "ar" ? "← العودة لجميع المقالات" : lang === "fr" ? "← Retour aux Articles" : "← Back to All Articles";
  const relatedLabel = lang === "ar" ? "📖 مقالات ذات صلة" : lang === "fr" ? "📖 Articles connexes" : "📖 Related Articles";
  const notFoundTitle = lang === "ar" ? "المقالة غير موجودة" : lang === "fr" ? "Article introuvable" : "Article Not Found";
  const notFoundDesc = lang === "ar" ? "ربما تم نقل المقالة أو حذفها." : lang === "fr" ? "Cet article a peut-être été déplacé ou supprimé." : "This article may have been moved or deleted.";
  const shareLabel = lang === "ar" ? "شارك المقالة:" : lang === "fr" ? "Partager:" : "Share:";
  const dateLocale = lang === "ar" ? "ar-EG" : lang === "fr" ? "fr-FR" : "en-GB";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (article) {
      document.title = `${article.title} | كورة لايف — Koora Live`;
      document.documentElement.lang = lang;
    }
    return () => { document.title = "كورة لايف | Koora Live"; };
  }, [slug, article, lang]);

  if (!article) {
    return (
      <div className="article-not-found">
        <div className="article-not-found-inner">
          <span style={{ fontSize: 60 }}>⚽</span>
          <h2>{notFoundTitle}</h2>
          <p>{notFoundDesc}</p>
          <Link href="/blog" className="btn-back">{backLabel}</Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString(dateLocale, {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const canonicalUrl = `https://koora-live--driveeden.replit.app/blog/${article.slug}`;

  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "image": article.image,
    "datePublished": article.date,
    "dateModified": article.date,
    "url": canonicalUrl,
    "author": {
      "@type": "Organization",
      "name": "كورة لايف | Koora Live",
      "url": "https://koora-live--driveeden.replit.app/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "كورة لايف | Koora Live",
      "logo": {
        "@type": "ImageObject",
        "url": "https://koora-live--driveeden.replit.app/favicon.svg"
      }
    },
    "inLanguage": lang,
    "keywords": article.tags.join(", "),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    }
  });

  const breadcrumbData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": lang === "ar" ? "الرئيسية" : "Home", "item": "https://koora-live--driveeden.replit.app/" },
      { "@type": "ListItem", "position": 2, "name": lang === "ar" ? "المقالات" : "Articles", "item": "https://koora-live--driveeden.replit.app/blog" },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": canonicalUrl }
    ]
  });

  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="article-page" dir={dir} lang={lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbData }} />

      {/* Breadcrumb */}
      <nav className="article-breadcrumb">
        <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
        <span> / </span>
        <Link href="/blog">{lang === "ar" ? "المقالات" : "Articles"}</Link>
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
              <span>{article.readTime} {minuteLabel}</span>
            </div>
            <div className="article-meta-item">
              <span className="article-meta-icon">🏷️</span>
              <span>{article.category}</span>
            </div>
          </div>
          <div className="article-tags">
            {article.tags.map((tag: string) => (
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
          <span className="article-share-label">{shareLabel}</span>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(canonicalUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-twitter"
          >𝕏 Twitter</a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(article.title + " " + canonicalUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-whatsapp"
          >📱 WhatsApp</a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-facebook"
          >📘 Facebook</a>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="related-section">
            <h2 className="related-title">{relatedLabel}</h2>
            <div className="related-grid">
              {related.map((r: any) => (
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
                      <span className="related-card-time">{r.readTime} {minuteLabel}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <Link href="/blog" className="btn-back">{backLabel}</Link>
        </div>
      </div>
    </div>
  );
}
