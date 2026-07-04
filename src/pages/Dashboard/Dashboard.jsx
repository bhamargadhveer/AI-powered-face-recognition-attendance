import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, GraduationCap, BookOpen, CheckCircle2, XCircle, TrendingUp, Bell, Clock, RefreshCw, Sparkles, FileBarChart, ClipboardCheck, ScanFace } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Button from "../../components/ui/Button.jsx";
import { attendanceLogs, attendanceWeekly, attendanceMonthly, statusPie } from "../../data/attendance.js";
import { classes } from "../../data/classes.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState(new Date());
  const [toast, setToast] = useState("");
  const [insight, setInsight] = useState(null);

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(""), 2200); };

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefreshedAt(new Date());
      showToast("Stats refreshed");
    }, 700);
  };

  const generateInsight = () => {
    const options = [
      "Attendance in Grade 9-B dropped 6% this week — consider reaching out to affected students.",
      "Fridays show the highest late-arrival rate. A schedule reminder could help.",
      "Overall attendance improved 2.4% vs last month — keep the momentum going!",
      "3 teachers have unsubmitted attendance sheets from yesterday.",
    ];
    setInsight(options[Math.floor(Math.random() * options.length)]);
  };

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "Admin"}`}
        subtitle="Here's what's happening at your institution today."
        actions={<>
          <Button variant="outline" onClick={refresh} disabled={refreshing}>
            <RefreshCw size={16} className={refreshing ? "animate-spin" : ""} /> Refresh
          </Button>
          <Button variant="outline" onClick={() => navigate("/reports")}>
            <FileBarChart size={16}/> View reports
          </Button>
          <Button onClick={generateInsight}>
            <Sparkles size={16}/> Generate insight
          </Button>
        </>}
      />

      {insight && (
        <div className="mb-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5 p-4 flex gap-3 items-start">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shrink-0">
            <Sparkles size={16}/>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-primary uppercase tracking-wider">AI insight</div>
            <div className="text-sm mt-0.5 text-foreground">{insight}</div>
          </div>
          <button onClick={() => setInsight(null)} className="text-xs text-muted-foreground hover:text-foreground">Dismiss</button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total students" value="1,248" icon={Users} tone="primary" delta="+3.2%" />
        <StatCard label="Total teachers" value="86" icon={GraduationCap} tone="success" delta="+1.1%" />
        <StatCard label="Total classes" value="42" icon={BookOpen} tone="warning" delta="+0.5%" />
        <StatCard label="Attendance today" value="94.2%" icon={TrendingUp} tone="success" delta="+2.4%" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard label="Present today" value="1,176" icon={CheckCircle2} tone="success" />
        <StatCard label="Absent today" value="48" icon={XCircle} tone="danger" />
        <StatCard label="Late arrivals" value="24" icon={Clock} tone="warning" />
      </div>

      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Quick actions</h3>
            <p className="text-xs text-muted-foreground">Last updated {refreshedAt.toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ScanFace, label: "Face Scan Attendance", desc: "Mark class via AI camera", to: "/face-attendance", highlight: true },
            { icon: ClipboardCheck, label: "Manual attendance", desc: "Mark today's classes", to: "/attendance" },
            { icon: FileBarChart, label: "Weekly report", desc: "Download PDF summary", to: "/reports" },
            { icon: TrendingUp, label: "View analytics", desc: "Trends & insights", to: "/analytics" },
          ].map((a) => (
            <button
              key={a.label}
              onClick={() => navigate(a.to)}
              className={`group text-left rounded-2xl border p-4 transition ${a.highlight ? "border-primary/40 bg-primary/5 hover:bg-primary/10" : "border-border hover:border-primary/40 hover:bg-primary/5"}`}
            >
              <div className={`grid h-10 w-10 place-items-center rounded-xl group-hover:scale-105 transition ${a.highlight ? "bg-gradient-to-br from-primary to-secondary text-white" : "bg-primary/10 text-primary"}`}>
                <a.icon size={18} />
              </div>
              <div className="mt-3 font-medium text-sm flex items-center gap-1.5">
                {a.label}
                {a.highlight && <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 rounded px-1.5 py-0.5">AI</span>}
              </div>
              <div className="text-xs text-muted-foreground">{a.desc}</div>
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Weekly attendance</h3>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <Badge tone="primary">This week</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={attendanceWeekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="present" stroke="#10B981" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="absent" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="late" stroke="#F59E0B" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-1">Status breakdown</h3>
          <p className="text-xs text-muted-foreground mb-4">Today</p>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={statusPie} innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {statusPie.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {statusPie.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </div>
                <span className="font-semibold">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Monthly trend</h3>
            <Badge tone="success">+4.1% YoY</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={attendanceMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="rate" fill="var(--primary)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Bell size={16} /> Recent alerts</h3>
          <div className="space-y-3">
            {[
              { t: "Low attendance in 9-B", d: "5 students below 75%", tone: "warning" },
              { t: "System update tonight", d: "v3.2 at 11:00 PM", tone: "info" },
              { t: "Payment received", d: "INV-2201 paid", tone: "success" },
              { t: "Face model retrained", d: "120 samples added", tone: "info" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-border p-3 hover:bg-muted/50">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  a.tone === "warning" ? "bg-[var(--warning)]" :
                  a.tone === "success" ? "bg-[var(--success)]" : "bg-primary"
                }`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent attendance logs</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="space-y-2">
            {attendanceLogs.slice(0, 6).map((l) => (
              <div key={l.id} className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted/50">
                <Avatar src={l.avatar} name={l.student} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{l.student}</div>
                  <div className="text-xs text-muted-foreground">{l.className} • {l.checkIn}</div>
                </div>
                <Badge tone={l.status === "Present" ? "success" : l.status === "Absent" ? "danger" : l.status === "Late" ? "warning" : "neutral"}>
                  {l.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Top classes</h3>
            <button className="text-xs text-primary hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {classes.slice(0, 5).map((c) => (
              <div key={c.id} className="flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${c.color} text-white font-bold text-xs`}>
                  {c.name.split("-")[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{c.name} • {c.subject}</div>
                  <div className="text-xs text-muted-foreground">{c.teacher} · {c.students} students</div>
                </div>
                <div className="text-sm font-semibold">{88 + (c.students % 8)}%</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-border bg-card px-4 py-3 text-sm card-shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}