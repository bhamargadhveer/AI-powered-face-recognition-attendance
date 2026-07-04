import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "../../../data/testimonials.js";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section className="py-20 lg:py-28 bg-muted/30 border-y border-border">
      <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Testimonials</div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Loved by schools worldwide</h2>
        <div className="relative rounded-3xl border border-border bg-card p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center gap-0.5 mb-5">
                {Array.from({ length: t.rating }).map((_, k) => (
                  <Star key={k} size={16} fill="currentColor" className="text-amber-400" />
                ))}
              </div>
              <blockquote className="text-lg md:text-xl leading-relaxed">"{t.quote}"</blockquote>
              <div className="mt-6 flex items-center justify-center gap-3">
                <img src={t.avatar} alt="" className="h-11 w-11 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setI((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {testimonials.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-1.5 bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setI((p) => (p + 1) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-accent"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}