const nextConfig = {
    reactStrictMode: true,
    images: {
      formats: ['image/avif', 'image/webp'],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
          pathname: "/**",
        },
      ],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: true,
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    // Enable SWC minification for better performance
    swcMinify: true,
    // Optimize production builds
    productionBrowserSourceMaps: false,
    // Enable experimental features for better performance
    experimental: {
      optimizeCss: true,
      optimizePackageImports: ['framer-motion', 'lenis', 'lucide-react'],
    },
  };

  module.exports = nextConfig;