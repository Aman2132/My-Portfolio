"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { experience, profile, projects } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";

const stats = [
  { value: 2, suffix: "+", label: "Years building production systems" },
  {
    value: experience.reduce((n, job) => n + job.clientWork.length, 0),
    suffix: "",
    label: "Client products shipped at Mentor Friends",
  },
  { value: projects.length, suffix: "", label: "Personal & academic projects" },
  { value: projects.filter((p) => p.badge).length, suffix: "", label: "Best Project Award, final year" },
];

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const split = SplitText.create("[data-about-text]", { type: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.04,
          ease: "none",
          scrollTrigger: { trigger: "[data-about-text]", start: "top 78%", end: "bottom 55%", scrub: true },
        },
      );

      const statTrigger = { trigger: "[data-stats]", start: "top 85%", once: true };
      gsap.from("[data-stat-rule]", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        stagger: 0.1,
        ease: "expo.inOut",
        scrollTrigger: statTrigger,
      });
      gsap.from("[data-stat]", { yPercent: 40, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: "expo.out", scrollTrigger: statTrigger });

      gsap.utils.toArray<HTMLElement>("[data-count-to]").forEach((el) => {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: Number(el.dataset.countTo),
          duration: 2.2,
          ease: "power3.out",
          scrollTrigger: statTrigger,
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });

      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section id="about" ref={root} className="px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="01" label="About" />
        </div>
        <div className="md:col-span-9">
          <p
            data-about-text
            className="text-[clamp(1.6rem,3.4vw,3.4rem)] leading-[1.14] font-medium tracking-[-0.03em]"
          >
            {profile.longSummary}
          </p>
          <TextReveal
            as="p"
            className="mt-10 max-w-2xl font-serif text-[clamp(1.25rem,2vw,1.9rem)] leading-snug text-muted italic"
          >
            — {profile.statement}
          </TextReveal>
        </div>
      </div>

      <div data-stats className="mt-24 grid grid-cols-2 gap-x-6 gap-y-14 md:mt-36 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div data-stat-rule className="h-px w-full bg-ink" />
            <div data-stat className="pt-5">
              <p className="text-[clamp(3.5rem,8vw,7.5rem)] leading-none font-semibold tracking-[-0.05em] tabular-nums">
                <span data-count-to={stat.value}>{stat.value}</span>
                <span className="text-accent">{stat.suffix}</span>
              </p>
              <p className="mt-3 max-w-[16rem] font-mono text-[11px] leading-relaxed tracking-[0.14em] text-muted uppercase">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
