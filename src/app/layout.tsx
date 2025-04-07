import type { Metadata } from "next";
import { Noto_Sans_Myanmar, Ubuntu } from "next/font/google";

import "./globals.css";
import TopBar from "./components/TopBar";

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "700"], // customize if needed
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "700"], // customize if needed
});

export const metadata: Metadata = {
  title: "Discover Myanmar",
  description: "Read More About Myanmar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansMyanmar.className} ${ubuntu.className}`}>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
