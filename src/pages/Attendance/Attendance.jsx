import { useMemo, useState } from "react";
import { Download, Filter, Search, FileDown, PlusCircle, Trash2, CheckCircle2, XCircle, Clock } from "lucide-react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Table from "../../components/ui/Table.jsx";
import Button from "../../components/ui/Button.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import Modal from "../../components/ui/Modal.jsx";
import usePagination from "../../hooks/usePagination.js";
import { attendanceLogs as seedLogs } from "../../data/attendance.js";
import { students } from "../../data/students.js";

const statusTone = { Present: "success", Absent: "danger", Late: "warning", Leave: "neutral" };
const STATUSES = ["Present", "Absent", "Late", "Leave"];
const SUBJECTS = ["Math", "Physics", "English", "Biology", "CS", "History"];

function toCSV(rows) {
  const headers = ["Roll No", "Student", "Class", "Subject", "Status", "Check-in", "Check-out", "Date"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = [headers.join(",")];
  rows.forEach((r) => {
    lines.push([r.rollNo, r.student, r.className, r.subject, r.status, r.checkIn, r.checkOut, r.date].map(esc).join(","));
  });
  return lines.join("\n");
}

function download(filename, content, type = "text/csv") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function exportPDF(rows) {
  const today = new Date().toLocaleDateString();
  const summary = STATUSES.map((s) => `${s}: ${rows.filter((r) => r.status === s).length}`).join(" &bull; ");
  const rowsHtml = rows
    .map((r) => `<tr><td>${r.rollNo}</td><td>${r.student}</td><td>${r.className}</td><td>${r.subject}</td><td>${r.status}</td><td>${r.checkIn}</td><td>${r.checkOut}</td></tr>`)
    .join("");
  const html = `<!doctype html><html><head><title>Attendance Report</title>
    <style>
      body{font-family:Inter,system-ui,sans-serif;padding:32px;color:#0f172a}
      h1{margin:0 0 4px;font-size:22px}
      .sub{color:#64748b;font-size:12px;margin-bottom:16px}
      table{width:100%;border-collapse:collapse;font-size:12px}
      th,td{border-bottom:1px solid #e2e8f0;padding:8px 10px;text-align:left}
      th{background:#f1f5f9;text-transform:uppercase;font-size:10px;color:#64748b}
      .summary{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px;margin-bottom:16px;font-size:12px}
    </style></head><body>
    <h1>SmartClass AI &mdash; Attendance Report</h1>
    <div class="sub">Generated ${today} &bull; ${rows.length} records</div>
    <div class="summary"><strong>Summary:</strong> ${summary}</div>
    <table><thead><tr><th>Roll</th><th>Student</th><th>Class</th><th>Subject</th><th>Status</th><th>In</th><th>Out</th></tr></thead>
    <tbody>${rowsHtml}</tbody></table>
    <script>window.onload=function(){setTimeout(function(){window.print();},250);}</script>
    </body></html>`;
  const w = window.open("", "_blank");
  if (w) { w.document.write(html); w.document.close(); }
}

export default function Attendance() {
  const [logs, setLogs] = useState(seedLogs);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [selected, setSelected] = useState(new Set());
  const [markOpen, setMarkOpen] = useState(false);
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    return logs.filter((l) => {
      const matchQ = !q || l.student.toLowerCase().includes(q.toLowerCase()) || l.rollNo.toLowerCase().includes(q.toLowerCase());
      const matchS = status === "All" || l.status === status;
      return matchQ && matchS;
    });
  }, [logs, q, status]);

  const { page, setPage, pageCount, paged } = usePagination(filtered, 8);

  const stat = (s) => Math.round((logs.filter((l) => l.status === s).length / Math.max(1, logs.length)) * 100);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2200); };

  const allPagedSelected = paged.length > 0 && paged.every((r) => selected.has(r.id));
  const togglePagedAll = () => {
    const next = new Set(selected);
    if (allPagedSelected) paged.forEach((r) => next.delete(r.id));
    else paged.forEach((r) => next.add(r.id));
    setSelected(next);
  };
  const toggleRow = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };
  const clearSelection = () => setSelected(new Set());

  const bulkSetStatus = (s) => {
    const n = selected.size;
    setLogs((xs) => xs.map((r) => (selected.has(r.id) ? { ...r, status: s } : r)));
    clearSelection();
    showToast(`Marked ${n} record(s) as ${s}`);
  };
  const bulkDelete = () => {
    const n = selected.size;
    setLogs((xs) => xs.filter((r) => !selected.has(r.id)));
    clearSelection();
    showToast(`Deleted ${n} record(s)`);
  };

  const handleExportCSV = () => {
    download(`attendance-${new Date().toISOString().slice(0, 10)}.csv`, toCSV(filtered));
    showToast(`Exported ${filtered.length} record(s) to CSV`);
  };

  return (
    <div>
      <PageHeader
        title="Attendance"
        subtitle="Live attendance across all classes."
        actions={<>
          <Button variant="outline" onClick={() => exportPDF(filtered)}><FileDown size={16}/> Export PDF</Button>
          <Button variant="outline" onClick={handleExportCSV}><Download size={16}/> Export CSV</Button>
          <Button onClick={() => setMarkOpen(true)}><PlusCircle size={16}/> Mark manually</Button>
        </>}
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Present" value={`${stat("Present")}%`} tone="success" />
        <StatCard label="Absent" value={`${stat("Absent")}%`} tone="danger" />
        <StatCard label="Late" value={`${stat("Late")}%`} tone="warning" />
        <StatCard label="Leave" value={`${stat("Leave")}%`} tone="primary" />
      </div>

      <Card className="mt-6">
        <div className="p-4 border-b border-border grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search by student, roll no…"
              className="h-10 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm"
            />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-xl border border-input bg-card px-3 text-sm">
            <option>All</option><option>Present</option><option>Absent</option><option>Late</option><option>Leave</option>
          </select>
          <Button variant="outline"><Filter size={16}/> Date</Button>
        </div>

        {selected.size > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-b border-border bg-primary/5">
            <span className="text-sm font-medium">{selected.size} selected</span>
            <div className="flex-1" />
            <Button size="sm" variant="outline" onClick={() => bulkSetStatus("Present")}><CheckCircle2 size={14}/> Present</Button>
            <Button size="sm" variant="outline" onClick={() => bulkSetStatus("Absent")}><XCircle size={14}/> Absent</Button>
            <Button size="sm" variant="outline" onClick={() => bulkSetStatus("Late")}><Clock size={14}/> Late</Button>
            <Button size="sm" variant="danger" onClick={bulkDelete}><Trash2 size={14}/> Delete</Button>
            <Button size="sm" variant="ghost" onClick={clearSelection}>Clear</Button>
          </div>
        )}

        <Table
          columns={[
            {
              key: "_select",
              label: (
                <input
                  type="checkbox"
                  checked={allPagedSelected}
                  onChange={togglePagedAll}
                  className="h-4 w-4 rounded border-input accent-[var(--color-primary)]"
                />
              ),
              sortable: false,
              render: (r) => (
                <input
                  type="checkbox"
                  checked={selected.has(r.id)}
                  onChange={() => toggleRow(r.id)}
                  className="h-4 w-4 rounded border-input accent-[var(--color-primary)]"
                />
              ),
            },
            { key: "student", label: "Student", render: (r) => (
              <div className="flex items-center gap-3">
                <Avatar src={r.avatar} name={r.student} size={34} />
                <div>
                  <div className="font-medium">{r.student}</div>
                  <div className="text-xs text-muted-foreground">{r.rollNo}</div>
                </div>
              </div>
            )},
            { key: "className", label: "Class" },
            { key: "subject", label: "Subject" },
            { key: "status", label: "Status", render: (r) => <Badge tone={statusTone[r.status]}>{r.status}</Badge> },
            { key: "checkIn", label: "Check-in" },
            { key: "checkOut", label: "Check-out" },
          ]}
          data={paged}
          emptyTitle="No attendance records"
          emptyDescription="Try clearing the search or status filter."
        />
        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Showing {paged.length} of {filtered.length}</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </Card>

      <ManualMarkModal
        open={markOpen}
        onClose={() => setMarkOpen(false)}
        onSave={(entry) => {
          setLogs((xs) => [entry, ...xs]);
          setMarkOpen(false);
          showToast(`Marked ${entry.student} as ${entry.status}`);
        }}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl border border-border bg-card px-4 py-3 text-sm card-shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function ManualMarkModal({ open, onClose, onSave }) {
  const [studentId, setStudentId] = useState(students[0]?.id || "");
  const [status, setStatus] = useState("Present");
  const [subject, setSubject] = useState("Math");
  const [checkIn, setCheckIn] = useState("09:00");
  const [checkOut, setCheckOut] = useState("15:00");

  const submit = (e) => {
    e?.preventDefault?.();
    const s = students.find((x) => x.id === studentId);
    if (!s) return;
    onSave({
      id: `manual_${Date.now()}`,
      studentId: s.id, student: s.name, rollNo: s.rollNo, className: s.className,
      avatar: s.avatar, subject, status, checkIn, checkOut,
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <Modal
      open={open} onClose={onClose}
      title="Mark attendance manually" size="md"
      footer={<>
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={submit}>Save entry</Button>
      </>}
    >
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Student</label>
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)}
            className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm">
            {students.map((s) => (
              <option key={s.id} value={s.id}>{s.name} — {s.rollNo}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm">
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm">
              {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Check-in</label>
            <input type="time" value={checkIn} onChange={(e) => setCheckIn(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Check-out</label>
            <input type="time" value={checkOut} onChange={(e) => setCheckOut(e.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-card px-3 text-sm" />
          </div>
        </div>
      </form>
    </Modal>
  );
}