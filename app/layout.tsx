import type React from "react"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingCharacters } from "@/components/characters/floating-characters"
import { Toaster } from "@/components/ui/toaster"
import NextAuthProvider from "@/components/providers/session-provider"
import { FavoritesProvider } from "@/components/providers/favorites-provider"
import { AuthProvider } from "@/components/auth/auth-provider"
import { metadata, viewport } from "./metadata"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })

export { metadata, viewport }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${orbitron.variable}`}>
      <head>
        <script src="/theme.js" />
      </head>
      <body
        className={`${inter.className} bg-gray-50 dark:bg-black min-h-screen flex flex-col transition-colors duration-300`}
      >
        <NextAuthProvider>
            <ThemeProvider>
              <AuthProvider>
                <FavoritesProvider>
                  <FloatingCharacters />
                  <Header />
                  <main className="flex-1 relative z-10">{children}</main>
                  <Footer />
                  <Toaster />
                </FavoritesProvider>
              </AuthProvider>
            </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
