import { fetchWithCache } from "@/utils/cache/apiCache";
import { APIResponse } from "@/types/api";

export class BaseApiService {
  /**
   * Fetches a list of items with optional filtering
   * @param endpoint The API endpoint
   * @param params Query parameters
   * @returns API response with results and pagination info
   */
  protected async getList<T>(
    endpoint: string, 
    params: Record<string, any> = {}
  ): Promise<APIResponse<T>> {
    return fetchWithCache<T>(endpoint, params);
  }

  /**
   * Fetches a single item by ID
   * @param endpoint The API endpoint
   * @param id The item ID
   * @returns The item
   */
  protected async getById<T>(endpoint: string, id: string): Promise<T> {
    const response = await fetch(`${endpoint}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch item with ID ${id}`);
    }
    return response.json();
  }

  /**
   * Fetches multiple items by IDs
   * @param endpoint The API endpoint
   * @param ids Array of item IDs
   * @returns Array of items
   */
  protected async getByIds<T>(endpoint: string, ids: string[]): Promise<T[]> {
    if (ids.length === 0) return [];
    
    const response = await fetch(`${endpoint}/${ids.join(",")}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch items with IDs ${ids.join(", ")}`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  }

  /**
   * Extracts IDs from URLs
   * @param urls Array of URLs
   * @returns Array of extracted IDs
   */
  protected extractIdsFromUrls(urls: string[]): string[] {
    return urls.map(url => url.split("/").pop() as string);
  }
} 