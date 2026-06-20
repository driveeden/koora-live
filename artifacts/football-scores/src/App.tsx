import { useState, useEffect, useCallback, useRef } from "react";

const API_BASE = "/api";

interface Team {
  id: string;
  name: string;
  logo: string;
}

interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: "inprogress" | "finished" | "upcoming";
  statusDesc: string;
  startTime: string | null;
  league: string;
}

interface Incident {
  incidentType: string;
  incidentClass?: string;
  time: string;
  clockValue?: number;
  period?: number;
  player?: { shortName?: string };
  playerOut?: { shortName?: string };
  isHome?: boolean;
  teamName?: string;
  ownGoal?: boolean;
  penaltyKick?: boolean;
  scoreAfter?: string;
  text?: string;
}

interface StatItem {
  name: string;
  label: string;
  home: string;
  away: string;
}

interface MatchDetails {
  incidents: Incident[];
  venue: string | null;
  attendance: number | null;
  referee: string | null;
  broadcast: string | null;
  statistics: StatItem[];
}

interface NewsItem {
  title: string;
  description?: string;
  link: string;
  enclosure?: { link?: string };
  thumbnail?: string;
  pubDate?: string;
}

// ─── Team Logo ────────────────────────────────────────────────────────────────
function TeamLogo({ logo, name, size = 40 }: { logo: string; name: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").slice(0, 2).map((w) => w[0] || "").join("").toUpperCase();
  if (failed || !logo) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "linear-gradient(135deg,#16a34a,#22c55e)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.35, fontWeight: 700, color: "#fff", flexShrink: 0,
      }}>{initials}</div>
    );
  }
  return (
    <img src={logo} alt={name} width={size} height={size}
      style={{ objectFit: "contain", flexShrink: 0 }}
      onError={() => setFailed(true)} />
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-line" style={{ width: "40%", marginBottom: 12 }} />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="skeleton-circle" />
          <div className="skeleton-line" style={{ width: 80 }} />
        </div>
        <div className="skeleton-score" />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="skeleton-line" style={{ width: 80 }} />
          <div className="skeleton-circle" />
        </div>
      </div>
    </div>
  );
}

// ─── Live Ticker ──────────────────────────────────────────────────────────────
function LiveTicker({ matches }: { matches: Match[] }) {
  const liveMatches = matches.filter((m) => m.status === "inprogress");
  if (liveMatches.length === 0) return null;
  const content = liveMatches
    .map((m) => `⚽ ${m.homeTeam.name} ${m.homeScore} - ${m.awayScore} ${m.awayTeam.name} (${m.statusDesc || "مباشر"})`)
    .join("    •    ");
  return (
    <div className="live-ticker">
      <span className="live-ticker-badge">🔴 مباشر</span>
      <div className="live-ticker-track">
        <span className="live-ticker-content">{content + "    •    " + content}</span>
      </div>
    </div>
  );
}

// ─── Match Card ───────────────────────────────────────────────────────────────
function MatchCard({ match, onClick }: { match: Match; onClick: () => void }) {
  const isLive = match.status === "inprogress";
  const isFinished = match.status === "finished";
  const isPending = match.status === "upcoming";
  const timeStr = isPending && match.startTime
    ? new Date(match.startTime).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
    : null;

  return (
    <div className={`match-card ${isLive ? "match-live" : isFinished ? "match-finished" : "match-upcoming"}`} onClick={onClick}>
      <div className="match-card-header">
        <span className="tournament-name">{match.league}</span>
        {isLive && <span className="live-badge"><span className="live-dot" />{match.statusDesc || "مباشر"}</span>}
        {isFinished && <span className="finished-badge">انتهت</span>}
        {isPending && (timeStr
          ? <span className="time-badge">{timeStr}</span>
          : match.statusDesc && <span className="time-badge">{match.statusDesc}</span>
        )}
      </div>
      <div className="match-teams">
        <div className="match-team home-team">
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size={36} />
          <span className="team-name">{match.homeTeam.name}</span>
        </div>
        <div className="match-score-center">
          {isPending ? <span className="vs-text">vs</span> : (
            <div className="score-display">
              <span className={`score-num ${isLive ? "score-live" : ""}`}>{match.homeScore}</span>
              <span className="score-sep">-</span>
              <span className={`score-num ${isLive ? "score-live" : ""}`}>{match.awayScore}</span>
            </div>
          )}
        </div>
        <div className="match-team away-team">
          <span className="team-name">{match.awayTeam.name}</span>
          <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size={36} />
        </div>
      </div>
    </div>
  );
}

