"use client";

import { Fragment, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollStory({
  text,
  className,
  pinned = false,
}: {
  text: string;
  className?: string;
  pinned?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const targets = wrapRef.current?.querySelectorAll("[data-story-word]");
      if (!targets || targets.length === 0) return;

      gsap.fromTo(
        targets,
        { opacity: 0.13, filter: "blur(3px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 1,
          scrollTrigger: pinned
            ? {
                trigger: wrapRef.current,
                start: "top top",
                end: "+=130%",
                scrub: 0.4,
                pin: true,
                anticipatePin: 1,
              }
            : {
                trigger: wrapRef.current,
                start: "top 78%",
                end: "bottom 58%",
                scrub: 0.4,
              },
        },
      );
    }, wrapRef);
    return () => ctx.revert();
  }, [text, pinned]);

  return (
    <div ref={wrapRef} className={pinned ? "flex min-h-[100svh] items-center" : undefined}>
      <p className={className}>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            <span data-story-word className="inline-block">
              {word}
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </p>
    </div>
  );
}
