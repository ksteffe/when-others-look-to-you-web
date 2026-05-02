/** Source dimensions for `next/image` (2:3 cover art) */
export const BOOK_SOURCE = { width: 720, height: 1080 } as const;

/** Hero book cover display width (responsive) */
export const coverWidthClass =
  "h-auto w-[min(100%,15.5rem)] sm:w-[min(100%,18rem)] md:w-[min(100%,20rem)] lg:w-[min(100%,22rem)]";

/**
 * Paper fore-edge width in view (narrow strip, ~7–11px by breakpoint).
 */
export const pagesEdgeWidthClass =
  "w-[7px] min-w-[7px] sm:w-[8px] sm:min-w-[8px] md:w-[9px] md:min-w-[9px] lg:w-[11px] lg:min-w-[11px]";

/**
 * Pull spine under the cover’s right edge (layout px). Balance: hide perspective hole vs
 * keeping enough visible seam + paper width for hinge/fore-edge lips.
 */
export const spineSeamOverlapClass =
  "-ml-[14px] sm:-ml-[18px] md:-ml-[20px] lg:-ml-[22px]";

/** Ambient cast shadow on the tilted book block (not the ground contact shadow) */
export const bookAmbientShadowClass =
  "shadow-[0_28px_44px_-14px_rgba(0,0,0,0.55)]";

/** 3D tilt + perspective — values live in `app/globals.css` (`:root` + `.book-tilt`) */
export const bookTiltClass = "book-tilt";
