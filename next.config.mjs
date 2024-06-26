/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SERVICE_ROLE_KEY: process.env.SERVICE_ROLE_KEY,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "127.0.0.1",
        protocol: "http",
        port: "54321",
        pathname: "/storage/v1/render/image/public/snapcode/**",
      },
      {
        hostname: "refmmxlfcecreajixruk.supabase.co",
        protocol: "https",
        port: "",
        pathname: "/storage/v1/object/public/snapcode/**",
      },
    ],
  },
};

export default nextConfig;
