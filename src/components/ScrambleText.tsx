"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "!<>-_\\/[]{}=+*^?#@$%&";

export default function ScrambleText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [output, setOutput] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frameId = 0;
    let frame = 0;
    let started = false;

    const queue = Array.from(text).map((char, i) => ({
      char,
      start: Math.floor(i * 1.6 + Math.random() * 6),
      end: Math.floor(i * 1.6 + 10 + Math.random() * 14),
    }));

    const run = () => {
      let settled = 0;
      const next = queue.map((item) => {
        if (frame >= item.end) {
          settled += 1;
          return item.char;
        }
        if (frame >= item.start) {
          if (item.char === " ") return " ";
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        return " ";
      });
      setOutput(next.join(""));
      frame += 1;
      if (settled < queue.length) frameId = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            frameId = requestAnimationFrame(run);
          }
        });
      },
      { threshold: 0 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {output}
    </span>
  );
}
