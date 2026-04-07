export const ROUTES = {
  ROOT: "/", // Sign-in page
  HOME: "/home", // Actual home page after sign-in
  GALLERY: "/gallery",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];

export function isRoute(path: string): path is RoutePath {
  return (Object.values(ROUTES) as string[]).includes(path);
}

export function routeOf(key: RouteKey): RoutePath {
  return ROUTES[key];
}
