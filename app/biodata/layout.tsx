import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker Online",
  description:
    "Create your marriage biodata online for free. Choose from beautiful traditional and modern templates, add your photo, and download your biodata in PDF or PNG. Available in English, Hindi and Marathi.",

  alternates: {
    canonical: "/biodata",
  },

  openGraph: {
    title: "Free Marriage Biodata Maker Online",
    description:
      "Make a beautiful marriage biodata for free. Customize templates and download in PDF or PNG.",
    url: "https://freebiodatamakers.com/biodata",
    siteName: "Free Biodata Makers",
    locale: "en_IN",
    type: "website",
  },
};

export default function BiodataLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}