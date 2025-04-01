import type React from "react"
import { Inter, Orbitron } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/common/ThemeProvider"
import { FloatingCharacters } from "@/components/characters/FloatingCharacters"
import { Toaster } from "@/components/ui/Toaster"
import NextAuthProvider from "@/components/providers/NextAuthProvider"
import { FavoritesProvider } from "@/components/providers/FavoritesProvider"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ThemeScript } from "@/components/common/ThemeScript"
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
        <ThemeScript />
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
