import type { NextConfig } from "next";

module.exports = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
