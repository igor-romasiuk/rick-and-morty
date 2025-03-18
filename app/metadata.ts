import type { Metadata, Viewport } from "next"

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://rick-and-morty.example.com'),
  title: "Rick and Morty Explorer",
  description: "Explore the characters, episodes, and locations from Rick and Morty",
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: {
      url: "/favicon.svg",
      type: "image/svg+xml",
    },
  },
  manifest: "/site/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Rick and Morty Explorer",
    description: "Explore the characters, episodes, and locations from Rick and Morty",
    url: "https://rick-and-morty.example.com",
    siteName: "Rick and Morty Explorer",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rick and Morty Explorer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rick and Morty Explorer",
    description: "Explore the characters, episodes, and locations from Rick and Morty",
    images: ["/brand/og-image.png"],
  },
} 