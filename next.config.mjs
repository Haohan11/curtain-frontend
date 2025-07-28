/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: env.NEXT_PUBLIC_SERVER_URL,
      },
    ],
  },
};

export default nextConfig;
