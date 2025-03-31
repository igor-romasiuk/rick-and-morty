import { API_ENDPOINTS } from "@/constants/api";
import { BaseApiService } from "@/services/api/baseService";
import { Episode, APIResponse, Character } from "@/types/api";

export interface EpisodeParams {
  page?: number;
  name?: string;
  episode?: string;
}

export class EpisodeService extends BaseApiService {
  /**
   * Gets a list of episodes with optional filtering
   * @param params Filter parameters
   * @returns Episodes and pagination info
   */
  async getEpisodes(params: EpisodeParams = {}): Promise<APIResponse<Episode>> {
    return this.getList<Episode>(API_ENDPOINTS.EPISODES, params);
  }

  /**
   * Gets a single episode by ID
   * @param id Episode ID
   * @returns Episode data
   */
  async getEpisode(id: string): Promise<Episode> {
    return this.getById<Episode>(API_ENDPOINTS.EPISODES, id);
  }

  /**
   * Gets multiple episodes by IDs
   * @param ids Array of episode IDs
   * @returns Array of episodes
   */
  async getEpisodesByIds(ids: string[]): Promise<Episode[]> {
    return this.getByIds<Episode>(API_ENDPOINTS.EPISODES, ids);
  }

  /**
   * Gets characters for an episode based on character URLs
   * @param characterUrls Array of character URLs
   * @returns Array of characters
   */
  async getEpisodeCharacters(characterUrls: string[]): Promise<Character[]> {
    if (characterUrls.length === 0) return [];
    
    const ids = this.extractIdsFromUrls(characterUrls);
    
    return this.getByIds<Character>(API_ENDPOINTS.CHARACTERS, ids);
  }

  /**
   * Validates an episode code format (e.g., S01E01)
   * @param code Episode code to validate
   * @returns Whether the code is valid
   */
  validateEpisodeCode(code: string): boolean {
    return /^S\d{2}E\d{2}$/i.test(code);
  }
}

export const episodeService = new EpisodeService(); 
