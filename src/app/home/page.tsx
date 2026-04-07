"use client";

import ConfettiDemo from "@/components/home/confetti-display";
import Ballpit from "@/components/ui/Ballpit";
import AudioController from "@/components/ui/AudioController";
import { SignOutButton } from "@clerk/nextjs";
import { isClerkAuthSkipped } from "@/lib/preview";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gray-900">
      {!isClerkAuthSkipped && (
        <div className="absolute top-4 right-4 z-[70]">
          <SignOutButton>
            <button className="px-3 py-1 rounded-md bg-transparent text-white font-medium border border-white/70 hover:bg-white/10 hover:border-white transition-colors">
              Sign out
            </button>
          </SignOutButton>
        </div>
      )}
      {/* Ballpit Background */}
      <div className="absolute inset-0 z-1">
        <Ballpit
          count={30}
          gravity={0.1}
          friction={0.99}
          wallBounce={0.4}
          followCursor={false}
          ambientcolor={16776960}
          colors={[255, 255, 0]}
          className="w-full h-full"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative flex min-h-screen items-center justify-center">
        <ConfettiDemo />
      </div>

      {/* Audio Controller */}
      <AudioController id="home-page-audio" />
    </div>
  );
}
