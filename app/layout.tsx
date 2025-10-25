import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
