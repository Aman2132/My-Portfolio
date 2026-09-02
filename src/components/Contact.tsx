"use client";

import { useState } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";
import LinkedinIcon from "@/components/icons/LinkedinIcon";

const inputClass =
  "w-full rounded-xl border border-border bg-white/[0.03] px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="06" kicker="Let's talk" title="Get in touch" />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="max-w-md text-lg text-foreground/85">
              Have a project in mind, or just want to say hi? My inbox is open — I try to reply
              within a day or two.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${profile.email}`}
                data-cursor-hover
                className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Mail size={16} />
                </span>
                <span className="text-sm text-foreground/85">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone}`}
                data-cursor-hover
                className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-2/10 text-accent-2">
                  <Phone size={16} />
                </span>
                <span className="text-sm text-foreground/85">{profile.phone}</span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="glass flex items-center gap-4 rounded-xl p-4 transition-colors hover:border-accent/50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-3/10 text-accent-3">
                  <LinkedinIcon size={16} />
                </span>
                <span className="text-sm text-foreground/85">LinkedIn profile</span>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-2 block font-mono text-xs text-muted">Name</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-2 block font-mono text-xs text-muted">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block font-mono text-xs text-muted">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-4">
                <MagneticButton as="button">
                  <span className="font-display inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background">
                    Send message <Send size={14} />
                  </span>
                </MagneticButton>
                {sent && (
                  <span className="font-mono text-xs text-accent-3">
                    Opening your email client…
                  </span>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
