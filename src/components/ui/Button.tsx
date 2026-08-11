import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

// No `whitespace-nowrap` here on purpose: a long label (e.g. "Talk to us about
// Google Ads & Merchant Center") would then force horizontal page scroll on a
// 375px viewport. Labels wrap and stay centred instead.
const BASE =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "text-center transition-all duration-200 ease-out " +
  "disabled:pointer-events-none disabled:opacity-50";

const VARIANTS: Record<Variant, string> = {
  // Ice fill, base-coloured text. The single strongest affordance on the page.
  primary:
    "bg-ice text-base font-semibold shadow-[0_0_0_0_rgb(127_163_196/0.5)] " +
    "hover:bg-ice-soft hover:shadow-[0_8px_30px_-6px_rgb(127_163_196/0.55)] " +
    "hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-line-strong bg-surface/60 text-ink backdrop-blur-sm " +
    "hover:border-ice/60 hover:bg-surface-2 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-muted hover:text-ink hover:bg-surface-2",
};

const SIZES: Record<Size, string> = {
  // min-h keeps every target >= 44px for touch; py lets wrapped labels grow
  // the button rather than overflowing it.
  sm: "min-h-[40px] px-4 py-2 text-sm",
  md: "min-h-[46px] px-5 py-2.5 text-[0.9375rem]",
  lg: "min-h-[54px] px-7 py-3 text-base",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
} & Omit<React.ComponentPropsWithoutRef<"a">, keyof CommonProps | "href">;

type ButtonAsButton = CommonProps & {
  href?: never;
} & Omit<React.ComponentPropsWithoutRef<"button">, keyof CommonProps>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;

  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className);

  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    // Absolute URLs and tel:/mailto: bypass the client router.
    const isExternal = /^(https?:|tel:|mailto:)/.test(href);

    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
