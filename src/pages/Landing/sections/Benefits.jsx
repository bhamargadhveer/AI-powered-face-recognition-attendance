import { Clock, ShieldCheck, TrendingUp, Eye, FileCheck } from "lucide-react";

const items = [
  { icon: Clock, title: "Save 40+ hours monthly", desc: "Automate the entire attendance workflow." },
  { icon: ShieldCheck, title: "Better accuracy", desc: "AI models trained on your data, 99.4%+ accurate." },
  { icon: FileCheck, title: "Reduce fraud", desc: "No more proxy attendance. Face-verified, always." },
  { icon: Eye, title: "Better monitoring", desc: "Live classroom insights and safety alerts." },
  { icon: TrendingUp, title: "Actionable reporting", desc: "Reports that answer questions, not raise them." },
];

export default function Benefits() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Benefits</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Real outcomes, not just features</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl border border-border bg-card p-6 hover:card-shadow-lg transition">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--success)]/10 text-[var(--success)] mb-4">
                <it.icon size={20} />
              </div>
              <div className="font-semibold">{it.title}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{it.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}