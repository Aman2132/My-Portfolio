import { Award, Sparkles } from "lucide-react";
import { projects } from "@/lib/data";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import TiltCard from "@/components/TiltCard";

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" kicker="Things I've built" title="Projects" />

        <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.1}>
          {projects.map((project) => (
            <RevealItem key={project.name}>
              <TiltCard className="glass flex h-full flex-col rounded-2xl p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{project.name}</h3>
                    <p className="mt-1 font-mono text-xs text-muted">
                      {project.period} · {project.location}
                    </p>
                  </div>
                  {project.status === "ongoing" ? (
                    <span className="glass flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[11px] text-accent-3">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-3" />
                      Ongoing
                    </span>
                  ) : (
                    <span className="glass flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[11px] text-muted">
                      <Sparkles size={11} /> Complete
                    </span>
                  )}
                </div>

                {project.badge && (
                  <span className="mt-4 flex w-fit items-center gap-2 rounded-full border border-accent-2/40 bg-accent-2/10 px-3 py-1 font-mono text-[11px] text-accent-2">
                    <Award size={12} /> {project.badge}
                  </span>
                )}

                <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                  {project.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {project.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap gap-2 pt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-foreground/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
