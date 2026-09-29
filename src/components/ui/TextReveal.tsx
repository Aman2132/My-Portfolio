"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, SplitText, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";

type RevealType = "lines" | "words" | "chars";

export default function TextReveal({
  children,
  as = "div",
  className = "",
  type = "lines",
  delay = 0,
  stagger,
  duration = 1.1,
  start = "top 88%",
  intro = false,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  type?: RevealType;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  intro?: boolean;
}) {
  const Tag = as;
  const ref = useRef<HTMLElement>(null);
  const { introDone } = useApp();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      if (intro && !introDone) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, { autoAlpha: 1 });

      const split = SplitText.create(el, {
        type: type === "chars" ? "words,chars" : type,
        mask: type === "chars" ? "words" : type,
        autoSplit: type === "lines",
        onSplit(self) {
          // Masks clip to the line box; pad them so descenders and italic overhangs aren't cut, with no net layout shift.
          gsap.set(self.masks, {
            paddingBottom: "0.16em",
            marginBottom: "-0.16em",
            paddingRight: "0.08em",
            marginRight: "-0.08em",
          });
          const targets = type === "chars" ? self.chars : type === "words" ? self.words : self.lines;
          return gsap.from(targets, {
            yPercent: 115,
            rotate: type === "lines" ? 0 : 4,
            duration,
            delay,
            ease: "expo.out",
            stagger: stagger ?? (type === "chars" ? 0.022 : type === "words" ? 0.05 : 0.09),
            scrollTrigger: intro ? undefined : { trigger: el, start, once: true },
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [introDone], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
