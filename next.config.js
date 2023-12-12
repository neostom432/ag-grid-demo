/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    appDir: false,
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
