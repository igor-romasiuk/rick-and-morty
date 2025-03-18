import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { db } from "@/services/db/prisma"
import { authOptions } from "@/app/api/auth/options"

type FavoriteType = 'characters' | 'episodes' | 'locations';

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    let favorites = await db.favorites.findUnique({
      where: { userId: session.user.id }
    })
    
    if (!favorites) {
      favorites = await db.favorites.create({
        data: {
          userId: session.user.id,
          characters: [],
          episodes: [],
          locations: []
        }
      })
    }
    
    return NextResponse.json(favorites)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const { type, id, action } = await request.json()
    
    if (!type || !id || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    
    if (!["characters", "episodes", "locations"].includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }
    
    const favoriteType = type as FavoriteType;
    
    if (!["add", "remove"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
    
    let favorites = await db.favorites.findUnique({
      where: { userId: session.user.id }
    })
    
    if (!favorites) {
      favorites = await db.favorites.create({
        data: {
          userId: session.user.id,
          characters: [],
          episodes: [],
          locations: []
        }
      })
    }
    
    let updatedFavorites
    
    if (action === "add") {
      if (!favorites[favoriteType].includes(id)) {
        updatedFavorites = await db.favorites.update({
          where: { userId: session.user.id },
          data: {
            [favoriteType]: {
              push: id
            }
          }
        })
      } else {
        updatedFavorites = favorites
      }
    } else {
      updatedFavorites = await db.favorites.update({
        where: { userId: session.user.id },
        data: {
          [favoriteType]: {
            set: favorites[favoriteType].filter((item: number) => item !== id)
          }
        }
      })
    }
    
    return NextResponse.json(updatedFavorites)
  } catch (error) {
    console.error("Error updating favorites:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 