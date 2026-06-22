import "./global.css";
import SmoothScroll from "../components/smooth-scroll";
import { Orbitron, Poppins } from 'next/font/google';
import localFont from 'next/font/local';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-orbitron',
  display: 'swap',
  preload: true,
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Reduced from 9 weights to 4
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Load local fonts with next/font/local for better performance
const donkey = localFont({
  src: '../public/fonts/donkey.otf',
  variable: '--font-donkey',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const lufga = localFont({
  src: '../public/fonts/lufga-regular.otf',
  variable: '--font-lufga',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

const sector034 = localFont({
  src: '../public/fonts/sector_034.ttf',
  variable: '--font-sector-034',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata = {
  title: `Future Stack AI Internship`,
  description: 'Join Future Stack AI Internship - Learn React, Node.js, MongoDB, and modern web development',
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${orbitron.variable} ${poppins.variable} ${donkey.variable} ${lufga.variable} ${sector034.variable}`}>
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        {/* Preload critical hero image for faster LCP */}
        <link
          rel="preload"
          as="image"
          href="/Separator@2x.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="image"
          href="/mobile-bg.webp"
          type="image/webp"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          href="/fonts/sector_034.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body suppressHydrationWarning className={poppins.className}>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

