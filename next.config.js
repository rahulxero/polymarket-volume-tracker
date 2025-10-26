/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Add custom webpack configurations if needed
    return config;
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '/api/leaderboard',
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/traders',
        destination: '/',
        permanent: true,
      },
    ];
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
    serverComponentsExternalPackages: ['tailwindcss']
  },

  // Image optimization
  images: {
    domains: ['cdn.example.com'], // Add domains for external images if needed
  },
}

module.exports = nextConfig
