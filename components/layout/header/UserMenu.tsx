"use client"

import Link from "next/link"
import { LogOut, User as UserIcon, LogIn } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import type { User } from "@/components/auth/AuthContext"

interface UserMenuProps {
  user: User | null
  handleLogout: () => void
}

export function UserMenu({ user, handleLogout }: UserMenuProps) {
  if (!user) {
    return (
      <Link href="/login">
        <Button
          variant="outline"
          size="sm"
          className="border-green-500 text-green-600 dark:text-green-400 hover:bg-green-500/10"
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-full hover:bg-green-500/10 transition-colors"
          aria-label="Open user menu"
        >
          <Avatar className="h-9 w-9 border-2 border-green-500/50 hover:border-green-400 transition-all">
            <AvatarImage src={user.image || ""} alt={user.name || "User"} />
            <AvatarFallback className="bg-green-900 text-green-100">{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-white dark:bg-black border border-gray-200 dark:border-green-500/50"
      >
        <DropdownMenuLabel className="text-green-600 dark:text-green-400">
          <div className="flex flex-col">
            <span className="font-medium">{user.name || "User"}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">{user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-green-500/20" />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="cursor-pointer flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 