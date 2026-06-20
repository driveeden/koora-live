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
  player?: { shortName?: string };
  isHome?: boolean;
  homeScore?: number;
  awayScore?: number;
  playerIn?: { shortName?: string };
  playerOut?: { shortName?: string };
  text?: string;
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
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] || "")
    .join("")
    .toUpperCase();

  if (failed || !logo) {
    return (
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.35,
          fontWeight: 700,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={name}
      width={size}
      height={size}
      style={{ objectFit: "contain", flexShrink: 0 }}
      onError={() => setFailed(true)}
    />
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
    .map(
      (m) =>
        `⚽ ${m.homeTeam.name} ${m.homeScore} - ${m.awayScore} ${m.awayTeam.name} (${m.statusDesc || "مباشر"})`
    )
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

  const timeStr =
    isPending && match.startTime
      ? new Date(match.startTime).toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        })
      : null;

  return (
    <div
      className={`match-card ${isLive ? "match-live" : isFinished ? "match-finished" : "match-upcoming"}`}
      onClick={onClick}
    >
      <div className="match-card-header">
        <span className="tournament-name">{match.league}</span>
        {isLive && (
          <span className="live-badge">
            <span className="live-dot" />
            {match.statusDesc || "مباشر"}
          </span>
        )}
        {isFinished && <span className="finished-badge">انتهت</span>}
        {isPending && timeStr && <span className="time-badge">{timeStr}</span>}
        {isPending && !timeStr && match.statusDesc && (
          <span className="time-badge">{match.statusDesc}</span>
        )}
      </div>

      <div className="match-teams">
        <div className="match-team home-team">
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size={36} />
          <span className="team-name">{match.homeTeam.name}</span>
        </div>

        <div className="match-score-center">
          {isPending ? (
            <span className="vs-text">vs</span>
          ) : (
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

// ─── Match Modal ──────────────────────────────────────────────────────────────
function MatchModal({ match, onClose }: { match: Match; onClose: () => void }) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<"goals" | "cards" | "subs" | "all">("all");

  useEffect(() => {
    async function fetchIncidents() {
      try {
        const res = await fetch(`${API_BASE}/match/${match.id}/incidents`);
        const data = await res.json();
        setIncidents(data.incidents || []);
      } catch {
        setIncidents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchIncidents();
  }, [match.id]);

  const goals = incidents.filter((i) => i.incidentType === "goal");
  const cards = incidents.filter((i) => i.incidentType === "card");
  const subs = incidents.filter((i) => i.incidentType === "substitution");
  const allEvents = incidents;

  const displayed =
    activeSection === "goals" ? goals :
    activeSection === "cards" ? cards :
    activeSection === "subs" ? subs :
    allEvents;

  const incidentIcon = (inc: Incident) => {
    if (inc.incidentType === "goal") return "⚽";
    if (inc.incidentType === "card")
      return <span className="card-icon" style={{ background: inc.incidentClass === "red" ? "#ef4444" : "#eab308" }} />;
    if (inc.incidentType === "substitution") return "🔄";
    return "•";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Tournament + status */}
        <div className="modal-header">
          <span className="modal-tournament">{match.league}</span>
          {match.status === "inprogress" && (
            <span className="live-badge">
              <span className="live-dot" />
              {match.statusDesc || "مباشر"}
            </span>
          )}
          {match.status === "finished" && (
            <span className="finished-badge">انتهت</span>
          )}
        </div>

        {/* Hero score section */}
        <div className="modal-hero">
          <div className="modal-team">
            <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size={72} />
            <span className="modal-team-name">{match.homeTeam.name}</span>
            <span className="modal-team-side">الفريق المضيف</span>
          </div>

          <div className="modal-score-block">
            <div className="modal-score">
              <span className={`modal-score-num ${match.status === "inprogress" ? "score-live" : ""}`}>
                {match.homeScore}
              </span>
              <span className="modal-score-sep">:</span>
              <span className={`modal-score-num ${match.status === "inprogress" ? "score-live" : ""}`}>
                {match.awayScore}
              </span>
            </div>
            {match.status === "inprogress" && (
              <div className="modal-clock">
                <span className="live-dot" />
                <span>{match.statusDesc}</span>
              </div>
            )}
            {match.status === "finished" && (
              <div className="modal-status-text">نهاية المباراة</div>
            )}
          </div>

          <div className="modal-team">
            <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size={72} />
            <span className="modal-team-name">{match.awayTeam.name}</span>
            <span className="modal-team-side">الفريق الضيف</span>
          </div>
        </div>

        {/* Stats tabs */}
        {!loading && incidents.length > 0 && (
          <div className="modal-tabs">
            <button className={`modal-tab ${activeSection === "all" ? "modal-tab-active" : ""}`} onClick={() => setActiveSection("all")}>
              الكل ({allEvents.length})
            </button>
            {goals.length > 0 && (
              <button className={`modal-tab ${activeSection === "goals" ? "modal-tab-active" : ""}`} onClick={() => setActiveSection("goals")}>
                ⚽ ({goals.length})
              </button>
            )}
            {cards.length > 0 && (
              <button className={`modal-tab ${activeSection === "cards" ? "modal-tab-active" : ""}`} onClick={() => setActiveSection("cards")}>
                🟨 ({cards.length})
              </button>
            )}
            {subs.length > 0 && (
              <button className={`modal-tab ${activeSection === "subs" ? "modal-tab-active" : ""}`} onClick={() => setActiveSection("subs")}>
                🔄 ({subs.length})
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="modal-loading">
            <div className="spinner" />
            <span>جاري تحميل الأحداث...</span>
          </div>
        )}

        {!loading && incidents.length === 0 && (
          <div className="no-incidents">
            <span style={{ fontSize: 32 }}>⚽</span>
            <p>لا توجد أحداث مسجلة حتى الآن</p>
          </div>
        )}

        {!loading && incidents.length > 0 && (
          <div className="modal-incidents">
            {displayed.map((inc, i) => (
              <div key={i} className={`incident-row-v2 ${inc.isHome ? "incident-home-v2" : "incident-away-v2"}`}>
                <div className={`incident-side-bar ${inc.isHome ? "bar-home" : "bar-away"}`} />
                <div className="incident-icon-wrap">
                  {incidentIcon(inc)}
                </div>
                <div className="incident-body">
                  <div className="incident-main">
                    <span className="incident-name">{inc.player?.shortName || "—"}</span>
                    {inc.incidentType === "substitution" && inc.playerOut && (
                      <span className="incident-sub-out">← {inc.playerOut.shortName}</span>
                    )}
                  </div>
                  <div className="incident-meta">
                    <span className={`incident-team-tag ${inc.isHome ? "tag-home" : "tag-away"}`}>
                      {inc.isHome ? match.homeTeam.name : match.awayTeam.name}
                    </span>
                  </div>
                </div>
                <span className="incident-time-v2">{inc.time}</span>
              </div>
            ))}
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
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) {
    return (
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
  }

  if (error) return <div className="error-msg">تعذر تحميل الأخبار، حاول لاحقاً</div>;

  return (
    <div className="news-grid">
      {news.map((item, i) => (
        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="news-card">
          {item.enclosure?.link || item.thumbnail ? (
            <img
              src={item.enclosure?.link || item.thumbnail}
              alt={item.title}
              className="news-img"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <div className="news-img-placeholder">⚽</div>
          )}
          <div className="news-body">
            <h3 className="news-title">{item.title}</h3>
            {item.description && (
              <p
                className="news-desc"
                dangerouslySetInnerHTML={{
                  __html: item.description.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
                }}
              />
            )}
            {item.pubDate && (
              <span className="news-date">
                {new Date(item.pubDate).toLocaleDateString("ar-EG")}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function arabicDate(d: Date) {
  return d.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function groupMatches(matches: Match[]) {
  const live = matches.filter((m) => m.status === "inprogress");
  const upcoming = matches.filter((m) => m.status === "upcoming");
  const finished = matches.filter((m) => m.status === "finished");
  return { live, upcoming, finished };
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<"matches" | "news">("matches");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [leagueFilter, setLeagueFilter] = useState<string>("الكل");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMatches = useCallback(async (date: Date, silent = false) => {
    if (!silent) setLoading(true);
    setError(false);
    try {
      const res = await fetch(`${API_BASE}/matches?date=${formatDate(date)}`);
      const data = await res.json();
      setMatches(data.matches || []);
    } catch {
      setError(true);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches(selectedDate);
    setLeagueFilter("الكل");
  }, [selectedDate, fetchMatches]);

  // Auto-refresh live matches every 30s
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const hasLive = matches.some((m) => m.status === "inprogress");
      if (hasLive) fetchMatches(selectedDate, true);
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
        <button
          className={`nav-tab ${activeTab === "matches" ? "nav-tab-active" : ""}`}
          onClick={() => setActiveTab("matches")}
        >
          المباريات
        </button>
        <button
          className={`nav-tab ${activeTab === "news" ? "nav-tab-active" : ""}`}
          onClick={() => setActiveTab("news")}
        >
          الأخبار
        </button>
      </nav>

      <main className="main-content">
        {activeTab === "matches" && (
          <>
            <div className="date-nav">
              <button className="date-btn" onClick={() => setSelectedDate(d => { const n=new Date(d); n.setDate(n.getDate()-1); return n; })}>
                ◀ السابق
              </button>
              <div className="date-center">
                <span className="date-label">{arabicDate(selectedDate)}</span>
                {!isToday && (
                  <button className="today-btn" onClick={() => setSelectedDate(new Date())}>
                    اليوم
                  </button>
                )}
              </div>
              <button className="date-btn" onClick={() => setSelectedDate(d => { const n=new Date(d); n.setDate(n.getDate()+1); return n; })}>
                التالي ▶
              </button>
            </div>

            {!loading && leagues.length > 1 && (
              <div className="league-filters">
                {leagues.map((l) => (
                  <button
                    key={l}
                    className={`league-filter-btn ${leagueFilter === l ? "league-filter-active" : ""}`}
                    onClick={() => setLeagueFilter(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="matches-list">
                {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {error && !loading && (
              <div className="error-msg">تعذر تحميل البيانات، حاول لاحقاً</div>
            )}

            {!loading && !error && filtered.length === 0 && (
              <div className="error-msg">لا توجد مباريات في هذا اليوم</div>
            )}

            {!loading && !error && (
              <div className="matches-list">
                {live.length > 0 && (
                  <>
                    <div className="section-title">
                      <span className="live-dot" /> المباريات المباشرة ({live.length})
                    </div>
                    {live.map((m) => <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />)}
                  </>
                )}
                {upcoming.length > 0 && (
                  <>
                    <div className="section-title">القادمة ({upcoming.length})</div>
                    {upcoming.map((m) => <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />)}
                  </>
                )}
                {finished.length > 0 && (
                  <>
                    <div className="section-title">المنتهية ({finished.length})</div>
                    {finished.map((m) => <MatchCard key={m.id} match={m} onClick={() => setSelectedMatch(m)} />)}
                  </>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === "news" && <NewsTab />}
      </main>

      {selectedMatch && (
        <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}
