"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type AppContextValue = {
  lenis: React.RefObject<Lenis | null>;
  introDone: boolean;
  finishIntro: () => void;
  scrollTo: (target: string | number) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({ lerp: 0.09, anchors: true, stopInertiaOnNavigate: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (introDone) {
      lenis.start();
      ScrollTrigger.refresh();
    } else {
      lenis.stop();
    }
  }, [introDone]);

  const finishIntro = useCallback(() => setIntroDone(true), []);

  const scrollTo = useCallback((target: string | number) => {
    lenisRef.current?.scrollTo(target, { duration: 1.4 });
  }, []);

  return (
    <AppContext.Provider value={{ lenis: lenisRef, introDone, finishIntro, scrollTo }}>
      {children}
    </AppContext.Provider>
  );
}
