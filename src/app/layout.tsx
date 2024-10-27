import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const mamelon = localFont({
  src: "./fonts/mamelon_hireg/Mamelon-3-Hi-Regular.otf",
  variable: "--font-mamelon",
  weight: "100 900",
});

const mamelon_bold = localFont({
  src: "./fonts/mamelon_hireg/Mamelon-5-Hi-Regular.otf",
  variable: "--font-mamelon-bold",
  weight: "1200",
});

export const metadata: Metadata = {
  title: "カピバラブログ",
  description: "カピバラとは特に関係のないブログです",
  icons: {
    icon: "/capybara-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${mamelon.variable} ${mamelon_bold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
