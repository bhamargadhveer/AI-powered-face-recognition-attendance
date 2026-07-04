import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../../data/faqs.js";

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-20 lg:py-28 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <div className="text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}