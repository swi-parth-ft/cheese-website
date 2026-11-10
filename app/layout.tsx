import type { Metadata } from "next";
import { siteOrigin } from "../lib/site-config";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: "Cheese — Your Mac. Wherever you are.",
  description:
    "Bring your Mac windows, desktop, and files to iPhone, iPad, or another Mac. Free, native, and thoughtfully connected. Download Cheese for Mac.",
  openGraph: {
    title: "Cheese — Your Mac. Wherever you are.",
    description: "Your Mac. On your iPhone. On your iPad. On the go.",
    type: "website",
    images: [
      {
        url: "/brand/cheese.png",
        width: 256,
        height: 256,
        alt: "Cheese app icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Cheese — Your Mac. Wherever you are.",
    images: ["/brand/cheese.png"],
  },
  icons: { icon: "/brand/cheese.png", apple: "/brand/cheese.png" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
