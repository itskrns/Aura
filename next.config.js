/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['odcloekjvtjhchznlmvk.supabase.co'],
  },
  experimental: {
    middleware: true, // Middleware support for authentication
  },
};

module.exports = nextConfig;
