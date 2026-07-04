import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ScanFace, TrendingUp, Users, PlayCircle, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            <Sparkles size={12} className="text-primary" />
            Final Year Project • Face Recognition Attendance
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            AI-powered <span className="bg-gradient-to-r from-primary via-blue-500 to-secondary bg-clip-text text-transparent">face recognition</span> attendance for universities.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            SmartClass AI replaces manual roll-calls in Pakistani universities with a computer-vision system that recognises every student the moment they walk into the classroom — accurate, secure, and fully automated.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90 card-shadow-lg transition"
            >
              Start free trial <ArrowRight size={16} />
            </Link>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-accent transition"
            >
              <PlayCircle size={16} /> Watch demo
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div><span className="font-bold text-foreground text-base">99.4%</span><br/>recognition accuracy</div>
            <div className="h-8 w-px bg-border" />
            <div><span className="font-bold text-foreground text-base">&lt;3s</span><br/>per student scan</div>
            <div className="h-8 w-px bg-border" />
            <div><span className="font-bold text-foreground text-base">100%</span><br/>contactless</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-3xl border border-border bg-card p-6 card-shadow-lg">
            <div className="flex items-center gap-1.5 mb-4">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-muted-foreground">dashboard.smartclass.ai</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { l: "Present", v: "412", c: "text-emerald-500" },
                { l: "Absent", v: "24", c: "text-rose-500" },
                { l: "Late", v: "13", c: "text-amber-500" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-muted p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                  <div className={`text-2xl font-bold mt-1 ${s.c}`}>{s.v}</div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted p-4 h-48 flex items-end gap-1.5">
              {[45,68,52,80,64,90,72,55,88,74,92,60].map((h, i) => (
                <div key={i} style={{ height: `${h}%` }} className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-secondary opacity-80" />
              ))}
            </div>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -left-6 rounded-2xl bg-card border border-border card-shadow-lg p-4 w-56 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-500">
                <ScanFace size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Face detected</div>
                <div className="text-sm font-semibold">Ayesha Siddiqui</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
            className="absolute -bottom-6 -right-6 rounded-2xl bg-card border border-border card-shadow-lg p-4 w-52 hidden md:block"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                <TrendingUp size={20} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Attendance</div>
                <div className="text-sm font-semibold">+12% this week</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, delay: 1 }}
            className="absolute top-1/2 -right-10 rounded-2xl bg-card border border-border card-shadow-lg p-3 hidden lg:flex items-center gap-2"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-500/10 text-blue-500">
              <Users size={16} />
            </div>
            <div className="text-xs">
              <div className="font-semibold">Live sync</div>
              <div className="text-muted-foreground">3 classes</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}