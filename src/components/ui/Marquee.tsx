"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

export default function Marquee({
  children,
  speed = 2.5,
  direction = -1,
  pauseOnHover = false,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  direction?: 1 | -1;
  pauseOnHover?: boolean;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const wrap = gsap.utils.wrap(-50, 0);
      const setX = gsap.quickSetter(track.current, "xPercent");
      let x = direction === 1 ? -50 : 0;
      let dir: number = direction;
      let boost = 0;

      const tick = (_time: number, delta: number) => {
        if (paused.current) return;
        x = wrap(x + dir * speed * (delta / 1000) * (1 + boost));
        boost *= 0.93;
        setX(x);
      };
      gsap.ticker.add(tick);

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          boost = Math.min(Math.abs(self.getVelocity()) / 220, 7);
          dir = direction * self.direction;
        },
      });

      return () => {
        gsap.ticker.remove(tick);
        st.kill();
      };
    },
    { scope: root },
  );

  const hover = pauseOnHover
    ? {
        onMouseEnter: () => {
          paused.current = true;
        },
        onMouseLeave: () => {
          paused.current = false;
        },
      }
    : {};

  return (
    <div ref={root} className={`overflow-hidden ${className}`} {...hover}>
      <div ref={track} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
