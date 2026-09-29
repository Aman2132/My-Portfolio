"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { profile } from "@/lib/data";
import { useLocalTime } from "@/lib/useLocalTime";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import RollText from "@/components/ui/RollText";
import Magnetic from "@/components/ui/Magnetic";
import LinkedinIcon from "@/components/icons/LinkedinIcon";
import GithubIcon from "@/components/icons/GithubIcon";

type Status = "idle" | "sending" | "sent" | "error";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail className="h-4 w-4" /> },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone}`, icon: <Phone className="h-4 w-4" /> },
  { label: "LinkedIn", value: "aman-joshi", href: profile.linkedin, icon: <LinkedinIcon size={16} /> },
  { label: "GitHub", value: "Aman2132", href: profile.github, icon: <GithubIcon size={16} /> },
];

function Field({
  id,
  label,
  textarea = false,
  type = "text",
  value,
  onChange,
}: {
  id: string;
  label: string;
  textarea?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const shared =
    "peer w-full resize-none border-b border-line-inv bg-transparent pt-7 pb-3 text-lg text-paper outline-none transition-colors placeholder:text-transparent focus:border-paper";
  return (
    <div className="group relative">
      {textarea ? (
        <textarea id={id} required rows={4} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={shared} />
      ) : (
        <input id={id} required type={type} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={shared} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-7 left-0 origin-left text-lg text-muted-inv transition-all duration-300 ease-[var(--ease-out)] peer-focus:top-0 peer-focus:text-[11px] peer-focus:tracking-[0.16em] peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:tracking-[0.16em] peer-[:not(:placeholder-shown)]:uppercase"
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out)] peer-focus:scale-x-100" />
    </div>
  );
}

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-channel]", {
        autoAlpha: 0,
        y: 30,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-channels]", start: "top 85%", once: true },
      });
      gsap.from("[data-form]", {
        autoAlpha: 0,
        y: 60,
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-form]", start: "top 85%", once: true },
      });
    },
    { scope: root },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" ref={root} className="bg-ink px-5 pt-28 pb-20 text-paper md:px-10 md:pt-44">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="06" label="Contact" inverted />
        </div>
        <div className="md:col-span-9">
          <TextReveal
            as="h2"
            type="chars"
            className="text-[clamp(4rem,13vw,13rem)] leading-[0.86] font-semibold tracking-[-0.06em]"
          >
            Let&apos;s talk
          </TextReveal>
          <TextReveal as="p" className="mt-8 max-w-xl text-lg leading-relaxed text-paper/75 md:text-xl" delay={0.2}>
            Have a project in mind, or just want to say hi? My inbox is open — I try to reply within a day or two.
          </TextReveal>
        </div>
      </div>

      <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12">
        <ul data-channels className="md:col-span-5 md:col-start-4">
          {channels.map((c) => (
            <li key={c.label} data-channel>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 border-b border-line-inv py-5 transition-colors hover:border-paper"
              >
                <span className="flex min-w-0 items-center gap-4">
                  <span className="text-muted-inv transition-colors group-hover:text-accent">{c.icon}</span>
                  <span className="hidden w-20 shrink-0 font-mono text-[11px] tracking-[0.16em] text-muted-inv uppercase sm:inline-block">
                    {c.label}
                  </span>
                  <RollText text={c.value} className="min-w-0 text-lg md:text-xl" />
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-accent" />
              </a>
            </li>
          ))}
          <li data-channel className="flex items-center justify-between py-5 font-mono text-[11px] tracking-[0.16em] text-muted-inv uppercase">
            <span>{profile.location}</span>
            <span className="tabular-nums">{time || "--:--"} NPT</span>
          </li>
        </ul>

        <form data-form onSubmit={handleSubmit} className="space-y-8 md:col-span-4">
          <Field id="name" label="Your name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} />
          <Field
            id="email"
            type="email"
            label="Your email"
            value={form.email}
            onChange={(v) => setForm((f) => ({ ...f, email: v }))}
          />
          <Field
            id="message"
            textarea
            label="Tell me about your project"
            value={form.message}
            onChange={(v) => setForm((f) => ({ ...f, message: v }))}
          />

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Magnetic strength={0.4}>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-accent text-sm font-medium text-paper disabled:opacity-70"
              >
                <span className="absolute inset-0 translate-y-full rounded-full bg-paper transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-y-0" />
                <span className="relative transition-colors duration-500 group-hover:text-ink">
                  {status === "sending" ? "Sending…" : "Send message"}
                </span>
              </button>
            </Magnetic>
            <p aria-live="polite" className="max-w-[14rem] text-sm leading-relaxed">
              {status === "sent" && <span className="text-paper">Message sent — I&apos;ll get back to you soon.</span>}
              {status === "error" && (
                <span className="text-accent">Something went wrong — email me directly at {profile.email}.</span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
