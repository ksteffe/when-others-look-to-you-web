import type { PatternsPageContent } from "@/lib/content";
import { getPatternsGrouped, patternGroups } from "@/lib/content";
import { PatternCard, type PatternCardTone } from "@/components/ui/PatternCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const toneCycle: PatternCardTone[] = ["blue", "teal", "gold"];

export type PatternsPageProps = {
  content: PatternsPageContent;
};

/**
 * `/patterns` — intro plus appendix-grouped grids of {@link PatternCard}.
 */
export function PatternsPage({ content }: PatternsPageProps) {
  const { label, title, intro, introLine2 } = content;
  const grouped = getPatternsGrouped();

  return (
    <>
      <Section variant="light">
        <Container>
          <div className="space-y-14 sm:space-y-16 md:space-y-20">
            <header className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
                {label}
              </p>
              <h1 className="heading-lg text-brand-navy">{title}</h1>
              <p className="body-lg text-pretty text-neutral-600">{intro}</p>
              {introLine2 ? (
                <p className="body-lg text-pretty text-neutral-600">{introLine2}</p>
              ) : null}
            </header>

            <div className="space-y-16 sm:space-y-20">
              {grouped.map(({ group, patterns: groupPatterns }, groupIndex) => {
                const meta = patternGroups[group];
                const toneOffset = grouped
                  .slice(0, groupIndex)
                  .reduce((acc, g) => acc + g.patterns.length, 0);
                return (
                  <section
                    key={group}
                    className="border-t border-neutral-200/90 pt-14 first:border-t-0 first:pt-0 sm:pt-16 first:sm:pt-0"
                    aria-labelledby={`pattern-group-${group}`}
                  >
                    <div className="mx-auto max-w-3xl">
                      <h2
                        id={`pattern-group-${group}`}
                        className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-brand-navy sm:text-[1.65rem]"
                      >
                        {meta.title}
                      </h2>
                      <p className="mt-3 body-lg text-pretty text-neutral-600">
                        {meta.description}
                      </p>
                    </div>
                    <ul className="mt-10 grid grid-cols-1 gap-7 sm:mt-12 sm:gap-8 lg:grid-cols-3 lg:gap-10">
                      {groupPatterns.map((card, i) => {
                        const tone =
                          toneCycle[(toneOffset + i) % toneCycle.length]!;
                        return (
                          <li key={card.slug} className="min-w-0">
                            <PatternCard
                              number={card.number}
                              title={card.title}
                              description={card.description}
                              exploreHref={card.href}
                              tone={tone}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
