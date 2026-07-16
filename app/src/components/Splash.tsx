"use client";

import { useEffect, useState } from "react";

export function Splash() {
  const [show, setShow] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Start fading out after 1.5 seconds
    const fadeTimer = setTimeout(() => setFade(true), 1500);
    // completely remove from DOM after 2 seconds
    const removeTimer = setTimeout(() => setShow(false), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface/95 backdrop-blur-md transition-opacity duration-500 ${
        fade ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Outer glowing pulse */}
        <div className="absolute inset-0 animate-ping rounded-full bg-accent/20"></div>

        {/* Spinning border ring */}
        <div className="absolute inset-2 animate-[spin_3s_linear_infinite] rounded-full border-t-2 border-r-2 border-accent/80"></div>

        {/* Inner logo SVG */}
        <div className="relative flex h-10 w-10 animate-pulse items-center justify-center text-white">
          <img src="/logo.svg" alt="Vault Pass" className="h-full w-full" />
        </div>
      </div>
      <p className="mt-8 animate-pulse font-display text-sm font-medium tracking-widest text-white/50 uppercase">
        Initializing Vault
      </p>
    </div>
  );
}
