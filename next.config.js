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
  images: {
    remotePatterns: [
      // MLB, MLB Kids
      {
        protocol: "https",
        hostname: "static.mlb-korea.com",
      },
      {
        protocol: "http",
        hostname: "static.mlb-korea.com",
      },
      // discovery
      {
        protocol: "https",
        hostname: "static.discovery-expedition.com",
      },
      {
        protocol: "http",
        hostname: "static.discovery-expedition.com",
      },
      // stretch-angels
      {
        protocol: "https",
        hostname: "static.stretch-angels.com",
      },
      {
        protocol: "http",
        hostname: "static.stretch-angels.com",
      },
      // duvetica
      {
        protocol: "https",
        hostname: "static.duvetica.co.kr",
      },
      {
        protocol: "http",
        hostname: "static.duvetica.co.kr",
      },
      // supra
      {
        protocol: "https",
        hostname: "static.supra-korea.com",
      },
      {
        protocol: "http",
        hostname: "static.supra-korea.com",
      },
      // sergiotacchini
      {
        protocol: "https",
        hostname: "static.sergiotacchini.co.kr",
      },
      {
        protocol: "http",
        hostname: "static.sergiotacchini.co.kr",
      },
    ],
  },
};

module.exports = nextConfig;
