import { Metadata } from 'next';
import ClientProviders from '@/components/ClientProviders';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Rick and Morty Universe Explorer',
  description: 'Explore characters, locations, and episodes from the Rick and Morty universe',
  keywords: 'Rick and Morty, cartoon, characters, locations, episodes',
  openGraph: {
    title: 'Rick and Morty Universe Explorer',
    description: 'Explore the multiverse of Rick and Morty',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
      </head>
      <body suppressHydrationWarning>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
