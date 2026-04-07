"use client";

import { useMemo } from "react";
import { siteConfig } from "@/config/site";

export default function SharedAudioTemplate() {
  const { elementId, src } = siteConfig.audio;

  const audios = useMemo(
    () => (
      <section className="audios hidden">
        <audio id={elementId} src={src} loop preload="auto" />
      </section>
    ),
    [elementId, src]
  );

  return audios;
}
