import "./global.css";
import { ReactNode } from "react";
import SmoothScroll from "../components/smooth-scroll";

export const metadata = {
  title: `lenient`,
  icons: {
    icon: '/white.png',
    shortcut: '/white.png',
    apple: '/white.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/white.png" sizes="any" />
        <link rel="apple-touch-icon" href="/white.png" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

