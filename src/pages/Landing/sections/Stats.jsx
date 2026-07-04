import useCounter from "../../../hooks/useCounter.js";
import { formatNumber } from "../../../utils/format.js";

function Stat({ n, suffix = "", label }) {
  const v = useCounter(n);
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        {formatNumber(v)}{suffix}
      </div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 lg:p-14 grid gap-8 md:grid-cols-4">
          <Stat n={5} suffix="+" label="Departments supported" />
          <Stat n={8} suffix="" label="Semesters covered" />
          <Stat n={1200} suffix="+" label="Enrolled student faces" />
          <Stat n={99} suffix=".4%" label="Recognition accuracy" />
        </div>
      </div>
    </section>
  );
}