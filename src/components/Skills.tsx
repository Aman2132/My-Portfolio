"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { skills } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";
import Marquee from "@/components/ui/Marquee";

const groups = [
  { title: "Frontend", items: skills.frontend },
  { title: "Backend", items: skills.backend },
  { title: "Soft skills", items: skills.soft },
];

const technical = [...skills.frontend, ...skills.backend];

function Chip({ label, filled = false }: { label: string; filled?: boolean }) {
  return (
    <span
      className={`mx-2 rounded-full border px-6 py-3 text-lg font-medium whitespace-nowrap transition-colors duration-300 md:text-xl ${
        filled
          ? "border-ink bg-ink text-paper hover:border-accent hover:bg-accent"
          : "border-ink/20 hover:border-ink hover:bg-ink hover:text-paper"
      }`}
    >
      {label}
    </span>
  );
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>("[data-skill-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 88%", once: true } });
        tl.from(row.querySelector("[data-skill-rule]"), { scaleX: 0, duration: 1.3, ease: "expo.inOut" })
          .from(row.querySelector("[data-skill-title]"), { yPercent: 110, duration: 1, ease: "expo.out" }, "-=0.8")
          .from(
            row.querySelectorAll("[data-skill-item]"),
            { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.035, ease: "expo.out" },
            "-=0.8",
          );
      });

      gsap.from("[data-skill-marquee]", {
        autoAlpha: 0,
        y: 40,
        duration: 1.2,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-skill-marquees]", start: "top 88%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="skills" ref={root} className="py-28 md:py-44">
      <div className="grid gap-10 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-3">
          <SectionLabel index="03" label="Skills" />
        </div>
        <div className="md:col-span-9">
          <TextReveal
            as="h2"
            type="words"
            className="text-[clamp(3rem,8vw,8rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
          >
            Tools I build with
          </TextReveal>
        </div>
      </div>

      <div data-skill-marquees className="mt-16 space-y-4 md:mt-24" title="Hover to pause">
        <div data-skill-marquee>
          <Marquee speed={1.6} pauseOnHover>
            {technical.map((s) => (
              <Chip key={s} label={s} />
            ))}
          </Marquee>
        </div>
        <div data-skill-marquee>
          <Marquee speed={1.3} direction={1} pauseOnHover>
            {[...technical].reverse().map((s) => (
              <Chip key={s} label={s} filled />
            ))}
          </Marquee>
        </div>
      </div>

      <div className="mt-24 px-5 md:mt-36 md:px-10">
        {groups.map((group, gi) => (
          <div key={group.title} data-skill-row className="relative grid gap-6 py-10 md:grid-cols-12 md:py-14">
            <div data-skill-rule className="absolute top-0 left-0 h-px w-full origin-left bg-ink" />
            <div className="flex items-baseline gap-4 md:col-span-4">
              <span className="font-mono text-xs text-accent">0{gi + 1}</span>
              <span className="overflow-hidden">
                <h3
                  data-skill-title
                  className="block text-[clamp(2rem,4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em]"
                >
                  {group.title}
                </h3>
              </span>
            </div>
            <ul className="flex flex-wrap gap-x-2 gap-y-3 md:col-span-8">
              {group.items.map((item) => (
                <li key={item} data-skill-item>
                  <span className="inline-block rounded-full border border-ink/20 px-4 py-2 text-base transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-paper">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
