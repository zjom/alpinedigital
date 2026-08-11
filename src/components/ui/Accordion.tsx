"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = {
  question: string;
  answer: string;
};

/**
 * Built on native <button>/<div> with aria-expanded + aria-controls rather than
 * <details>, so the open/close can animate and only one item stays open at a
 * time. Fully keyboard operable; the whole header row is the trigger.
 */
export function Accordion({
  items,
  className,
}: {
  items: readonly AccordionItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-ice sm:py-6"
              >
                <span className="font-display text-base font-semibold text-ink sm:text-lg">
                  {item.question}
                </span>
                <Plus
                  aria-hidden
                  className={cn(
                    "mt-0.5 size-5 shrink-0 text-ice transition-transform duration-300 ease-out",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-2xl pr-10 leading-relaxed text-muted">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
