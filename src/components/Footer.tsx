import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built with Next.js, Framer Motion & GSAP.
        </p>
        <a href="#top" data-cursor-hover className="hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
