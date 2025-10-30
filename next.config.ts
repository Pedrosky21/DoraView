import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "xkaggjpiilquvsgqvrmw.supabase.co", // sin ".storage"
        pathname: "/storage/v1/object/public/doramas-imagenes/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
    ],
    qualities: [100, 75]
  },
};

export default nextConfig;
