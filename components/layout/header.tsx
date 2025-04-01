"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { useSession } from "next-auth/react"
import { ThemeToggle } from "@/components/common/ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"
import { DesktopNavigation } from "@/components/layout/header/DesktopNavigation"
import { UserMenu } from "@/components/layout/header/UserMenu"
import { MobileMenu } from "@/components/layout/header/MobileMenu"
import { type User } from "@/components/auth/AuthContext"
import { useAuth } from "@/components/auth/AuthProvider"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session, status } = useSession()
  const isLoading = status === "loading"

  const user = useMemo(() => {
    if (!session?.user) return null;

    return {
      id: session.user.id as string,
      name: session.user.name || "",
      email: session.user.email || "",
      image: session.user.image || undefined,
      favorites: {
        characters: [],
        episodes: [],
        locations: []
      }
    } as User;
  }, [session]);

  const [menuHeight, setMenuHeight] = useState("100%")

  useEffect(() => {
    if (isMenuOpen && typeof window !== 'undefined') {
      setMenuHeight(`${window.innerHeight}px`)

      const handleResize = () => {
        setMenuHeight(`${window.innerHeight}px`)
      }

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const context = useAuth()

  if (isLoading) {
    return (
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-green-500/20"
            : "bg-transparent"
          }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="relative z-10 flex items-center">
            <Image src="/brand/logo.svg" alt="Rick and Morty" width={0} height={0} sizes="100vw" className="h-10 w-auto" />
          </Link>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  const handleLogout = () => {
    if (context?.logout) {
      context.logout()
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-green-500/20"
          : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="relative z-10 flex items-center">
          <Image src="/brand/logo.svg" alt="Rick and Morty" width={0} height={0} sizes="100vw" className="h-10 w-auto" />
        </Link>

        <DesktopNavigation />

        <div className="hidden md:flex items-center space-x-2">
          <ThemeToggle />
          <UserMenu user={user} handleLogout={handleLogout} />
        </div>

        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="text-green-600 dark:text-green-400 hover:bg-green-500/10 transition-colors p-2 rounded-full"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <MobileMenu
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          menuHeight={menuHeight}
          user={user}
          handleLogout={handleLogout}
        />
      </AnimatePresence>
    </header>
  )
}
