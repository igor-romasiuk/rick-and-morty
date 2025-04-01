"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"
import { AuthContext, type User } from "./AuthContext"
import {isFavorite } from "@/utils/FavoritesUtils"

export { useAuth } from "@/hooks/useAuth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | null>(null)
  const hasFetchedFavorites = useRef(false);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true)
      return
    }
    
    setIsLoading(false)
    
    if (session?.user) {
      setUser({
        id: session.user.id as string,
        name: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || undefined,
        favorites: {
          characters: [],
          episodes: [],
          locations: []
        }
      })
      hasFetchedFavorites.current = false;
    } else {
      setUser(null)
    }
  }, [session, status])

  const loadFavorites = useCallback(async () => {
    try {
      const response = await fetch('/api/favorites')
      
      if (response.ok) {
        const data = await response.json()
        
        setUser(prevUser => {
          if (!prevUser) return null
          
          return {
            ...prevUser,
            favorites: {
              characters: data.characters || [],
              episodes: data.episodes || [],
              locations: data.locations || []
            }
          }
        })
      }
    } catch (error) {
      console.error("Failed to load favorites:", error)
    }
  }, []);

  useEffect(() => {
    if (user?.id && !hasFetchedFavorites.current) {
      hasFetchedFavorites.current = true;
      loadFavorites();
    }
  }, [user?.id, loadFavorites]);

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        return { success: false, error: result.error }
      }
      
      router.push("/profile")
      router.refresh()
      return { success: true }
    } catch (error: unknown) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed" }
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        return { success: false, error: data.message || "Registration failed" }
      }
      
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      
      if (result?.error) {
        return { 
          success: true, 
          message: "Registration successful! Please log in with your new account."
        }
      }
      
      router.push("/profile")
      router.refresh()
      
      return { success: true, message: "Registration successful! Welcome to your profile." }
    } catch (error: unknown) {
      console.error("Registration error:", error)
      return { success: false, error: "Registration failed. Try again later." }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut({ redirect: false })
      setUser(null)
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const updateFavorites = async (type: "characters" | "episodes" | "locations", id: number, action: "add" | "remove") => {
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, id, action }),
      })
      
      if (response.ok) {
        const updatedFavorites = await response.json()
        
        setUser(prevUser => {
          if (!prevUser) return null
          
          return {
            ...prevUser,
            favorites: updatedFavorites
          }
        })
      }
    } catch (error) {
      console.error(`Failed to ${action} favorite:`, error)
    }
  }

  const contextValue = {
    user,
    isLoading,
    login,
    register,
    logout,
    addToFavorites: (type: "characters" | "episodes" | "locations", id: number) => 
      updateFavorites(type, id, "add"),
    removeFromFavorites: (type: "characters" | "episodes" | "locations", id: number) => 
      updateFavorites(type, id, "remove"),
    isFavorite: (type: "characters" | "episodes" | "locations", id: number) => 
      isFavorite(user, type, id),
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

