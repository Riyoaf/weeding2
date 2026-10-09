"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";

interface ButterflyProps {
  size?: number;
  flapSpeed?: "fast" | "normal" | "slow";
  glowColor?: string;
}

function PointedGoldenButterfly({
  size = 46,
  flapSpeed = "normal",
  glowColor = "rgba(245, 205, 90, 0.45)",
}: ButterflyProps) {
  const rawId = useId();
  const id = rawId.replace(/:/g, "_");
  const gradId = `softGoldWingGrad_${id}`;
  const veinId = `softGoldVeinGrad_${id}`;

  const leftWingClass =
    flapSpeed === "fast"
      ? "butterfly-wing-left-fast"
      : flapSpeed === "slow"
      ? "butterfly-wing-left-slow"
      : "butterfly-wing-left";

  const rightWingClass =
    flapSpeed === "fast"
      ? "butterfly-wing-right-fast"
      : flapSpeed === "slow"
      ? "butterfly-wing-right-slow"
      : "butterfly-wing-right";

  return (
    <div
      className="butterfly-hover"
      style={{
        width: size,
        height: (size * 88) / 100,
        position: "relative",
        filter: `drop-shadow(0 0 7px ${glowColor}) drop-shadow(0 3px 8px rgba(0, 0, 0, 0.3))`,
      }}
    >
      <svg
        viewBox="0 0 100 88"
        style={{
          width: "100%",
          height: "100%",
          overflow: "visible",
        }}
      >
        <defs>
          {/* Soft luminous yellow-gold gradient */}
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8D6" stopOpacity="0.92" />
            <stop offset="28%" stopColor="#F5D26A" stopOpacity="0.86" />
            <stop offset="65%" stopColor="#DEAC42" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A87B22" stopOpacity="0.68" />
          </linearGradient>

          {/* Golden textured vein highlight */}
          <linearGradient id={veinId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#FFEBA4" stopOpacity="0.68" />
            <stop offset="100%" stopColor="#D9A83E" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* ========================================================
            1. SAYAP KIRI (Lancip, Bergerigi & Ekor Swallowtail)
            ======================================================== */}
        <g className={leftWingClass}>
          {/* Sayap Atas / Forewing — Ujung Lancip di (2, 6) & Pinggiran Bergerigi */}
          <path
            d="M48 34 C34 16 18 8 2 6 C4 14 7 19 10 24 C8 28 7 32 10 36 C14 40 19 43 25 45 C35 47 44 41 48 37 Z"
            fill={`url(#${gradId})`}
            stroke="#FFECA6"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Sayap Bawah / Hindwing — Ekor Lancip Swallowtail di (14, 82) & Bergerigi */}
          <path
            d="M47 42 C32 46 20 48 16 56 C13 61 14 66 12 72 C10 77 12 82 14 82 C17 80 20 74 23 70 C28 73 34 71 39 65 C44 59 46 50 47 46 Z"
            fill={`url(#${gradId})`}
            stroke="#FFECA6"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Tekstur Urat Sayap Utama (Veins radiating to sharp tips) */}
          <path
            d="M47 34 Q24 17 4 8 M47 35 Q22 24 11 25 M47 37 Q24 35 12 37 M47 38 Q30 43 24 45 M46 43 Q26 56 13 80 M46 44 Q30 65 37 66"
            stroke={`url(#${veinId})`}
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tekstur Urat Cabang / Cross-veins halus */}
          <path
            d="M26 19 Q20 22 13 24 M28 27 Q22 31 15 33 M24 53 Q18 57 15 63 M32 58 Q26 63 21 68"
            stroke={`url(#${veinId})`}
            strokeWidth="0.4"
            fill="none"
            opacity="0.65"
          />

          {/* Aksen Bintik Kristal & Tekstur Tepi Sayap */}
          <circle cx="12" cy="18" r="1.1" fill="#FFFFFF" opacity="0.75" />
          <circle cx="20" cy="14" r="0.9" fill="#FFFFFF" opacity="0.75" />
          <circle cx="16" cy="72" r="1.1" fill="#FFFFFF" opacity="0.7" />
          <polygon points="4,9 6,11 5,13 3,11" fill="#FFF8D6" opacity="0.8" />
        </g>

        {/* ========================================================
            2. SAYAP KANAN (Simetris Lancip & Ekor Swallowtail)
            ======================================================== */}
        <g className={rightWingClass}>
          {/* Sayap Atas / Forewing — Ujung Lancip di (98, 6) & Pinggiran Bergerigi */}
          <path
            d="M52 34 C66 16 82 8 98 6 C96 14 93 19 90 24 C92 28 93 32 90 36 C86 40 81 43 75 45 C65 47 56 41 52 37 Z"
            fill={`url(#${gradId})`}
            stroke="#FFECA6"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Sayap Bawah / Hindwing — Ekor Lancip Swallowtail di (86, 82) & Bergerigi */}
          <path
            d="M53 42 C68 46 80 48 84 56 C87 61 86 66 88 72 C90 77 88 82 86 82 C83 80 80 74 77 70 C72 73 66 71 61 65 C56 59 54 50 53 46 Z"
            fill={`url(#${gradId})`}
            stroke="#FFECA6"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Tekstur Urat Sayap Utama */}
          <path
            d="M53 34 Q76 17 96 8 M53 35 Q78 24 89 25 M53 37 Q76 35 88 37 M53 38 Q70 43 76 45 M54 43 Q74 56 87 80 M54 44 Q70 65 63 66"
            stroke={`url(#${veinId})`}
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tekstur Urat Cabang / Cross-veins halus */}
          <path
            d="M74 19 Q80 22 87 24 M72 27 Q78 31 85 33 M76 53 Q82 57 85 63 M68 58 Q74 63 79 68"
            stroke={`url(#${veinId})`}
            strokeWidth="0.4"
            fill="none"
            opacity="0.65"
          />

          {/* Aksen Bintik Kristal & Tekstur Tepi Sayap */}
          <circle cx="88" cy="18" r="1.1" fill="#FFFFFF" opacity="0.75" />
          <circle cx="80" cy="14" r="0.9" fill="#FFFFFF" opacity="0.75" />
          <circle cx="84" cy="72" r="1.1" fill="#FFFFFF" opacity="0.7" />
          <polygon points="96,9 94,11 95,13 97,11" fill="#FFF8D6" opacity="0.8" />
        </g>

        {/* ========================================================
            3. BADAN & ANTENA (Ramping, anggun di tengah)
            ======================================================== */}
        <g>
          {/* Thorax and Abdomen */}
          <ellipse cx="50" cy="46" rx="2.2" ry="14" fill="#6A4E1B" opacity="0.85" />
          <ellipse cx="50" cy="46" rx="1.5" ry="12" fill="#D9A83E" opacity="0.9" />
          {/* Head */}
          <circle cx="50" cy="29" r="2.8" fill="#FFF0AC" opacity="0.95" />
          {/* Antennae */}
          <path
            d="M48.5 27 Q41 15 32 10"
            stroke="#FFF0AC"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="32" cy="10" r="1.2" fill="#FFFFFF" />
          <path
            d="M51.5 27 Q59 15 68 10"
            stroke="#FFF0AC"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="68" cy="10" r="1.2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

