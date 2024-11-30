/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "images.tokopedia.net",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: "raw.githubusercontent.com",
          pathname: "**",
        },
        {
          protocol: "https",
          hostname: process.env.NEXT_PUBLIC_API_URL,
          pathname: "**",
        },
        {
          protocol: "http",
          hostname: "localhost",
          pathname: "**",
        },
      ],
    },
  };

export default nextConfig;
