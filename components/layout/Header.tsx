import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type HeaderNavItem = {
  label: string;
  href: string;
};

type HeaderProps = {
  title: string;
  nav: readonly HeaderNavItem[];
  cta: { label: string; href: string };
};

const linkClass =
  "text-sm text-white/85 transition-colors duration-200 ease-out hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60";

export function Header({ title, nav, cta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-transparent">
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-[var(--padding-inline-section)] sm:h-16 sm:gap-4">
        <Link
          href="/"
          className={cn(
            "min-w-0 max-w-[min(100%,14rem)] shrink-0 font-[family-name:var(--font-heading)] text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.2em] text-white antialiased transition-opacity duration-200 ease-out hover:opacity-90 sm:max-w-[min(100%,18rem)] sm:text-[0.7rem] md:max-w-none md:text-xs",
          )}
        >
          <span className="block break-words">{title}</span>
        </Link>

        <nav
          className={cn(
            "hidden items-center md:flex md:min-w-0 md:flex-1 md:justify-center md:gap-5 lg:absolute lg:inset-x-0 lg:top-1/2 lg:z-10 lg:-translate-y-1/2 lg:justify-center lg:gap-8 xl:gap-10",
          )}
          aria-label="Primary"
        >
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          href={cta.href}
          className="shrink-0 px-3 py-2 text-xs font-semibold sm:px-4 sm:text-sm"
        >
          {cta.label}
        </Button>
      </div>
    </header>
  );
}
