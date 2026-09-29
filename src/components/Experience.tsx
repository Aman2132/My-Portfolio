"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { experience } from "@/lib/data";
import SectionLabel from "@/components/ui/SectionLabel";
import TextReveal from "@/components/ui/TextReveal";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from("[data-exp-meta]", {
        autoAlpha: 0,
        y: 20,
        duration: 1,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-exp-head]", start: "top 80%", once: true },
      });

      gsap.utils.toArray<HTMLElement>("[data-exp-bullet]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 40,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-client-row]").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 92%", once: true } });
        tl.from(row.querySelector("[data-row-rule]"), { scaleX: 0, duration: 1.3, ease: "expo.inOut" }).from(
          row.querySelectorAll("[data-row-item]"),
          { yPercent: 100, autoAlpha: 0, duration: 1, stagger: 0.06, ease: "expo.out" },
          "-=0.9",
        );
      });

      gsap.to("[data-exp-watermark]", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="relative overflow-hidden bg-ink px-5 py-28 text-paper md:px-10 md:py-44">
      <span
        data-exp-watermark
        aria-hidden="true"
        className="pointer-events-none absolute top-10 left-0 text-[22vw] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-paper/[0.04] uppercase"
      >
        Experience — Experience
      </span>

      {experience.map((job) => (
        <div key={job.company} className="relative">
          <div data-exp-head className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-3">
              <SectionLabel index="02" label="Experience" inverted />
            </div>
            <div className="md:col-span-9">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-muted-inv uppercase">
                <span data-exp-meta>{job.period}</span>
                <span data-exp-meta>{job.location}</span>
                {job.current && (
                  <span data-exp-meta className="flex items-center gap-2 text-paper">
                    <span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent" />
                    Current role
                  </span>
                )}
              </div>
              <TextReveal
                as="h2"
                type="chars"
                className="mt-6 text-[clamp(3.25rem,10vw,10rem)] leading-[0.9] font-semibold tracking-[-0.05em]"
              >
                {job.company}
              </TextReveal>
              <TextReveal as="p" className="mt-5 font-serif text-[clamp(1.5rem,2.6vw,2.5rem)] italic" delay={0.2}>
                {job.role}
              </TextReveal>
            </div>
          </div>

          <ol className="mt-20 grid gap-x-10 gap-y-10 md:grid-cols-12 md:gap-y-14">
            {job.bullets.map((bullet, i) => (
              <li
                data-exp-bullet
                key={bullet}
                className={`flex gap-5 border-t border-line-inv pt-6 md:col-span-4 ${
                  i % 2 === 0 ? "md:col-start-4" : "md:col-start-8"
                }`}
              >
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                <p className="text-lg leading-relaxed text-paper/85">{bullet}</p>
              </li>
            ))}
          </ol>

          <div className="mt-28 md:mt-40">
            <div className="flex items-end justify-between gap-6">
              <TextReveal
                as="h3"
                type="words"
                className="text-[clamp(2.25rem,5vw,4.5rem)] leading-none font-semibold tracking-[-0.04em]"
              >
                Client work
              </TextReveal>
              <p className="font-mono text-[11px] tracking-[0.16em] text-muted-inv uppercase">
                {String(job.clientWork.length).padStart(2, "0")} products
              </p>
            </div>

            <ul className="mt-10 border-b border-line-inv">
              {job.clientWork.map((client, i) => (
                <li key={client.name} data-client-row className="relative">
                  <div data-row-rule className="absolute top-0 left-0 h-px w-full origin-left bg-line-inv" />
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor-label="Visit"
                    className="group relative block overflow-hidden"
                  >
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-y-100" />
                    <div className="relative grid grid-cols-12 items-center gap-4 py-7 md:py-9">
                      <span className="col-span-2 overflow-hidden md:col-span-1">
                        <span data-row-item className="block font-mono text-xs text-muted-inv transition-colors group-hover:text-paper">
                          0{i + 1}
                        </span>
                      </span>
                      <span className="col-span-10 overflow-hidden md:col-span-5">
                        <span data-row-item className="block">
                          <span className="block text-[clamp(1.75rem,3.6vw,3.25rem)] leading-tight font-semibold tracking-[-0.03em] transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-3">
                            {client.name}
                          </span>
                        </span>
                      </span>
                      <span className="col-span-10 col-start-3 overflow-hidden md:col-span-5 md:col-start-auto">
                        <span data-row-item className="flex flex-wrap gap-2">
                          {client.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-line-inv px-3 py-1 font-mono text-[10px] tracking-[0.12em] uppercase transition-colors group-hover:border-paper/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </span>
                      </span>
                      <span className="col-span-12 flex justify-end md:col-span-1">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-inv transition-all duration-500 group-hover:rotate-45 group-hover:border-paper group-hover:bg-paper group-hover:text-accent">
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                      </span>
                    </div>
                    <div className="relative grid grid-rows-[0fr] transition-[grid-template-rows] duration-700 ease-[var(--ease-out)] group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="max-w-2xl pb-8 pl-[16.66%] text-base leading-relaxed text-paper/85 md:pl-[8.33%] md:text-lg">
                          {client.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
}
