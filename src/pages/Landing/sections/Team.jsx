import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { team } from "../../../data/team.js";

// Falls back to initials until a real photo is added to data/team.js.
// e.g. "Neha Kumari" -> "NK", "Chandni" -> "CH", "Mr. Waseem Sajjad Lund" -> "WL"
function getInitials(name) {
  const cleaned = name.replace(/^(mr|mrs|ms|dr|prof)\.?\s+/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function TeamCard({ m, tag, delay, wide = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ delay }}
      className={`group relative flex flex-col items-center text-center rounded-2xl border border-border bg-card p-4 hover:border-primary/40 hover:card-shadow-lg hover:-translate-y-1 transition-all duration-300 ${
        wide ? "w-full sm:w-64" : ""
      }`}
    >
      <div className="rounded-full bg-background/80 backdrop-blur px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-primary border border-border mb-3">
        {tag}
      </div>

      {m.avatar ? (
        <img
          src={m.avatar}
          alt={m.name}
          className="h-16 w-16 rounded-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
        />
      ) : (
        <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary/15 to-secondary/15 border border-primary/20 text-lg font-bold text-primary">
          {getInitials(m.name)}
        </div>
      )}

      <div className="mt-3 text-sm font-semibold tracking-tight leading-tight">{m.name}</div>
      <div className="text-[11px] font-medium text-primary mt-1 leading-snug">{m.role}</div>
      <div className="mt-2 text-xs text-muted-foreground leading-relaxed line-clamp-2">{m.bio}</div>

      <div className="mt-3 flex gap-1.5">
        {m.socials?.linkedin && (
          <a href={m.socials.linkedin} aria-label={`${m.name} LinkedIn`} className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition">
            <Linkedin size={12} />
          </a>
        )}
        {m.socials?.github && (
          <a href={m.socials.github} aria-label={`${m.name} GitHub`} className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition">
            <Github size={12} />
          </a>
        )}
        {m.socials?.twitter && (
          <a href={m.socials.twitter} aria-label={`${m.name} Twitter`} className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition">
            <Twitter size={12} />
          </a>
        )}
        <a href={`mailto:${m.name.toLowerCase().replace(/[^a-z\s]/g, "").trim().replace(/\s+/g, ".")}@university.edu.pk`} aria-label={`Email ${m.name}`} className="grid h-7 w-7 place-items-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition">
          <Mail size={12} />
        </a>
      </div>
    </motion.div>
  );
}

export default function Team() {
  const supervisor = team[team.length - 1];
  const members = team.slice(0, -1);

  return (
    <section id="team" className="py-20 lg:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">FYP Team</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet the team behind SmartClass AI</h2>
          <p className="mt-4 text-muted-foreground">Five final-year Software Engineering students and their supervisor — building a face-recognition attendance system for Pakistani universities.</p>
        </div>

        {/* Supervisor — centered on its own row */}
        <div className="flex justify-center mb-6">
          <TeamCard m={supervisor} tag="Supervisor" delay={0} wide />
        </div>

        {/* Core members — row below */}
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((m, i) => (
            <TeamCard key={m.name} m={m} tag={`Member 0${i + 1}`} delay={0.06 * (i + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}