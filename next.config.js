/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  headers: [
    {
      key: "Cache-Control",
      value: "no-store",
    },
  ],
};

module.exports = nextConfig;
