/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'arweave.net',
      },
      {
        protocol: 'https',
        hostname: 'arweave.sentx.io',
      },
      {
        protocol: 'https',
        hostname: 'cyan-certain-partridge-419.mypinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'market.kabila.app',
      },
    ],
  },
};

export default nextConfig;
  