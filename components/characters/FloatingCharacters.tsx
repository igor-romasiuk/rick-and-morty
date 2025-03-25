"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const characters = [
  { id: 1, name: "Rick", image: "/characters/rick-head.png" },
  { id: 2, name: "Morty", image: "/characters/morty-head.png" },
  { id: 3, name: "Summer", image: "/characters/summer-head.png" },
  { id: 4, name: "Beth", image: "/characters/beth-head.png" },
  { id: 5, name: "Jerry", image: "/characters/jerry-head.png" },
  { id: 6, name: "Meeseeks", image: "/characters/meeseeks-head.png" },
]

export function FloatingCharacters() {
  const [floatingHeads, setFloatingHeads] = useState<FloatingHead[]>([])

  useEffect(() => {
    const heads: FloatingHead[] = []

    for (let i = 0; i < 6; i++) {
      const character = characters[i]
      heads.push({
        ...character,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 40,
        speed: {
          x: (Math.random() - 0.5) * 0.05,
          y: (Math.random() - 0.5) * 0.05,
        },
        rotation: Math.random() * 20 - 10,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
      })
    }

    setFloatingHeads(heads)

    const interval = setInterval(() => {
      setFloatingHeads((prevHeads) =>
        prevHeads.map((head) => {
          let newX = head.x + head.speed.x
          let newY = head.y + head.speed.y

          if (newX < 0 || newX > 100) head.speed.x *= -1
          if (newY < 0 || newY > 100) head.speed.y *= -1

          newX = Math.max(0, Math.min(100, newX))
          newY = Math.max(0, Math.min(100, newY))

          const newRotation = head.rotation + head.rotationSpeed

          return {
            ...head,
            x: newX,
            y: newY,
            rotation: newRotation,
          }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {floatingHeads.map((head) => (
        <div
          key={head.id}
          className="absolute opacity-10 dark:opacity-20 transition-opacity hover:opacity-30 dark:hover:opacity-40"
          style={{
            left: `${head.x}%`,
            top: `${head.y}%`,
            transform: `rotate(${head.rotation}deg)`,
            transition: "transform 1s ease-in-out",
          }}
        >
          <Image
            src={head.image || "/placeholder.svg"}
            alt={head.name}
            width={head.size}
            height={head.size}
            loading="lazy"
            className="select-none"
          />
        </div>
      ))}
    </div>
  )
}

interface FloatingHead {
  id: number
  name: string
  image: string
  x: number
  y: number
  size: number
  speed: {
    x: number
    y: number
  }
  rotation: number
  rotationSpeed: number
}

