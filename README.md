# 3D Dome Birthday Gallery Template

## What is this?

This is a template version Birthday Card I've created for my partner birthday that is overly engineered for fun. I also bought NFC tag to put on a post card in order for my loved one can view anytime.

Only people who **sign in** get to see the party page and the photo dome. Everyone else just sees the login screen. The words, pictures, and music file all live in one easy file ([`src/content/site.ts`](src/content/site.ts), with comments explaining each field) so you can personalize it without digging through tons of code.

If you’re setting up the login part, Clerk’s docs for Next.js are here: [Clerk Next.js quickstart](https://clerk.com/docs/quickstarts/nextjs).

## Preview

![Screen recording of the template — home, confetti, and dome gallery](public/project%20screenshot/TemplateProject.gif)

**Home (`/home`)** — celebration page with Ballpit background  

![Home page](public/project%20screenshot/homepage.png)

**Home with confetti**  

![Home page with confetti](public/project%20screenshot/homepageconfetti.png)

**Dome gallery (`/gallery`)** — 3D photo dome  

![Dome gallery](public/project%20screenshot/domegallery.png)

## What it’s built with

- **Framework:** Next.js 15 (App Router), React 19, TypeScript  
- **Styling:** Tailwind CSS 4, `class-variance-authority`, `clsx`, `tailwind-merge`  
- **Dome gallery ([React Bits](https://www.reactbits.dev)):** [Dome Gallery](https://www.reactbits.dev/components/dome-gallery) on `/gallery`, implemented with Three.js and [`@use-gesture/react`](https://github.com/pmndrs/use-gesture) for dragging the dome  
- **Ballpit background ([React Bits](https://www.reactbits.dev)):** [Ballpit](https://www.reactbits.dev/backgrounds/ballpit) for the bouncing 3D balls behind the celebration page (`/home`)  
- **Confetti:** [`canvas-confetti`](https://www.npmjs.com/package/canvas-confetti) — demos and recipes at [canvas-confetti](https://www.kirilv.com/canvas-confetti/) (Kiril Vatev / **catdad**)  
- **Motion / animation:** GSAP + [`@gsap/react`](https://greensock.com/react), Motion (`motion`)  
- **Media helpers:** `react-h5-audio-player`, `react-player` (available if you extend the UI)  
- **Auth:** Clerk (`@clerk/nextjs`)  
- **Deploy / analytics:** Vercel Analytics and Speed Insights (optional but unncessary when you deploy)

## Install dependencies (download the libraries)

From the project root, install everything listed in [`package.json`](package.json):

```bash
npm install
```

If you use another package manager: `pnpm install` or `yarn install` works the same idea—all runtime deps land in `node_modules` so the Next app can build and run.

## Getting started

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Preview mode (screenshots without sign-in)

To capture `/home` and `/gallery` without going through Clerk:

1. In `.env.local`, set `NEXT_PUBLIC_SKIP_CLERK_AUTH=true` (see [`.env.example`](./.env.example)).
2. Restart `npm run dev`.
3. Open `/` — you’ll be redirected to `/home`. `/gallery` is open too. The Sign out control is hidden and the audio bar works without a session.

Turn it **off** (`false` or remove the line) before any real deploy. You still need valid Clerk keys in `.env.local` so `ClerkProvider` can load; this flag only skips the login wall and route protection.

Logic lives in [`src/lib/preview.ts`](src/lib/preview.ts) and is wired through [`src/middleware.ts`](src/middleware.ts), [`src/app/page.tsx`](src/app/page.tsx), [`src/app/home/page.tsx`](src/app/home/page.tsx), and [`src/components/ui/AudioController.tsx`](src/components/ui/AudioController.tsx).

## Background music (MP3) and the `public` folder

The background track is a normal HTML `<audio>` element. The URL comes from `audio.src` in [`src/content/site.ts`](src/content/site.ts).

**Where files live:** Anything in the [`public`](public) folder is served from the **root** of your site. So:

| File on disk | URL you put in `audio.src` |
|--------------|----------------------------|
| `public/example.mp3` | `/example.mp3` |
| `public/audio/background.mp3` | `/audio/background.mp3` |

You can also set `audio.src` to a **full HTTPS URL** if the file is hosted elsewhere (CDN, bucket, etc.).

**Tips:** Use a real `.mp3` (or another format the browser can play). Keep an eye on file size if you deploy to Git or a host with upload limits. If you rename the file or folder, update `site.ts` so the path matches.

## Gallery loading screen

When someone opens **`/gallery`**, they first see a short **loading screen** while the heavy 3D scene gets ready. That UI is [`src/components/ui/DomeGalleryLoading.tsx`](src/components/ui/DomeGalleryLoading.tsx): it shows a **looping, muted video** from [`public/cat.mp4`](public/cat.mp4) centered on the screen.

[`src/app/gallery/page.tsx`](src/app/gallery/page.tsx) keeps that screen visible for **about 1 second**, then hides it and mounts the dome. To change the clip, swap the video file under `public/` and update the `src` on the `<video>` in `DomeGalleryLoading.tsx`. To change how long the loading state lasts, adjust the `setTimeout` delay in `gallery/page.tsx` (currently `1000` ms).

## Setting up Clerk (login)

1. Make an app in the [Clerk Dashboard](https://dashboard.clerk.com). For your laptop, a **development** instance is fine.
2. Copy [`.env.example`](./.env.example) to `.env.local` and paste your keys. Don’t upload `.env.local` to GitHub. You need at least `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
3. In Clerk, under the paths / URLs settings (the exact menu name moves around sometimes), match this project:
   - **Sign-in URL:** `/` (that’s where the sign-in screen lives in `src/app/page.tsx`).
   - **After sign-in / after sign-up:** send people to `/home` so they land on the birthday page.
   - **Sign-up:** If Clerk sends people to a sign-up URL, `/sign-up` is already treated as public in `src/middleware.ts`, or you can add `src/app/sign-up/page.tsx`. Often sign-up is just part of the same sign-in component—either way works if Clerk is happy.
4. When you go live, put the same env vars on your host (e.g. Vercel) and add your real domain in Clerk so redirects work.

**Who can see what:** `/home` and `/gallery` need you to be logged in. Public pages include `/`, `/signin…`, and `/sign-up…` (see `src/middleware.ts`). There isn’t a separate `app/signin` folder—the `/signin` rule is there so Clerk’s own links don’t get blocked.

## Environment variables

Everything you need is listed in [`.env.example`](./.env.example). Copy to `.env.local`, fill it in, and if something feels stuck on redirects, try uncommenting the optional Clerk URL lines at the bottom.

## Making it yours

Open [`src/content/site.ts`](src/content/site.ts). That’s where you change the message, the birthday numbers, gallery images, background music URL, dome tweaks, and the site title/description—read the inline comments for what to tweak.

## Project structure (mind map)

```Mind Map
mindmap
  root((Birthday Gallery Template))
    AppRouter
      layout_Root["layout.tsx — ClerkProvider, fonts, analytics"]
      page_Root["/ — SignIn"]
      page_Home["/home — celebration + SignOut"]
      page_Gallery["/gallery — 3D dome gallery"]
    Components
      home["home/confetti-display — CountUp, SplitText, Confetti, link to gallery"]
      ui_Dome["ui/DomeGallery — React Bits Dome Gallery + DomeGalleryLoading"]
      ui_Audio["ui/AudioController — Clerk session, play/pause"]
      ui_Fx["ui/Ballpit — React Bits Ballpit; canvas-confetti (kirilv.com); buttons…"]
      shared["ui/SharedAudioTemplate — single hidden audio from site.ts"]
    DataAndTypes
      siteData["content/site.ts — editable content + comments"]
      types["types/site.ts — shape for site config"]
      config["config/site.ts — re-exports siteConfig"]
      routes["lib/routes.ts — path constants ROUTES"]
      libIndex["lib/index.ts — re-exports routes + utils"]
```

The shared audio helper is [`src/components/ui/SharedAudioTemplate.tsx`](src/components/ui/SharedAudioTemplate.tsx), pulled into [`src/app/layout.tsx`](src/app/layout.tsx).

## Why there’s a `SharedAudioTemplate`

- **One speaker for the whole app:** It adds a single hidden audio player (the id and mp3/url come from `site.ts`) in the main layout, so the music doesn’t restart every time you change pages.
- **Same buttons everywhere:** The play/pause UI on `/home` and `/gallery` talks to that one player. If each page had its own player, you’d get double sound or weird resets.
- **Layout vs pages:** The layout holds the actual audio; each page only adds the controls. That’s a nice split for Next.js.
- **It’s a client component** so the browser always knows where that one `<audio>` tag lives.

## How the files fit together

There’s no custom REST API or server actions in this repo—just login from Clerk and a typed content file. That keeps the project small and easy to copy for a birthday or portfolio piece. If you outgrow that, you can add API routes under `src/app/api/...` or server actions later.

- **[`src/content/site.ts`](src/content/site.ts)** — Your story, images, music, dome options (comments explain each block).
- **[`src/types/site.ts`](src/types/site.ts)** — TypeScript shapes so the config can’t drift into something broken without the editor complaining.
- **[`src/config/site.ts`](src/config/site.ts)** — Re-exports `siteConfig` for the rest of the app (including the page title in the layout).
- **[`src/lib/routes.ts`](src/lib/routes.ts)** — Friendly names for paths like `/home` and `/gallery` so links stay in sync.
- **[`src/lib/index.ts`](src/lib/index.ts)** — Shortcuts so you can import from `@/lib` when you want.

## Deploy

[Vercel](https://vercel.com/new) works great; any Next.js host is fine. Don’t forget Clerk env vars and your production domain in the Clerk dashboard.

## Improvements (media outside `public/`)

Right now photos and music URLs point at files under [`public`](public) or at third-party URLs. That is simple for a gift or demo, but large MP3s and personal photos in Git can get awkward (repo size, accidental commits, no per-user content).

**Possible next steps:**

- **[Convex](https://www.convex.dev/)** — Store gallery metadata (titles, order, Clerk user id) in Convex documents; upload binaries to **Convex file storage** or keep files in S3/R2 and store only the URL in Convex. Your Next app would fetch the list (and maybe signed URLs) with Convex hooks or HTTP actions instead of hard-coding everything in `site.ts`.
- **Any database + object storage** — Same idea with Postgres (Neon, Supabase), MongoDB, etc.: rows for “which images / which track,” plus a bucket (S3, Cloudflare R2, Vercel Blob) for the actual audio and images. Serve the UI with short-lived signed URLs so assets are not world-readable static files in `public/`.

Either path pairs naturally with **Clerk**: use the signed-in user’s id to decide which gallery or playlist to load, and keep `site.ts` for layout copy only (or migrate that to the DB too).

## License

This template is released under a **non-commercial** license. You may use, change, and share it for personal, educational, and other non-profit purposes. **Commercial or for-profit use is not allowed** without separate written permission from the copyright holder(s). See [`LICENSE`](LICENSE) for the full text.

Replace `Copyright (c) 2026 3D Dome Birthday Gallery Template contributors` in `LICENSE` with your own name or entity if you fork this as yours. Third-party code (npm packages, React Bits–style components, etc.) stays under its original licenses.
