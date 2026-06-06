import type { Metadata } from "next";
import { Inter, PT_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ptSerif = PT_Serif({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-pt-serif" });

export const metadata: Metadata = {
  title: "CraftConnect | Connecting Artisans to the World",
  description: "Experience the soul of slow commerce.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ptSerif.variable} font-sans text-craft-dark bg-craft-bg`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}