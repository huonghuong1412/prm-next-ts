/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'doppelherz.vn',
      'sukien.doppelherz.vn',
      'lh3.googleusercontent.com',
      'platform-lookaside.fbsbx.com',
      '*'
    ]
  }
}

module.exports = nextConfig
