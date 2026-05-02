"use client";

import { useState } from "react";

export type SubscribeFormProps = {
  /** Uppercase eyebrow (gold in parent layout) */
  heading?: string;
  description?: string;
  placeholder?: string;
  submitLabel?: string;
};

const defaultHeading = "Get updates";
const defaultDescription =
  "Occasional notes—no spam. Unsubscribe anytime.";
const defaultPlaceholder = "you@example.com";
const defaultSubmit = "Subscribe";

/**
 * Placeholder signup UI — wire to your ESP or API later. Submit does not POST anywhere yet.
 */
export function SubscribeForm({
  heading = defaultHeading,
  description = defaultDescription,
  placeholder = defaultPlaceholder,
  submitLabel = defaultSubmit,
}: SubscribeFormProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="rounded-xl border border-neutral-200/90 bg-white p-6 shadow-soft">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
        {heading}
      </p>
      <p className="mt-2 body-sm text-neutral-600">{description}</p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <label htmlFor="subscribe-email" className="sr-only">
          Email address
        </label>
        <input
          id="subscribe-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          disabled={submitted}
          className="min-h-[44px] w-full flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-inner transition-colors duration-200 placeholder:text-neutral-400 focus:border-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/35 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={submitted}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-brand-gold px-6 py-2.5 text-xs font-semibold tracking-wide text-brand-navy shadow-sm transition-all duration-200 ease-out hover:bg-brand-gold/92 hover:shadow active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold disabled:opacity-60 sm:text-sm"
        >
          {submitted ? "Thanks!" : submitLabel}
        </button>
      </form>
      {submitted ? (
        <p className="mt-3 body-sm text-neutral-600" role="status">
          We&apos;ll connect this form when the list is ready.
        </p>
      ) : null}
    </div>
  );
}
