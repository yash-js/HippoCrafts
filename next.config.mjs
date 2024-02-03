/** @type {import('next').NextConfig} */
const nextConfig = {
  payloadPath: path.resolve(process.cwd(), "./src/get-payload.ts"),
  images: {
    domains: ["localhost"],
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
