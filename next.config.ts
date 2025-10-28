import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://i.pinimg.com/**")],
    qualities: [100, 75]
  }
};

export default nextConfig;
