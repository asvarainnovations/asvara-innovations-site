import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Asvara Innovations - AI-Driven Legal Tech Solutions",
  description: "Revolutionizing legal tech with cutting-edge AI solutions for legal professionals, law firms, and enterprises.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-inter bg-white">
        <Toaster 
          theme="dark" 
          position="top-right"
          closeButton
          richColors
          expand
        />
        {children}
      </body>
    </html>
  );
}
