"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { education } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";

export default function Education() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.fromTo(
        "[data-edu-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-edu-list]", start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-edu-item]").forEach((item) => {
        gsap.from(item.querySelectorAll("[data-edu-fade]"), {
          autoAlpha: 0,
          y: 36,
          duration: 1.1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 80%", once: true },
        });
        gsap.to(item.querySelector("[data-edu-dot]"), {
          backgroundColor: "#e5461f",
          borderColor: "#e5461f",
          scale: 1.3,
          duration: 0.4,
          scrollTrigger: { trigger: item, start: "top 62%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section id="education" ref={root} className="bg-paper-2 px-5 py-28 md:px-10 md:py-44">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="05" label="Education" />
        </div>
        <div className="md:col-span-9">
          <TextReveal
            as="h2"
            type="words"
            className="text-[clamp(3rem,8vw,8rem)] leading-[0.92] font-semibold tracking-[-0.05em]"
          >
            Where I learned
          </TextReveal>

          <ol data-edu-list className="relative mt-20 space-y-20 pl-10 md:pl-16">
            <span className="absolute top-2 bottom-2 left-[7px] w-px bg-line" aria-hidden="true" />
            <span
              data-edu-progress
              className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent"
              aria-hidden="true"
            />
            {education.map((item) => (
              <li key={item.school} data-edu-item className="relative">
                <span
                  data-edu-dot
                  className="absolute top-2 -left-10 h-[15px] w-[15px] rounded-full border border-ink/40 bg-paper-2 md:-left-16"
                  aria-hidden="true"
                />
                <p data-edu-fade className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
                  {item.period} · {item.location}
                </p>
                <h3
                  data-edu-fade
                  className="mt-4 text-[clamp(2rem,4.5vw,4rem)] leading-[0.98] font-semibold tracking-[-0.04em]"
                >
                  {item.school}
                </h3>
                <div data-edu-fade className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <span className="text-xl">{item.program}</span>
                  {item.detail && (
                    <span className="font-serif text-2xl text-accent italic md:text-3xl">{item.detail}</span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
