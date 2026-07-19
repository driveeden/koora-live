export type Lang = "ar" | "en" | "fr";

export const translations = {
  ar: {
    siteTitle: "كورة لايف",
    matches: "المباريات",
    news: "الأخبار",
    articles: "المقالات",
    live: "مباشر",
    liveMatches: "المباريات المباشرة",
    upcoming: "القادمة",
    finished: "المنتهية",
    prev: "◀ السابق",
    next: "التالي ▶",
    today: "اليوم",
    noMatches: "لا توجد مباريات في هذا اليوم",
    loadError: "تعذر تحميل البيانات، حاول لاحقاً",
    all: "الكل",
    readMore: "اقرأ المزيد",
    backToArticles: "← العودة للمقالات",
    home: "الرئيسية",
    searchPlaceholder: "ابحث عن مقال...",
    relatedArticles: "مقالات ذات صلة",
    minuteRead: "دقائق قراءة",
    articleNotFound: "المقالة غير موجودة",
    articleMoved: "ربما تم نقل المقالة أو حذفها.",
    venue: "الملعب",
    attendance: "الحضور",
    referee: "الحكم",
    broadcast: "البث",
    statistics: "الإحصائيات",
    goals: "الأهداف",
    cards: "البطاقات",
    substitutions: "الاستبدالات",
    loading: "جاري التحميل...",
    langLabel: "العربية",
  },
  en: {
    siteTitle: "Koora Live",
    matches: "Matches",
    news: "News",
    articles: "Articles",
    live: "Live",
    liveMatches: "Live Matches",
    upcoming: "Upcoming",
    finished: "Finished",
    prev: "◀ Previous",
    next: "Next ▶",
    today: "Today",
    noMatches: "No matches today",
    loadError: "Failed to load data, please try again",
    all: "All",
    readMore: "Read More",
    backToArticles: "← Back to Articles",
    home: "Home",
    searchPlaceholder: "Search articles...",
    relatedArticles: "Related Articles",
    minuteRead: "min read",
    articleNotFound: "Article Not Found",
    articleMoved: "This article may have been moved or deleted.",
    venue: "Venue",
    attendance: "Attendance",
    referee: "Referee",
    broadcast: "Broadcast",
    statistics: "Statistics",
    goals: "Goals",
    cards: "Cards",
    substitutions: "Substitutions",
    loading: "Loading...",
    langLabel: "English",
  },
  fr: {
    siteTitle: "Koora Live",
    matches: "Matchs",
    news: "Actualités",
    articles: "Articles",
    live: "Direct",
    liveMatches: "Matchs en Direct",
    upcoming: "À venir",
    finished: "Terminés",
    prev: "◀ Précédent",
    next: "Suivant ▶",
    today: "Aujourd'hui",
    noMatches: "Aucun match aujourd'hui",
    loadError: "Échec du chargement, réessayez",
    all: "Tous",
    readMore: "Lire la suite",
    backToArticles: "← Retour aux Articles",
    home: "Accueil",
    searchPlaceholder: "Rechercher un article...",
    relatedArticles: "Articles connexes",
    minuteRead: "min de lecture",
    articleNotFound: "Article introuvable",
    articleMoved: "Cet article a peut-être été déplacé ou supprimé.",
    venue: "Stade",
    attendance: "Assistance",
    referee: "Arbitre",
    broadcast: "Diffusion",
    statistics: "Statistiques",
    goals: "Buts",
    cards: "Cartons",
    substitutions: "Remplacements",
    loading: "Chargement...",
    langLabel: "Français",
  },
} as const;

export type Translations = typeof translations.ar;

export function getLang(): Lang {
  if (typeof window !== "undefined") {
    const param = new URLSearchParams(window.location.search).get("lang");
    if (param === "en" || param === "fr" || param === "ar") return param;
    const stored = localStorage.getItem("koora-lang");
    if (stored === "en" || stored === "fr" || stored === "ar") return stored;
  }
  return "ar";
}

export function setLang(lang: Lang) {
  if (typeof window !== "undefined") {
    localStorage.setItem("koora-lang", lang);
    const url = new URL(window.location.href);
    if (lang === "ar") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }
}

export function t(lang: Lang): Translations {
  return translations[lang];
}
