import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { plans } from "../../../data/pricing.js";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Pricing</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Fair pricing that scales with you</h2>
          <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border p-8 flex flex-col ${
                p.popular
                  ? "border-primary bg-card card-shadow-lg scale-[1.02]"
                  : "border-border bg-card"
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {p.tag}
                </span>
              )}
              <div className="text-sm font-semibold text-muted-foreground">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                {typeof p.price === "number" ? (
                  <>
                    <span className="text-4xl font-bold">${p.price}</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">{p.price}</span>
                )}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{p.tag}</div>
              <ul className="my-8 space-y-3 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className="mt-0.5 text-[var(--success)] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className={`rounded-xl px-5 py-3 text-center text-sm font-semibold transition ${
                  p.popular
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border hover:bg-accent"
                }`}
              >
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}