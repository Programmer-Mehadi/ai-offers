import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  async redirects() {
    return [
      {
        source: "/:slug(ai-and-machine-learning|cloud-and-hosting|development|design|productivity|learning|media|shopping|travel-and-finance|memberships|security|food)",
        destination: "/categories/:slug",
        permanent: true,
      },
    ]
  },
}

export default nextConfig

