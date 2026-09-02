import { Reveal } from "@/components/Reveal";

export default function SectionHeading({
  index,
  title,
  kicker,
}: {
  index: string;
  title: string;
  kicker: string;
}) {
  return (
    <Reveal className="mb-14 flex items-end justify-between gap-6 border-b border-border pb-6">
      <div>
        <span className="font-mono text-sm text-accent">{kicker}</span>
        <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h2>
      </div>
      <span className="font-display hidden text-6xl font-semibold text-white/5 sm:block">
        {index}
      </span>
    </Reveal>
  );
}
