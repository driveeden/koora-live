export const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer";
export const ESPN_SUMMARY = "https://site.api.espn.com/apis/site/v2/sports/soccer/all/summary";

export const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
};

export function slugToName(slug: string): string {
  const exact: Record<string, string> = {
    "group-stage": "دور المجموعات",
    "regular-season": "الدوري",
    "knockout-round": "دور الإقصاء",
    "round-of-16": "دور الـ 16",
    "round-of-32": "دور الـ 32",
    quarterfinal: "ربع النهائي",
    quarterfinals: "ربع النهائي",
    semifinal: "نصف النهائي",
    semifinals: "نصف النهائي",
    final: "النهائي",
    playoff: "الدوري التمهيدي",
    playoffs: "الدوري التمهيدي",
    "first-stage": "الدور الأول",
    "second-stage": "الدور الثاني",
    "third-stage": "الدور الثالث",
    "championship-round": "دور البطولة",
  };
  if (exact[slug]) return exact[slug];
  const patterns: [string, string][] = [
    ["premier-league", "الدوري الإنجليزي الممتاز"],
    ["la-liga", "الدوري الإسباني"],
    ["bundesliga", "الدوري الألماني"],
    ["serie-a", "الدوري الإيطالي"],
    ["ligue-1", "الدوري الفرنسي"],
    ["champions-league", "دوري أبطال أوروبا"],
    ["europa-league", "الدوري الأوروبي"],
    ["world-cup", "كأس العالم"],
    ["euro", "بطولة أوروبا"],
    ["copa-america", "كأس أمريكا"],
    ["copa-del-rey", "كأس الملك"],
    ["fa-cup", "كأس الاتحاد الإنجليزي"],
    ["brasileirao", "الدوري البرازيلي"],
    ["brasileiro", "الدوري البرازيلي"],
    ["primera-division", "الدوري الأرجنتيني"],
    ["liga-profesional", "الدوري المحترفين"],
    ["saudi", "الدوري السعودي للمحترفين"],
    ["egyptian", "الدوري المصري"],
  ];
  for (const [k, v] of patterns) {
    if (slug.includes(k)) return v;
  }
  return slug.replace(/-\d{4}$/, "").replace(/-/g, " ");
}

export function espnStatusToType(
  state: string
): "inprogress" | "finished" | "upcoming" {
  if (state === "in") return "inprogress";
  if (state === "post") return "finished";
  return "upcoming";
}

export const STAT_LABELS: Record<string, string> = {
  possessionPct: "الاستحواذ %",
  totalShots: "التسديدات",
  shotsOnTarget: "التسديدات على المرمى",
  wonCorners: "الركنيات",
  foulsCommitted: "الأخطاء",
  totalPasses: "التمريرات",
  accuratePasses: "التمريرات الدقيقة",
  yellowCards: "البطاقات الصفراء",
  redCards: "البطاقات الحمراء",
  offsides: "التسلل",
  saves: "التصدي",
};

export const STAT_ORDER = [
  "possessionPct",
  "totalShots",
  "shotsOnTarget",
  "wonCorners",
  "foulsCommitted",
  "offsides",
  "saves",
  "totalPasses",
];

export const LEAGUE_CHANNELS: [string, string][] = [
  ["premier-league", "beIN Sports 1"],
  ["la-liga", "beIN Sports 2"],
  ["champions-league", "beIN Sports 3"],
  ["saudi", "SSC Sport 1"],
  ["egyptian", "ON Sport"],
  ["serie-a", "beIN Sports 4"],
  ["bundesliga", "beIN Sports 5"],
  ["ligue-1", "beIN Sports 6"],
  ["europa-league", "beIN Sports 7"],
  ["world-cup", "beIN Sports 1"],
  ["copa-america", "beIN Sports 1"],
  ["euro", "beIN Sports 1"],
];

export function leagueChannel(slug: string): string | null {
  for (const [k, ch] of LEAGUE_CHANNELS) {
    if (slug.includes(k)) return ch;
  }
  return null;
}

export const ARTICLE_SLUGS = [
  "lionel-messi-greatest-of-all-time","cristiano-ronaldo-portuguese-phenomenon","mbappe-future-of-football","mohamed-salah-egyptian-king","erling-haaland-goal-machine","neymar-jr-brazilian-magic","kevin-de-bruyne-assist-king","virgil-van-dijk-best-defender","luka-modric-the-maestro","robert-lewandowski-serial-scorer","vinicius-junior-real-madrid-wing","harry-kane-england-captain","sadio-mane-african-star","karim-benzema-ballon-dor-winner","jude-bellingham-new-generation","rodri-best-midfielder-2024","pedri-barcelona-midfield-maestro","bukayo-saka-arsenal-heart","trent-alexander-arnold-revolutionary-fullback","phil-foden-city-gem","premier-league-overview","la-liga-overview","bundesliga-overview","serie-a-overview","ligue-1-overview","saudi-pro-league","egypt-football-history","champions-league-format","champions-league-top-scorers","africa-football-rise","morocco-world-cup-2022","world-cup-2026-preview","world-cup-2022-analysis","world-cup-records","football-biggest-upsets","tiki-taka-explained","high-press-tactics","pep-guardiola-philosophy","mourinho-defensive-tactics","false-nine-role","modern-fullback-role","counter-attack-football","442-formation","catenaccio-italian-defense","var-controversy","brazil-five-world-cups","real-madrid-european-history","ajax-total-football","football-evolution-tactics","hungary-golden-team","real-madrid-greatest-club","fc-barcelona-history","manchester-city-rise","liverpool-european-tradition","juventus-italian-giant","all-time-top-scorers","transfer-market-records","football-attendance-records","goalkeeper-records","transfer-market-how-it-works","best-free-transfers","football-analytics-revolution","women-football-rise","football-nutrition-fitness","football-stadiums-future","mental-health-football","goalline-technology","football-documentaries","football-referees","african-champions-league-history","saudi-arabia-football-development","arab-football-history","football-esports","atletico-madrid-defensive-masters","paris-saint-germain-transformation","world-cup-host-cities-2026","most-assists-football","europa-league-overview","world-cup-1990-italia","football-coaching-courses","world-cup-finals-history","premier-league-classic-moments","la-liga-classic-derbies","copa-america-history","euro-championship-history","pele-greatest-legacy","zidane-player-coach","serie-b-promotion-battles","football-injuries-recovery","football-youth-academies","bundesliga-rivalries","football-gambling-problem","world-cup-young-stars","chelsea-abramovich-era","arsenal-history","football-world-cup-2018-review","bayern-munich-dominance","football-greatest-rivalries","world-cup-most-successful-nations","football-future-trends",
  "messi-goat-debate-analysis","haaland-goal-machine-tactical-breakdown","mbappe-real-madrid-first-season-review","salah-longevity-secret-analysis","bellingham-real-madrid-midfielder-profile","de-bruyne-premier-league-greatest-playmaker","premier-league-2025-26-season-preview","champions-league-2026-final-preview","high-press-tactics-explained-2026","world-cup-2026-host-cities-guide",
];
