import { useEffect, useMemo, useRef, useState } from "react";
import { Bell, Search, Menu, Sun, Moon, ChevronDown, User, Settings, LogOut, GraduationCap, Users as UsersIcon, BookOpen, ClipboardCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNotifications } from "../../context/NotificationContext.jsx";
import Avatar from "../ui/Avatar.jsx";
import Dropdown from "../ui/Dropdown.jsx";
import { students } from "../../data/students.js";
import { teachers } from "../../data/teachers.js";
import { classes } from "../../data/classes.js";

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { items, unread, markAllRead } = useNotifications();
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => searchRef.current && !searchRef.current.contains(e.target) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const s = students
      .filter((x) => x.name.toLowerCase().includes(term) || x.rollNo.toLowerCase().includes(term) || x.email.toLowerCase().includes(term))
      .slice(0, 4)
      .map((x) => ({ type: "Student", icon: GraduationCap, label: x.name, sub: `${x.rollNo} • ${x.className}`, to: "/students" }));
    const t = teachers
      .filter((x) => x.name.toLowerCase().includes(term) || x.subject.toLowerCase().includes(term))
      .slice(0, 3)
      .map((x) => ({ type: "Teacher", icon: UsersIcon, label: x.name, sub: x.subject, to: "/teachers" }));
    const c = classes
      .filter((x) => x.name.toLowerCase().includes(term) || x.subject.toLowerCase().includes(term) || x.teacher.toLowerCase().includes(term))
      .slice(0, 3)
      .map((x) => ({ type: "Class", icon: BookOpen, label: x.name, sub: `${x.subject} • ${x.teacher}`, to: "/classes" }));
    const extras = [];
    if ("attendance".includes(term)) extras.push({ type: "Page", icon: ClipboardCheck, label: "Attendance", sub: "Daily attendance logs", to: "/attendance" });
    return [...s, ...t, ...c, ...extras];
  }, [q]);

  const goTo = (to) => {
    setOpen(false);
    setQ("");
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-2 text-muted-foreground hover:bg-accent"
        >
          <Menu size={20} />
        </button>
        <div ref={searchRef} className="relative flex-1 max-w-xl">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setOpen(true); }}
            onFocus={() => q && setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && results[0]) goTo(results[0].to);
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search students, teachers, classes…"
            className="h-10 w-full rounded-xl bg-muted pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring transition"
          />
          {open && q && (
            <div className="absolute left-0 right-0 top-12 z-40 max-h-96 overflow-auto rounded-xl border border-border bg-popover card-shadow-lg">
              {results.length === 0 ? (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">No results for "{q}"</div>
              ) : (
                results.map((r, i) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={`${r.type}-${i}`}
                      onClick={() => goTo(r.to)}
                      className="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left last:border-0 hover:bg-accent"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium truncate">{r.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{r.sub}</div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground shrink-0">{r.type}</span>
                    </button>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={toggleTheme}
          className="grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Dropdown
          trigger={
            <button className="relative grid h-10 w-10 place-items-center rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground">
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[var(--danger)]" />
              )}
            </button>
          }
        >
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="text-sm font-semibold">Notifications</div>
            <button onClick={markAllRead} className="text-xs text-primary hover:underline">
              Mark all read
            </button>
          </div>
          <div className="max-h-80 overflow-auto scrollbar-hide">
            {items.slice(0, 5).map((n) => (
              <div key={n.id} className="flex gap-3 border-b border-border p-3 last:border-0 hover:bg-accent">
                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                  n.type === "warning" ? "bg-[var(--warning)]" :
                  n.type === "success" ? "bg-[var(--success)]" : "bg-primary"
                }`} />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{n.title}</div>
                  <div className="text-xs text-muted-foreground line-clamp-2">{n.body}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/notifications" className="block p-3 text-center text-xs font-medium text-primary hover:bg-accent">
            View all
          </Link>
        </Dropdown>
        <Dropdown
          trigger={
            <button className="ml-1 flex items-center gap-2 rounded-xl p-1.5 hover:bg-accent">
              <Avatar src={user?.avatar} name={user?.name} size={32} />
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold leading-none">{user?.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{user?.role}</div>
              </div>
              <ChevronDown size={14} className="text-muted-foreground hidden md:block" />
            </button>
          }
        >
          <div className="p-3 border-b border-border">
            <div className="text-sm font-semibold">{user?.name}</div>
            <div className="text-xs text-muted-foreground">{user?.email}</div>
          </div>
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent">
            <User size={16} /> Profile
          </Link>
          <Link to="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent">
            <Settings size={16} /> Settings
          </Link>
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="flex w-full items-center gap-3 border-t border-border px-3 py-2.5 text-sm text-[var(--danger)] hover:bg-[var(--danger)]/10"
          >
            <LogOut size={16} /> Logout
          </button>
        </Dropdown>
      </div>
    </header>
  );
}