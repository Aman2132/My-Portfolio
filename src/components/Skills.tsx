import { Code2, Server, Users } from "lucide-react";
import { skills } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";

const groups = [
  { title: "Frontend", icon: Code2, items: skills.frontend },
  { title: "Backend", icon: Server, items: skills.backend },
  { title: "Soft skills", icon: Users, items: skills.soft },
];

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="03" kicker="What I work with" title="Skills & tools" />

        <Reveal className="mb-14 -mx-6 space-y-4 px-6">
          <Marquee items={[...skills.frontend, ...skills.backend]} baseVelocity={2} />
          <Marquee items={[...skills.backend, ...skills.frontend].reverse()} baseVelocity={-3} />
        </Reveal>

        <RevealGroup className="grid gap-6 md:grid-cols-3" stagger={0.1}>
          {groups.map((group) => (
            <RevealItem key={group.title}>
              <div className="glass h-full rounded-2xl p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="glass flex h-10 w-10 items-center justify-center rounded-full text-accent">
                    <group.icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-accent hover:text-accent"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
