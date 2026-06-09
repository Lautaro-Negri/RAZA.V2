"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  /** Primer fotograma mientras el archivo aún no baja */
  poster?: string;
};

/**
 * Carga y reproduce el MP4 solo cuando el elemento entra en el viewport,
 * con preload="none" para no competir con el primer render.
 */
export default function LazyAutoplayVideo({ src, className, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          obs.disconnect();
        }
      },
      { rootMargin: "100px", threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!shouldLoad || !v) return;
    if (v.dataset.loaded === "1") return;
    v.src = src;
    v.dataset.loaded = "1";
    v.load();
    void v.play().catch(() => {});
  }, [shouldLoad, src]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      className={className}
      aria-hidden
    />
  );
}
