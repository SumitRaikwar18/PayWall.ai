import type { Metadata } from "next";
import { Instrument_Serif, DM_Mono, Geist } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  style: ["normal", "italic"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "PayWall.ai — Monetize Any API in 60 Seconds",
  description: "A reverse proxy that wraps any HTTP endpoint with x402 micropayments on Stellar.",
};

import { WalletProvider } from '@/context/WalletContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${dmMono.variable} ${geist.variable}`}>
      <body>
        <WalletProvider>
          {children}
        </WalletProvider>
      </body>
    </html>
  );
}
