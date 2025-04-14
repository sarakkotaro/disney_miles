/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // appディレクトリを使用
  },
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
