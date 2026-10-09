"use client";

import React from "react";

interface FloralAccentProps {
  variant?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "center";
  color?: "sage" | "dustyRose" | "gold";
  size?: "sm" | "md" | "lg" | "xl";
  opacity?: number;
  useImage?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const responsiveSizeMap: Record<string, string> = {
  sm: "clamp(120px, 18vw, 200px)",
  md: "clamp(160px, 24vw, 280px)",
  lg: "clamp(200px, 30vw, 380px)",
  xl: "clamp(240px, 36vw, 480px)",
};

const numericSizeMap: Record<string, number> = {
  sm: 140,
  md: 220,
  lg: 300,
  xl: 400,
};

export default function FloralAccent({
  variant = "topLeft",
  size = "md",
  opacity = 0.85,
  useImage = true,
  className = "",
  style = {},
}: FloralAccentProps) {
  const cssSize = responsiveSizeMap[size] || "clamp(160px, 24vw, 280px)";
  const svgSize = numericSizeMap[size] || 220;

  // Precision corner positioning
  const positionStyles: Record<string, React.CSSProperties> = {
    topLeft: {
      position: "absolute",
      top: 0,
      left: 0,
      transform: "rotate(0deg)",
      transformOrigin: "top left",
    },
    topRight: {
      position: "absolute",
      top: 0,
      right: 0,
      transform: "scaleX(-1)",
      transformOrigin: "top right",
    },
    bottomLeft: {
      position: "absolute",
      bottom: 0,
      left: 0,
      transform: "scaleY(-1)",
      transformOrigin: "bottom left",
    },
    bottomRight: {
      position: "absolute",
      bottom: 0,
      right: 0,
      transform: "rotate(180deg)",
      transformOrigin: "bottom right",
    },
    center: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  if (useImage) {
    return (
      <div
        className={`pointer-events-none select-none ${className}`}
        style={{
          ...positionStyles[variant],
          width: cssSize,
          height: cssSize,
          opacity,
          zIndex: 1,
          pointerEvents: "none",
          ...style,
        }}
      >
        <img
          src="/elemen_pojok.png"
          alt="Elemen Pojok Bunga"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  }

  // Fallback SVG
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{
        ...positionStyles[variant],
        opacity,
        zIndex: 1,
        ...style,
      }}
    >
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 180 C100 140, 80 100, 60 60"
          stroke="#7D9B8A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M60 60 C40 40, 20 50, 30 70 C40 90, 60 80, 60 60Z"
          stroke="#7D9B8A"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M75 100 C55 80, 35 90, 45 110 C55 130, 75 120, 75 100Z"
          stroke="#7D9B8A"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}
