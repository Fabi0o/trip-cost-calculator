/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_CEY: process.env.API_CEY,
  },
};

module.exports = nextConfig;
