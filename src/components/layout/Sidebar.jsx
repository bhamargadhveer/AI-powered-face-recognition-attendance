import { useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, CalendarCheck2, ScanFace,
  FileText, BarChart3, Settings, LogOut, Sparkles, X, ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/face-attendance", label: "Face Scan", icon: ScanFace, highlight: true },
  { to: "/attendance", label: "Attendance", icon: CalendarCheck2 },
  { to: "/students", label: "Students", icon: Users },
  { to: "/teachers", label: "Faculty", icon: GraduationCap },
  { to: "/classes", label: "Courses", icon: BookOpen },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose, collapsed = false, onToggleCollapse }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [tooltip, setTooltip] = useState(null); // { label, top, left } | null

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Shows the tooltip via a fixed-position portal so it's never clipped by
  // the scrollable <nav> (overflow-y-auto forces overflow-x to be clipped
  // too, which was cutting the old absolutely-positioned tooltip off).
  const showTooltip = (label) => (e) => {
    if (!collapsed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({ label, top: rect.top + rect.height / 2, left: rect.right + 10 });
  };
  const hideTooltip = () => setTooltip(null);

  const width = collapsed ? "w-20" : "w-72";

  return (
    <>
      {/* Raw CSS instead of Tailwind's arbitrary-variant scrollbar utilities,
          so this works regardless of the project's Tailwind/PostCSS setup. */}
      <style>{`
        .sidebar-scroll::-webkit-scrollbar { width: 0; height: 0; display: none; }
        .sidebar-scroll { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}
      <aside
        className={`fixed z-50 top-0 left-0 h-screen ${width} bg-card border-r border-border flex flex-col transition-all duration-300 lg:translate-x-0 lg:sticky ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex items-center h-16 border-b border-border ${collapsed ? "justify-center px-2" : "justify-between px-5"}`}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 min-w-0"
            title="Open landing page in new tab"
          >
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <Sparkles size={18} />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-bold leading-none truncate">SmartClass AI</div>
                <div className="text-[10px] text-muted-foreground mt-1 truncate">Face Attendance FYP</div>
              </div>
            )}
          </a>
          {!collapsed && (
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-1.5 text-muted-foreground hover:bg-accent"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="sidebar-scroll flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              onClick={onClose}
              title={it.label}
              onMouseEnter={showTooltip(it.label)}
              onMouseLeave={hideTooltip}
              className={({ isActive }) =>
                `group relative flex items-center rounded-xl text-sm font-medium transition ${
                  collapsed ? "justify-center h-11 w-11 mx-auto" : "gap-3 px-3 py-2.5"
                } ${
                  isActive
                    ? "bg-primary text-primary-foreground card-shadow"
                    : it.highlight
                    ? "text-primary hover:bg-primary/10"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              <it.icon size={18} className="shrink-0" />
              {!collapsed && <span className="truncate">{it.label}</span>}
              {!collapsed && it.highlight && (
                <span className="ml-auto rounded-full bg-primary/15 text-primary text-[9px] px-1.5 py-0.5 font-semibold uppercase tracking-wider">AI</span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-border p-3 space-y-1">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onMouseEnter={showTooltip(collapsed ? "Expand sidebar" : "Collapse sidebar")}
              onMouseLeave={hideTooltip}
              className={`hidden lg:flex items-center rounded-xl text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition ${
                collapsed ? "justify-center h-11 w-11 mx-auto" : "gap-3 px-3 py-2.5 w-full"
              }`}
            >
              {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
              {!collapsed && <span>Collapse</span>}
            </button>
          )}
          <button
            onClick={handleLogout}
            title="Logout"
            onMouseEnter={showTooltip("Logout")}
            onMouseLeave={hideTooltip}
            className={`flex items-center rounded-xl text-sm font-medium text-muted-foreground hover:bg-[var(--danger)]/10 hover:text-[var(--danger)] transition ${
              collapsed ? "justify-center h-11 w-11 mx-auto" : "gap-3 px-3 py-2.5 w-full"
            }`}
          >
            <LogOut size={18} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Single shared tooltip, rendered outside the sidebar's DOM tree so it
          can never be clipped by the nav's scroll container. */}
      {collapsed && tooltip &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999] -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-2 py-1 text-xs text-background shadow-lg"
            style={{ top: tooltip.top, left: tooltip.left }}
          >
            {tooltip.label}
          </div>,
          document.body
        )}
    </>
  );
}