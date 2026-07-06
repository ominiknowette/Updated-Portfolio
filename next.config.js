/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fully disables Next.js's floating dev-mode indicator (the black
  // rounded badge with the "N" logo that opens the route info panel),
  // not just the build-activity spinner. It was overlapping the hero CTA
  // button on mobile. This only ever renders in `next dev` — it's already
  // stripped out of production builds — but we turn it off outright so it
  // never shows up locally either.
  devIndicators: false,
};

module.exports = nextConfig;
