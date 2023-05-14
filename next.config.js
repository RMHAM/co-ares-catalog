/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/217a',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