// ─── Statistics Bar ───────────────────────────────────────────────────────────
function StatBar({ stat }: { stat: StatItem }) {
  const h = parseFloat(stat.home.replace("%", ""));
  const a = parseFloat(stat.away.replace("%", ""));
  const total = h + a || 1;
  const homePct = Math.round((h / total) * 100);
  const awayPct = 100 - homePct;

  return (
    <div className="stat-row">
      <span className="stat-val stat-val-home">{stat.home}{stat.name === "possessionPct" ? "%" : ""}</span>
      <div className="stat-center">
        <span className="stat-label">{stat.label}</span>
        <div className="stat-bar-track">
          <div className="stat-bar-home" style={{ width: `${homePct}%` }} />
          <div className="stat-bar-away" style={{ width: `${awayPct}%` }} />
        </div>
      </div>
      <span className="stat-val stat-val-away">{stat.away}{stat.name === "possessionPct" ? "%" : ""}</span>
    </div>
  );
}

// ─── Match Modal ──────────────────────────────────────────────────────────────
type ModalTab = "all" | "goals" | "cards" | "subs" | "stats";

function MatchModal({ match, onClose }: { match: Match; onClose: () => void }) {
  const [details, setDetails] = useState<MatchDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ModalTab>("all");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const res = await fetch(`${API_BASE}/match/${match.id}/incidents`);
        const data = await res.json();
        setDetails(data);
      } catch {
        setDetails({ incidents: [], venue: null, attendance: null, referee: null, broadcast: null, statistics: [] });
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [match.id]);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const goals = details?.incidents.filter((i) => i.incidentType === "goal") ?? [];
  const cards = details?.incidents.filter((i) => i.incidentType === "card") ?? [];
  const subs = details?.incidents.filter((i) => i.incidentType === "substitution") ?? [];
  const stats = details?.statistics ?? [];

  const tabCounts: Record<ModalTab, number> = {
    all: details?.incidents.length ?? 0,
    goals: goals.length,
    cards: cards.length,
    subs: subs.length,
    stats: stats.length,
  };

  // Group goals by period for separator
  const goalsByPeriod = goals.reduce<Record<number, Incident[]>>((acc, g) => {
    const p = g.period ?? 1;
    if (!acc[p]) acc[p] = [];
    acc[p].push(g);
    return acc;
  }, {});
  const periods = Object.keys(goalsByPeriod).map(Number).sort((a, b) => a - b);

  const periodLabel: Record<number, string> = {
    1: "الشوط الأول",
    2: "الشوط الثاني",
    3: "الوقت الإضافي الأول",
    4: "الوقت الإضافي الثاني",
    5: "ركلات الترجيح",
  };

  const yellowCards = cards.filter((c) => c.incidentClass === "yellow");
  const redCards = cards.filter((c) => c.incidentClass === "red");
  const allCards = [...yellowCards, ...redCards];

  const isUpcoming = match.status === "upcoming";
  const isLive = match.status === "inprogress";
  const isFinished = match.status === "finished";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* ── Section 1: Header ── */}
        <div className="md-header">
          <span className="md-league">{match.league}</span>
        </div>

        {/* ── Section 2: Score Hero ── */}
        <div className="md-hero">
          <div className="md-team">
            <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size={64} />
            <span className="md-team-name">{match.homeTeam.name}</span>
            <span className="md-team-role">المضيف</span>
          </div>

          <div className="md-center">
            {isUpcoming ? (
              <div className="md-upcoming-time">
                {match.startTime
                  ? new Date(match.startTime).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })
                  : match.statusDesc}
              </div>
            ) : (
              <div className="md-score-wrap">
                <span className={`md-score-num ${isLive ? "md-score-live" : ""}`}>{match.homeScore}</span>
                <span className="md-score-sep">:</span>
                <span className={`md-score-num ${isLive ? "md-score-live" : ""}`}>{match.awayScore}</span>
              </div>
            )}
            <div className="md-status-pill">
              {isLive && <><span className="live-dot" />&nbsp;</>}
              <span>{isLive ? match.statusDesc || "مباشر" : isFinished ? "نهاية المباراة" : "لم تبدأ"}</span>
            </div>
          </div>

          <div className="md-team">
            <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size={64} />
            <span className="md-team-name">{match.awayTeam.name}</span>
            <span className="md-team-role">الضيف</span>
          </div>
        </div>

        {/* ── Section 3: Info Bar ── */}
        {details && (details.venue || details.referee || details.broadcast || details.attendance) && (
          <div className="md-infobar">
            {details.venue && (
              <div className="md-info-item">
                <span className="md-info-icon">🏟️</span>
                <span className="md-info-text">{details.venue}</span>
              </div>
            )}
            {details.referee && (
              <div className="md-info-item">
                <span className="md-info-icon">👤</span>
                <span className="md-info-text">{details.referee}</span>
              </div>
            )}
            {details.broadcast && (
              <div className="md-info-item">
                <span className="md-info-icon">📺</span>
                <span className="md-info-text">{details.broadcast}</span>
              </div>
            )}
            {details.attendance && (
              <div className="md-info-item">
                <span className="md-info-icon">👥</span>
                <span className="md-info-text">{details.attendance.toLocaleString("ar-EG")}</span>
              </div>
            )}
          </div>
        )}

        {/* ── Tabs ── */}
        {!loading && (
          <div className="md-tabs">
            {(["all", "goals", "cards", "subs", "stats"] as ModalTab[]).map((tab) => {
              const labels: Record<ModalTab, string> = { all: "الكل", goals: "⚽", cards: "🟨", subs: "🔄", stats: "📊" };
              const count = tabCounts[tab];
              if (tab !== "all" && tab !== "stats" && count === 0) return null;
              if (tab === "stats" && stats.length === 0) return null;
              return (
                <button
                  key={tab}
                  className={`md-tab ${activeTab === tab ? "md-tab-active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {labels[tab]}{tab !== "stats" && count > 0 ? ` (${count})` : ""}
                </button>
              );
            })}
          </div>
        )}

        {/* ── Loading ── */}
        {loading && (
          <div className="md-loading">
            <div className="spinner" />
            <span>جاري تحميل التفاصيل...</span>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && details && (
          <div className="md-body">

            {/* GOALS */}
            {(activeTab === "all" || activeTab === "goals") && goals.length > 0 && (
              <div className="md-section">
                <div className="md-section-title green-bar">⚽ الأهداف</div>
                {periods.map((p) => (
                  <div key={p}>
                    {periods.length > 1 && (
                      <div className="md-period-sep">— {periodLabel[p] ?? `الشوط ${p}`} —</div>
                    )}
                    {(goalsByPeriod[p] ?? []).map((g, i) => (
                      <div key={i} className={`md-event-row ${g.isHome ? "ev-home" : "ev-away"}`}>
                        <div className="ev-time-bubble green-bubble">{g.time}</div>
                        <div className="ev-body">
                          <div className="ev-main">
                            <span className="ev-player-name">{g.player?.shortName || "—"}</span>
                            {g.ownGoal && <span className="ev-tag red-tag">هدف ذاتي</span>}
                            {g.penaltyKick && !g.ownGoal && <span className="ev-tag green-tag">ركلة جزاء</span>}
                          </div>
                          <span className="ev-team-name">{g.teamName}</span>
                        </div>
                        <div className="ev-right">
                          {g.scoreAfter && <span className="ev-score-after">{g.scoreAfter}</span>}
                          <span className="ev-icon">⚽</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* CARDS */}
            {(activeTab === "all" || activeTab === "cards") && allCards.length > 0 && (
              <div className="md-section">
                <div className="md-section-title yellow-bar">🟨 البطاقات</div>
                {allCards.map((c, i) => (
                  <div key={i} className={`md-event-row ${c.isHome ? "ev-home" : "ev-away"}`}>
                    <div className={`ev-time-bubble ${c.incidentClass === "red" ? "red-bubble" : "yellow-bubble"}`}>
                      {c.time}
                    </div>
                    <div className="ev-body">
                      <div className="ev-main">
                        <span className="ev-player-name">{c.player?.shortName || "—"}</span>
                        <span className="ev-card-icon">{c.incidentClass === "red" ? "🟥" : "🟨"}</span>
                      </div>
                      <span className="ev-team-name">{c.teamName}</span>
                    </div>
                    <div className="ev-right" />
                  </div>
                ))}
              </div>
            )}

            {/* SUBSTITUTIONS */}
            {(activeTab === "all" || activeTab === "subs") && subs.length > 0 && (
              <div className="md-section">
                <div className="md-section-title blue-bar">🔄 الاستبدالات</div>
                {subs.map((s, i) => (
                  <div key={i} className={`md-event-row ${s.isHome ? "ev-home" : "ev-away"}`}>
                    <div className="ev-time-bubble gray-bubble">{s.time}</div>
                    <div className="ev-body">
                      <div className="ev-main">
                        <span className="ev-sub-in">▲ {s.player?.shortName || "—"}</span>
                        {s.playerOut && <span className="ev-sub-out">▼ {s.playerOut.shortName}</span>}
                      </div>
                      <span className="ev-team-name">{s.teamName}</span>
                    </div>
                    <div className="ev-right" />
                  </div>
                ))}
              </div>
            )}

            {/* STATISTICS */}
            {(activeTab === "all" || activeTab === "stats") && stats.length > 0 && (
              <div className="md-section">
                <div className="md-section-title purple-bar">📊 الإحصائيات</div>
                <div className="stat-teams-header">
                  <span className="stat-team-label">{match.homeTeam.name}</span>
                  <span className="stat-team-label">{match.awayTeam.name}</span>
                </div>
                {stats.map((s, i) => <StatBar key={i} stat={s} />)}
              </div>
            )}

            {/* Empty state */}
            {details.incidents.length === 0 && stats.length === 0 && (
              <div className="md-empty">
                <span>⚽</span>
                <p>لا توجد أحداث مسجلة حتى الآن</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── News Tab ─────────────────────────────────────────────────────────────────
function NewsTab() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${API_BASE}/news`);
        const data = await res.json();
        setNews((data.items || []).slice(0, 20));
      } catch { setError(true); }
      finally { setLoading(false); }
    }
    fetchNews();
  }, []);

  if (loading) return (
    <div className="news-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="news-skeleton">
          <div className="skeleton-img" />
          <div style={{ padding: 12 }}>
            <div className="skeleton-line" style={{ width: "90%", marginBottom: 8 }} />
            <div className="skeleton-line" style={{ width: "70%" }} />
          </div>
        </div>
      ))}
    </div>
  );

  if (error) return <div className="error-msg">تعذر تحميل الأخبار، حاول لاحقاً</div>;

  return (
    <div className="news-grid">
      {news.map((item, i) => (
        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card">
          {item.enclosure?.link || item.thumbnail
            ? <img src={item.enclosure?.link || item.thumbnail} alt={item.title} className="news-img"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            : <div className="news-img-placeholder">⚽</div>
          }
          <div className="news-body">
            <h3 className="news-title">{item.title}</h3>
            {item.description && (
              <p className="news-desc"
                dangerouslySetInnerHTML={{ __html: item.description.replace(/<[^>]+>/g, "").slice(0, 120) + "..." }} />
            )}
            {item.pubDate && <span className="news-date">{new Date(item.pubDate).toLocaleDateString("ar-EG")}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function arabicDate(d: Date) {
  return d.toLocaleDateString("ar-EG", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
}

function groupMatches(matches: Match[]) {
  return {
    live: matches.filter((m) => m.status === "inprogress"),
    upcoming: matches.filter((m) => m.status === "upcoming"),
    finished: matches.filter((m) => m.status === "finished"),
  };
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<"matches" | "news">("matches");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [leagueFilter, setLeagueFilter] = useState("الكل");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMatches = useCallback(async (date: Date, silent = false) => {
    if (!silent) setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_BASE}/matches?date=${formatDate(date)}`);
      const data = await res.json();
      setMatches(data.matches || []);
    } catch { setError(true); }
    finally { if (!silent) setLoading(false); }
  }, []);

  useEffect(() => { fetchMatches(selectedDate); setLeagueFilter("الكل"); }, [selectedDate, fetchMatches]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (matches.some((m) => m.status === "inprogress")) fetchMatches(selectedDate, true);
    }, 30000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [matches, selectedDate, fetchMatches]);

  const leagues = ["الكل", ...Array.from(new Set(matches.map((m) => m.league)))];
  const filtered = leagueFilter === "الكل" ? matches : matches.filter((m) => m.league === leagueFilter);
  const { live, upcoming, finished } = groupMatches(filtered);
  const isToday = formatDate(selectedDate) === formatDate(new Date());

  return (
    <div className="app">
      <LiveTicker matches={matches} />

      <header className="site-header">
        <div className="site-brand">
          <span className="brand-icon">⚽</span>
          <span className="brand-text">كورة لايف</span>
        </div>
      </header>

      <nav className="main-nav">
        <button className={`nav-tab ${activeTab === "matches" ? "nav-tab-active" : ""}`} onClick={() => setActiveTab("matches")}>المباريات</button>
        <button className={`nav-tab ${activeTab === "news" ? "nav-tab-active" : ""}`} onClick={() => setActiveTab("news")}>الأخبار</button>
      </nav>

      <main className="main-content">
        {activeTab === "matches" && (
          <>
            <div className="date-nav">
              <button className="date-btn" onClick={() => setSelectedDate((d) => { const n=new Date(d); n.setDate(n.getDate()-1); return n; })}>◀ السابق</button>
              <div className="date-center">
                <span className="date-label">{arabicDate(selectedDate)}</span>
                {!isToday && <button className="today-btn" onClick={() => setSelectedDate(new Date())}>اليوم</button>}
              </div>
              <button className="date-btn" onClick={() => setSelectedDate((d) => { const n=new Date(d); n.setDate(n.getDate()+1); return n; })}>التالي ▶</button>
            </div>

            {!loading && leagues.length > 1 && (
              <div className="league-filters">
                {leagues.map((l) => (
                  <button key={l} className={`league-filter-btn ${leagueFilter === l ? "league-filter-active" : ""}`} onClick={() => setLeagueFilter(l)}>{l}</button>
                ))}
              </div>
            )}

            {loading && <div className="matches-list">{Array.from({length:8}).map((_,i)=><SkeletonCard key={i}/>)}</div>}
            {error && !loading && <div className="error-msg">تعذر تحميل البيانات، حاول لاحقاً</div>}
            {!loading && !error && filtered.length === 0 && <div className="error-msg">لا توجد مباريات في هذا اليوم</div>}

            {!loading && !error && (
              <div className="matches-list">
                {live.length > 0 && (<>
                  <div className="section-title"><span className="live-dot" /> المباريات المباشرة ({live.length})</div>
                  {live.map((m) => <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />)}
                </>)}
                {upcoming.length > 0 && (<>
                  <div className="section-title">القادمة ({upcoming.length})</div>
                  {upcoming.map((m) => <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />)}
                </>)}
                {finished.length > 0 && (<>
                  <div className="section-title">المنتهية ({finished.length})</div>
                  {finished.map((m) => <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />)}
                </>)}
              </div>
            )}
          </>
        )}
        {activeTab === "news" && <NewsTab />}
      </main>

      {selectedMatch && <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />}
    </div>
  );
}
