import Image from "next/image";
import { BOOK_SOURCE, coverWidthClass } from "./config";
import { cn } from "@/lib/cn";

type BookCoverProps = {
  src?: string;
  alt: string;
  priority?: boolean;
};

/**
 * Front face only (placeholder or artwork). Lighting lives in global `.book-cover-lighting`.
 */
export function BookCover({ src, alt, priority }: BookCoverProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "relative flex aspect-[2/3] w-full flex-col items-center justify-center gap-3 rounded-l-lg rounded-r-none border border-white/25 bg-brand-navy/75 p-6 text-center",
        )}
        role="img"
        aria-label={alt}
      >
        <div className="h-12 w-10 rounded-sm bg-gradient-to-br from-brand-teal/50 to-brand-navy" />
        <span className="body-sm text-brand-teal/90">Book cover</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={BOOK_SOURCE.width}
      height={BOOK_SOURCE.height}
      priority={priority}
      quality={90}
      sizes="(max-width: 1024px) 85vw, 380px"
      className={cn(
        "relative z-[2] block rounded-l-lg rounded-r-none object-cover",
        coverWidthClass,
      )}
    />
  );
}

/** Gradient overlay — left-key lighting in `app/globals.css` (`.book-cover-lighting`). */
export function BookCoverLighting() {
  return <div className="book-cover-lighting" aria-hidden />;
}
