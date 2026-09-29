"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useApp } from "@/components/providers/AppProvider";
import RollText from "@/components/ui/RollText";

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { introDone, lenis, scrollTo } = useApp();
  const bar = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      if (!introDone) {
        gsap.set(bar.current, { yPercent: -120 });
        return;
      }
      gsap.to(bar.current, { yPercent: 0, duration: 1.2, ease: "expo.out", delay: 0.6 });

      const hide = gsap
        .to(bar.current, { yPercent: -120, duration: 0.5, ease: "power3.inOut", paused: true })
        .progress(0);

      ScrollTrigger.create({
        start: 120,
        end: "max",
        onUpdate: (self) => (self.direction === 1 ? hide.play() : hide.reverse()),
        onLeaveBack: () => hide.reverse(),
      });

      gsap.fromTo(
        "[data-progress]",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );
    },
    { dependencies: [introDone], revertOnUpdate: true },
  );

  useGSAP(() => {
    menuTl.current = gsap
      .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .fromTo(menu.current, { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.9 })
      .from("[data-menu-link]", { yPercent: 110, stagger: 0.06, duration: 0.9, ease: "expo.out" }, "-=0.35")
      .from("[data-menu-meta]", { autoAlpha: 0, y: 12, duration: 0.5 }, "-=0.6");
  });

  const toggle = (next: boolean) => {
    setOpen(next);
    if (next) {
      lenis.current?.stop();
      menuTl.current?.timeScale(1).play();
    } else {
      lenis.current?.start();
      menuTl.current?.timeScale(1.6).reverse();
    }
  };

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    toggle(false);
    scrollTo(href);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-[60] h-[2px] w-full">
        <div data-progress className="h-full origin-left scale-x-0 bg-accent" />
      </div>

      <header
        ref={bar}
        className="fixed top-0 left-0 z-50 w-full px-5 py-5 text-paper mix-blend-difference md:px-10"
      >
        <nav className="flex items-center justify-between">
          <a href="#top" onClick={(e) => go(e, "#top")} className="group text-sm font-semibold tracking-tight">
            <RollText text="Aman Joshi" />
          </a>

          <ul className="hidden items-center gap-7 text-[13px] md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={(e) => go(e, link.href)} className="group">
                  <RollText text={link.label} />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => toggle(true)}
            className="group text-[13px] font-medium md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <RollText text="Menu" />
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={menu}
        className="fixed inset-0 z-[70] flex flex-col justify-between bg-ink px-5 pt-5 pb-8 text-paper md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
        inert={!open}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold tracking-tight">Aman Joshi</span>
          <button type="button" onClick={() => toggle(false)} className="group text-[13px]">
            <RollText text="Close" />
          </button>
        </div>

        <ul className="space-y-1">
          {navLinks.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <a
                data-menu-link
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="flex items-baseline gap-4 text-[13vw] leading-[1.05] font-semibold tracking-[-0.04em]"
              >
                <span className="font-mono text-xs tracking-normal text-accent">0{i + 1}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <p data-menu-meta className="font-mono text-[11px] tracking-[0.16em] text-muted-inv uppercase">
          Full Stack Developer — Lalitpur, Nepal
        </p>
      </div>
    </>
  );
}
