"use client";

import { useEffect, useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";

interface AudioControllerProps {
  className?: string;
  id?: string;
}

export default function AudioController({
  className = "",
  id = "audio-controller",
}: AudioControllerProps) {
  const { isSignedIn, isLoaded } = useUser();
  const clerk = useClerk();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isValidated, setIsValidated] = useState(false);

  const getAudioElement = (): HTMLAudioElement | null => {
    return document.getElementById(
      siteConfig.audio.elementId
    ) as HTMLAudioElement;
  };

  // Play/pause toggle with authentication check
  const togglePlayPause = async () => {
    // Don't allow audio control if not signed in
    if (!isLoaded || !isSignedIn) {
      console.log("Audio control requires authentication");
      return;
    }

    const audio = getAudioElement();
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        setIsValidated(true);
      } else {
        await audio.play();
        setIsPlaying(true);
        setIsValidated(true);
      }
    } catch (error) {
      console.log("Audio play failed:", error);
      setIsValidated(false);
    }
  };

  // Stop audio when signed out - with immediate detection
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      const audio = getAudioElement();
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
        setIsValidated(false);
        console.log("Audio stopped due to sign out");
      }
    }
  }, [isLoaded, isSignedIn]);

  // Periodic check for authentication state changes
  useEffect(() => {
    const checkAuthState = () => {
      if (isLoaded && !isSignedIn) {
        const audio = getAudioElement();
        if (audio && !audio.paused) {
          audio.pause();
          setIsPlaying(false);
          setIsValidated(false);
          console.log("Audio stopped due to periodic auth check");
        }
      }
    };

    // Check every 500ms for immediate response
    const interval = setInterval(checkAuthState, 500);

    return () => clearInterval(interval);
  }, [isLoaded, isSignedIn]);

  // Additional check for immediate sign-out detection
  useEffect(() => {
    const handleSignOut = () => {
      const audio = getAudioElement();
      if (audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
        setIsValidated(false);
        console.log("Audio stopped immediately on sign out");
      }
    };

    // Listen for Clerk sign out events
    document.addEventListener("clerk:signOut", handleSignOut);

    // Listen for clicks on any element that might be a sign out button
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target) {
        // Check for various sign out button patterns
        const isSignOutButton =
          target.textContent?.toLowerCase().includes("sign out") ||
          target.textContent?.toLowerCase().includes("logout") ||
          target.getAttribute("data-clerk-sign-out") !== null ||
          target.closest("[data-clerk-sign-out]") !== null ||
          target
            .closest("button")
            ?.textContent?.toLowerCase()
            .includes("sign out");

        if (isSignOutButton) {
          handleSignOut();
        }
      }
    };

    document.addEventListener("click", handleClick);

    // Also listen for Clerk session changes
    if (clerk) {
      const unsubscribe = clerk.addListener(({ session }) => {
        if (!session) {
          handleSignOut();
        }
      });

      return () => {
        document.removeEventListener("clerk:signOut", handleSignOut);
        document.removeEventListener("click", handleClick);
        unsubscribe();
      };
    }

    return () => {
      document.removeEventListener("clerk:signOut", handleSignOut);
      document.removeEventListener("click", handleClick);
    };
  }, [clerk]);

  // Update time display and validate button state
  useEffect(() => {
    const audio = getAudioElement();
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setIsValidated(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsValidated(true);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setIsValidated(true);
    };

    const handleError = () => {
      setIsPlaying(false);
      setIsValidated(false);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    // Initial time update and state validation
    updateTime();
    setIsPlaying(!audio.paused);
    setIsValidated(true);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, []);

  // Format time for display
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Progress percentage
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Don't render if not loaded or not signed in
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div id={id} className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <div className="glass-player flex items-center gap-3 min-w-[200px] p-2 rounded-xl bg-white/25 shadow-2xl border border-white/40 backdrop-blur-2xl">
        {/* Play/Pause Button with validation indicator */}
        <button
          onClick={togglePlayPause}
          disabled={!isValidated}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            !isValidated
              ? "bg-red-500/20 cursor-not-allowed"
              : "bg-white/20 hover:bg-white/30"
          }`}
          title={
            !isValidated ? "Audio not ready" : isPlaying ? "Pause" : "Play"
          }>
          {!isValidated ? (
            <div className="w-3 h-3 border-2 border-white/50 rounded-full animate-pulse"></div>
          ) : isPlaying ? (
            <div className="w-3 h-3 flex gap-0.5">
              <div className="w-1 bg-white rounded-sm"></div>
              <div className="w-1 bg-white rounded-sm"></div>
            </div>
          ) : (
            <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-100 ${
                !isValidated ? "bg-red-500/50" : "bg-white"
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span
            className={`text-xs font-mono min-w-[35px] ${
              !isValidated ? "text-red-300" : "text-white"
            }`}>
            {!isValidated ? "---" : formatTime(currentTime)}
          </span>
        </div>
      </div>
    </div>
  );
}
