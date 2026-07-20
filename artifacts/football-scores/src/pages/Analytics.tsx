import { useState, useEffect, useCallback } from "react";

const ANALYTICS_KEY = "koora2026admin";
const API = "/api/analytics/stats";

interface Stats {
  online: number;
  total: number;
  today: number;
  week: number;
  month: number;
  totalPageviews: number;
  todayPageviews: number;
  countries: { country: string; countryCode: string; count: number }[];
  referrers: { type: string; domain: string; count: number }[];
  topPages: { page: string; count: number }[];
  devices: { deviceType: string; count: number }[];
  browsers: { browser: string; count: number }[];
  hourly: { hour: number; count: number }[];
  daily: { day: string; count: number }[];
  onlineSessions: {
    id: string;
    country: string;
    countryCode: string;
    city: string;
    deviceType: string;
    browser: string;
    os: string;
    lastSeen: string;
  }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function countryFlag(code: string) {
  if (!code || code.length !== 2) return "🌐";
  return String.fromCodePoint(
    ...code.toUpperCase().split("").map((c) => 0x1f1e0 + c.charCodeAt(0) - 65)
  );
}

function referrerIcon(type: string) {
  const icons: Record<string, string> = {
    google: "🔍",
    youtube: "▶️",
    facebook: "📘",
    twitter: "🐦",
    instagram: "📸",
    tiktok: "🎵",
    telegram: "✈️",
    bing: "🔎",
    yahoo: "🟣",
    reddit: "🔴",
    whatsapp: "💬",
    direct: "🔗",
    internal: "🏠",
    other: "🌐",
  };
  return icons[type] || "🌐";
}

function deviceIcon(type: string | null) {
  if (type === "mobile") return "📱";
  if (type === "tablet") return "📟";
  return "🖥️";
}

function formatTime(iso: string) {
  const d = new Date(iso);
  const now = Date.now();
  const diff = Math.floor((now - d.getTime()) / 1000);
  if (diff < 60) return `${diff}ث`;
  if (diff < 3600) return `${Math.floor(diff / 60)}د`;
  return d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
}

function formatPage(page: string) {
  if (page === "/" || page === "") return "الرئيسية";
  if (page.startsWith("/blog/")) return `📰 ${page.replace("/blog/", "")}`;
  if (page === "/blog") return "📰 المقالات";
  return page;
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
function HourlyChart({ data }: { data: { hour: number; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="an-chart">
      {data.map((d) => (
        <div key={d.hour} className="an-bar-wrap" title={`${d.hour}:00 — ${d.count} زيارة`}>
          <div
            className="an-bar"
            style={{ height: `${(d.count / max) * 100}%` }}
          />
          {d.hour % 6 === 0 && (
            <span className="an-bar-label">{d.hour}:00</span>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  accent,
  pulse,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: string;
  pulse?: boolean;
}) {
  return (
    <div className="an-stat-card" style={accent ? { borderTopColor: accent } : {}}>
      <div className="an-stat-val">
        {pulse && <span className="an-pulse" />}
        {typeof value === "number" ? value.toLocaleString("ar-EG") : value}
      </div>
      <div className="an-stat-label">{label}</div>
      {sub && <div className="an-stat-sub">{sub}</div>}
    </div>
  );
}

// ── Bar Row ───────────────────────────────────────────────────────────────────
function BarRow({
  label,
  count,
  total,
  icon,
}: {
  label: string;
  count: number;
  total: number;
  icon?: string;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="an-bar-row">
      <div className="an-bar-row-label">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="an-bar-row-track">
        <div className="an-bar-row-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="an-bar-row-count">{count.toLocaleString("ar-EG")}</div>
      <div className="an-bar-row-pct">{pct}%</div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Analytics() {
  const [key, setKey] = useState("");
  const [authed, setAuthed] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "countries" | "sources" | "pages" | "realtime"
  >("overview");

  const fetchStats = useCallback(
    async (k: string) => {
      setLoading(true);
      try {
        const res = await fetch(`${API}?key=${k}`);
        if (res.status === 401) {
          setError("كلمة المرور خاطئة");
          setAuthed(false);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setStats(data as Stats);
        setLastUpdated(new Date());
        setError("");
      } catch {
        setError("خطأ في الاتصال بالخادم");
      }
      setLoading(false);
    },
    []
  );

  // Auto-refresh every 30s when on realtime tab
  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(() => {
      if (activeTab === "realtime" || activeTab === "overview") {
        fetchStats(ANALYTICS_KEY);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [authed, activeTab, fetchStats]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (key === ANALYTICS_KEY) {
      setAuthed(true);
      fetchStats(key);
    } else {
      setError("كلمة المرور خاطئة");
    }
  };

  // ── Login Screen ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="an-login-wrap">
        <div className="an-login-card">
          <div className="an-login-icon">📊</div>
          <h1 className="an-login-title">لوحة التحليلات</h1>
          <p className="an-login-sub">كورة لايف · بيانات الزوار الحقيقية</p>
          <form onSubmit={handleLogin} className="an-login-form">
            <input
              type="password"
              placeholder="كلمة المرور"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="an-login-input"
              autoFocus
            />
            {error && <div className="an-login-error">{error}</div>}
            <button type="submit" className="an-login-btn">
              دخول
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading && !stats) {
    return (
      <div className="an-loading">
        <div className="an-spinner" />
        <span>جارٍ تحميل البيانات...</span>
      </div>
    );
  }

  if (!stats) return null;

  const totalRefs = stats.referrers.reduce((s, r) => s + r.count, 0);
  const totalCountries = stats.countries.reduce((s, c) => s + c.count, 0);
  const totalDevices = stats.devices.reduce((s, d) => s + d.count, 0);
  const totalBrowsers = stats.browsers.reduce((s, b) => s + b.count, 0);
  const totalPages = stats.topPages.reduce((s, p) => s + p.count, 0);

  return (
    <div className="an-wrap" dir="rtl">
      {/* Header */}
      <div className="an-header">
        <div className="an-header-left">
          <h1 className="an-title">📊 لوحة التحليلات</h1>
          {lastUpdated && (
            <span className="an-updated">
              آخر تحديث: {lastUpdated.toLocaleTimeString("ar-EG")}
            </span>
          )}
        </div>
        <div className="an-header-right">
          <div className="an-online-badge">
            <span className="an-pulse" />
            <span>{stats.online} متصل الآن</span>
          </div>
          <button
            className="an-refresh-btn"
            onClick={() => fetchStats(ANALYTICS_KEY)}
            disabled={loading}
          >
            {loading ? "⏳" : "🔄"} تحديث
          </button>
          <a href="/" className="an-back-btn">
            ← الموقع
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="an-tabs">
        {(
          [
            { key: "overview", label: "📈 نظرة عامة" },
            { key: "realtime", label: "🔴 مباشر" },
            { key: "countries", label: "🌍 الدول" },
            { key: "sources", label: "🔗 المصادر" },
            { key: "pages", label: "📄 الصفحات" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            className={`an-tab ${activeTab === t.key ? "an-tab-active" : ""}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === "overview" && (
        <div className="an-section">
          {/* Stat Cards */}
          <div className="an-stat-grid">
            <StatCard label="متصل الآن" value={stats.online} accent="#22c55e" pulse />
            <StatCard label="زوار اليوم" value={stats.today} accent="#3b82f6" />
            <StatCard label="زوار الأسبوع" value={stats.week} accent="#8b5cf6" />
            <StatCard label="زوار الشهر" value={stats.month} accent="#f59e0b" />
            <StatCard label="إجمالي الزوار" value={stats.total} accent="#ef4444" />
            <StatCard label="مشاهدات اليوم" value={stats.todayPageviews} sub={`الإجمالي: ${stats.totalPageviews.toLocaleString("ar-EG")}`} accent="#06b6d4" />
          </div>

          {/* Hourly Chart */}
          <div className="an-card">
            <div className="an-card-title">مشاهدات الصفحات · اليوم بالساعة</div>
            <HourlyChart data={stats.hourly} />
          </div>

          {/* 2-col: devices + browsers */}
          <div className="an-two-col">
            <div className="an-card">
              <div className="an-card-title">الأجهزة</div>
              {stats.devices.map((d) => (
                <BarRow
                  key={d.deviceType}
                  label={d.deviceType === "desktop" ? "سطح المكتب" : d.deviceType === "mobile" ? "موبايل" : "تابلت"}
                  count={d.count}
                  total={totalDevices}
                  icon={deviceIcon(d.deviceType)}
                />
              ))}
            </div>
            <div className="an-card">
              <div className="an-card-title">المتصفحات</div>
              {stats.browsers.map((b) => (
                <BarRow
                  key={b.browser}
                  label={b.browser || "غير معروف"}
                  count={b.count}
                  total={totalBrowsers}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Realtime ── */}
      {activeTab === "realtime" && (
        <div className="an-section">
          <div className="an-card">
            <div className="an-card-title">
              <span className="an-pulse" style={{ marginLeft: 8 }} />
              الزوار المتصلون حالياً ({stats.online})
            </div>
            {stats.onlineSessions.length === 0 ? (
              <div className="an-empty">لا يوجد زوار متصلون الآن</div>
            ) : (
              <div className="an-realtime-list">
                {stats.onlineSessions.map((s) => (
                  <div key={s.id} className="an-realtime-row">
                    <span className="an-realtime-flag">
                      {countryFlag(s.countryCode)}
                    </span>
                    <div className="an-realtime-info">
                      <div className="an-realtime-loc">
                        {s.country}{s.city ? ` · ${s.city}` : ""}
                      </div>
                      <div className="an-realtime-meta">
                        {deviceIcon(s.deviceType)} {s.browser} · {s.os}
                      </div>
                    </div>
                    <div className="an-realtime-time">
                      {formatTime(s.lastSeen)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Countries ── */}
      {activeTab === "countries" && (
        <div className="an-section">
          <div className="an-card">
            <div className="an-card-title">الزوار حسب الدولة</div>
            {stats.countries.map((c) => (
              <BarRow
                key={c.countryCode}
                label={`${countryFlag(c.countryCode)} ${c.country}`}
                count={c.count}
                total={totalCountries}
              />
            ))}
            {stats.countries.length === 0 && (
              <div className="an-empty">لا توجد بيانات بعد</div>
            )}
          </div>
        </div>
      )}

      {/* ── Sources ── */}
      {activeTab === "sources" && (
        <div className="an-section">
          <div className="an-card">
            <div className="an-card-title">مصادر الزيارات</div>
            {stats.referrers.map((r) => (
              <BarRow
                key={`${r.type}-${r.domain}`}
                label={r.domain || (r.type === "direct" ? "مباشر" : r.type)}
                count={r.count}
                total={totalRefs}
                icon={referrerIcon(r.type)}
              />
            ))}
            {stats.referrers.length === 0 && (
              <div className="an-empty">لا توجد بيانات بعد</div>
            )}
          </div>
        </div>
      )}

      {/* ── Pages ── */}
      {activeTab === "pages" && (
        <div className="an-section">
          <div className="an-card">
            <div className="an-card-title">أكثر الصفحات زيارةً</div>
            {stats.topPages.map((p) => (
              <BarRow
                key={p.page}
                label={formatPage(p.page)}
                count={p.count}
                total={totalPages}
              />
            ))}
            {stats.topPages.length === 0 && (
              <div className="an-empty">لا توجد بيانات بعد</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
