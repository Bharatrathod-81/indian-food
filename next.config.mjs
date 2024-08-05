/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "www.dominos.co.in" },
      { protocol: "https", hostname: "b.zmtcdn.com" },
      { protocol: "https", hostname: "png.pngtree.com" },
      { protocol: "https", hostname: "www.vegrecipesofindia.com" },
      { protocol: "https", hostname: "cookieandkate.com" }, // Added the missing hostname
    ],
  },
};

export default nextConfig;
