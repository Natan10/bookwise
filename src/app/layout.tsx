import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";

const nunito = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400", "500", "700"],
  variable: "--font-nsans",
});

export const metadata: Metadata = {
  title: "Bookwise",
  description: "Booking for books",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable}`}>{children}</body>
    </html>
  );
}
