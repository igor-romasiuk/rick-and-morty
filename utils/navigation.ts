import { AppRoutes, getRoute } from "@/constants/routes"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

export function useAppNavigation() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const navigateTo = (route: AppRoutes, options?: { replace?: boolean }) => {
    if (options?.replace) {
      router.replace(route)
    } else {
      router.push(route)
    }
  }

  const navigateToEntity = (
    type: "character" | "episode" | "location",
    id: string | number
  ) => {
    const path = getRoute[type](id)
    router.push(path)
  }

  const navigateWithParams = (params: Record<string, string>) => {
    const currentParams = new URLSearchParams(searchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value)
      } else {
        currentParams.delete(key)
      }
    })
    
    const queryString = currentParams.toString()
    const url = queryString ? `${pathname}?${queryString}` : pathname
    
    router.push(url)
  }

  const isActive = (route: AppRoutes) => {
    return pathname === route || (pathname.startsWith(route) && route !== AppRoutes.HOME)
  }

  return {
    navigateTo,
    navigateToEntity,
    navigateWithParams,
    isActive,
    pathname,
  }
}
