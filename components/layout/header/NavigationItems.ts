import { Home, Users, Tv, Map } from "lucide-react"
import { AppRoutes } from "@/constants/routes"

export const navigationItems = [
  { name: "Home", path: AppRoutes.HOME, icon: Home },
  { name: "Characters", path: AppRoutes.CHARACTERS, icon: Users },
  { name: "Episodes", path: AppRoutes.EPISODES, icon: Tv },
  { name: "Locations", path: AppRoutes.LOCATIONS, icon: Map },
]
