/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nquqzhtbapbnjkyudrwl.supabase.co",
      },
    ],
  },
};

export default nextConfig;
