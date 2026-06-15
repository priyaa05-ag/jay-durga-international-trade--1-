import React, { useState } from "react";
// @ts-ignore
import logoImg from "../assets/images/jay_durga_logo_1781512361628.jpg";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showText = true, size = "md" }: LogoProps) {
  // Elegant sizing heights to match visual layout rhythm perfectly
  const heights = {
    sm: "h-8 sm:h-9",
    md: "h-11 sm:h-12",
    lg: "h-16 sm:h-20"
  };

  // Main logo source is the compiled exact client image, with standard path mappings as backups
  const fallbackSources = [
    logoImg,
    "/assets/logo.png",
    "/logo.png",
    "/assets/logo.jpg",
    "/logo.jpg",
    "/assets/logo.svg",
    "/logo.svg",
    "/assets/logo.webp",
    "/logo.webp"
  ];

  const [srcIndex, setSrcIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleImgLoad = () => {
    setImageLoaded(true);
    setImageFailed(false);
  };

  const handleImgError = () => {
    if (srcIndex < fallbackSources.length - 1) {
      setSrcIndex((prev) => prev + 1);
    } else {
      setImageFailed(true);
    }
  };

  const currentSrc = fallbackSources[srcIndex];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 
        This is the main image element connected to the user's uploaded logo asset.
        If the file is present at '/assets/logo.png' (or any fallback in fallbackSources),
        it will load and render with a clean, responsive layout and proper aspect-ratio.
      */}
      <div className="relative flex items-center">
        <img
          src={currentSrc}
          alt="Jay Durga International Trade Logo"
          className={`${heights[size]} w-auto object-contain transition-all duration-300 ${
            imageLoaded && !imageFailed ? "opacity-100 block" : "opacity-0 absolute pointer-events-none"
          }`}
          onLoad={handleImgLoad}
          onError={handleImgError}
          referrerPolicy="no-referrer"
        />

        {/* 
          ELEGANT fallback markup displayed ONLY when the physical image file is missing.
          This prevents the browser's default broken image icon from ruining the website preview,
          maintaining premium client-ready visuals with beautiful Cormorant Garamond serif styling.
        */}
        {(!imageLoaded || imageFailed) && (
          <div className="flex items-center gap-3 transition-all duration-300">
            {/* Elegant Shield Monogram */}
            <div className={`flex items-center justify-center border-2 border-[#A61E22] bg-[#A61E22]/5 font-serif font-bold text-[#A61E22] ${
              size === "sm" ? "w-8 h-8 text-sm" : size === "md" ? "w-10 h-10 text-base" : "w-16 h-16 text-2xl"
            }`}>
              JD
            </div>

            {/* Typography Lockup */}
            {showText && (
              <div className="flex flex-col text-left">
                <span className="font-serif text-[#1A1A1A] leading-tight font-semibold tracking-wide text-stone-900" style={{ fontSize: size === "sm" ? "14px" : "18px" }}>
                  Jay Durga
                </span>
                <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.2em] font-black uppercase text-[#D4AF37] leading-none mt-0.5">
                  International Trade
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

