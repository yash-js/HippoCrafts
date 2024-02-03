/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    remotePatterns: [
      {
        hostname: "localhost",
        pathname: "**",
        port: "",
        protocol: "http",
      },
    ],
  },
};

export default nextConfig;
