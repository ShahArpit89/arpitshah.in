import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Sanity project doesn't exist yet (PRD.md §7 item 3) — pre-configured
    // so photography images work as soon as it does.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
}

export default nextConfig
