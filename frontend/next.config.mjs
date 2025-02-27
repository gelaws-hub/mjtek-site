/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: "https",
    //       hostname: "images.tokopedia.net",
    //       pathname: "**",
    //     },
    //     {
    //       protocol: "https",
    //       hostname: "raw.githubusercontent.com",
    //       pathname: "**",
    //     },
    //     {
    //       protocol: "https",
    //       hostname: process.env.NEXT_PUBLIC_API_URL,
    //       pathname: "**",
    //     },
    //     {
    //       protocol: "http",
    //       hostname: "localhost",
    //       pathname: "**",
    //     },
    //     {
    //       protocol: "https",
    //       hostname: "res.cloudinary.com",
    //       pathname: "**",
    //     },
    //   ],
    // },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
  };

export default nextConfig;
