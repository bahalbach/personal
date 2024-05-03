/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/blog",
        destination: "/notes/temp_blog",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
