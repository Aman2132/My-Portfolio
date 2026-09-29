"use client";

import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import { profile } from "@/lib/data";
import RollText from "@/components/ui/RollText";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useApp();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-wordmark-char]", {
        yPercent: 100,
        duration: 1.4,
        stagger: 0.04,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-wordmark]", start: "top 95%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="overflow-hidden bg-ink px-5 pb-6 text-paper md:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-inv py-6 font-mono text-[11px] tracking-[0.16em] text-muted-inv uppercase">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span>Built with Next.js & GSAP</span>
        <button type="button" onClick={() => scrollTo(0)} className="group flex items-center gap-2 uppercase">
          <RollText text="Back to top" />
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>

      <p
        data-wordmark
        aria-hidden="true"
        className="flex justify-between overflow-hidden pt-4 text-[15.5vw] leading-[0.8] font-semibold tracking-[-0.06em] uppercase"
      >
        {profile.name.split("").map((ch, i) => (
          <span key={i} data-wordmark-char className="inline-block">
            {ch === " " ? " " : ch}
          </span>
        ))}
      </p>
    </footer>
  );
}
