export default function RollText({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`relative inline-block overflow-hidden align-top leading-[1.2] ${className}`}>
      <span className="block transition-transform duration-500 ease-[var(--ease-in-out)] group-hover:-translate-y-full">
        <span className="block">{text}</span>
        <span className="absolute top-full left-0 block" aria-hidden="true">
          {text}
        </span>
      </span>
    </span>
  );
}
