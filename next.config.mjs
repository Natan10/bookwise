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
      },
      {
        hostname: 'lh3.googleusercontent.com'
      }
    ],
  },
};

export default nextConfig;
