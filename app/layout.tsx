import "./global.css";
import { ReactNode } from "react";
import SmoothScroll from "../components/smooth-scroll";
import PageLoader from "../components/PageLoader";

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
        <PageLoader />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}

