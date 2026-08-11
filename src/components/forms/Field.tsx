"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type BaseProps = {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
};

/** Wires label, hint and error together with the right aria plumbing. */
function useFieldIds(error?: string, hint?: string) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return { id, errorId, hintId, describedBy };
}

function FieldShell({
  label,
  error,
  hint,
  required,
  id,
  errorId,
  hintId,
  children,
}: BaseProps & {
  id: string;
  errorId: string;
  hintId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required ? null : (
          <span className="ml-2 font-mono text-xs text-faint">optional</span>
        )}
      </label>
      {hint ? (
        <p id={hintId} className="text-xs text-faint">
          {hint}
        </p>
      ) : null}
      {children}
      {error ? (
        <p id={errorId} className="text-xs text-danger-soft">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const CONTROL =
  "w-full rounded-xl border bg-surface-2 px-4 py-3 text-ink placeholder:text-faint " +
  "transition-colors outline-none focus:border-ice";

export function TextField({
  label,
  error,
  hint,
  required = true,
  ...props
}: BaseProps & React.ComponentPropsWithoutRef<"input">) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint);

  return (
    <FieldShell
      label={label}
      error={error}
      hint={hint}
      required={required}
      id={id}
      errorId={errorId}
      hintId={hintId}
    >
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(CONTROL, error ? "border-danger/60" : "border-line")}
        {...props}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  label,
  error,
  hint,
  required = true,
  ...props
}: BaseProps & React.ComponentPropsWithoutRef<"textarea">) {
  const { id, errorId, hintId, describedBy } = useFieldIds(error, hint);

  return (
    <FieldShell
      label={label}
      error={error}
      hint={hint}
      required={required}
      id={id}
      errorId={errorId}
      hintId={hintId}
    >
      <textarea
        id={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={cn(
          CONTROL,
          "resize-y",
          error ? "border-danger/60" : "border-line",
        )}
        {...props}
      />
    </FieldShell>
  );
}
