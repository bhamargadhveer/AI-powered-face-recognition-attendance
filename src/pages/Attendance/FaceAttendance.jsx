import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ScanFace, Camera, CameraOff, CheckCircle2, XCircle, RotateCcw, Users, Activity, Sparkles, Zap } from "lucide-react";
import PageHeader from "../../components/common/PageHeader.jsx";
import StatCard from "../../components/common/StatCard.jsx";
import Card from "../../components/ui/Card.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Avatar from "../../components/ui/Avatar.jsx";
import Button from "../../components/ui/Button.jsx";
import { students } from "../../data/students.js";
import { classes } from "../../data/classes.js";

const STATUS = {
  idle: { label: "Camera Off", color: "bg-muted text-muted-foreground" },
  scanning: { label: "Scanning…", color: "bg-primary/10 text-primary" },
  recognized: { label: "Recognized", color: "bg-emerald-500/10 text-emerald-500" },
  unknown: { label: "Unknown Face", color: "bg-rose-500/10 text-rose-500" },
};

export default function FaceAttendance() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [status, setStatus] = useState("idle");
  const [currentMatch, setCurrentMatch] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [selectedClass, setSelectedClass] = useState(classes[0]?.name || "BSCS-6A");
  const [selectedSubject, setSelectedSubject] = useState("Artificial Intelligence");
  const [log, setLog] = useState([]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraOn(false);
    setStatus("idle");
    setCurrentMatch(null);
    setConfidence(0);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
      setStatus("scanning");
    } catch (err) {
      // Fallback: simulate camera when permission denied
      setCameraOn(true);
      setStatus("scanning");
      toast.message("Simulated camera mode", { description: "Camera unavailable — running recognition demo." });
    }
  };

  useEffect(() => () => stopCamera(), []);

  // Simulated recognition loop while camera is on
  useEffect(() => {
    if (!cameraOn) return;
    const pool = students.filter((s) => s.className === selectedClass);
    const students2 = pool.length ? pool : students;
    let cycle = 0;
    const tick = setInterval(() => {
      cycle += 1;
      // scan phase
      setStatus("scanning");
      setCurrentMatch(null);
      setConfidence(0);
      setTimeout(() => {
        const isUnknown = Math.random() < 0.12;
        if (isUnknown) {
          setStatus("unknown");
          setConfidence(Math.round(30 + Math.random() * 30));
          return;
        }
        const stu = students2[Math.floor(Math.random() * students2.length)];
        const conf = Math.round(88 + Math.random() * 11);
        setStatus("recognized");
        setCurrentMatch(stu);
        setConfidence(conf);
        setLog((prev) => {
          if (prev.some((r) => r.studentId === stu.id)) return prev;
          toast.success(`Marked ${stu.name} as Present`, { description: `${conf}% match • ${selectedSubject}` });
          return [
            {
              id: `fr_${Date.now()}_${cycle}`,
              studentId: stu.id,
              student: stu.name,
              rollNo: stu.rollNo,
              avatar: stu.avatar,
              className: stu.className,
              confidence: conf,
              subject: selectedSubject,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
              status: "Present",
            },
            ...prev,
          ];
        });
      }, 1400);
    }, 3200);
    return () => clearInterval(tick);
  }, [cameraOn, selectedClass, selectedSubject]);

  const st = STATUS[status];
  const recognizedCount = log.length;
  const classSize = students.filter((s) => s.className === selectedClass).length || students.length;
  const rate = Math.round((recognizedCount / Math.max(1, classSize)) * 100);

  return (
    <div>
      <PageHeader
        title="Face Recognition Attendance"
        subtitle="AI-powered classroom attendance using live camera face scanning."
        actions={
          <>
            <Button variant="outline" onClick={() => { setLog([]); toast.success("Session log cleared"); }}>
              <RotateCcw size={16} /> Reset session
            </Button>
            {cameraOn ? (
              <Button variant="danger" onClick={stopCamera}>
                <CameraOff size={16} /> Stop scan
              </Button>
            ) : (
              <Button onClick={startCamera}>
                <ScanFace size={16} /> Mark Attendance with Face Scan
              </Button>
            )}
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard label="Class strength" value={String(classSize)} icon={Users} tone="primary" />
        <StatCard label="Present (this session)" value={String(recognizedCount)} icon={CheckCircle2} tone="success" />
        <StatCard label="Recognition rate" value={`${rate}%`} icon={Activity} tone="warning" />
        <StatCard label="Model accuracy" value="99.4%" icon={Sparkles} tone="success" delta="+0.3%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex-1 min-w-[200px]">
              <div className="text-xs text-muted-foreground">Class</div>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-input bg-card px-3 text-sm"
              >
                {classes.map((c) => <option key={c.id} value={c.name}>{c.name} — {c.subject}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="text-xs text-muted-foreground">Subject</div>
              <input
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-input bg-card px-3 text-sm"
                placeholder="Lecture / Subject"
              />
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${st.color}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${cameraOn ? "bg-current animate-pulse" : "bg-current"}`} />
              {st.label}
            </span>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-black">
            {cameraOn ? (
              <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-900 to-slate-950 text-slate-300">
                <div className="text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white/5 border border-white/10">
                    <Camera size={26} className="text-white/70" />
                  </div>
                  <div className="mt-4 text-sm font-medium text-white/90">Camera is off</div>
                  <div className="mt-1 text-xs text-white/50">Click "Mark Attendance with Face Scan" to start.</div>
                </div>
              </div>
            )}

            {/* Overlay scanning animation */}
            {cameraOn && (
              <>
                <div className="pointer-events-none absolute inset-6 rounded-2xl border-2 border-primary/60" />
                <div className="pointer-events-none absolute inset-6 rounded-2xl">
                  <div className="absolute -top-1 left-6 h-4 w-16 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg" />
                  <div className="absolute -top-1 right-6 h-4 w-16 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg" />
                  <div className="absolute -bottom-1 left-6 h-4 w-16 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg" />
                  <div className="absolute -bottom-1 right-6 h-4 w-16 border-b-2 border-r-2 border-emerald-400 rounded-br-lg" />
                </div>
                <motion.div
                  animate={{ y: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute inset-x-8 top-8 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_rgba(16,185,129,0.9)]"
                />
                <div className="absolute left-4 top-4 rounded-full bg-black/60 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                  ● LIVE
                </div>
              </>
            )}

            {/* Match preview */}
            <AnimatePresence>
              {cameraOn && status === "recognized" && currentMatch && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  className="absolute bottom-4 left-4 right-4 rounded-xl border border-emerald-500/40 bg-black/70 backdrop-blur px-4 py-3 flex items-center gap-3"
                >
                  <Avatar src={currentMatch.avatar} name={currentMatch.name} size={40} />
                  <div className="flex-1 min-w-0 text-white">
                    <div className="text-sm font-semibold truncate">{currentMatch.name}</div>
                    <div className="text-[11px] text-white/60 truncate">{currentMatch.rollNo} • {currentMatch.className}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-emerald-400">Match</div>
                    <div className="text-lg font-bold text-emerald-400">{confidence}%</div>
                  </div>
                </motion.div>
              )}
              {cameraOn && status === "unknown" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="absolute bottom-4 left-4 right-4 rounded-xl border border-rose-500/40 bg-black/70 backdrop-blur px-4 py-3 flex items-center gap-3 text-white"
                >
                  <XCircle size={20} className="text-rose-400" />
                  <div className="flex-1 text-sm">Unknown face detected — not enrolled in this class.</div>
                  <div className="text-xs text-rose-400 font-semibold">{confidence}% confidence</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* confidence bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span className="flex items-center gap-1.5"><Zap size={12} /> Recognition confidence</span>
              <span className="font-semibold text-foreground">{confidence}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 0.4 }}
                className={`h-full ${status === "recognized" ? "bg-emerald-500" : status === "unknown" ? "bg-rose-500" : "bg-primary"}`}
              />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Session log</h3>
            <Badge tone="primary">{log.length} marked</Badge>
          </div>
          <div className="space-y-2 max-h-[520px] overflow-y-auto scrollbar-hide">
            {log.length === 0 && (
              <div className="text-center py-10 text-sm text-muted-foreground">
                <ScanFace size={28} className="mx-auto mb-2 opacity-60" />
                No students recognized yet.<br />Start the scan to see live matches.
              </div>
            )}
            {log.map((r) => (
              <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border p-2.5 hover:bg-muted/40 transition">
                <Avatar src={r.avatar} name={r.student} size={36} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.student}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{r.rollNo} • {r.time}</div>
                </div>
                <div className="text-right">
                  <Badge tone="success">{r.confidence}%</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}