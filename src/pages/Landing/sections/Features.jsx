import { ScanFace, Video, LineChart, GraduationCap, Users, FileBarChart, Brain, BellRing } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: ScanFace, title: "Face recognition attendance", desc: "99.4% accurate recognition, on-prem or cloud, retrained on your data." },
  { icon: Video, title: "Live classroom monitoring", desc: "Real-time occupancy, engagement signals, and safety alerts." },
  { icon: LineChart, title: "Attendance analytics", desc: "Trends, patterns, cohort comparisons — all in one place." },
  { icon: Users, title: "Student management", desc: "Rosters, profiles, guardians, medical notes — one source of truth." },
  { icon: GraduationCap, title: "Teacher management", desc: "Assign classes, track workloads, manage substitutes." },
  { icon: FileBarChart, title: "Smart reports", desc: "Automated weekly, monthly, and term reports for admins & parents." },
  { icon: Brain, title: "AI insights", desc: "Early warnings for chronic absenteeism and dropout risk." },
  { icon: BellRing, title: "Real-time alerts", desc: "SMS, email, and push notifications the moment they matter." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Features</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything a modern institution needs</h2>
          <p className="mt-4 text-muted-foreground">One platform for attendance, monitoring, analytics, and communication.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.06 }}
              className="group rounded-2xl border border-border bg-card p-6 hover:card-shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 text-primary mb-4 group-hover:scale-110 transition">
                <it.icon size={20} />
              </div>
              <div className="font-semibold">{it.title}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}