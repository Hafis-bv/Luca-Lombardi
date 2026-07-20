import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "https://luca-lombardi-three.vercel.app",
      },
      {
        protocol: "https",
        hostname: "https://luca-lombardi.store",
      },
    ],
  },
};

export default nextConfig;
