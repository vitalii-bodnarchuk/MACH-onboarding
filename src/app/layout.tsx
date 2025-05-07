import { Header } from "@/components/header/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./global.scss";
import styles from "./layout.module.scss";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "MACH App",
  description: "Practice project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.appWrapper}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
