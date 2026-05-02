import { cn } from "@/lib/cn";
import {
  bookAmbientShadowClass,
  bookTiltClass,
  coverWidthClass,
} from "@/components/ui/book/config";
import { BookCover, BookCoverLighting } from "@/components/ui/book/BookCover";
import { BookShadow } from "@/components/ui/book/BookShadow";
import { BookSpine } from "@/components/ui/book/BookSpine";

export type BookImageProps = {
  src?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** @deprecated Use `BookImageProps` */
export type HeroBookImageProps = BookImageProps;

/**
 * Cover + spine share one flex row so the joint is pixel-adjacent (no absolute “gap”).
 * Perspective / rotation: see `globals.css`. Lighting: `.book-cover-lighting`.
 */
export function HeroBookImage({
  src,
  alt,
  className,
  priority = true,
}: BookImageProps) {
  return (
    <div className={cn("relative mx-auto w-max max-w-full", className)}>
      <div className="relative pb-10 sm:pb-12">
        <div
          className={cn(
            "relative inline-flex max-w-full flex-row flex-nowrap items-stretch gap-0",
            bookTiltClass,
            bookAmbientShadowClass,
          )}
        >
          {/* Column 1: front face + lighting (bounded to cover only) */}
          <div
            className={cn(
              "relative z-[2] shrink-0 shadow-[3px_0_14px_rgba(0,0,0,0.11)]",
              !src && coverWidthClass,
            )}
          >
            <BookCover src={src} alt={alt} priority={priority} />
            <BookCoverLighting />
          </div>
          {/* No whitespace before spine — avoids stray flex text nodes; spine uses -ml to close 3D seam */}
          <BookSpine />
        </div>

        <BookShadow />
      </div>
    </div>
  );
}

export const BookImage = HeroBookImage;
