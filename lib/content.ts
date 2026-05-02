/**
 * Single source for marketing copy and asset paths.
 * Swap values here (or replace this module with CMS fetch) without editing section components.
 */

/**
 * Public URLs → files on disk under `public/assets/`.
 * Replace those PNGs to update the site; paths stay stable.
 */
export const assets = {
  bookCover: "/assets/book-cover.png",
  heroBackground: "/assets/hero-bg.png",
  /** Spine / page-edge tiling in `HeroBookImage` */
  pageTexture: "/assets/page-texture.png",
} as const;

export type PatternCardItem = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export const site = {
  headerTitle: "WHEN OTHERS LOOK TO YOU",
  footerTitle: "When Others Look to You",
  footerSubtitle: "Renewal and Erosion in Leadership",
  copyrightLine: `© ${new Date().getFullYear()} Placeholder Publishing`,
  nav: [
    { label: "THE IDEA", href: "#idea" },
    { label: "PATTERNS", href: "#pattern" },
    { label: "THE BOOK", href: "#book" },
    { label: "ABOUT", href: "#about" },
    { label: "RESOURCES", href: "#resources" },
  ],
  headerCta: { label: "READ THE BOOK", href: "#book" },
} as const;

/** Hero body copy split so emphasis (“attention”) can render in brand gold */
export type HeroLeadSegment = { text: string; emphasize?: boolean };

export const heroContent = {
  title:
    "A leader is someone others look to when deciding what to do next.",
  leadSegments: [
    {
      text: "Leadership doesn't begin with authority. It begins when ",
    },
    { text: "attention", emphasize: true },
    { text: " converges." },
  ] satisfies readonly HeroLeadSegment[],
  primaryCta: { label: "READ THE BOOK", href: "#book" },
  secondaryCta: {
    label: "WATCH INTRO",
    href: "#intro",
    /** Renders a small play icon before the label */
    showPlayIcon: true,
  },
  imageAlt: "Book cover for When Others Look to You",
  imageSrc: assets.bookCover,
  /** Optional full-bleed photo behind gradients — swap file in /public/assets/ */
  backgroundSrc: assets.heroBackground,
};

export const patterns: PatternCardItem[] = [
  {
    number: "1.",
    title: "Attention Finds a Focus",
    description:
      "When people look to you, scattered noise resolves—attention settles on what matters next.",
    href: "#pattern-attention",
  },
  {
    number: "2.",
    title: "Examples Accumulate",
    description:
      "Small signals repeat until they become the standard others imitate—often without a meeting.",
    href: "#pattern-examples",
  },
  {
    number: "3.",
    title: "Leadership Coalesces",
    description:
      "Direction emerges from sustained clarity—not from titles alone, but from trust earned in moments.",
    href: "#pattern-leadership",
  },
];

export const patternSectionContent = {
  label: "THE PATTERN",
  title: "Leadership emerges through patterns.",
  intro:
    "Leadership doesn't arrive fully formed. It shows up as recurring behaviors—signals others mirror.",
  introLine2:
    "These patterns shape what people expect, tolerate, and ultimately repeat.",
  patterns,
  viewAll: {
    label: "VIEW ALL PATTERNS",
    href: "#patterns-index",
  },
};

export type SplitColumnContent = {
  label: string;
  heading: string;
  paragraph: string;
  items: string[];
};

export type SubscribeColumnContent = {
  /** Uppercase eyebrow above the form (gold in UI) */
  heading: string;
  /** Supporting line under the heading */
  description: string;
  placeholder?: string;
  submitLabel?: string;
};

export type WhyItMattersContent = {
  /** Small uppercase label above the heading */
  sectionLabel: string;
  title: string;
  paragraph: string;
  learnMore: { label: string; href: string };
  subscribe: SubscribeColumnContent;
};

export type SectionContent = {
  renewalErosion: {
    textureSrc?: string;
    renewal: SplitColumnContent;
    erosion: SplitColumnContent;
  };
  whyItMatters: WhyItMattersContent;
};

export const sectionContent: SectionContent = {
  renewalErosion: {
    textureSrc: assets.heroBackground,
    renewal: {
      label: "RENEWAL",
      heading: "Leadership that renews",
      paragraph:
        "Renewal shows up as openness—room for learning, shared judgment, and momentum that doesn't hollow people out.",
      items: [
        "Encourages learning",
        "Shares authority",
        "Creates circulation",
      ],
    },
    erosion: {
      label: "EROSION",
      heading: "Leadership that erodes",
      paragraph:
        "Erosion tightens in silence—small withdrawals of trust that compound until recovery feels risky.",
      items: ["Closes down openness", "Discourages truth", "Fractures trust"],
    },
  },
  whyItMatters: {
    sectionLabel: "WHY THIS MATTERS",
    title: "We live in a time of renewal and erosion.",
    paragraph:
      "The patterns people follow aren’t announced—they’re observed. When others look to you, your steadiness becomes part of the environment: either clarifying or quietly corroding what teams dare to say and do.",
    learnMore: {
      label: "LEARN MORE ABOUT THE IDEA",
      href: "#idea",
    },
    subscribe: {
      heading: "STAY IN THE CONVERSATION",
      description:
        "Occasional notes on leadership patterns—no spam. Unsubscribe anytime.",
      placeholder: "Your email address",
      submitLabel: "SUBSCRIBE",
    },
  },
};
