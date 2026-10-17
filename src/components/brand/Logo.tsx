import React from "react";
import Link from "next/link";

interface LogoProps {
  variant?: "full" | "mark" | "navbar";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string;
}

export function Logo({
  variant = "full",
  size = "md",
  className = "",
  href = "/",
}: LogoProps) {
  // Dimensions
  const sizes = {
    sm: { height: 32, markSize: 28 },
    md: { height: 42, markSize: 38 },
    lg: { height: 54, markSize: 48 },
    xl: { height: 68, markSize: 60 },
  };

  const currentSize = sizes[size] || sizes.md;

  // The Iconic V Icon (SVG vector with exact Hot Pink #FF4FA3, Electric Purple #5B3DF5, and black 3D shadow)
  const VIcon = () => (
    <svg
      viewBox="0 0 100 100"
      className="inline-block overflow-visible"
      style={{ width: currentSize.markSize, height: currentSize.markSize }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 3D Black Shadows underneath the V branches */}
      <g filter="drop-shadow(3px 4px 0px #111111)">
        {/* Pink left branch */}
        <rect
          x="18"
          y="22"
          width="24"
          height="62"
          rx="12"
          transform="rotate(-21 30 53)"
          fill="#FF4FA3"
          stroke="#111111"
          strokeWidth="3.5"
        />
        {/* Purple right branch overlapping at bottom */}
        <rect
          x="48"
          y="20"
          width="24"
          height="64"
          rx="12"
          transform="rotate(22 60 52)"
          fill="#5B3DF5"
          stroke="#111111"
          strokeWidth="3.5"
        />
      </g>
    </svg>
  );

  // Sparkle 4-point star in Hot Pink
  const Sparkle = () => (
    <svg
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 text-[#FF4FA3] inline-block animate-pulse"
      fill="currentColor"
    >
      <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
    </svg>
  );

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      {variant === "mark" ? (
        // App Icon squircle: Lime background with 3D black border and V mark inside
        <div
          className="relative flex items-center justify-center rounded-2xl bg-[#C8FF3D] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] p-1.5 transition-transform hover:-translate-y-0.5 active:translate-y-0"
          style={{ width: currentSize.markSize + 16, height: currentSize.markSize + 16 }}
        >
          <VIcon />
        </div>
      ) : variant === "navbar" ? (
        // Navbar lockup: Lime pill badge with V mark and bold black text
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#C8FF3D] border-2 border-[#111111] shadow-[3px_3px_0px_#111111] transition-transform hover:-translate-y-0.5 active:translate-y-0">
          <div className="flex-shrink-0 -my-1 -ml-1">
            <VIcon />
          </div>
          <div className="flex items-center text-[#111111] font-black tracking-tight text-xl font-sans">
            <span>veze</span>
            <span className="relative inline-flex flex-col items-center">
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <Sparkle />
              </span>
              <span>i</span>
            </span>
          </div>
        </div>
      ) : (
        // Full Hero/Header Badge as depicted in input_file_0.png
        <div className="relative inline-flex items-center gap-3.5 px-5 py-2.5 rounded-2xl bg-[#C8FF3D] border-3 border-[#111111] shadow-[4px_4px_0px_#111111] transition-transform hover:-translate-y-0.5 active:translate-y-0">
          <div className="flex-shrink-0 -my-1.5">
            <VIcon />
          </div>
          <div className="flex items-center text-[#111111] font-black tracking-tight text-2xl font-sans">
            <span>veze</span>
            <span className="relative inline-flex flex-col items-center">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Sparkle />
              </span>
              <span>i</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF3D] rounded-2xl">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
