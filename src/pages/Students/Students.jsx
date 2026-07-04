import { useMemo, useState } from "react";
import { PlusCircle, Search, Eye, Pencil, Trash2, Download, FileText, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Table from "../../components/ui/Table.jsx";
import Button from "../../components/ui/Button.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Input from "../../components/ui/Input.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import usePagination from "../../hooks/usePagination.js";
import { students as seed } from "../../data/students.js";
import Dropdown from "../../components/ui/Dropdown.jsx";
import { exportCSV, exportPDF } from "../../utils/exporters.js";

export default function Students() {
  const [students, setStudents] = useState(seed);
  const [q, setQ] = useState("");
  const [cls, setCls] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const emptyStu = { name: "", rollNo: "", className: "BSCS-6A", email: "", attendance: 90 };
  const [form, setForm] = useState(emptyStu);

  const filtered = useMemo(() => students.filter((s) =>
    (!q || s.name.toLowerCase().includes(q.toLowerCase()) || s.rollNo.toLowerCase().includes(q.toLowerCase())) &&
    (cls === "All" || s.className === cls)
  ), [students, q, cls]);
  const { page, setPage, pageCount, paged } = usePagination(filtered, 10);

  const classesList = ["All", ...new Set(seed.map((s) => s.className))];

  const openAdd = () => { setEditing(null); setForm(emptyStu); setFormOpen(true); };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ name: s.name, rollNo: s.rollNo, className: s.className, email: s.email, attendance: s.attendance });
    setFormOpen(true);
  };

  const saveStudent = () => {
    if (!form.name.trim() || !form.rollNo.trim()) {
      toast.error("Name and roll number are required");
      return;
    }
    if (editing) {
      setStudents((xs) => xs.map((s) => (s.id === editing.id ? { ...s, ...form, attendance: Number(form.attendance) || 0 } : s)));
      toast.success("Student updated");
    } else {
      setStudents((xs) => [
        {
          id: `s_${Date.now()}`,
          ...form,
          attendance: Number(form.attendance) || 0,
          phone: "",
          avatar: `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 70)}`,
          status: "active",
        },
        ...xs,
      ]);
      toast.success("Student added");
    }
    setFormOpen(false);
    setEditing(null);
    setForm(emptyStu);
  };

  const exportColumns = [
    { key: "name", label: "Name" },
    { key: "rollNo", label: "Roll No" },
    { key: "className", label: "Class" },
    { key: "email", label: "Email" },
    { key: "attendance", label: "Attendance %", value: (r) => `${r.attendance}%` },
    { key: "status", label: "Status" },
  ];
  const doExportCSV = () => {
    exportCSV(`students-${Date.now()}.csv`, filtered, exportColumns);
    toast.success(`Exported ${filtered.length} students to CSV`);
  };
  const doExportPDF = () => {
    exportPDF({ title: "Students Report", rows: filtered, columns: exportColumns });
    toast.success("Opening print-ready PDF");
  };

  return (
    <div>
      <PageHeader
        title="Students"
        subtitle={`${students.length} students across ${classesList.length - 1} classes`}
        actions={<>
          <Dropdown
            align="right"
            trigger={<Button variant="outline"><Download size={16}/> Export</Button>}
          >
            <button onClick={doExportCSV} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent">
              <FileSpreadsheet size={16}/> Export as CSV
            </button>
            <button onClick={doExportPDF} className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent">
              <FileText size={16}/> Export as PDF
            </button>
          </Dropdown>
          <Button onClick={openAdd}><PlusCircle size={16}/> Add student</Button>
        </>}
      />
      <Card>
        <div className="p-4 border-b border-border grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search students…"
              className="h-10 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm" />
          </div>
          <select value={cls} onChange={(e) => setCls(e.target.value)}
            className="h-10 rounded-xl border border-input bg-card px-3 text-sm">
            {classesList.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Table
          columns={[
            { key: "name", label: "Student", render: (r) => (
              <div className="flex items-center gap-3">
                <Avatar src={r.avatar} name={r.name} size={34} />
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.email}</div>
                </div>
              </div>
            )},
            { key: "rollNo", label: "Roll no" },
            { key: "className", label: "Class" },
            { key: "attendance", label: "Attendance", render: (r) => (
              <div className="flex items-center gap-2 min-w-[140px]">
                <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                  <div className={`h-full ${r.attendance >= 85 ? "bg-[var(--success)]" : r.attendance >= 75 ? "bg-[var(--warning)]" : "bg-[var(--danger)]"}`} style={{ width: `${r.attendance}%` }} />
                </div>
                <span className="text-xs font-semibold w-9 text-right">{r.attendance}%</span>
              </div>
            )},
            { key: "status", label: "Status", render: (r) => <Badge tone={r.status === "active" ? "success" : "neutral"}>{r.status}</Badge> },
            { key: "actions", label: "", render: (r) => (
              <div className="flex items-center gap-1">
                <button onClick={() => setViewing(r)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"><Eye size={15} /></button>
                <button onClick={() => openEdit(r)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"><Pencil size={15} /></button>
                <button onClick={() => setDeleting(r)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-[var(--danger)]/10 hover:text-[var(--danger)]"><Trash2 size={15} /></button>
              </div>
            )},
          ]}
          data={paged}
        />
        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-xs text-muted-foreground">Showing {paged.length} of {filtered.length}</span>
          <Pagination page={page} pageCount={pageCount} onChange={setPage} />
        </div>
      </Card>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit student" : "Add student"}
        footer={<>
          <Button variant="ghost" onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={saveStudent}>{editing ? "Save changes" : "Add student"}</Button>
        </>}>
        <div className="space-y-4">
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jane Doe" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Roll number" value={form.rollNo} onChange={(e) => setForm({ ...form, rollNo: e.target.value })} placeholder="SC-20240001" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium">Class</span>
              <select value={form.className} onChange={(e) => setForm({ ...form, className: e.target.value })}
                className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm">
                {classesList.slice(1).map((c) => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jane@school.edu" />
          <Input label="Attendance %" type="number" min={0} max={100} value={form.attendance}
            onChange={(e) => setForm({ ...form, attendance: e.target.value })} />
        </div>
      </Modal>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Student profile" size="md">
        {viewing && (
          <div className="text-center">
            <Avatar src={viewing.avatar} name={viewing.name} size={80} className="mx-auto" />
            <h3 className="mt-3 text-lg font-semibold">{viewing.name}</h3>
            <div className="text-sm text-muted-foreground">{viewing.rollNo} • {viewing.className}</div>
            <div className="mt-6 grid grid-cols-2 gap-3 text-left">
              {[
                ["Email", viewing.email], ["Phone", viewing.phone],
                ["Attendance", `${viewing.attendance}%`], ["Joined", viewing.joined],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-muted p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="text-sm font-medium mt-1">{v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete student"
        footer={<>
          <Button variant="ghost" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button variant="danger" onClick={() => { setStudents((xs) => xs.filter((s) => s.id !== deleting.id)); toast.success("Student deleted"); setDeleting(null); }}>Delete</Button>
        </>}>
        <p className="text-sm text-muted-foreground">
          Delete <span className="font-semibold text-foreground">{deleting?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}