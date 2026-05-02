import Image from "next/image";
import { cn } from "@/lib/cn";
import { sectionVariantSurface } from "@/components/ui/Section";

export type RenewalErosionColumn = {
  label: string;
  heading: string;
  paragraph: string;
  items: string[];
};

export type RenewalErosionSectionProps = {
  /** Same asset as the hero (e.g. hero-bg.png); each column crops a different region */
  textureSrc?: string;
  renewal: RenewalErosionColumn;
  erosion: RenewalErosionColumn;
};

/** Distinct cool-tone icons per row */
function RenewalItemIcon({ index }: { index: number }) {
  const cls = "h-5 w-5 shrink-0 text-cyan-200/95";
  if (index === 0) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 7v10M8 12h8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 4v4M12 16v4M6 12h3m6 0h3"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 14s2 3 8 3 8-3 8-3M8 10s2-3 8-3 8 3 8 3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/** Distinct warm-tone icons per row */
function ErosionItemIcon({ index }: { index: number }) {
  const cls = "h-5 w-5 shrink-0 text-orange-200/95";
  if (index === 0) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 9v5M12 17h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10.29 3.86L2 18h20L13.71 3.86a2 2 0 00-3.42 0z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 16l4-6 4 4 4-8 4 10"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v4l2 2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function OrDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-brand-gold bg-brand-navy/95 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-gold shadow-[0_10px_28px_rgba(0,0,0,0.45)] backdrop-blur-md",
        className,
      )}
      aria-hidden
    >
      OR
    </div>
  );
}

function SplitColumn({
  tone,
  label,
  heading,
  paragraph,
  items,
  textureSrc,
  textureAlign,
  className,
}: RenewalErosionColumn & {
  tone: "renewal" | "erosion";
  textureSrc?: string;
  textureAlign?: "left" | "right";
  className?: string;
}) {
  const toneScrim =
    tone === "renewal"
      ? "bg-gradient-to-br from-[#020518]/82 via-[#071e2e]/62 to-cyan-950/38"
      : "bg-gradient-to-bl from-orange-950/55 via-brand-navy/68 to-[#1a0805]/88";

  const overlay =
    tone === "renewal"
      ? "bg-[radial-gradient(ellipse_85%_65%_at_15%_25%,rgba(56,189,248,0.28),transparent_58%)]"
      : "bg-[radial-gradient(ellipse_85%_65%_at_85%_75%,rgba(251,146,60,0.28),transparent_58%)]";

  const insetLine =
    tone === "renewal"
      ? "shadow-[inset_0_1px_0_0_rgba(125,211,252,0.18)]"
      : "shadow-[inset_0_1px_0_0_rgba(251,146,60,0.2)]";

  const ItemIcon = tone === "renewal" ? RenewalItemIcon : ErosionItemIcon;

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-col overflow-hidden bg-brand-navy px-[var(--padding-inline-section)] py-12 sm:py-16 lg:min-h-[min(100%,36rem)] lg:justify-center lg:py-24",
        insetLine,
        className,
      )}
    >
      {textureSrc ? (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <Image
            src={textureSrc}
            alt=""
            fill
            priority={false}
            quality={75}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-cover opacity-[0.5] sm:opacity-[0.46]",
              textureAlign === "left"
                ? "object-left"
                : textureAlign === "right"
                  ? "object-right"
                  : "object-center",
            )}
          />
        </div>
      ) : null}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[1]",
          toneScrim,
        )}
        aria-hidden
      />

      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[2] opacity-[0.88]",
          overlay,
        )}
        aria-hidden
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-[2] opacity-45",
          tone === "renewal"
            ? "bg-gradient-to-t from-cyan-950/60 to-transparent"
            : "bg-gradient-to-b from-orange-950/50 to-transparent",
        )}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col space-y-7">
        <header className="space-y-4 text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-gold">
            {label}
          </p>
          <h2
            className={cn(
              "heading-lg",
              tone === "renewal" ? "text-cyan-50" : "text-orange-50",
            )}
          >
            {heading}
          </h2>
          <p className="body-lg text-pretty text-zinc-100/95">{paragraph}</p>
        </header>

        <ul className="space-y-4">
          {items.map((text, i) => (
            <li
              key={`${tone}-${i}`}
              className="flex gap-4 rounded-lg py-1 transition-colors duration-200 ease-out hover:bg-white/[0.04]"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/20 transition-transform duration-200">
                <ItemIcon index={i} />
              </span>
              <span className="min-w-0 flex-1 body-lg leading-snug text-zinc-100">
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function RenewalErosionSection({
  textureSrc,
  renewal,
  erosion,
}: RenewalErosionSectionProps) {
  return (
    <section
      id="about"
      className={cn(sectionVariantSurface.dark, "relative overflow-hidden")}
    >
      <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2">
        <SplitColumn
          tone="renewal"
          className="order-1"
          textureSrc={textureSrc}
          textureAlign="left"
          {...renewal}
        />
        <div className="order-2 flex justify-center border-y border-white/10 bg-black/25 py-6 sm:py-8 lg:hidden">
          <OrDivider />
        </div>
        <SplitColumn
          tone="erosion"
          className="order-3 lg:order-2"
          textureSrc={textureSrc}
          textureAlign="right"
          {...erosion}
        />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:flex"
        aria-hidden
      >
        <OrDivider />
      </div>
    </section>
  );
}
