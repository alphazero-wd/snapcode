/** @type {import('next').NextConfig} */
const nextConfig = {
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
        pathname: "/storage/v1/render/image/public/snapcode/**",
      },
    ],
  },
};

export default nextConfig;
