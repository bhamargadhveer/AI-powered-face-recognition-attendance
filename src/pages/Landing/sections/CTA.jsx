import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary text-white p-10 lg:p-16 text-center card-shadow-lg">
          <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to modernize your school?</h2>
            <p className="mt-4 text-white/80 max-w-xl mx-auto">
              Join 2,400+ institutions already running attendance on autopilot.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-primary px-6 py-3.5 text-sm font-semibold hover:opacity-90"
              >
                Start free trial <ArrowRight size={16} />
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold hover:bg-white/10"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}