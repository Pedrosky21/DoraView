import type { Metadata } from "next";
import { Noto_Sans, Caprasimo } from "next/font/google";
import "./globals.css";

const noto = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-noto",
});

const caprasimo = Caprasimo({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
  variable: "--font-caprasimo",
})

export const metadata: Metadata = {
  title: "DoraView",
  description: "Reviews de doramas en un vistazo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${noto.variable} ${caprasimo.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
