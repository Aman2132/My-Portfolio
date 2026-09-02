"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { experience } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" kicker="Where I've worked" title="Experience" />

        {experience.map((job) => (
          <div key={job.company} className="relative pl-10 sm:pl-14">
            <div className="absolute top-1 left-0 h-full w-px bg-border sm:left-[7px]">
              <div
                ref={lineRef}
                className="h-full w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-accent-3"
              />
            </div>
            <span className="absolute top-0.5 -left-[5px] h-3 w-3 rounded-full bg-accent shadow-[0_0_16px_2px_rgba(110,231,255,0.6)] sm:left-[2.5px]" />

            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">
                  {job.role} · <span className="text-accent">{job.company}</span>
                </h3>
                {job.current && (
                  <span className="glass flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs text-accent-3">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-3" />
                    Current
                  </span>
                )}
              </div>
              <p className="mt-1 font-mono text-sm text-muted">
                {job.period} · {job.location}
              </p>

              <ul className="mt-6 space-y-3">
                {job.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-foreground/85">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-2" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </Reveal>

            <RevealGroup
              className="mt-10 mb-20 grid gap-5 sm:grid-cols-2"
              stagger={0.1}
            >
              {job.clientWork.map((client) => (
                <RevealItem key={client.name}>
                  <TiltCard className="glass h-full rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-lg font-semibold">{client.name}</h4>
                      <a
                        href={client.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-hover
                        className="shrink-0 rounded-full border border-border p-2 text-muted transition-colors hover:border-accent hover:text-accent"
                        aria-label={`Visit ${client.name}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {client.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {client.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        ))}
      </div>
    </section>
  );
}
