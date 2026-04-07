import type { SiteConfig } from "@/types/site";

/**
 * All copy, media URLs, and dome settings for the app live here.
 * (Plain .json files can’t include comments, so this file is TypeScript instead.)
 */
const siteConfig = {
  // Shown in the browser tab and used for SEO / link previews.
  metadata: {
    title: "3D Dome Gallery",
    description: "Interactive photo dome gallery template",
  },

  // The big celebration screen at /home (after sign-in).
  home: {
    // Main line under the animated number (e.g. “Happy Birthday, Alex”).
    headline: "Welcome",

    // Animated counter: counts from `from` up to `to` over `duration` seconds.
    // `separator` is how thousands are grouped (e.g. "," → 1,000).
    countUp: {
      from: 0,
      to: 25,
      separator: ",",
      duration: 1,
    },

    // Label on the button that sends people to the 3D gallery.
    galleryButtonLabel: "View Gallery",
  },

  // Background music: one hidden <audio> in the layout uses this id and file/url.
  // Put mp3 (or other supported audio) in /public/audio/… or use a full URL.
  // If you change `elementId`, keep it in sync with anything that looks up the element.
  audio: {
    elementId: "site-background-audio",
    src: "/audio/background.mp3",
  },

  gallery: {
    // Each item is one photo on the dome. `src` = image URL or path under /public.
    // `alt` helps screen readers and shows if the image fails to load.
    photos: [
      {
        src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Abstract art",
      },
      {
        src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Modern sculpture",
      },
      {
        src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Digital artwork",
      },
      {
        src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Contemporary art",
      },
      {
        src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Geometric pattern",
      },
      {
        src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        alt: "Textured surface",
      },
      {
        src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
        alt: "Social media image",
      },
    ],

    // Optional: tune the 3D dome (see src/types/site.ts for every key).
    // Examples: maxVerticalRotationDeg (tilt limit), grayscale, drag feel, segment count,
    // minRadius / maxRadius, dragSensitivity, openedImageWidth/Height, etc.
    dome: {
      maxVerticalRotationDeg: 5,
      grayscale: true,
      dragDampening: 2,
      segments: 35,
    },
  },
} satisfies SiteConfig;

export default siteConfig;
