import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroBookImage } from "@/components/ui/HeroBookImage";
import type { HeroLeadSegment } from "@/lib/content";
import { cn } from "@/lib/cn";

export type HeroProps = {
  title: string;
  leadSegments: readonly HeroLeadSegment[];
  primaryCta: { label: string; href: string };
  secondaryCta: {
    label: string;
    href: string;
    showPlayIcon?: boolean;
  };
  /** From `lib/content` / public URLs — never hardcode paths inside the Hero */
  imageSrc?: string;
  imageAlt: string;
  /** Full-bleed background from `/public/assets` (e.g. hero-bg.png) */
  backgroundSrc?: string;
};

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-4 w-4 shrink-0", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

export function Hero({
  title,
  leadSegments,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  backgroundSrc,
}: HeroProps) {
  return (
    <section
      id="idea"
      className="relative flex min-h-[min(80vh,52rem)] flex-col justify-center overflow-x-clip overflow-y-visible border-b border-white/10 px-[var(--padding-inline-section)] py-12 sm:min-h-[80vh] sm:py-16 md:min-h-[82vh] md:py-20 lg:min-h-[85vh] lg:py-24"
    >
      {/* Full-bleed photo */}
      {backgroundSrc ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={backgroundSrc}
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      ) : null}

      {/* Readability: strong left bias on lg+; softer uniform scrim on mobile so stacked book stays visible */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-black/45 lg:bg-gradient-to-r lg:from-black/88 lg:via-black/55 lg:from-[8%] lg:via-45% lg:to-transparent lg:to-[62%]"
        aria-hidden
      />
      {/* Vertical balance — lighter at bottom on small screens (book stacks below copy) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-black/30 via-transparent to-black/25 lg:to-black/45"
        aria-hidden
      />
      {/* Vignette — reduced on mobile */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)] opacity-70 lg:opacity-100 lg:bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(0,0,0,0.55)_100%)]"
        aria-hidden
      />
      {/* Brand tint — no mix-blend (can cause compositing flicker with overlays + images) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-brand-navy/20 via-transparent to-brand-teal/10"
        aria-hidden
      />

      <div className="relative isolate z-10 mx-auto grid w-full min-w-0 max-w-6xl grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-16 lg:gap-y-0 xl:gap-x-20">
        <div className="min-w-0 space-y-5 sm:space-y-7 lg:space-y-8 lg:pr-4">
          <h1
            className={cn(
              "heading-hero text-white",
              "drop-shadow-[0_4px_32px_rgba(0,0,0,0.85)]",
              "[text-shadow:0_2px_24px_rgba(0,0,0,0.5)]",
            )}
          >
            {title}
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-zinc-100 [text-shadow:0_1px_12px_rgba(0,0,0,0.65)] sm:text-lg sm:leading-[1.75]">
            {leadSegments.map((segment, i) =>
              segment.emphasize ? (
                <span key={i} className="font-medium text-brand-gold">
                  {segment.text}
                </span>
              ) : (
                <span key={i}>{segment.text}</span>
              ),
            )}
          </p>
          <div className="flex w-full max-w-md flex-col gap-3 pt-1 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
            <Button className="w-full justify-center sm:w-auto" href={primaryCta.href}>
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              className="w-full justify-center border-white/45 bg-white/5 text-white backdrop-blur-sm transition-all duration-200 ease-out hover:border-white/80 hover:bg-white/12 hover:text-white sm:w-auto"
            >
              <span className="inline-flex items-center justify-center gap-2">
                {secondaryCta.showPlayIcon ? (
                  <PlayIcon className="opacity-95" />
                ) : null}
                {secondaryCta.label}
              </span>
            </Button>
          </div>
        </div>

        <div className="relative z-20 flex min-w-0 justify-center px-0 pb-1 pt-2 sm:px-4 sm:pb-2 sm:pt-4 lg:justify-end lg:px-2 lg:pb-0 lg:pt-0">
          <HeroBookImage src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
}
