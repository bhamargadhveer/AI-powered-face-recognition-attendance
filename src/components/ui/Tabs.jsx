import { useState } from "react";
export default function Tabs({ tabs, initial = 0, className = "" }) {
  const [active, setActive] = useState(initial);
  return (
    <div className={className}>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActive(i)}
            className={`relative px-4 py-2.5 text-sm font-medium transition ${
              active === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {active === i && (
              <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
            )}
          </button>
        ))}
      </div>
      <div className="pt-5">{tabs[active].content}</div>
    </div>
  );
}