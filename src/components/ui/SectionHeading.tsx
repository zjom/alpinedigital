import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Heading level — sections on a page below the h1 should stay h2. */
  as?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Tag className="text-(length:--text-display-md) text-ink">{title}</Tag>
      {description ? (
        <p
          className={cn(
            "text-base leading-relaxed text-muted sm:text-lg",
            centered ? "max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
