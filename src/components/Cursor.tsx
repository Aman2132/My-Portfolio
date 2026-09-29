"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap } from "@/lib/gsap";

const INTERACTIVE = "a, button, [data-cursor-label], label, input, textarea";
const CURSOR_QUERY = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(CURSOR_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function Cursor() {
  const wrap = useRef<HTMLDivElement>(null);
  const circle = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(CURSOR_QUERY).matches,
    () => false,
  );

  useEffect(() => {
    if (!enabled || !wrap.current) return;
    const el = wrap.current;
    document.documentElement.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(el, { autoAlpha: 1, duration: 0.25, overwrite: "auto" });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(INTERACTIVE);
      const next = target?.dataset.cursorLabel ?? "";
      const isField = target?.matches("input, textarea") ?? false;
      setLabel(next);
      gsap.to(circle.current, {
        scale: next ? 7.5 : target && !isField ? 3.4 : 1,
        duration: 0.6,
        ease: "expo.out",
      });
      gsap.to(text.current, { autoAlpha: next ? 1 : 0, duration: 0.3 });
    };

    const onLeave = () => gsap.to(el, { autoAlpha: 0, duration: 0.25 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className={`pointer-events-none invisible fixed top-0 left-0 z-[90] opacity-0 ${
        label ? "" : "mix-blend-difference"
      }`}
    >
      <div
        ref={circle}
        className={`absolute -top-[6px] -left-[6px] h-3 w-3 rounded-full ${label ? "bg-accent" : "bg-paper"}`}
      />
      <span
        ref={text}
        className="invisible absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 font-mono text-[11px] tracking-[0.16em] whitespace-nowrap text-paper uppercase opacity-0"
      >
        {label}
      </span>
    </div>
  );
}
