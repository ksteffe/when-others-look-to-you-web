import { cn } from "@/lib/cn";

/** Soft ellipse beneath the book — grounded contact shadow */
export function BookShadow({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-1/2 top-full z-0",
        "-translate-x-1/2 translate-x-[12px] translate-y-1.5 sm:translate-x-4 sm:translate-y-2",
        "h-9 w-[min(90%,14rem)] rounded-[100%] sm:h-11 sm:w-[min(92%,15rem)]",
        "bg-black/[0.15] blur-[28px] sm:blur-[36px]",
        className,
      )}
    />
  );
}
