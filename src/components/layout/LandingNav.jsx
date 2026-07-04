import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext.jsx";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#team", label: "Team" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur bg-background/80 border-b border-border" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <Sparkles size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight">SmartClass AI</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-medium text-foreground hover:bg-accent">
            Login
          </Link>
          <Link
            to="/register"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
          >
            Get started
          </Link>
        </div>
        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg p-2 hover:bg-accent text-foreground"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setOpen(true)} className="rounded-lg p-2 hover:bg-accent">
            <Menu size={20} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-16 z-[60] bg-foreground/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed top-[72px] inset-x-4 z-[70] rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-xl p-3 lg:hidden"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex flex-col gap-1">
                {links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/90 hover:bg-accent hover:text-foreground active:bg-accent/80 transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
              <div className="mt-3 grid gap-2 border-t border-border pt-3">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-border px-4 py-2.5 text-center text-sm font-medium hover:bg-accent transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-xl bg-primary text-primary-foreground px-4 py-2.5 text-center text-sm font-medium hover:opacity-90 transition"
                >
                  Get started
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}