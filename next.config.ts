import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep verification builds separate from an already-running local preview.
  distDir: process.env.NEST_BUILD_DIR || ".next",
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The reference motion system is GSAP-driven; keep the bundle lean.
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
