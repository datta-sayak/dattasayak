import type { Metadata } from "next";
import { DM_Sans, VT323 } from "next/font/google";
import { ThemeProvider } from "@/app/context/ThemeContext";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Sayak Datta Portfolio",
  description: "Portfolio of Sayak Datta",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${vt323.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
