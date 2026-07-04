import { useState } from "react";
import { Calendar, Clock, MapPin, Users, PlusCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Button from "../../components/ui/Button.jsx";
import Table from "../../components/ui/Table.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Modal from "../../components/ui/Modal.jsx";
import Input from "../../components/ui/Input.jsx";
import { classes as seed } from "../../data/classes.js";

const gradients = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-fuchsia-500 to-purple-500",
  "from-sky-500 to-cyan-500",
];

const emptyClass = { name: "", section: "A", teacher: "", subject: "", students: 40, room: "", schedule: "" };

export default function Classes() {
  const [classes, setClasses] = useState(seed);
  const [addOpen, setAddOpen] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState(emptyClass);

  const save = () => {
    if (!form.name.trim() || !form.teacher.trim() || !form.subject.trim()) {
      toast.error("Class name, teacher and subject are required");
      return;
    }
    setClasses((xs) => [
      {
        id: `c_${Date.now()}`,
        ...form,
        name: `${form.name}${form.section ? `-${form.section}` : ""}`,
        students: Number(form.students) || 0,
        color: gradients[xs.length % gradients.length],
      },
      ...xs,
    ]);
    toast.success("Class created");
    setAddOpen(false);
    setForm(emptyClass);
  };

  const remove = () => {
    setClasses((xs) => xs.filter((c) => c.id !== deleting.id));
    toast.success("Class deleted");
    setDeleting(null);
  };

  return (
    <div>
      <PageHeader
        title="Courses"
        subtitle="Manage semester courses, schedules, and faculty assignments."
        actions={<Button onClick={() => { setForm(emptyClass); setAddOpen(true); }}><PlusCircle size={16}/> New class</Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 mb-8">
        {classes.map((c) => (
          <Card key={c.id} className="overflow-hidden hover:card-shadow-lg transition-all">
            <div className={`h-24 bg-gradient-to-br ${c.color} p-5 text-white flex items-end justify-between`}>
              <div>
                <div className="text-xs opacity-80">{c.subject}</div>
                <div className="text-2xl font-bold">{c.name}</div>
              </div>
              <button
                onClick={() => setDeleting(c)}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 hover:bg-white/25 text-white"
                aria-label="Delete class"
              >
                <Trash2 size={15}/>
              </button>
            </div>
            <div className="p-5 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Users size={14}/> {c.students} students</div>
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin size={14}/> {c.room}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Clock size={14}/> {c.schedule}</div>
              <div className="pt-3 mt-3 border-t border-border">
                <div className="text-xs text-muted-foreground">Teacher</div>
                <div className="text-sm font-medium">{c.teacher}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-primary"/>
          <h3 className="font-semibold">Weekly schedule</h3>
        </div>
        <Table
          columns={[
            { key: "name", label: "Class" },
            { key: "subject", label: "Subject" },
            { key: "teacher", label: "Teacher" },
            { key: "schedule", label: "Schedule" },
            { key: "students", label: "Students", render: (r) => <Badge tone="primary">{r.students}</Badge> },
          ]}
          data={classes}
        />
      </Card>

      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Create new class" size="lg"
        footer={<>
          <Button variant="ghost" onClick={() => setAddOpen(false)}>Cancel</Button>
          <Button onClick={save}>Create class</Button>
        </>}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Class code" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="BSCS-6" />
          <Input label="Section" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} placeholder="A" />
          <Input label="Faculty" value={form.teacher} onChange={(e) => setForm({ ...form, teacher: e.target.value })} placeholder="Dr. Bilal Ahmed" />
          <Input label="Course" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Artificial Intelligence" />
          <Input label="Capacity" type="number" min={1} value={form.students}
            onChange={(e) => setForm({ ...form, students: e.target.value })} />
          <Input label="Room" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} placeholder="CS Lab 3" />
          <div className="sm:col-span-2">
            <Input label="Schedule" value={form.schedule}
              onChange={(e) => setForm({ ...form, schedule: e.target.value })}
              placeholder="Mon, Wed, Fri • 9:00 AM" />
          </div>
        </div>
      </Modal>

      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete class"
        footer={<>
          <Button variant="ghost" onClick={() => setDeleting(null)}>Cancel</Button>
          <Button variant="danger" onClick={remove}>Delete</Button>
        </>}>
        <p className="text-sm text-muted-foreground">
          Delete <span className="font-semibold text-foreground">{deleting?.name}</span>? Students assigned to this class will need to be reassigned.
        </p>
      </Modal>
    </div>
  );
}