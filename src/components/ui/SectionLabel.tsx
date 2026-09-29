export default function SectionLabel({
  index,
  label,
  inverted = false,
}: {
  index: string;
  label: string;
  inverted?: boolean;
}) {
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] uppercase ${
        inverted ? "text-muted-inv" : "text-muted"
      }`}
    >
      <span className="text-accent">({index})</span>
      <span>{label}</span>
    </p>
  );
}
