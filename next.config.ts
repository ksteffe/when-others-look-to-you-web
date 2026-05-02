import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Allow `quality` values used by `<Image />` (Next 16 requires explicit list). */
    qualities: [60, 65, 70, 75, 85, 90],
    /** Cache optimized images at the edge longer — fewer revalidations for stable assets */
    minimumCacheTTL: 31536000,
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    /** Smaller client bundles — faster parse & lower main-thread work */
    optimizePackageImports: ["framer-motion"],
  },
};

export default nextConfig;
