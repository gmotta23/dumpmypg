import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./ui/header";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "dumpmypg",
  description: "Tool for easily generating postgres dumps",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx("h-screen bg-gray-100", inter.className)}>
        <Header />
        {children}
      </body>
    </html>
  );
}
