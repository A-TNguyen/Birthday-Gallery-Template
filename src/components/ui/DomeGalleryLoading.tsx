"use client";

interface DomeGalleryLoadingProps {
  isVisible: boolean;
}

export default function DomeGalleryLoading({
  isVisible,
}: DomeGalleryLoadingProps) {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative sm:h-50 sm:w-50 lg:h-150 lg:w-150">
          <video
            src="/cat.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
