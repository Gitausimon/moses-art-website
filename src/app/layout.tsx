import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moscatti | Virtual Art Gallery & Portfolio",
  description: "Immersive 3D digital museum and painting portfolio of Moses Njuguna (Moscatti), a contemporary artist based in Nairobi, Kenya.",
  keywords: ["Moscatti", "Moses Njuguna", "Kenyan Artist", "Contemporary Art", "Virtual Gallery", "3D Museum", "Paintings", "Nairobi Artist"],
  openGraph: {
    title: "Moscatti | Contemporary Virtual Art Gallery",
    description: "Explore the abstract and vibrant works of Moscatti in this immersive 3D web experience.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
