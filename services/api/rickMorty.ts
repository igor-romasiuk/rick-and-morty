/**
 * @deprecated This file is kept for backward compatibility.
 * Please use the individual service files instead.
 */

import { Character, Episode, Location, APIResponse } from "@/types/api";
import { 
  characterService, 
  episodeService, 
  locationService,
  type CharacterParams,
  type EpisodeParams,
  type LocationParams
} from "./index";

export type { CharacterParams, EpisodeParams, LocationParams };

export async function getCharacters(params: CharacterParams): Promise<APIResponse<Character>> {
  return characterService.getCharacters(params);
}

export async function getCharacter(id: string): Promise<Character> {
  return characterService.getCharacter(id);
}

export async function getCharactersByIds(ids: string[]): Promise<Character[]> {
  return characterService.getCharactersByIds(ids);
}

export async function getCharacterEpisodes(episodeUrls: string[]): Promise<Episode[]> {
  return characterService.getCharacterEpisodes(episodeUrls);
}

export async function getEpisodes(params: EpisodeParams): Promise<APIResponse<Episode>> {
  return episodeService.getEpisodes(params);
}

export async function getEpisode(id: string): Promise<Episode> {
  return episodeService.getEpisode(id);
}

export async function getEpisodesByIds(ids: string[]): Promise<Episode[]> {
  return episodeService.getEpisodesByIds(ids);
}

export async function getEpisodeCharacters(characterUrls: string[]): Promise<Character[]> {
  return episodeService.getEpisodeCharacters(characterUrls);
}

export function validateEpisodeCode(code: string): boolean {
  return episodeService.validateEpisodeCode(code);
}

export async function getLocations(params: LocationParams): Promise<APIResponse<Location>> {
  return locationService.getLocations(params);
}

export async function getLocation(id: string): Promise<Location> {
  return locationService.getLocation(id);
}

export async function getLocationsByIds(ids: string[]): Promise<Location[]> {
  return locationService.getLocationsByIds(ids);
}

export async function getLocationResidents(residentUrls: string[]): Promise<Character[]> {
  return locationService.getLocationResidents(residentUrls);
} 