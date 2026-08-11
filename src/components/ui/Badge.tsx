import { cn } from "@/lib/cn";

type Tone = "ice" | "glow" | "neutral";

const TONES: Record<Tone, string> = {
  ice: "border-ice/25 bg-ice/10 text-ice",
  glow: "border-glow/25 bg-glow/10 text-glow-soft",
  neutral: "border-line-strong bg-surface-2 text-muted",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
