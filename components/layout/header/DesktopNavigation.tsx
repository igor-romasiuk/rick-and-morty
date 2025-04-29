"use client"

import Link from "next/link"
import { navigationItems } from "./NavigationItems"
import { useAppNavigation } from "@/utils/navigation"

export function DesktopNavigation() {
  const { isActive } = useAppNavigation()
  
  return (
    <nav className="hidden md:flex items-center space-x-1">
      {navigationItems.map((item) => {
        const active = isActive(item.path)

        return (
          <Link
            key={item.name}
            href={item.path}
            className={`relative px-4 py-2 text-lg font-medium transition-all ${
              active
                ? "text-green-600 dark:text-green-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600 dark:after:bg-green-400"
                : "text-gray-700 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-300 menu-item-hover"
            }`}
          >
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
