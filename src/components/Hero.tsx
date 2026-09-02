"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { profile } from "@/lib/data";
import MagneticButton from "@/components/MagneticButton";

const roles = ["Full Stack Developer", "Backend & Node.js", "React / Next.js", "IoT Builder"];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const blobARef = useRef<HTMLDivElement>(null);
  const blobBRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [display, setDisplay] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const full = roles[roleIndex];
    let i = 0;
    setDisplay("");
    const type = setInterval(() => {
      i += 1;
      setDisplay(full.slice(0, i));
      if (i >= full.length) clearInterval(type);
    }, 32);
    return () => clearInterval(type);
  }, [roleIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(blobARef.current, {
        yPercent: 22,
        xPercent: -8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(blobBRef.current, {
        yPercent: -18,
        xPercent: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6"
    >
      <div
        ref={blobARef}
        className="animate-float-slow pointer-events-none absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-accent-2/25 blur-[110px]"
      />
      <div
        ref={blobBRef}
        className="animate-float-slow pointer-events-none absolute top-1/3 -right-24 h-[26rem] w-[26rem] rounded-full bg-accent/20 blur-[110px]"
        style={{ animationDelay: "-4s" }}
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass w-fit rounded-full px-4 py-1.5 font-mono text-xs tracking-wide text-accent-3"
        >
          Available for new work · {profile.location}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl leading-[1.05] font-semibold tracking-tight sm:text-7xl lg:text-8xl"
        >
          Hi, I&apos;m{" "}
          <span className="text-gradient">{profile.name.split(" ")[0]}</span>
          <br />
          I build for the web.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-lg text-muted sm:text-xl"
        >
          <span className="text-foreground">{display}</span>
          <span className="caret-blink text-accent">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          {profile.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <MagneticButton as="a" href="#projects">
            <span className="font-display inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform">
              View my work
            </span>
          </MagneticButton>
          <MagneticButton as="a" href="/resume.pdf">
            <span className="glass font-display inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground">
              Download resume
            </span>
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-border p-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-accent"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
