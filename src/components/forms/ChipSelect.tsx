"use client";

import { useId } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Chip-styled choice group.
 *
 * Built on real <input type="radio"|"checkbox"> inside a <fieldset>, with the
 * input visually hidden but still focusable — so arrow keys, space, screen
 * reader group semantics and form autofill all behave natively. Styling hangs
 * off peer-checked / peer-focus-visible rather than being reimplemented in JS.
 */

type ChipSelectProps<T extends string> = {
  legend: string;
  hint?: string;
  options: readonly T[];
  error?: string;
} & (
  | { multiple: true; value: T[]; onChange: (value: T[]) => void }
  | { multiple?: false; value: T | ""; onChange: (value: T) => void }
);

export function ChipSelect<T extends string>(props: ChipSelectProps<T>) {
  const { legend, hint, options, error } = props;
  const name = useId();
  const errorId = `${name}-error`;
  const hintId = `${name}-hint`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  const isSelected = (option: T) =>
    props.multiple ? props.value.includes(option) : props.value === option;

  const toggle = (option: T) => {
    if (props.multiple) {
      props.onChange(
        props.value.includes(option)
          ? props.value.filter((v) => v !== option)
          : [...props.value, option],
      );
    } else {
      props.onChange(option);
    }
  };

  return (
    <fieldset aria-describedby={describedBy} aria-invalid={error ? true : undefined}>
      <legend className="text-sm font-medium text-ink">{legend}</legend>

      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-faint">
          {hint}
        </p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = isSelected(option);

          return (
            <label
              key={option}
              className="cursor-pointer"
            >
              <input
                type={props.multiple ? "checkbox" : "radio"}
                name={name}
                value={option}
                checked={selected}
                onChange={() => toggle(option)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "inline-flex min-h-[46px] items-center gap-2 rounded-full border px-5 py-3 text-sm transition-all",
                  "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-ice",
                  selected
                    ? "border-ice bg-ice/12 font-medium text-ice"
                    : "border-line-strong bg-surface-2 text-muted hover:border-ice/40 hover:text-ink",
                )}
              >
                {selected ? (
                  <Check aria-hidden className="size-4 shrink-0" />
                ) : null}
                {option}
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id={errorId} className="mt-3 text-xs text-glow-soft">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
