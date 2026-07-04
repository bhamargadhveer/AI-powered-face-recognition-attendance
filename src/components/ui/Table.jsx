import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Inbox } from "lucide-react";

export default function Table({
  columns,
  data,
  empty,
  loading = false,
  stickyHeader = true,
  sortable = true,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your filters or check back later.",
}) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const sorted = useMemo(() => {
    if (!sort.key || !sortable) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col || col.sortable === false) return data;
    const arr = [...data];
    arr.sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "number" && typeof vb === "number") {
        return sort.dir === "asc" ? va - vb : vb - va;
      }
      return sort.dir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return arr;
  }, [data, sort, columns, sortable]);

  const toggleSort = (key) => {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );
  };

  if (loading) {
    return (
      <div className="p-4 space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-muted/60 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!sorted.length) {
    if (empty) return empty;
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center px-6">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted text-muted-foreground mb-4">
          <Inbox size={22} />
        </div>
        <div className="text-sm font-semibold text-foreground">{emptyTitle}</div>
        <div className="mt-1 text-xs text-muted-foreground max-w-sm">
          {emptyDescription}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className={stickyHeader ? "sticky top-0 z-10" : ""}>
          <tr className="border-b border-border bg-muted/70 backdrop-blur text-left">
            {columns.map((c) => {
              const canSort = sortable && c.sortable !== false && !c.render;
              const active = sort.key === c.key;
              return (
                <th
                  key={c.key}
                  className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                    canSort ? "cursor-pointer select-none hover:text-foreground" : ""
                  } ${c.headClassName || ""}`}
                  onClick={canSort ? () => toggleSort(c.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {c.label}
                    {canSort && (
                      active ? (
                        sort.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                      ) : (
                        <ChevronsUpDown size={12} className="opacity-40" />
                      )
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id || i}
              className="border-b border-border last:border-0 hover:bg-muted/40 transition"
            >
              {columns.map((c) => (
                <td key={c.key} className={`px-5 py-3.5 text-foreground ${c.cellClassName || ""}`}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}