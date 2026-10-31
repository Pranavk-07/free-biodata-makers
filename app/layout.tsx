 
import Navbar from "./components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Free Biodata Makers | Marriage Biodata & Invitation Cards",
    template: "%s | Free Biodata Makers",
  },
  description:
    "Create free marriage biodata, wedding invitations, birthday cards, and puja invitation cards with beautiful templates. Customize and download your designs easily.",
  applicationName: "Free Biodata Makers",
  keywords: [
    "free marriage biodata maker",
    "online biodata maker",
    "marriage biodata templates",
    "wedding invitation maker",
    "birthday invitation cards",
    "puja invitation maker",
    "Hindi biodata maker",
    "Marathi biodata maker",
  ],
  authors: [{ name: "Free Biodata Makers" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Free Biodata Makers",
    description:
      "Create beautiful marriage biodata and invitation cards for free.",
    siteName: "Free Biodata Makers",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
