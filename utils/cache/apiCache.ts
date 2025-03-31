import { CACHE_DURATION } from "@/constants/api";
import { APIError, APIResponse } from "@/types/api";

const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Fetches data from the API with caching
 * @param url The API endpoint URL
 * @param params Query parameters
 * @returns The API response
 */
export async function fetchWithCache<T>(
  url: string, 
  params: Record<string, any> = {}
): Promise<APIResponse<T>> {
  const queryString = new URLSearchParams(
    Object.entries(params).filter(([_, value]) => value && value !== "all")
  ).toString();
  
  const fullUrl = `${url}${queryString ? `?${queryString}` : ""}`;
  const cacheKey = fullUrl;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(fullUrl);
  
  if (!response.ok) {
    const error: APIError = await response.json();
    throw new Error(error.error || `API Error: ${response.statusText}`);
  }

  const data = await response.json();
  
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}

export function clearCache(): void {
  cache.clear();
}

/**
 * Clears a specific cache entry
 * @param url The URL to clear from cache
 */
export function clearCacheForUrl(url: string): void {
  const keysToDelete = Array.from(cache.keys()).filter(key => key.startsWith(url));
  keysToDelete.forEach(key => cache.delete(key));
}
