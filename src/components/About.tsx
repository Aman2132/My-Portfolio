import { profile, experience, projects } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import AnimatedCounter from "@/components/AnimatedCounter";
import SectionHeading from "@/components/SectionHeading";
import ScrollStory from "@/components/ScrollStory";

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

        <ScrollStory
          text={profile.longSummary}
          className="max-w-4xl text-2xl leading-[1.45] font-medium text-foreground sm:text-3xl lg:text-4xl"
        />

        <RevealGroup className="mt-24 grid grid-cols-2 gap-6 lg:grid-cols-4" stagger={0.08}>
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
    </section>
  );
}
