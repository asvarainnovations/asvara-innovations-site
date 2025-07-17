/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // 1) Tell Next.js to emit a "standalone" build (all required .next files + node_modules)
  output: 'standalone',

  // 2) Your existing image settings
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // 3) Your existing webpack alias
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
