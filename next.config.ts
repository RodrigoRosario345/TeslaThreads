import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@prisma/client",
    "@prisma/adapter-pg",
    "@prisma/driver-adapter-utils",
    "pg",
  ],
};

export default nextConfig;
