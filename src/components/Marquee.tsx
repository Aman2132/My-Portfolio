"use client";

export default function Marquee({
  items,
  reverse = false,
  speed = 28,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const loop = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="glass rounded-full px-5 py-2 font-mono text-sm text-foreground/85 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
