import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Noto_Serif_Georgian } from "next/font/google";
import { Header } from "@/components/header";

const notoSerifGeorgian = Noto_Serif_Georgian({ subsets: ["latin"] });
const siteUrl = "https://roshi.ink";
const ogImage = `${siteUrl}/roshi_ink.webp`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "roshi.ink | Abdussomad Mahmud",
    template: "%s | roshi.ink",
  },
  description: "Roshi's blog",
  keywords: [
    "Roshi Ink",
    "roshi.ink",
    "Abdussomad Mahmud",
    "software engineer",
  ],
  authors: [{ name: "Abdussomad Mahmud", url: siteUrl }],
  creator: "Abdussomad Mahmud",
  publisher: "Roshi Ink",
  category: "technology",
  alternates: { canonical: "/" },
  // openGraph: {
  //   title: "Roshi Ink | Abdussomad Mahmud",
  //   description:
  //     "Software engineer Abdussomad Mahmud shares case studies, essays, and bookmarks focused on dependable web products.",
  //   url: siteUrl,
  //   siteName: "roshi.ink",
  //   type: "website",
  //   images: [
  //     {
  //       url: ogImage,
  //       width: 1200,
  //       height: 630,
  //       alt: "Roshi Ink hero illustration",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Roshi Ink",
  //   description:
  //     "Calm software engineering insights, hands-on experiments, and curated bookmarks from Abdussomad Mahmudjonov.",
  //   images: [ogImage],
  // },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "roshi.ink",
    url: siteUrl,
    description:
      "Roshi Ink is a minimalist publication by Abdussomad Mahmudjonov that documents lessons from building reliable software.",
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdussomad Mahmudjonov",
    url: siteUrl,
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Roshi Ink",
    },
    sameAs: [
      "https://github.com/roshidoni",
      "https://www.linkedin.com/in/abdussomad",
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={notoSerifGeorgian.className}>
        <Header />
        <div className="md:w-[80vw] max-w-[1200px] mx-auto px-6">
          {children}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
