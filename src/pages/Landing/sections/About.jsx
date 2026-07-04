import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        >
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">About the project</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            A Final Year Project solving a real Pakistani university problem.
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Manual attendance wastes 10–15 minutes of every lecture, is easy to proxy, and generates zero usable data. SmartClass AI replaces the paper register with a computer-vision pipeline that identifies each enrolled student the moment they walk into the classroom.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Built end-to-end by four students of Computer Science: from FaceNet-based recognition and Node.js APIs to this real-time dashboard that HODs and course coordinators can actually use.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { k: "3s", v: "Average recognition time per student" },
            { k: "15m", v: "Reclaimed per lecture, every day" },
            { k: "0", v: "Manual roll-calls or proxy attendance" },
            { k: "99.4%", v: "Recognition accuracy in classroom conditions" },
          ].map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{c.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{c.v}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}