import { API_ENDPOINTS } from "@/constants/api";
import { BaseApiService } from "@/services/api/base-service";
import { Character, APIResponse, Episode } from "@/types/api";

export interface CharacterParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}

export class CharacterService extends BaseApiService {
  /**
   * Gets a list of characters with optional filtering
   * @param params Filter parameters
   * @returns Characters and pagination info
   */
  async getCharacters(params: CharacterParams = {}): Promise<APIResponse<Character>> {
    return this.getList<Character>(API_ENDPOINTS.CHARACTERS, params);
  }

  /**
   * Gets a single character by ID
   * @param id Character ID
   * @returns Character data
   */
  async getCharacter(id: string): Promise<Character> {
    return this.getById<Character>(API_ENDPOINTS.CHARACTERS, id);
  }

  /**
   * Gets multiple characters by IDs
   * @param ids Array of character IDs
   * @returns Array of characters
   */
  async getCharactersByIds(ids: string[]): Promise<Character[]> {
    return this.getByIds<Character>(API_ENDPOINTS.CHARACTERS, ids);
  }

  /**
   * Gets episodes for a character based on episode URLs
   * @param episodeUrls Array of episode URLs
   * @returns Array of episodes
   */
  async getCharacterEpisodes(episodeUrls: string[]): Promise<Episode[]> {
    if (episodeUrls.length === 0) return [];
    
    const ids = this.extractIdsFromUrls(episodeUrls);
    
    return this.getByIds<Episode>(API_ENDPOINTS.EPISODES, ids);
  }
}

export const characterService = new CharacterService(); 