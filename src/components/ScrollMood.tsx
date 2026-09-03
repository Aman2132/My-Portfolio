"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollMood() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(layerRef.current, {
        rotate: 60,
        yPercent: -12,
        filter: "hue-rotate(160deg)",
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      <div ref={layerRef} className="absolute inset-[-25%] opacity-70">
        <div className="absolute top-[8%] left-[12%] h-[38rem] w-[38rem] rounded-full bg-accent-2/20 blur-[150px]" />
        <div className="absolute top-[52%] right-[8%] h-[34rem] w-[34rem] rounded-full bg-accent/18 blur-[150px]" />
        <div className="absolute bottom-[4%] left-[32%] h-[32rem] w-[32rem] rounded-full bg-accent-3/14 blur-[150px]" />
      </div>
    </div>
  );
}
