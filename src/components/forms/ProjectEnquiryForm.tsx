"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ChipSelect } from "./ChipSelect";
import { TextField, TextAreaField } from "./Field";
import {
  enquirySchema,
  STEP_FIELDS,
  SERVICE_OPTIONS,
  PRESENCE_OPTIONS,
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  type EnquiryInput,
} from "@/lib/validation";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Four-step qualifying form.
 *
 * Question order is deliberately easy → committal: step 1 needs no typing at
 * all, and personal details are asked last, once the visitor has already
 * invested effort. Answers survive backward navigation.
 */

const STEP_TITLES = [
  "What do you need?",
  "About your business",
  "Budget & timeline",
  "How do we reach you?",
] as const;

const STEP_BLURBS = [
  "Pick as many as apply. If you're not sure, that's a perfectly good answer too.",
  "Just enough for us to come to the call already understanding your situation.",
  "This helps us recommend something realistic. There's no wrong answer, and “not sure” won't count against you.",
  "Last step. We'll reply " + site.responseTime + ".",
] as const;

type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

const EMPTY: EnquiryInput = {
  services: [],
  businessName: "",
  industry: "",
  presence: "" as EnquiryInput["presence"],
  budget: "" as EnquiryInput["budget"],
  timeline: "" as EnquiryInput["timeline"],
  name: "",
  email: "",
  phone: "",
  message: "",
  company: "",
};

export function ProjectEnquiryForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<EnquiryInput>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const isLastStep = step === STEP_FIELDS.length - 1;

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
    // Clear the error as soon as the user acts on it.
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  /** Validates only the fields belonging to the current step. */
  const validateStep = (index: number): boolean => {
    const result = enquirySchema.safeParse(data);
    if (result.success) return true;

    const fieldErrors = result.error.flatten().fieldErrors;
    const stepFields = STEP_FIELDS[index];
    const next: FieldErrors = {};

    for (const field of stepFields) {
      const message = fieldErrors[field]?.[0];
      if (message) next[field] = message;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goTo = (index: number) => {
    setStep(index);
    // Move focus to the new step heading so keyboard and screen reader users
    // land in the right place rather than at the top of the document.
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const onNext = () => {
    if (validateStep(step)) goTo(step + 1);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateStep(step)) return;

    setStatus("sending");
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json();

      if (!response.ok || !payload.ok) {
        setStatus("error");
        setSubmitError(
          payload.error ?? "Something went wrong. Please try again.",
        );
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setSubmitError(
        "We couldn't reach the server. Please check your connection, or ring us directly.",
      );
    }
  };

  /* ----------------------------------------------------------------- sent */

  if (status === "sent") {
    return (
      <div
        className="flex flex-col items-center rounded-2xl border border-ice/30 bg-ice/5 p-10 text-center"
        role="status"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full bg-ice/15 text-ice">
          <PartyPopper aria-hidden className="size-6" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-ink">
          Thanks {data.name.split(" ")[0]} — that&rsquo;s with us.
        </h2>
        <p className="mt-3 max-w-md leading-relaxed text-muted">
          We&rsquo;ll read it properly and get back to you {site.responseTime}.
          If it&rsquo;s urgent, ring us on{" "}
          <a
            href={`tel:${site.contact.phone}`}
            className="font-mono text-ice hover:underline"
          >
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  /* ----------------------------------------------------------------- form */

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-10"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-faint">
            Step {step + 1} of {STEP_FIELDS.length}
          </p>
          <p className="font-mono text-xs text-faint">
            About {(STEP_FIELDS.length - step) * 20} seconds left
          </p>
        </div>

        <ol className="mt-3 flex gap-1.5" aria-hidden>
          {STEP_FIELDS.map((_, index) => (
            <li
              key={index}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                index < step
                  ? "bg-ice"
                  : index === step
                    ? "bg-ice/60"
                    : "bg-line",
              )}
            />
          ))}
        </ol>
      </div>

      {/* Step heading — announced on change. */}
      <div aria-live="polite">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-2xl font-bold text-ink outline-none"
        >
          {STEP_TITLES[step]}
        </h2>
        <p className="mt-2 leading-relaxed text-muted">{STEP_BLURBS[step]}</p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {step === 0 ? (
          <ChipSelect
            legend="What are you after?"
            hint="Choose as many as you like."
            options={SERVICE_OPTIONS}
            multiple
            value={data.services}
            onChange={(value) => set("services", value)}
            error={errors.services}
          />
        ) : null}

        {step === 1 ? (
          <>
            <TextField
              label="Business name"
              value={data.businessName}
              onChange={(e) => set("businessName", e.target.value)}
              error={errors.businessName}
              autoComplete="organization"
              placeholder="Ridgeline Building Supplies"
            />
            <TextField
              label="What do you do?"
              value={data.industry}
              onChange={(e) => set("industry", e.target.value)}
              error={errors.industry}
              placeholder="Trade supplier, café, plumber, law firm…"
            />
            <ChipSelect
              legend="What have you got online at the moment?"
              options={PRESENCE_OPTIONS}
              value={data.presence}
              onChange={(value) => set("presence", value)}
              error={errors.presence}
            />
          </>
        ) : null}

        {step === 2 ? (
          <>
            <ChipSelect
              legend="Roughly what budget did you have in mind?"
              hint="A ballpark is fine — we'll give you a fixed price after we've talked."
              options={BUDGET_OPTIONS}
              value={data.budget}
              onChange={(value) => set("budget", value)}
              error={errors.budget}
            />
            <ChipSelect
              legend="When would you like this done?"
              options={TIMELINE_OPTIONS}
              value={data.timeline}
              onChange={(value) => set("timeline", value)}
              error={errors.timeline}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                label="Your name"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                error={errors.name}
                autoComplete="name"
              />
              <TextField
                label="Email"
                type="email"
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors.email}
                autoComplete="email"
                inputMode="email"
              />
            </div>
            <TextField
              label="Phone"
              type="tel"
              required={false}
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
              error={errors.phone}
              autoComplete="tel"
              inputMode="tel"
              hint="If you'd rather we rang than emailed."
            />
            <TextAreaField
              label="Anything else we should know?"
              required={false}
              value={data.message}
              onChange={(e) => set("message", e.target.value)}
              error={errors.message}
              placeholder="What's frustrating you at the moment? What would success look like?"
            />

            {/* Honeypot — off-screen, never announced, never tabbable. */}
            <div aria-hidden className="absolute -left-[9999px]">
              <label htmlFor="company-website">
                Company website (leave blank)
              </label>
              <input
                id="company-website"
                name="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={data.company}
                onChange={(e) => set("company", e.target.value)}
              />
            </div>
          </>
        ) : null}
      </div>

      {submitError ? (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-glow/40 bg-glow/10 px-4 py-3 text-sm text-glow-soft"
        >
          {submitError}
        </p>
      ) : null}

      {/* Actions */}
      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <Button
            type="button"
            variant="ghost"
            onClick={() => goTo(step - 1)}
            disabled={status === "sending"}
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </Button>
        ) : (
          <span className="hidden sm:block" />
        )}

        {isLastStep ? (
          <Button type="submit" size="lg" disabled={status === "sending"}>
            {status === "sending" ? (
              <>
                <Loader2 aria-hidden className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Check aria-hidden className="size-4" />
                Send enquiry
              </>
            )}
          </Button>
        ) : (
          <Button type="button" size="lg" onClick={onNext}>
            Continue
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
        )}
      </div>
    </form>
  );
}
