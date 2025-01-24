/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rickandmortyapi.com',
        pathname: '/api/**',
      },
    ],
    domains: ['rickandmortyapi.com'],
    unoptimized: true,
  },
  basePath: '/rick-and-morty',
  assetPrefix: '/rick-and-morty',
  generateStaticParams: true,
  trailingSlash: true,
}

module.exports = nextConfig
