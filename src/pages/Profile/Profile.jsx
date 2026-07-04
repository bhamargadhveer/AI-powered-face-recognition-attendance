import { useState } from "react";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const activity = [
  { t: "Signed in from Chrome on macOS", d: "Just now", tone: "success" },
  { t: "Updated institution address", d: "2h ago", tone: "info" },
  { t: "Exported attendance report", d: "Yesterday", tone: "info" },
  { t: "Password changed", d: "3d ago", tone: "warning" },
  { t: "Added 12 new students", d: "1w ago", tone: "info" },
];

export default function Profile() {
  const { user } = useAuth();
  const initial = {
    name: user?.name || "",
    email: user?.email || "",
    phone: "+92 300 1234567",
    role: user?.role || "",
    institution: user?.institution || "",
  };
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const dirty = JSON.stringify(form) !== JSON.stringify(saved);

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSaved(form);
    toast.success("Profile updated");
  };
  const handleCancel = () => {
    setForm(saved);
    toast.message("Changes discarded");
  };

  return (
    <div>
      <PageHeader title="Profile" subtitle="Your personal details and activity." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 text-center">
          <div className="relative inline-block">
            <Avatar src={user?.avatar} name={user?.name} size={100} className="mx-auto" />
            <button className="absolute bottom-1 right-1 grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground border-4 border-card">
              <Camera size={14}/>
            </button>
          </div>
          <h3 className="mt-4 text-lg font-semibold">{saved.name}</h3>
          <div className="text-sm text-muted-foreground">{saved.role}</div>
          <Badge tone="success" className="mt-3">Verified</Badge>
          <div className="mt-6 grid gap-3 text-left text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Mail size={14}/> {saved.email}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Phone size={14}/> {saved.phone}</div>
            <div className="flex items-center gap-2 text-muted-foreground"><MapPin size={14}/> Islamabad, Pakistan</div>
          </div>
        </Card>
        <Card className="p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Edit profile</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}/>
            <Input label="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
            <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}/>
            <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}/>
            <div className="md:col-span-2">
              <Input label="Institution" value={form.institution} onChange={(e) => setForm({ ...form, institution: e.target.value })}/>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <Button onClick={handleSave} disabled={!dirty}>Save changes</Button>
            <Button variant="outline" onClick={handleCancel} disabled={!dirty}>Cancel</Button>
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="font-semibold mb-4">Recent activity</h3>
        <div className="space-y-3">
          {activity.map((a, i) => (
            <div key={i} className="flex items-start gap-3 rounded-xl border border-border p-3">
              <span className={`mt-1.5 h-2 w-2 rounded-full ${
                a.tone === "success" ? "bg-[var(--success)]" :
                a.tone === "warning" ? "bg-[var(--warning)]" : "bg-primary"
              }`}/>
              <div className="flex-1">
                <div className="text-sm">{a.t}</div>
                <div className="text-xs text-muted-foreground">{a.d}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}