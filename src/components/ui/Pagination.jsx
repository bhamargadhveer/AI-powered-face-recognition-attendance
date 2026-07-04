import { ChevronLeft, ChevronRight } from "lucide-react";
export default function Pagination({ page, pageCount, onChange }) {
  const pages = Array.from({ length: pageCount }).map((_, i) => i + 1);
  const window = pages.slice(Math.max(0, page - 3), Math.min(pageCount, page + 2));
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-accent disabled:opacity-40"
      >
        <ChevronLeft size={16} />
      </button>
      {window.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`h-9 min-w-9 rounded-lg px-2 text-sm ${
            p === page
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground hover:bg-accent disabled:opacity-40"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}