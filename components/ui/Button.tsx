import Link from "next/link";
import { cn } from "@/lib/cn";

const base = cn(
  "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold",
  "transition-all duration-200 ease-out",
  "shadow-sm hover:shadow active:scale-[0.98]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold",
);

const variants = {
  primary:
    "bg-brand-gold text-brand-navy hover:bg-brand-gold/92 hover:brightness-[1.02]",
  secondary:
    "border-2 border-white/35 bg-transparent text-zinc-100 shadow-none hover:border-white/65 hover:bg-white/[0.08]",
  ghost:
    "border-0 bg-transparent shadow-none text-brand-gold hover:text-brand-gold/90 hover:underline hover:underline-offset-4",
} as const;

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  href?: string;
} & Omit<React.ComponentProps<"button">, "className" | "children">;

export function Button({
  children,
  className,
  variant = "primary",
  href,
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = cn(base, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
