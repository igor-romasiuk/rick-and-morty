"use client"

import Image from "next/image"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/Button"
import { ProfileHeaderProps } from "@/types/profile"

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-white/90 dark:bg-black/60 rounded-lg shadow-md">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-green-500">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "User"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-100 dark:bg-green-900">
            <span className="text-2xl font-bold text-green-800 dark:text-green-200">
              {user.name?.charAt(0) || user.email?.charAt(0) || "?"}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold">{user.name || "User"}</h1>
        <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>
      
      <Button 
        variant="outline" 
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
      >
        Sign Out
      </Button>
    </div>
  )
} 