import { GraduationCap } from "lucide-react";
import { education } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="05" kicker="How I got here" title="Education" />

        <RevealGroup className="grid gap-6 sm:grid-cols-2" stagger={0.1}>
          {education.map((item) => (
            <RevealItem key={item.school}>
              <div className="glass h-full rounded-2xl p-7">
                <span className="glass mb-5 flex h-10 w-10 items-center justify-center rounded-full text-accent-2">
                  <GraduationCap size={18} />
                </span>
                <h3 className="font-display text-lg font-semibold">{item.school}</h3>
                <p className="mt-1 text-sm text-foreground/80">{item.program}</p>
                <p className="mt-3 font-mono text-xs text-muted">
                  {item.period} · {item.location}
                </p>
                {item.detail && (
                  <p className="mt-4 w-fit rounded-full border border-border px-3 py-1 font-mono text-xs text-accent-3">
                    {item.detail}
                  </p>
                )}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
