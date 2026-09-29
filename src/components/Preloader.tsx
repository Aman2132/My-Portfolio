"use client";

import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { profile } from "@/lib/data";

export default function Preloader() {
  const { finishIntro } = useApp();
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        finishIntro();
        setGone(true);
        return;
      }

      const counter = { value: 0 };
      const countEl = root.current!.querySelector<HTMLElement>("[data-count]")!;

      const tl = gsap.timeline({
        defaults: { ease: "expo.inOut" },
        onComplete: () => setGone(true),
      });

      tl.from("[data-pre-line]", { yPercent: 110, duration: 0.9, stagger: 0.08, ease: "expo.out" })
        .to(
          counter,
          {
            value: 100,
            duration: 1.7,
            ease: "power2.inOut",
            onUpdate: () => {
              countEl.textContent = String(Math.round(counter.value)).padStart(3, "0");
            },
          },
          0.1,
        )
        .fromTo("[data-pre-bar]", { scaleX: 0 }, { scaleX: 1, duration: 1.7, ease: "power2.inOut" }, 0.1)
        .to("[data-pre-line], [data-count]", { yPercent: -110, duration: 0.7, stagger: 0.04, ease: "expo.in" })
        .to(root.current, { yPercent: -100, duration: 1.1 }, "-=0.15")
        .add(finishIntro, "-=0.75");
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-6 text-paper md:px-10 md:py-8"
      aria-hidden="true"
    >
      <div className="flex justify-between font-mono text-[11px] tracking-[0.18em] uppercase">
        <span className="overflow-hidden">
          <span data-pre-line className="block">
            {profile.name}
          </span>
        </span>
        <span className="overflow-hidden">
          <span data-pre-line className="block">
            Portfolio — {new Date().getFullYear()}
          </span>
        </span>
      </div>

      <div>
        <div className="flex items-end justify-between gap-6">
          <span className="overflow-hidden">
            <span data-pre-line className="block max-w-xs text-sm leading-snug text-muted-inv md:text-base">
              {profile.role}
              <br />
              {profile.location}
            </span>
          </span>
          <span className="overflow-hidden leading-[0.8]">
            <span
              data-count
              className="block text-[28vw] font-semibold tracking-[-0.06em] tabular-nums md:text-[18vw]"
            >
              000
            </span>
          </span>
        </div>
        <div className="mt-6 h-px w-full bg-line-inv">
          <div data-pre-bar className="h-full origin-left bg-accent" />
        </div>
      </div>
    </div>
  );
}
