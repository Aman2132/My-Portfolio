"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/Reveal";
import SplitReveal from "@/components/SplitReveal";
import ScrambleText from "@/components/ScrambleText";

export default function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(indexRef.current, {
        yPercent: -70,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="mb-14 flex items-end justify-between gap-6 border-b border-border pb-6"
    >
      <div>
        <Reveal>
          <ScrambleText text={kicker} className="font-mono text-sm text-accent" />
        </Reveal>
        <SplitReveal
          as="h2"
          text={title}
          className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl"
        />
      </div>
      <span
        ref={indexRef}
        className="font-display hidden text-6xl font-semibold text-white/5 sm:block"
      >
        {index}
      </span>
    </div>
  );
}
