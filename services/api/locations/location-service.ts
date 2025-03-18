import { API_ENDPOINTS } from "@/constants/api";
import { BaseApiService } from "@/services/api/base-service";
import { Location, APIResponse, Character } from "@/types/api";

export interface LocationParams {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export class LocationService extends BaseApiService {
  /**
   * Gets a list of locations with optional filtering
   * @param params Filter parameters
   * @returns Locations and pagination info
   */
  async getLocations(params: LocationParams = {}): Promise<APIResponse<Location>> {
    return this.getList<Location>(API_ENDPOINTS.LOCATIONS, params);
  }

  /**
   * Gets a single location by ID
   * @param id Location ID
   * @returns Location data
   */
  async getLocation(id: string): Promise<Location> {
    return this.getById<Location>(API_ENDPOINTS.LOCATIONS, id);
  }

  /**
   * Gets multiple locations by IDs
   * @param ids Array of location IDs
   * @returns Array of locations
   */
  async getLocationsByIds(ids: string[]): Promise<Location[]> {
    return this.getByIds<Location>(API_ENDPOINTS.LOCATIONS, ids);
  }

  /**
   * Gets residents for a location based on resident URLs
   * @param residentUrls Array of resident URLs
   * @returns Array of characters
   */
  async getLocationResidents(residentUrls: string[]): Promise<Character[]> {
    if (residentUrls.length === 0) return [];
    
    const ids = this.extractIdsFromUrls(residentUrls);
    
    return this.getByIds<Character>(API_ENDPOINTS.CHARACTERS, ids);
  }
}

export const locationService = new LocationService(); 