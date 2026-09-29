"use client";

import { useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

export default function Marquee({
  items,
  baseVelocity = 2,
}: {
  items: string[];
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], { clamp: false });
  const skewX = useTransform(smoothVelocity, [-2500, 2500], [-6, 6], { clamp: true });

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionRef = useRef(1);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);
    const factor = velocityFactor.get();

    if (factor < 0) directionRef.current = -1;
    else if (factor > 0) directionRef.current = 1;

    moveBy += directionRef.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  const loop = [...items, ...items, ...items, ...items];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <motion.div className="flex w-max gap-4" style={{ x, skewX }}>
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="glass rounded-full px-5 py-2 font-mono text-sm whitespace-nowrap text-foreground/85"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
