"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import { experience } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export default function Experience() {
  const job = experience[0];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

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
            trigger: headerRef.current,
            start: "top 75%",
            end: "bottom 65%",
            scrub: 0.6,
          },
        },
      );
    }, sectionRef);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = pinRef.current?.querySelectorAll<HTMLElement>("[data-client-card]");
      if (!cards || cards.length === 0) return;

      gsap.set(cards, { autoAlpha: 0, yPercent: 8, scale: 0.97 });
      gsap.set(cards[0], { autoAlpha: 1, yPercent: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: `+=${cards.length * 65}%`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Progress maps across cards.length - 1 transitions, not cards.length steps.
            const idx = Math.min(
              cards.length - 1,
              Math.max(0, Math.round(self.progress * (cards.length - 1))),
            );
            setActive((prev) => (prev === idx ? prev : idx));
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      for (let i = 1; i < cards.length; i += 1) {
        tl.to(cards[i - 1], {
          autoAlpha: 0,
          yPercent: -8,
          scale: 0.97,
          duration: 0.4,
          ease: "power2.in",
        }).to(
          cards[i],
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.4, ease: "power2.out" },
          ">-0.08",
        );
      }
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = pinRef.current?.querySelectorAll<HTMLElement>("[data-client-card]");
      if (!cards || cards.length === 0) return;

      gsap.from(cards, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: pinRef.current, start: "top 80%" },
      });
    });

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative px-6 pt-32 pb-0">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02" kicker="Where I've worked" title="Experience" />

        <div ref={headerRef} className="relative pl-10 sm:pl-14">
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
        </div>

        <div ref={pinRef} className="mt-20 pb-24 lg:flex lg:h-screen lg:items-center lg:pb-0">
          <div className="grid w-full gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">
                Selected client work
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-gradient text-6xl font-semibold tabular-nums">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-sm text-muted">
                  / {String(job.clientWork.length).padStart(2, "0")}
                </span>
              </div>

              <div className="mt-6 h-px w-full overflow-hidden bg-border">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-2"
                />
              </div>

              <ul className="mt-8 hidden space-y-3 lg:block">
                {job.clientWork.map((client, i) => (
                  <li
                    key={client.name}
                    className={`flex items-center font-mono text-sm transition-colors duration-300 ${
                      i === active ? "text-foreground" : "text-muted/40"
                    }`}
                  >
                    <span className="inline-block w-5 text-accent">
                      {i === active ? "▸" : ""}
                    </span>
                    {client.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative space-y-6 lg:h-[430px] lg:space-y-0">
              {job.clientWork.map((client) => (
                <div key={client.name} data-client-card className="lg:absolute lg:inset-0">
                  <TiltCard className="glass flex h-full flex-col rounded-2xl p-7 lg:p-9">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-xl font-semibold lg:text-2xl">
                        {client.name}
                      </h4>
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
                    <p className="mt-4 leading-relaxed text-muted lg:text-lg">
                      {client.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
