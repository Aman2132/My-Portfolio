"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) {
              barRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]", track);
      const cardTweens = cards.map((card) =>
        gsap.from(card, {
          opacity: 0.25,
          scale: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 92%",
            end: "left 55%",
            scrub: true,
          },
        }),
      );

      return () => {
        cardTweens.forEach((t) => {
          t.scrollTrigger?.kill();
          t.kill();
        });
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6 lg:mb-4">
        <SectionHeading index="04" kicker="Things I've built" title="Projects" />
      </div>

      <div
        ref={trackRef}
        className="flex flex-col gap-6 px-6 lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:px-[6vw]"
      >
        {projects.map((project, i) => (
          <div
            key={project.name}
            data-project-card
            className="lg:w-[42vw] lg:max-w-[520px] lg:shrink-0"
          >
            <TiltCard className="glass flex h-full flex-col rounded-2xl p-7 lg:h-[440px]">
              <span className="font-display pointer-events-none absolute right-6 bottom-3 text-6xl font-semibold text-white/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-xl font-semibold">{project.name}</h3>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {project.period} · {project.location}
                  </p>
                </div>
                {project.status === "ongoing" ? (
                  <span className="glass flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] text-accent-3">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-3" />
                    Ongoing
                  </span>
                ) : (
                  <span className="glass flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[11px] text-muted">
                    <Sparkles size={11} /> Complete
                  </span>
                )}
              </div>

              {project.badge && (
                <span className="mt-4 flex w-fit items-center gap-2 rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1 font-mono text-[11px] text-accent-2">
                  <Award size={12} /> {project.badge}
                </span>
              )}

              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                {project.description}
              </p>

              <ul className="mt-4 space-y-2">
                {project.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-muted">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-10 left-1/2 hidden w-[28vw] -translate-x-1/2 lg:block">
        <div className="h-px w-full overflow-hidden bg-border">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent via-accent-2 to-accent-3"
          />
        </div>
        <p className="mt-3 text-center font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
          Keep scrolling
        </p>
      </div>
    </section>
  );
}
