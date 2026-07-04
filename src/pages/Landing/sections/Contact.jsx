import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
import { SUPPORT_EMAIL, SUPPORT_PHONE, ADDRESS } from "../../../constants/index.js";

export default function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Contact</div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Talk to us</h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Book a demo, ask a question, or explore a rollout for your institution.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: Mail, label: "Email", value: SUPPORT_EMAIL },
              { icon: Phone, label: "Phone", value: SUPPORT_PHONE },
              { icon: MapPin, label: "Address", value: ADDRESS },
            ].map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                  <c.icon size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                  <div className="text-sm font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl overflow-hidden border border-border h-56">
            <iframe
              title="map"
              className="h-full w-full"
              src="https://www.openstreetmap.org/export/embed.html?bbox=69.6981%2C25.3187%2C69.7961%2C25.4087&layer=mapnik&marker=25.3616%2C69.7361"
            />
          </div>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="rounded-2xl border border-border bg-card p-6 lg:p-8 space-y-4 h-fit"
        >
          <Input label="Full name" placeholder="Jane Doe" />
          <Input label="Work email" type="email" placeholder="jane@school.edu" />
          <Input label="Institution" placeholder="Greenfield International" />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium">Message</span>
            <textarea
              rows={5}
              className="w-full rounded-xl border border-input bg-card px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Tell us about your institution…"
            />
          </label>
          <Button size="lg" className="w-full">
            {sent ? "Sent — we'll be in touch" : "Send message"}
          </Button>
        </form>
      </div>
    </section>
  );
}