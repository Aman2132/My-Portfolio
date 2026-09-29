import { Asterisk } from "lucide-react";
import Marquee from "@/components/ui/Marquee";

const phrases = [
  "Transaction systems",
  "Payment gateways",
  "Third-party APIs",
  "React & Next.js",
  "IoT prototypes",
  "Built end to end",
];

export default function FocusMarquee() {
  return (
    <section aria-label="Focus areas" className="border-y border-line py-6 md:py-10">
      <Marquee speed={2.2}>
        {phrases.map((phrase, i) => (
          <span key={phrase} className="flex items-center">
            <span
              className={`px-[2.5vw] text-[clamp(3.25rem,8.5vw,8.5rem)] leading-none font-semibold whitespace-nowrap uppercase ${
                i % 2 ? "text-outline-ink tracking-[0.005em]" : "tracking-[-0.045em]"
              }`}
            >
              {phrase}
            </span>
            <Asterisk className="h-[clamp(2rem,5vw,5rem)] w-[clamp(2rem,5vw,5rem)] shrink-0 text-accent" strokeWidth={2.5} />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
