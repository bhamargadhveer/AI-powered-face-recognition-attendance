import { motion } from "framer-motion";
import Card from "../ui/Card.jsx";

export default function StatCard({ label, value, icon: Icon, delta, tone = "primary" }) {
  const toneMap = {
    primary: "from-blue-500/20 to-indigo-500/10 text-blue-500",
    success: "from-emerald-500/20 to-teal-500/10 text-emerald-500",
    warning: "from-amber-500/20 to-orange-500/10 text-amber-500",
    danger: "from-rose-500/20 to-red-500/10 text-rose-500",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {label}
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight">{value}</div>
            {delta && (
              <div className={`mt-2 text-xs font-medium ${
                delta.startsWith("-") ? "text-[var(--danger)]" : "text-[var(--success)]"
              }`}>
                {delta} vs last week
              </div>
            )}
          </div>
          {Icon && (
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${toneMap[tone]}`}>
              <Icon size={20} />
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}