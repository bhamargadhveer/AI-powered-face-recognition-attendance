import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Sparkles, ScanFace, ShieldCheck, TrendingUp } from "lucide-react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const [email, setEmail] = useState("admin@smartclass.ai");
  const [password, setPassword] = useState("demo1234");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) return setErr("Please fill in all fields.");
    setLoading(true);
    await login(email);
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background text-foreground">
      <div className="hidden lg:flex relative overflow-hidden p-12 flex-col bg-gradient-to-br from-muted via-background to-accent text-foreground border-r border-border">
        <Link to="/" className="flex items-center gap-2.5 relative">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
            <Sparkles size={18} />
          </div>
          <span className="text-lg font-bold">SmartClass AI</span>
        </Link>
        <div className="my-auto relative">
          <h2 className="text-4xl font-bold leading-tight text-foreground">
            Welcome back to the future of <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">attendance</span>.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">Sign in to manage your institution, monitor classrooms, and act on AI-driven insights.</p>
          <div className="mt-10 space-y-4">
            {[
              { icon: ScanFace, t: "99.4% recognition accuracy", d: "AI trained on your students" },
              { icon: ShieldCheck, t: "Enterprise-grade security", d: "GDPR & FERPA compliant" },
              { icon: TrendingUp, t: "Real-time analytics", d: "Trends & alerts as they happen" },
            ].map((f) => (
              <div key={f.t} className="flex gap-3 items-start rounded-2xl border border-border bg-card/60 backdrop-blur p-4 card-shadow">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 text-primary shrink-0">
                  <f.icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{f.t}</div>
                  <div className="text-sm text-muted-foreground">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-20 -left-16 h-60 w-60 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <form onSubmit={submit} className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <Sparkles size={18} />
            </div>
            <span className="text-lg font-bold">SmartClass AI</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Welcome back — enter your details.</p>

          <div className="mt-8 space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@school.edu"
              icon={<Mail size={16} />}
            />
            <div>
              <Input
                label="Password"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                icon={<Lock size={16} />}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff size={14} /> : <Eye size={14} />} {show ? "Hide" : "Show"} password
              </button>
            </div>
            {err && <div className="text-sm text-[var(--danger)]">{err}</div>}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-input accent-[var(--color-primary)]" defaultChecked />
                Remember me
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>
            <Button size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" /> OR CONTINUE WITH <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="h-11 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent">Google</button>
              <button type="button" className="h-11 rounded-xl border border-border bg-card text-sm font-medium hover:bg-accent">Microsoft</button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">Create one</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}