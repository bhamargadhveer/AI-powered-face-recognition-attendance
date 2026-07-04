import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const steps = ["Institution", "Admin", "Security", "Details"];

export default function Register() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState({
    institutionName: "", institutionType: "School",
    adminName: "", email: "", phone: "",
    password: "", confirm: "",
    students: "", address: "",
  });
  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    if (step === 0) return data.institutionName.trim();
    if (step === 1) return data.adminName && data.email.includes("@") && data.phone;
    if (step === 2) return data.password.length >= 6 && data.password === data.confirm;
    if (step === 3) return data.students && data.address;
    return true;
  };

  const next = async () => {
    if (!validate()) return;
    if (step < steps.length - 1) return setStep(step + 1);
    await register(data);
    setDone(true);
    setTimeout(() => navigate("/dashboard"), 1400);
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid place-items-center p-4 lg:p-8">
      <div className="w-full max-w-2xl">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <Sparkles size={20} />
          </div>
          <span className="text-xl font-bold">SmartClass AI</span>
        </Link>

        <div className="rounded-3xl border border-border bg-card p-6 lg:p-10 card-shadow-lg">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center"
            >
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--success)]/15 text-[var(--success)] mb-4">
                <Check size={30} />
              </div>
              <h2 className="text-2xl font-bold">Welcome to SmartClass AI</h2>
              <p className="mt-2 text-muted-foreground">Setting up your workspace…</p>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Step {step + 1} of {steps.length}</span>
                  <span>{Math.round(((step + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {steps.map((s, i) => (
                    <div key={s} className="text-center">
                      <div className={`mx-auto grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                        i < step ? "bg-[var(--success)] text-white" :
                        i === step ? "bg-primary text-primary-foreground" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {i < step ? <Check size={14} /> : i + 1}
                      </div>
                      <div className={`mt-1.5 text-[11px] ${i === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  {step === 0 && (
                    <>
                      <h2 className="text-xl font-semibold">Tell us about your institution</h2>
                      <Input label="Institution name" value={data.institutionName} onChange={set("institutionName")} placeholder="Greenfield International School" />
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium">Institution type</span>
                        <select value={data.institutionType} onChange={set("institutionType")} className="h-11 w-full rounded-xl border border-input bg-card px-4 text-sm">
                          <option>School</option><option>College</option><option>University</option><option>Coaching Center</option>
                        </select>
                      </label>
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <h2 className="text-xl font-semibold">Admin details</h2>
                      <Input label="Full name" value={data.adminName} onChange={set("adminName")} placeholder="Jane Doe" />
                      <Input label="Work email" type="email" value={data.email} onChange={set("email")} placeholder="jane@school.edu" />
                      <Input label="Phone" value={data.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <h2 className="text-xl font-semibold">Create password</h2>
                      <Input label="Password" type="password" value={data.password} onChange={set("password")} hint="Minimum 6 characters" />
                      <Input label="Confirm password" type="password" value={data.confirm} onChange={set("confirm")}
                        error={data.confirm && data.password !== data.confirm ? "Passwords don't match" : ""} />
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <h2 className="text-xl font-semibold">A few more details</h2>
                      <Input label="Total students" type="number" value={data.students} onChange={set("students")} placeholder="1200" />
                      <Input label="Address" value={data.address} onChange={set("address")} placeholder="City, State, Country" />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
                  <ChevronLeft size={16} /> Back
                </Button>
                <Button onClick={next}>
                  {step === steps.length - 1 ? "Create account" : "Continue"} <ChevronRight size={16} />
                </Button>
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}