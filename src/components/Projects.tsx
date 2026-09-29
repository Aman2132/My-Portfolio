"use client";

import { useRef } from "react";
import { ArrowUpRight, Award } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { projects } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import RollText from "@/components/ui/RollText";

const themes = [
  { card: "bg-ink text-paper", muted: "text-muted-inv", line: "border-line-inv", chip: "border-line-inv" },
  { card: "bg-accent text-paper", muted: "text-paper/90", line: "border-paper/30", chip: "border-paper/45" },
  { card: "bg-paper-2 text-ink", muted: "text-muted", line: "border-line", chip: "border-ink/20" },
  { card: "bg-ink-2 text-paper", muted: "text-muted-inv", line: "border-line-inv", chip: "border-line-inv" },
];

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (min-height: 760px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          const trigger = { trigger: next, start: "top bottom", end: "top 12%", scrub: true };
          gsap.to(card.querySelector("[data-card-body]"), {
            scale: 0.9,
            rotationX: 6,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: trigger,
          });
          gsap.to(card.querySelector("[data-card-shade]"), { opacity: 0.55, ease: "none", scrollTrigger: trigger });
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-card-body]").forEach((body) => {
        gsap.from(body.querySelectorAll("[data-card-fade]"), {
          autoAlpha: 0,
          y: 30,
          duration: 1.1,
          stagger: 0.07,
          ease: "expo.out",
          scrollTrigger: { trigger: body, start: "top 70%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="projects" ref={root} className="px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="04" label="Projects" />
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6 md:col-span-9">
          <TextReveal
            as="h2"
            type="words"
            className="text-[clamp(3rem,8vw,8rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
          >
            Selected work
          </TextReveal>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            {String(projects.length).padStart(2, "0")} projects
          </p>
        </div>
      </div>

      <div className="mt-16 space-y-6 [perspective:1400px] md:mt-24 [@media(min-width:1024px)_and_(min-height:760px)]:space-y-0">
        {projects.map((project, i) => {
          const t = themes[i % themes.length];
          return (
            <article
              key={project.name}
              data-project-card
              className="[@media(min-width:1024px)_and_(min-height:760px)]:sticky [@media(min-width:1024px)_and_(min-height:760px)]:pb-[4vh]"
              style={{ top: `calc(8vh + ${i * 24}px)` }}
            >
              <div
                data-card-body
                className={`relative flex flex-col justify-between overflow-hidden rounded-[28px] p-7 md:p-12 [@media(min-width:1024px)_and_(min-height:760px)]:min-h-[78vh] ${t.card}`}
              >
                <div data-card-shade className="pointer-events-none absolute inset-0 bg-ink opacity-0" />

                <div className={`relative flex flex-wrap items-center justify-between gap-4 border-b pb-6 ${t.line}`}>
                  <span data-card-fade className="font-mono text-xs tracking-[0.16em] uppercase">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span data-card-fade className={`font-mono text-[11px] tracking-[0.16em] uppercase ${t.muted}`}>
                    {project.period.includes(project.location)
                      ? project.period
                      : `${project.period} · ${project.location}`}
                  </span>
                  <span
                    data-card-fade
                    className={`flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase ${t.chip}`}
                  >
                    {project.status === "ongoing" && (
                      <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-current" />
                    )}
                    {project.status === "ongoing" ? "Ongoing" : "Complete"}
                  </span>
                </div>

                <div className="relative py-10 md:py-8">
                  {project.badge && (
                    <span
                      data-card-fade
                      className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase"
                    >
                      <Award className="h-4 w-4" /> {project.badge}
                    </span>
                  )}
                  <TextReveal
                    as="h3"
                    type="words"
                    className="max-w-5xl text-[clamp(2.25rem,4.8vw,5rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
                  >
                    {project.name}
                  </TextReveal>
                </div>

                <div className="relative grid gap-8 md:grid-cols-12">
                  <p data-card-fade className="text-lg leading-relaxed md:col-span-5 md:text-xl">
                    {project.description}
                  </p>
                  <ul className="space-y-3 md:col-span-6 md:col-start-7">
                    {project.bullets.map((b) => (
                      <li key={b} data-card-fade className={`flex gap-3 text-[15px] leading-relaxed ${t.muted}`}>
                        <span className="mt-[0.6em] h-px w-4 shrink-0 bg-current" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`relative mt-10 flex flex-wrap items-center justify-between gap-6 border-t pt-6 ${t.line}`}>
                  <ul data-card-fade className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.12em] uppercase ${t.chip}`}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  {project.url && (
                    <a
                      data-card-fade
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor-label="Code"
                      className="group inline-flex items-center gap-3 text-sm font-medium"
                    >
                      <RollText text="View on GitHub" />
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
