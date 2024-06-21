/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        port: ''  
      },
      {
        hostname: 'doodleipsum.com'
      }
    ],
  },
};

export default nextConfig;
