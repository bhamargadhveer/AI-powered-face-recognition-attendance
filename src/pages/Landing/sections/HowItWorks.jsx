import { Building2, BookOpen, Users2, ScanFace, LineChart } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { icon: Building2, title: "Register institution", desc: "Sign up and set up your school profile in minutes." },
  { icon: BookOpen, title: "Add classes", desc: "Create classes, subjects, schedules, and rooms." },
  { icon: Users2, title: "Add students", desc: "Bulk-import rosters or invite parents to enroll." },
  { icon: ScanFace, title: "Start AI attendance", desc: "Point a camera. We handle everything else." },
  { icon: LineChart, title: "Monitor reports", desc: "Live dashboards, alerts, and insights — from day one." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">How it works</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Live in five simple steps</h2>
          <p className="mt-4 text-muted-foreground">Most schools go from signup to first automated attendance in under a week.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="absolute -top-3 left-6 rounded-full bg-primary text-primary-foreground text-xs font-bold h-6 min-w-6 grid place-items-center px-2">
                {i + 1}
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary mb-4">
                <s.icon size={20} />
              </div>
              <div className="font-semibold">{s.title}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}