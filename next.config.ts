/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/rick-and-morty',
  assetPrefix: '/rick-and-morty'
}

module.exports = nextConfig
