import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
    reactStrictMode: false, // ❌ Disable Strict Mode to stop double rendering
      experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // ✅ increase as needed (max: 100mb)
    },
  },
 
};

export default nextConfig;
