// Small helpers to export tabular data as CSV or a print-ready PDF.

const escapeCell = (v) => {
  if (v == null) return "";
  const s = String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCSV(rows, columns) {
  const head = columns.map((c) => escapeCell(c.label)).join(",");
  const body = rows
    .map((r) => columns.map((c) => escapeCell(typeof c.value === "function" ? c.value(r) : r[c.key])).join(","))
    .join("\n");
  return `${head}\n${body}`;
}

export function downloadFile(filename, content, mime = "text/csv;charset=utf-8") {
  const blob = content instanceof Blob ? content : new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function exportCSV(filename, rows, columns) {
  downloadFile(filename, toCSV(rows, columns));
}

export function exportPDF({ title = "Report", rows, columns }) {
  const w = window.open("", "_blank", "width=900,height=700");
  if (!w) return;
  const styles = `
    <style>
      *{box-sizing:border-box;font-family:Inter,system-ui,sans-serif;color:#0F172A}
      body{margin:32px}
      h1{font-size:20px;margin:0 0 4px}
      p.meta{color:#64748B;font-size:12px;margin:0 0 20px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th{background:#F1F5F9;text-align:left;padding:10px;border-bottom:1px solid #E2E8F0;text-transform:uppercase;font-size:10px;letter-spacing:.05em;color:#64748B}
      td{padding:10px;border-bottom:1px solid #E2E8F0}
      tr:nth-child(even) td{background:#FAFBFC}
    </style>`;
  const head = `<tr>${columns.map((c) => `<th>${c.label}</th>`).join("")}</tr>`;
  const body = rows
    .map(
      (r) =>
        `<tr>${columns
          .map((c) => `<td>${escapeCell(typeof c.value === "function" ? c.value(r) : r[c.key])}</td>`)
          .join("")}</tr>`,
    )
    .join("");
  w.document.write(`<!doctype html><html><head><title>${title}</title>${styles}</head>
    <body>
      <h1>${title}</h1>
      <p class="meta">Generated ${new Date().toLocaleString()} · ${rows.length} records</p>
      <table><thead>${head}</thead><tbody>${body}</tbody></table>
      <script>window.onload=()=>setTimeout(()=>window.print(),200)</script>
    </body></html>`);
  w.document.close();
}