"use client"

import { User } from "lucide-react"
import { PortalCard } from "@/components/common/PortalCard"
import { SciFiButton } from "@/components/common/SciFiButton"
import { motion } from "framer-motion"

interface ProfileCTAProps {
  user?: { name: string; image?: string } | null
}

export function ProfileCTA({ user }: ProfileCTAProps) {
  if (!user) return null

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PortalCard 
            className="bg-gradient-to-r from-green-50/80 to-blue-50/80 dark:from-green-900/10 dark:to-blue-900/10 p-6 rounded-xl border border-green-200/50 dark:border-green-800/50 backdrop-blur-sm"
            variant="green"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.div 
                className="text-center sm:text-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold mb-2 heading-sci-fi text-gray-800 dark:text-white">
                  <span className="text-green-600 dark:text-green-400">Welcome back, {user.name}!</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Continue your journey through the multiverse. Check out your profile to see your favorite characters,
                  episodes, and locations.
                </p>
              </motion.div>

              <div className="w-full sm:w-auto">
                <SciFiButton 
                  variant="primary" 
                  className="whitespace-nowrap"
                  onClick={() => window.location.href = '/profile'}
                >
                  <User className="h-4 w-4" />
                  Go to Profile
                </SciFiButton>
              </div>
            </div>
            
            <motion.div 
              className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/5 dark:bg-green-500/5 rounded-full blur-3xl -z-10"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
          </PortalCard>
        </motion.div>
      </div>
    </section>
  )
} 