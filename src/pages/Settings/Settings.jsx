import { useState } from "react";
import { Building, Bell, Lock, Palette } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../../components/common/PageHeader.jsx";
import Card from "../../components/ui/Card.jsx";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import Tabs from "../../components/ui/Tabs.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Toggle({ checked, onChange, label, desc }) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium leading-tight">{label}</div>
        {desc && <div className="text-xs text-muted-foreground mt-1">{desc}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-muted"}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [notifs, setNotifs] = useState({ email: true, sms: false, push: true, weekly: true });
  const initInst = {
    name: user?.institution || "National University of Computer & Emerging Sciences",
    type: "University",
    email: user?.email || "admin@university.edu.pk",
    phone: "+92 51 111 128 128",
    address: "Sector H-11/4, Islamabad, Pakistan",
  };
  const [inst, setInst] = useState(initInst);
  const [instSaved, setInstSaved] = useState(initInst);
  const instDirty = JSON.stringify(inst) !== JSON.stringify(instSaved);

  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const updatePassword = () => {
    if (!pw.current || !pw.next || !pw.confirm) return toast.error("All password fields are required");
    if (pw.next.length < 8) return toast.error("New password must be at least 8 characters");
    if (pw.next !== pw.confirm) return toast.error("New password and confirmation do not match");
    if (pw.current === pw.next) return toast.error("New password must differ from current password");
    setPw({ current: "", next: "", confirm: "" });
    toast.success("Password updated successfully");
  };

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your institution, security, and preferences." />
      <Card className="p-6">
        <Tabs
          tabs={[
            { label: "Institution", content: (
              <div className="grid gap-4 md:grid-cols-2 max-w-3xl">
                <div className="md:col-span-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Building size={16}/> Institution profile
                </div>
                <Input label="Institution name" value={inst.name} onChange={(e) => setInst({ ...inst, name: e.target.value })}/>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Institution type</span>
                  <select value={inst.type} onChange={(e) => setInst({ ...inst, type: e.target.value })} className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm">
                    <option>University</option><option>College</option><option>Institute</option><option>School</option>
                  </select>
                </label>
                <Input label="Admin email" value={inst.email} onChange={(e) => setInst({ ...inst, email: e.target.value })}/>
                <Input label="Support phone" value={inst.phone} onChange={(e) => setInst({ ...inst, phone: e.target.value })}/>
                <div className="md:col-span-2">
                  <Input label="Address" value={inst.address} onChange={(e) => setInst({ ...inst, address: e.target.value })}/>
                </div>
                <div className="md:col-span-2 flex gap-2">
                  <Button disabled={!instDirty} onClick={() => {
                    if (!inst.name.trim()) return toast.error("Institution name is required");
                    setInstSaved(inst); toast.success("Institution details saved");
                  }}>Save changes</Button>
                  <Button variant="outline" disabled={!instDirty} onClick={() => { setInst(instSaved); toast.message("Changes discarded"); }}>Cancel</Button>
                </div>
              </div>
            )},
            { label: "Appearance", content: (
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><Palette size={16}/> Theme</div>
                <div className="grid grid-cols-2 gap-3">
                  {["light","dark"].map((t) => (
                    <button
                      key={t}
                      onClick={() => t !== theme && toggleTheme()}
                      className={`rounded-2xl border p-4 text-left transition ${theme === t ? "border-primary card-shadow" : "border-border"}`}
                    >
                      <div className={`h-16 rounded-lg mb-3 ${t === "light" ? "bg-gradient-to-br from-slate-50 to-slate-200" : "bg-gradient-to-br from-slate-800 to-slate-950"}`}/>
                      <div className="text-sm font-medium capitalize">{t}</div>
                    </button>
                  ))}
                </div>
              </div>
            )},
            { label: "Notifications", content: (
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3"><Bell size={16}/> Delivery preferences</div>
                <div className="divide-y divide-border rounded-2xl border border-border px-4">
                  <Toggle checked={notifs.email} onChange={(v) => { setNotifs({ ...notifs, email: v }); toast.success(`Email notifications ${v ? "enabled" : "disabled"}`); }} label="Email notifications" desc="Attendance reports and alerts by email" />
                  <Toggle checked={notifs.sms} onChange={(v) => { setNotifs({ ...notifs, sms: v }); toast.success(`SMS notifications ${v ? "enabled" : "disabled"}`); }} label="SMS notifications" desc="Instant SMS for critical alerts to students and parents" />
                  <Toggle checked={notifs.push} onChange={(v) => { setNotifs({ ...notifs, push: v }); toast.success(`Push notifications ${v ? "enabled" : "disabled"}`); }} label="Push notifications" desc="Real-time in-app push notifications" />
                  <Toggle checked={notifs.weekly} onChange={(v) => { setNotifs({ ...notifs, weekly: v }); toast.success(`Weekly digest ${v ? "enabled" : "disabled"}`); }} label="Weekly digest" desc="Summary email every Monday morning" />
                </div>
              </div>
            )},
            { label: "Security", content: (
              <div className="max-w-xl space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground"><Lock size={16}/> Change password</div>
                <Input label="Current password" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })}/>
                <Input label="New password" type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} hint="Minimum 8 characters"/>
                <Input label="Confirm new password" type="password" value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })}/>
                <div className="flex gap-2">
                  <Button onClick={updatePassword}>Update password</Button>
                  <Button variant="outline" onClick={() => setPw({ current: "", next: "", confirm: "" })}>Clear</Button>
                </div>
              </div>
            )},
          ]}
        />
      </Card>
    </div>
  );
}