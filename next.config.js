/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/**',
      },
    ],
  },
  basePath: '/rick-and-morty',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig 