/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/strips',
        permanent: true,
      },
    ]
  },
  images: {
    domains: ['imgs.xkcd.com'],
  },
}

module.exports = nextConfig
