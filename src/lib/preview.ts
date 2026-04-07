/** When true, routes are open and `/` goes to `/home` — for local screenshots only. Remove or set false before production. */
export const isClerkAuthSkipped =
  process.env.NEXT_PUBLIC_SKIP_CLERK_AUTH === "true";
