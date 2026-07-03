import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/data/LanguageContext";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Portfolio - 3D Interactive",
  description: "A modern portfolio with 3D graphics and grid view",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="antialiased">
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
