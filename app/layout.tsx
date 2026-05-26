import "./global.css";
import { ReactNode } from "react";
import SmoothScroll from "../components/smooth-scroll";

export const metadata = {
  title: `lenient`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

