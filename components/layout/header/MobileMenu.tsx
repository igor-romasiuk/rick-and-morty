"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { X, User as UserIcon, LogIn, LogOut } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { navigationItems } from "./NavigationItems"
import { menuVariants, containerVariants, overlayVariants } from "./Animations"
import { MobileMenuProps } from "@/types/header"

export function MobileMenu({
  isMenuOpen,
  setIsMenuOpen,
  menuHeight,
  user,
  handleLogout
}: MobileMenuProps) {
  const pathname = usePathname()
  const menuRef = useRef<HTMLDivElement>(null)

  if (!isMenuOpen) return null

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 md:hidden"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        onClick={() => setIsMenuOpen(false)}
      />

      <motion.div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 w-[300px] z-50 bg-white dark:bg-gray-900 shadow-xl md:hidden overflow-y-auto scrollbar-hide"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        style={{ height: menuHeight, maxHeight: '100vh' }}
      >
        <div className="flex flex-col h-full">
          <motion.div
            className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center">
              <Image src="/brand/logo.svg" alt="Rick and Morty" width={0} height={0} sizes="100vw" className="h-8 w-auto" />
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
              className="text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 p-2 rounded-full"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </motion.button>
          </motion.div>

          <motion.nav
            className="flex-1 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2 pr-2">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.path || (pathname.startsWith(item.path + "/") && item.path !== "/")
                const Icon = item.icon

                return (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={menuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center px-4 py-3 text-base font-medium rounded-lg transition-colors ${isActive
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                      {isActive && (
                        <motion.span
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500"
                          layoutId="activeIndicator"
                          initial={{ scale: 0.8, opacity: 0.8 }}
                          animate={{
                            scale: [0.8, 1.2, 1],
                            opacity: 1,
                            transition: {
                              duration: 1.2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.nav>

          <motion.div
            className="p-4 pr-6 border-t border-gray-200 dark:border-gray-800 sticky bottom-0 bg-white dark:bg-gray-900 z-10 mt-auto"
            variants={menuVariants}
            custom={navigationItems.length}
            exit="exit"
          >
            {user ? (
              <div className="space-y-3">
                <motion.div
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Avatar className="h-10 w-10 border border-green-500/50">
                    <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                    <AvatarFallback className="bg-green-900 text-green-100">{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name || "User"}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[150px]">{user.email}</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href="/profile"
                    className="flex items-center w-full px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </button>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
} 