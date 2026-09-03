"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SplitReveal({
  text,
  className,
  as = "span",
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  as?: "span" | "h2" | "h3" | "p";
  stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");
  const Tag = as as "span";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const targets = ref.current?.querySelectorAll("[data-split-word]");
      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        { yPercent: 115, rotateZ: 6, opacity: 0 },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power4.out",
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 88%",
          },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [stagger, text]);

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
          <span data-split-word className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
