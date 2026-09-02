import { profile, experience, projects } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeading from "@/components/SectionHeading";

const stats = [
  { label: "Years of experience", value: 2, suffix: "+" },
  { label: "Client products shipped", value: experience[0].clientWork.length, suffix: "" },
  { label: "Projects built", value: projects.length, suffix: "" },
  { label: "Best project award", value: 1, suffix: "" },
];

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" kicker="Who I am" title="About me" />

        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal delay={0.1}>
            <p className="text-2xl leading-relaxed text-foreground/90 sm:text-3xl">
              {profile.longSummary}
            </p>
          </Reveal>

          <RevealGroup className="grid grid-cols-2 gap-6" stagger={0.08}>
            {stats.map((stat) => (
              <RevealItem key={stat.label} className="glass rounded-2xl p-6">
                <div className="font-display text-4xl font-semibold text-gradient">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
