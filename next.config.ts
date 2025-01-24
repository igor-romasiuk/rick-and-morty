/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/rick-and-morty',
  assetPrefix: '/rick-and-morty',
  generateStaticParams: true,
  trailingSlash: true,
}

module.exports = nextConfig
