"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { cn } from "@/utils/styles"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/Button"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/components/providers/FavoritesProvider"

interface FavoriteButtonProps {
  type: "characters" | "episodes" | "locations"
  id: number
  className?: string
}

export function FavoriteButton({ type, id, className }: FavoriteButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { isFavorite, addToFavorites, removeFromFavorites, favorites, refreshFavorites } = useFavorites()
  const [isLoading, setIsLoading] = useState(false)
  const [isFav, setIsFav] = useState(false)
  
  useEffect(() => {
    const favStatus = isFavorite(type, id);
    setIsFav(favStatus);
  }, [favorites, isFavorite, type, id]);
  
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!session?.user) {
      router.push("/login")
      return
    }
    
    setIsLoading(true)
    
    try {
      if (isFav) {
        await removeFromFavorites(type, id)
      } else {
        await addToFavorites(type, id)
      }
      
      setIsFav(!isFav);
      
      refreshFavorites();
      
      if (window.location.pathname !== '/profile') {
        setTimeout(() => {
          router.refresh();
        }, 300);
      }
      
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-10 w-10 rounded-full bg-white/90 dark:bg-black/70 shadow-md",
        isFav ? "text-red-500 hover:text-red-600 hover:bg-white/95 dark:hover:bg-black/80" : "text-gray-500 hover:text-red-500 hover:bg-white/95 dark:hover:bg-black/80",
        className
      )}
      onClick={handleToggleFavorite}
      disabled={isLoading}
    >
      <Heart className={cn("h-6 w-6", isFav ? "fill-red-500" : "")} />
      <span className="sr-only">
        {isFav ? "Remove from favorites" : "Add to favorites"}
      </span>
    </Button>
  )
} 