export default function FlyingButterflies() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4,
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* ========================================================
          BUTTERFLY 1: Utama (Sayap Lancip, dari bawah kiri ke atas kanan)
          ======================================================== */}
      <motion.div
        animate={{
          x: ["-8vw", "20vw", "48vw", "75vw", "108vw"],
          y: ["88vh", "66vh", "42vh", "22vh", "-12vh"],
          rotate: [30, 42, 22, 38, 25],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.82,
        }}
      >
        <PointedGoldenButterfly size={46} flapSpeed="normal" glowColor="rgba(245, 205, 90, 0.45)" />
      </motion.div>

      {/* ========================================================
          BUTTERFLY 2: Sekunder (Lebih mungil, lincah, dari kanan ke kiri)
          ======================================================== */}
      <motion.div
        animate={{
          x: ["108vw", "78vw", "52vw", "24vw", "-12vw"],
          y: ["92vh", "70vh", "48vh", "26vh", "-10vh"],
          rotate: [-32, -45, -24, -36, -28],
        }}
        transition={{
          duration: 21,
          delay: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.74,
        }}
      >
        <PointedGoldenButterfly size={36} flapSpeed="fast" glowColor="rgba(250, 215, 110, 0.5)" />
      </motion.div>

      {/* ========================================================
          BUTTERFLY 3: Ambient (Meliuk santai di tengah-bawah)
          ======================================================== */}
      <motion.div
        animate={{
          x: ["8vw", "32vw", "54vw", "36vw", "68vw", "96vw", "110vw"],
          y: ["52vh", "38vh", "54vh", "65vh", "40vh", "22vh", "-8vh"],
          rotate: [18, 12, 32, -18, 26, 14, 28],
        }}
        transition={{
          duration: 25,
          delay: 11.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.7,
        }}
      >
        <PointedGoldenButterfly size={40} flapSpeed="slow" glowColor="rgba(240, 200, 85, 0.4)" />
      </motion.div>
    </div>
  );
}
