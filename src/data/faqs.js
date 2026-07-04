export const faqs = [
  { q: "What is SmartClass AI?", a: "SmartClass AI is a Final Year Project that automates university classroom attendance using deep-learning based face recognition — replacing manual roll-calls and paper registers." },
  { q: "How accurate is the face recognition model?", a: "Our CNN-based recognition pipeline achieves 99.4% accuracy under normal classroom lighting and continues to improve as more student samples are enrolled." },
  { q: "What hardware does a lecture hall need?", a: "Any standard HD webcam or IP camera works. A single camera can cover 40–60 students in a typical Pakistani university classroom." },
  { q: "Is student biometric data secure?", a: "Yes. Face embeddings (not raw images) are stored encrypted at rest, transmitted over HTTPS, and never leave your institution's servers." },
  { q: "Can HODs and parents get attendance alerts?", a: "Yes — automated SMS and email alerts are sent to students, parents, and HODs when attendance drops below the 75% university threshold." },
  { q: "Does it work for semester-based programs?", a: "Yes. SmartClass AI is built for semester-based BS programs (BSCS, BSSE, BSAI, BSCYS, BSIT) with per-course attendance tracking." },
  { q: "Can we export attendance reports for HEC/university records?", a: "Any report can be exported as CSV or PDF for HEC audits, sessional evaluation, and internal record-keeping." },
];