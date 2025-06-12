import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    reactStrictMode: false, // ❌ Disable Strict Mode to stop double rendering
      experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ✅ increase as needed (max: 100mb)
    },
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
   typescript: {
    ignoreBuildErrors: true, // 👈 disables type errors during build
  },
  images:{
      domains: ['res.cloudinary.com']
  }
 
};

export default nextConfig;
