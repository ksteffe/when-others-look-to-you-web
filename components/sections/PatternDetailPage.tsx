import Link from "next/link";
import { Fragment } from "react";
import {
  getRelatedPatterns,
  patternGroups,
  type PatternCardItem,
} from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const LABELS = {
  context: "Context",
  problem: "Problem",
  forces: "Forces",
  observation: "Observation",
  effect: "Effect",
  resultingContext: "Resulting context",
  related: "Related patterns",
  allPatterns: "All patterns",
} as const;

const eyebrowClass =
  "text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold";

const h2 =
  "font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight text-brand-navy sm:text-2xl";

type PatternDetailPageProps = {
  pattern: PatternCardItem;
};

function TextBlock({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  return (
    <section className="scroll-mt-24" aria-labelledby={id}>
      <h2 id={id} className={h2}>
        {title}
      </h2>
      <p className="mt-5 body-lg text-pretty text-neutral-600">{body}</p>
    </section>
  );
}

export function PatternDetailPage({ pattern }: PatternDetailPageProps) {
  const { number, title, description, detail } = pattern;
  const related = getRelatedPatterns(pattern);
  const groupMeta = patternGroups[detail.group];

  return (
    <>
      <Section
        variant="dark"
        className="!py-[clamp(3rem,9vw,5.5rem)] sm:!py-[clamp(3.5rem,10vw,6.5rem)]"
      >
        <Container>
          <header className="mx-auto max-w-[40rem]">
            <p className={eyebrowClass}>{groupMeta.title}</p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              <span className="tabular-nums">{number}</span> PATTERN
            </p>
            <h1 className="mt-5 heading-xl text-white">{title}</h1>
            <p className="mt-4 body-lg leading-relaxed text-zinc-400">
              {groupMeta.description}
            </p>
            <p className="mt-7 body-lg text-pretty text-zinc-300/95">
              {description}
            </p>

            {related.length > 0 ? (
              <nav
                aria-label="Related patterns"
                className="mt-10 border-t border-white/15 pt-8"
              >
                <p className="body-lg leading-relaxed text-zinc-400">
                  <span className="font-semibold text-zinc-300">
                    Related ideas
                  </span>
                  {": "}
                  {related.map(({ pattern: rp, linkText }, i) => (
                    <Fragment key={rp.slug}>
                      {i > 0 ? (
                        <span aria-hidden className="text-zinc-600">
                          {" "}
                          ·{" "}
                        </span>
                      ) : null}
                      <Link
                        href={rp.href}
                        className="font-medium text-brand-gold/95 underline-offset-[3px] transition-colors hover:text-brand-gold hover:underline"
                      >
                        {linkText}
                      </Link>
                    </Fragment>
                  ))}
                </p>
              </nav>
            ) : null}
          </header>
        </Container>
      </Section>

      <Section variant="light">
        <Container>
          <div className="mx-auto max-w-[40rem] space-y-12 sm:space-y-14">
            <TextBlock
              id="context"
              title={LABELS.context}
              body={detail.context}
            />
            <TextBlock
              id="problem"
              title={LABELS.problem}
              body={detail.problem}
            />

            <section className="scroll-mt-24" aria-labelledby="forces-heading">
              <h2 id="forces-heading" className={h2}>
                {LABELS.forces}
              </h2>
              <ul className="mt-5 list-disc space-y-2 pl-6 body-lg text-pretty text-neutral-600 marker:text-brand-navy/50">
                {detail.forces.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <TextBlock
              id="observation"
              title={LABELS.observation}
              body={detail.observation}
            />

            <figure className="scroll-mt-24 border-l-[3px] border-brand-gold/90 pl-6 sm:pl-8">
              <blockquote className="font-[family-name:var(--font-heading)] text-lg italic leading-relaxed text-brand-navy sm:text-xl">
                <p>&ldquo;{detail.quote}&rdquo;</p>
              </blockquote>
            </figure>

            <TextBlock id="effect" title={LABELS.effect} body={detail.effect} />
            <TextBlock
              id="resulting-context"
              title={LABELS.resultingContext}
              body={detail.resultingContext}
            />
          </div>
        </Container>
      </Section>

      <Section variant="dark">
        <Container>
          <div className="mx-auto max-w-[42rem]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
              <h2 className="heading-lg text-zinc-100">{LABELS.related}</h2>
              <Link
                href="/patterns"
                className="shrink-0 text-sm font-semibold text-brand-gold/95 underline-offset-4 transition-colors hover:text-brand-gold hover:underline"
              >
                {LABELS.allPatterns}
              </Link>
            </div>

            <ul className="mt-10 grid gap-5 sm:grid-cols-2">
              {related.map(({ pattern: p, linkText }) => (
                <li key={p.slug}>
                  <Link
                    href={p.href}
                    className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold/90">
                      {p.number}
                    </p>
                    <p className="mt-3 font-[family-name:var(--font-heading)] text-lg font-semibold leading-snug text-zinc-100 group-hover:text-white">
                      {linkText}
                    </p>
                    <p className="mt-1 text-sm font-medium text-zinc-400">
                      {p.title}
                    </p>
                    <p className="mt-3 flex-1 body-sm leading-relaxed text-zinc-400">
                      {p.description}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-gold/90 transition-transform duration-200 group-hover:translate-x-0.5">
                      Read full pattern
                      <span aria-hidden>→</span>
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
