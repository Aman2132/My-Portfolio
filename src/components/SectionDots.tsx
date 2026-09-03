"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SectionDots() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 xl:flex">
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          data-cursor-hover
          className="group flex items-center gap-3"
        >
          <span className="translate-x-2 rounded-full bg-background-alt px-2.5 py-1 font-mono text-[10px] text-muted opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {s.label}
          </span>
          <span className="relative flex h-3 w-3 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-accent"
              animate={{ scale: active === s.id ? 1 : 0, opacity: active === s.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                active === s.id ? "bg-accent" : "bg-muted/50 group-hover:bg-foreground/70"
              }`}
            />
          </span>
        </a>
      ))}
    </div>
  );
}
