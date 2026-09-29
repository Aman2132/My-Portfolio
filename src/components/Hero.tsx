"use client";

import { useRef } from "react";
import { ArrowDownRight, ArrowRight, ArrowDown } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { useLocalTime } from "@/lib/useLocalTime";
import { profile } from "@/lib/data";
import TextReveal from "@/components/ui/TextReveal";
import RollText from "@/components/ui/RollText";
import Magnetic from "@/components/ui/Magnetic";

const [firstName, lastName] = profile.name.split(" ");
const roleWords = profile.role.split(" ");
const roleLast = roleWords.pop();
const roleFirst = roleWords.join(" ");

export default function Hero() {
  const { introDone, scrollTo } = useApp();
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      if (!introDone) {
        gsap.set("[data-hero-fade]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-hero-badge]", { scale: 0.4, rotate: -120, autoAlpha: 0 });
        gsap.set("[data-hero-rule]", { scaleX: 0 });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .to("[data-hero-rule]", { scaleX: 1, duration: 1.4, ease: "expo.inOut" }, 0.1)
        .to("[data-hero-fade]", { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.07 }, 0.55)
        .to("[data-hero-badge]", { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.6 }, 0.7);

      const scrub = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to("[data-name-a]", { xPercent: -14, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-name-b]", { xPercent: 10, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-hero-lift]", { yPercent: -30, autoAlpha: 0, ease: "none", scrollTrigger: scrub });
      gsap.to("[data-hero-badge-wrap]", { yPercent: 120, rotate: 90, ease: "none", scrollTrigger: scrub });
    },
    { scope: root, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pt-20 pb-6 md:px-10 md:pt-24 md:pb-8"
    >
      <div>
        <div
          data-hero-lift
          className="grid grid-cols-2 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted uppercase md:grid-cols-4"
        >
          <span data-hero-fade>Portfolio ©{new Date().getFullYear()}</span>
          <span data-hero-fade className="text-right md:text-left">
            {profile.location.split(",")[0]}, Nepal
          </span>
          <span data-hero-fade className="tabular-nums">
            Local time {time || "--:--"}
          </span>
          <span data-hero-fade className="flex items-center justify-end gap-2 text-ink">
            <span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent" />
            Available for new work
          </span>
        </div>
        <div data-hero-rule className="mt-5 h-px w-full origin-left bg-line" />
      </div>

      <div className="relative my-8">
      <h1
        aria-label={`${profile.name}, ${profile.role}`}
        className="text-[min(24vw,29svh)] leading-[0.86] font-semibold tracking-[-0.055em] uppercase"
      >
        <span data-name-a className="block">
          <TextReveal intro as="span" type="chars" className="block" stagger={0.05} duration={1.4}>
            {firstName}
          </TextReveal>
        </span>

        <span className="mt-[0.04em] flex flex-col-reverse gap-6 md:flex-row md:items-end md:justify-between">
          <span className="block font-serif text-[clamp(1.75rem,3.4vw,3.5rem)] leading-[0.95] font-normal tracking-normal normal-case italic">
            <TextReveal intro as="span" type="words" className="block" delay={0.35}>
              {roleFirst}
            </TextReveal>
            <TextReveal intro as="span" type="words" className="block" delay={0.45}>
              {roleLast}
            </TextReveal>
          </span>
          <span data-name-b className="block self-end md:self-auto">
            <TextReveal intro as="span" type="chars" className="block" delay={0.12} stagger={0.05} duration={1.4}>
              {lastName}
            </TextReveal>
          </span>
        </span>
      </h1>

        <div data-hero-badge-wrap className="absolute top-[4%] right-0 hidden sm:block">
          <a
            data-hero-badge
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
            data-cursor-label="Say hi"
            aria-label="Open to work — get in touch"
            className="group relative flex h-32 w-32 items-center justify-center md:h-40 md:w-40"
          >
            <svg viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0" />
              </defs>
              <text className="fill-ink font-mono text-[8.4px] tracking-[0.22em] uppercase">
                <textPath href="#badge-circle">Open to work · Full stack developer ·</textPath>
              </text>
            </svg>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-paper transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-125 md:h-14 md:w-14">
              <ArrowDownRight className="h-5 w-5 transition-transform duration-500 group-hover:-rotate-45" />
            </span>
          </a>
        </div>
      </div>

      <div data-hero-lift className="grid items-end gap-8 md:grid-cols-12">
        <p data-hero-fade className="max-w-xl text-base leading-relaxed text-ink/80 md:col-span-6 md:text-[17px]">
          {profile.summary}
        </p>

        <div data-hero-fade className="flex flex-wrap items-center gap-3 md:col-span-4 md:col-start-7 md:justify-center">
          <Magnetic>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#projects");
              }}
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-4 text-sm font-medium text-paper"
            >
              <RollText text="View my work" />
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="/resume.pdf"
              download
              className="group inline-flex items-center gap-3 rounded-full border border-ink/25 px-6 py-4 text-sm font-medium transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-paper"
            >
              <RollText text="Download resume" />
              <ArrowDown className="h-4 w-4" />
            </a>
          </Magnetic>
        </div>

        <div
          data-hero-fade
          className="hidden items-center justify-end gap-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase md:col-span-2 md:flex"
        >
          Scroll
          <span className="relative h-10 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-line_1.8s_var(--ease-in-out)_infinite] bg-ink" />
          </span>
        </div>
      </div>
    </section>
  );
}
