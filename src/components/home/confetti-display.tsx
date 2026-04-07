"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import type { ConfettiRef } from "@/components/ui/confetti";
import { Confetti } from "@/components/ui/confetti";
import SplitText from "@/components/ui/SplitText";
import CountUp from "@/components/ui/CountUp";
import { ROUTES } from "@/lib/routes";
import { siteConfig } from "@/config/site";

function ConfettiDemo() {
  const confettiRef = useRef<ConfettiRef>(null);
  const hasFiredRef = useRef(false);
  const [showGalleryButton, setShowGalleryButton] = useState(false);
  const { home } = siteConfig;

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    if (isMobile && !hasFiredRef.current) {
      hasFiredRef.current = true;
      const timer = setTimeout(() => {
        confettiRef.current?.fire({});
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="relative">
      <div className="relative flex flex-col items-center justify-center">
        <CountUp
          to={home.countUp.to}
          from={home.countUp.from}
          separator={home.countUp.separator ?? ","}
          direction="up"
          duration={home.countUp.duration}
          className="text-center text-7xl lg:text-8xl font-semibold leading-none text-white mb-4"
          onEnd={() => setShowGalleryButton(true)}
        />
        <div className="text-center text-7xl lg:text-8xl font-semibold leading-none mb-4">
          <SplitText
            tag="span"
            text={home.headline}
            className="text-white"
            delay={100}
            duration={2}
            ease="elastic.out(1, 0.3)"
            splitType="words"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
          />
        </div>

        {showGalleryButton && (
          <Link
            href={ROUTES.GALLERY}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-8 px-4 py-2 bg-white text-gray-900 font-semibold text-xl rounded-lg shadow-lg hover:bg-gray-100 transition-colors duration-200 hover:scale-105 animate-fade-in z-[60] pointer-events-auto">
            {home.galleryButtonLabel}
          </Link>
        )}
      </div>
      <Confetti
        ref={confettiRef}
        className="fixed inset-0 z-0 size-full"
        onMouseEnter={() => {
          confettiRef.current?.fire({});
        }}
      />
    </div>
  );
}

export default ConfettiDemo;
