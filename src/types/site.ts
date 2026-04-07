/** Matches `DomeGallery` image entries and `src/content/site` gallery.photos objects. */
export type GalleryPhoto = { src: string; alt?: string };

export type DomeGalleryConfig = {
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

export type SiteConfig = {
  metadata: { title: string; description: string };
  home: {
    headline: string;
    countUp: {
      from: number;
      to: number;
      separator?: string;
      duration: number;
    };
    galleryButtonLabel: string;
  };
  audio: { elementId: string; src: string };
  gallery: {
    photos: GalleryPhoto[];
    dome?: DomeGalleryConfig;
  };
};
