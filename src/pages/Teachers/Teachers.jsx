import { useMemo, useState } from "react";
import { Search, PlusCircle, Pencil, Trash2, Download, FileSpreadsheet, FileText } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Button from "../../components/ui/Button.jsx";
import Table from "../../components/ui/Table.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Input from "../../components/ui/Input.jsx";
import Dropdown from "../../components/ui/Dropdown.jsx";
import Pagination from "../../components/ui/Pagination.jsx";
import usePagination from "../../hooks/usePagination.js";
import { teachers as seed } from "../../data/teachers.js";
import { exportCSV, exportPDF } from "../../utils/exporters.js";

const emptyTeacher = { name: "", subject: "", email: "", phone: "", classes: "", experience: 1 };

export default function Teachers() {
  const [teachers, setTeachers] = useState(seed);
  const [q, setQ] = useState("");
  const [subject, setSubject] = useState("All");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTeacher);
  const [deleting, setDeleting] = useState(null);

  const subjects = ["All", ...new Set(seed.map((t) => t.subject))];

  const filtered = useMemo(
    () =>
      teachers.filter(
        (t) =>
          (!q ||
            t.name.toLowerCase().includes(q.toLowerCase()) ||
            t.subject.toLowerCase().includes(q.toLowerCase()) ||
            t.email.toLowerCase().includes(q.toLowerCase())) &&
          (subject === "All" || t.subject === subject),
      ),
    [teachers, q, subject],
  );

  const { page, setPage, pageCount, paged } = usePagination(filtered, 8);

  const openAdd = () => { setEditing(null); setForm(emptyTeacher); setFormOpen(true); };
  const openEdit = (t) => {
    setEditing(t);
    setForm({ ...t, classes: t.classes.join(", ") });
    setFormOpen(true);
  };

  const save = () => {
    if (!form.name.trim() || !form.subject.trim()) {
      toast.error("Name and subject are required");
      return;
    }
    const parsedClasses = String(form.classes)
      .split(",").map((s) => s.trim()).filter(Boolean);
    const payload = {
      ...form,
      classes: parsedClasses,
      experience: Number(form.experience) || 0,
    };
    if (editing) {
      setTeachers((xs) => xs.map((t) => (t.id === editing.id ? { ...t, ...payload } : t)));
      toast.success("Teacher updated");
    } else {
      setTeachers((xs) => [
        {
          id: `t_${Date.now()}`,
          avatar: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 70)}`,
          rating: 4.5,
          ...payload,
        },
        ...xs,
      ]);
      toast.success("Teacher added");
    }
    setFormOpen(false);
  };

  const remove = () => {
    setTeachers((xs) => xs.filter((t) => t.id !== deleting.id));
    toast.success("Teacher deleted");
    setDeleting(null);
  };

  const exportColumns = [
    { key: "name", label: "Name" },
    { key: "subject", label: "Subject" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "classes", label: "Classes", value: (r) => r.classes.join("; ") },
    { key: "experience", label: "Experience (years)" },
  ];

  return (
    <div>
      <PageHeader
        title="Teachers"
        subtitle={`${teachers.length} active teachers`}
        actions={<>
          <Dropdown align="right" trigger={<Button variant="outline"><Download size={16}/> Export</Button>}>
            <button onClick={() => { exportCSV(`teachers-${Date.now()}.csv`, filtered, exportColumns); toast.success("Exported CSV"); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent">
              <FileSpreadsheet size={16}/> Export as CSV
            </button>
            <button onClick={() => { exportPDF({ title: "Teachers Report", rows: filtered, columns: exportColumns }); toast.success("Opening PDF"); }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm hover:bg-accent">
              <FileText size={16}/> Export as PDF
            </button>
          </Dropdown>
          <Button onClick={openAdd}><PlusCircle size={16}/> Add teacher</Button>
        </>}
      />
      <Card>
        <div className="p-4 border-b border-border grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search teachers, subjects, email…"
              className="h-10 w-full rounded-xl border border-input bg-card pl-10 pr-4 text-sm" />
          </div>
          <select value={subject} onChange={(e) => setSubject(e.target.value)}
            className="h-10 rounded-xl border border-input bg-card px-3 text-sm">
            {subjects.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <Table
          columns={[
            { key: "name", label: "Teacher", render: (r) => (
              <div className="flex items-center gap-3">
                <Avatar src={r.avatar} name={r.name} size={36} />
                <div>
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.email}</div>
                </div>
              </div>
            )},
            { key: "subject", label: "Subject" },
            { key: "phone", label: "Phone" },
            { key: "classes", label: "Classes", sortable: false, render: (r) => (
              <div className="flex flex-wrap gap-1 max-w-[220px]">
                {r.classes.map((c) => <Badge key={c} tone="primary">{c}</Badge>)}
              </div>
            )},
            { key: "experience", label: "Experience", render: (r) => `${r.experience}y` },
            { key: "status", label: "Status", sortable: false, render: () => <Badge tone="success">active</Badge> },
            { key: "actions", label: "", sortable: false, render: (r) => (
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(r)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground"><Pencil size={15}/></button>
                <button onClick={() => setDeleting(r)} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground hover:bg-[var(--danger)]/10 hover:text-[var(--danger)]"><Trash2 size={15}/></button>
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

      <Modal open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit teacher" : "Add teacher"} size="lg"
        footer={<>
          <Button variant="ghost" onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={save}>{editing ? "Save changes" : "Add teacher"}</Button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Dr. Neha Sharma" />
          <Input label="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Mathematics" />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="teacher@school.edu" />
          <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98123 45678" />
          <Input label="Experience (years)" type="number" min={0} value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })} />
          <Input label="Assigned classes" value={form.classes}
            onChange={(e) => setForm({ ...form, classes: e.target.value })}
            placeholder="Grade 9-A, Grade 10-B" hint="Comma-separated" />
        </div>
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete teacher"
        footer={<>
          <Button variant="ghost" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </>}>
        <p className="text-sm text-muted-foreground">
          Delete <span className="font-semibold text-foreground">{deleting?.name}</span>? This action cannot be undone.
        </p>
      </Modal>
    </div>
  );
}