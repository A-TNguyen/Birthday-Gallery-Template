"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ROUTES } from "@/lib/routes";
import { siteConfig } from "@/config/site";
import DomeGallery from "@/components/ui/DomeGallery";
import DomeGalleryLoading from "@/components/ui/DomeGalleryLoading";
import AudioController from "@/components/ui/AudioController";

export default function Gallery() {
  const [isLoading, setIsLoading] = useState(true);
  const [showGallery, setShowGallery] = useState(false);

  const { photos, dome } = siteConfig.gallery;
  const domeProps = useMemo(() => dome ?? {}, [dome]);

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoading(false);
      setShowGallery(true);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <Link
        href={ROUTES.HOME}
        className="absolute top-4 left-4 z-50 px-3 py-1 rounded-md bg-transparent text-white font-medium border border-white/70 hover:bg-white/10 hover:border-white transition-colors">
        ← Back
      </Link>
      <div className="relative w-full h-full">
        <DomeGalleryLoading isVisible={isLoading} />
        {showGallery && (
          <DomeGallery images={photos} {...domeProps} />
        )}
      </div>
      {!isLoading && <AudioController id="gallery-page-audio" />}
    </div>
  );
}
