export enum AppRoutes {
  HOME = "/",
  CHARACTERS = "/characters",
  EPISODES = "/episodes",
  LOCATIONS = "/locations",
  PROFILE = "/profile",
  LOGIN = "/login",

  CHARACTER_DETAILS = "/characters/[id]",
  EPISODE_DETAILS = "/episodes/[id]",
  LOCATION_DETAILS = "/locations/[id]",
}

export const getRoute = {
  character: (id: string | number) => `/characters/${id}`,
  episode: (id: string | number) => `/episodes/${id}`,
  location: (id: string | number) => `/locations/${id}`,
};
 