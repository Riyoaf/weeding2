"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface OpeningAnimationProps {
  onOpen?: () => void;
  onStartOpen?: () => void;
  onOpenComplete?: () => void;
}

export default function OpeningAnimation({
  onOpen,
  onStartOpen,
  onOpenComplete,
}: OpeningAnimationProps) {
  const [phase, setPhase] = useState<"cover" | "envelope">("cover");
  const [coverData, setCoverData] = useState({
    badgeText: "Pernikahan dari",
    photoUrl: "/uploads/mempelai_sherly_1791473986141.jpeg",
    coupleName: `${weddingData.groom.name} & ${weddingData.bride.name}`,
    dateText: `${weddingData.akad.displayDay}, ${weddingData.akad.displayDate}`,
    bgUrl: "/uploads/latar_1791136432133.png",
  });

  useEffect(() => {
    // 1. Immediately hydrate from localStorage cache for 0ms instant display
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("wedding_cover_settings");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed && parsed.photoUrl) {
            setCoverData((prev) => ({ ...prev, ...parsed }));
          }
        } catch (_) {}
      }
    }

    // 2. Fetch fresh settings from database API
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.settings) {
          const s = data.data.settings;
          const couple =
            s.cover_couple_name?.trim() ||
            (s.groom_name && s.bride_name ? `${s.groom_name} & ${s.bride_name}` : `${weddingData.groom.name} & ${weddingData.bride.name}`);
          const date =
            s.cover_date_text?.trim() ||
            (s.akad_display_day && s.akad_display_date ? `${s.akad_display_day}, ${s.akad_display_date}` : `${weddingData.akad.displayDay}, ${weddingData.akad.displayDate}`);

          const updated = {
            badgeText: s.cover_badge_text || "Pernikahan dari",
            photoUrl: s.cover_photo_url || "/uploads/mempelai_sherly_1791473986141.jpeg",
            coupleName: couple,
            dateText: date,
            bgUrl: s.cover_bg_url || "/uploads/latar_1791136432133.png",
          };

          setCoverData(updated);
          if (typeof window !== "undefined") {
            localStorage.setItem("wedding_cover_settings", JSON.stringify(updated));
          }
        }
      })
      .catch((err) => console.error("Error loading cover settings:", err));
  }, []);

  const handleOpen = () => {
    if (phase !== "cover") return;

    // Trigger audio immediately on user click gesture
    onStartOpen?.();
    onOpen?.();

    // Start envelope opening ceremony
    setPhase("envelope");

    // Complete transition into main invitation content after a calm, majestic duration
    setTimeout(() => {
      onOpenComplete?.();
    }, 3150);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="opening-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 0.85, ease: "easeInOut" },
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url('${coverData.bgUrl}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#161817",
          overflow: "hidden",
        }}
      >
        {/* Dark transparent overlay so background texture is clearly visible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.70) 65%, rgba(0, 0, 0, 0.90) 100%)",
          }}
        />

        <AnimatePresence mode="wait">
          {phase === "cover" ? (
            /* 1. INITIAL COVER GLASSMORPHISM CARD */
            <motion.div
              key="cover-card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, y: -15, transition: { duration: 0.25 } }}
              transition={{ delay: 0.25, duration: 0.7, ease: "easeOut" }}
              style={{
                position: "relative",
                zIndex: 1,
                width: "min(370px, 90vw)",
                padding: "2.5rem 2rem 2.25rem",
                background: "rgba(18, 18, 18, 0.72)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderRadius: "1.5rem",
                border: "1px solid rgba(212, 175, 55, 0.35)",
                boxShadow:
                  "0 20px 50px rgba(0,0,0,0.65), 0 0 30px rgba(212, 175, 55, 0.12)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {/* Label "PERNIKAHAN DARI" */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#E8D5A3",
                  marginBottom: "1.25rem",
                }}
              >
                {coverData.badgeText}
              </motion.p>

              {/* Profile Avatar with Integrated Wayang Frame Cradle */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.65, ease: "easeOut" }}
                style={{
                  position: "relative",
                  width: 220,
                  height: 190,
                  marginBottom: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {/* Profile Photo with Golden Ring */}
                <div
                  style={{
                    position: "relative",
                    width: 148,
                    height: 148,
                    borderRadius: "50%",
                    marginTop: 14,
                    padding: 3,
                    background:
                      "linear-gradient(135deg, #E8D5A3 0%, #C9A96E 50%, #B8934A 100%)",
                    boxShadow:
                      "0 0 0 2px rgba(18, 18, 18, 0.9), 0 8px 24px rgba(0, 0, 0, 0.65), 0 0 20px rgba(212, 175, 55, 0.25)",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    backgroundColor: "#201A15",
                  }}
                >
                  <img
                    src={coverData.photoUrl}
                    alt={`Profil ${coverData.coupleName}`}
                    loading="eager"
                    decoding="async"
                    // @ts-ignore
                    fetchPriority="high"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center 15%",
                    }}
                  />
                </div>

                {/* Wayang Frame Ornament */}
                <img
                  src="/wayang_frame.png"
                  alt="Ornamen Wayang"
                  loading="eager"
                  decoding="async"
                  // @ts-ignore
                  fetchPriority="high"
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 192,
                    height: "auto",
                    zIndex: 2,
                    pointerEvents: "none",
                    filter:
                      "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 10px rgba(229, 192, 110, 0.35))",
                  }}
                />
              </motion.div>

              {/* Nama Pasangan */}
              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.65, ease: "easeOut" }}
                style={{
                  fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
                  fontSize: "clamp(2.5rem, 9vw, 3.4rem)",
                  fontWeight: 400,
                  color: "#E5C06E",
                  textShadow: "0 2px 14px rgba(229, 192, 110, 0.35)",
                  lineHeight: 1.15,
                  margin: 0,
                  marginBottom: "0.75rem",
                }}
              >
                {coverData.coupleName}
              </motion.h1>

              {/* Tanggal di Depan */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.875rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  marginBottom: "1.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                }}
              >
                {coverData.dateText}
              </motion.p>

              {/* Tombol Buka Undangan */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95, duration: 0.5 }}
                onClick={handleOpen}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 26px rgba(212, 175, 55, 0.4)" }}
                whileTap={{ scale: 0.96 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.8rem 2rem",
                  background: "linear-gradient(135deg, #D4AF37 0%, #B8934A 100%)",
                  border: "1px solid rgba(255, 235, 170, 0.5)",
                  borderRadius: "9999px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "#1c180e",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: "0 6px 20px rgba(0, 0, 0, 0.35), 0 2px 10px rgba(212, 175, 55, 0.25)",
                  letterSpacing: "0.02em",
                }}
              >
                Buka Undangan
                <EnvelopeIcon />
              </motion.button>
            </motion.div>
          ) : (
            /* 2. THE GRAND ROYAL ENVELOPE OPENING CEREMONY */
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, scale: 0.88, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                position: "relative",
                zIndex: 2,
                width: "min(360px, 92vw)",
                height: 250,
                perspective: 1200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* 3D Envelope Top Flap (Flips open -180deg backward behind envelope) */}
              <motion.div
                initial={{ rotateX: 0, zIndex: 6, y: 0 }}
                animate={{
                  rotateX: -180,
                  zIndex: 0,
                  y: 45,
                }}
                transition={{
                  rotateX: {
                    delay: 0.28,
                    duration: 0.85,
                    ease: [0.35, 0, 0.2, 1],
                  },
                  y: {
                    delay: 0.75,
                    duration: 1.4,
                    ease: [0.33, 1, 0.68, 1],
                  },
                }}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 140,
                  transformOrigin: "top center",
                  transformStyle: "preserve-3d",
                  pointerEvents: "none",
                }}
              >
                <svg
                  viewBox="0 0 360 140"
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.65))",
                  }}
                >
                  <defs>
                    <linearGradient id="topFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#342A21" />
                      <stop offset="100%" stopColor="#1E1712" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="0,0 360,0 180,140"
                    fill="url(#topFlapGrad)"
                    stroke="rgba(212, 175, 55, 0.6)"
                    strokeWidth="1.5"
                  />
                </svg>
              </motion.div>

              {/* Back Box of Envelope (Base of envelope at zIndex: 1) */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 45 }}
                transition={{
                  delay: 0.75,
                  duration: 1.4,
                  ease: [0.33, 1, 0.68, 1],
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background: "linear-gradient(145deg, #241D17 0%, #16120E 100%)",
                  borderRadius: 16,
                  border: "1.5px solid rgba(212, 175, 55, 0.5)",
                  boxShadow:
                    "0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(212, 175, 55, 0.2)",
                  overflow: "hidden",
                }}
              />

              {/* Invitation Letter Card (Inside pocket at zIndex: 3, slides smoothly UP and OUT to float above envelope) */}
              <motion.div
                initial={{ y: 35, scale: 0.95, opacity: 0.95 }}
                animate={{
                  y: -210,
                  scale: 1.05,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.75,
                  duration: 1.4,
                  ease: [0.33, 1, 0.68, 1],
                }}
                style={{
                  position: "absolute",
                  top: 15,
                  left: "5%",
                  width: "90%",
                  height: 220,
                  zIndex: 3,
                  background: "linear-gradient(135deg, #FFFCF7 0%, #F5ECE0 100%)",
                  borderRadius: 12,
                  border: "1.5px solid #C9A96E",
                  boxShadow:
                    "0 18px 45px rgba(0,0,0,0.65), 0 0 25px rgba(212, 175, 55, 0.3)",
                  padding: "1.25rem 1rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {/* Inner gold frame border */}
                <div
                  style={{
                    position: "absolute",
                    inset: 6,
                    border: "1px solid rgba(201, 169, 110, 0.45)",
                    borderRadius: 8,
                    pointerEvents: "none",
                  }}
                />

                {/* Golden Wedding Rings Icon */}
                <div style={{ color: "#C9A96E", marginBottom: 4 }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="9" cy="13" r="5" />
                    <circle cx="15" cy="13" r="5" />
                    <path d="M12 8l1.5-2h-3L12 8z" fill="currentColor" />
                  </svg>
                </div>

                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#99732B",
                    margin: 0,
                    marginBottom: 3,
                  }}
                >
                  The Wedding of
                </p>

                <h3
                  style={{
                    fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
                    fontSize: "2.1rem",
                    fontWeight: 400,
                    color: "#1F2937",
                    margin: "0 0 3px",
                    lineHeight: 1.15,
                    textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  {coverData.coupleName}
                </h3>

                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.72rem",
                    color: "#6B7280",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {coverData.dateText}
                </p>
              </motion.div>

              {/* Envelope Front Pocket (SVG folded flaps - in front of card initially at zIndex: 4) */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: 45 }}
                transition={{
                  delay: 0.75,
                  duration: 1.4,
                  ease: [0.33, 1, 0.68, 1],
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 4,
                  pointerEvents: "none",
                }}
              >
                <svg
                  viewBox="0 0 360 250"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                  }}
                >
                  <defs>
                    <linearGradient id="pocketLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2A221B" />
                      <stop offset="100%" stopColor="#1E1712" />
                    </linearGradient>
                    <linearGradient id="pocketRightGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#282019" />
                      <stop offset="100%" stopColor="#1C1611" />
                    </linearGradient>
                    <linearGradient id="pocketBottomGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#18130F" />
                      <stop offset="100%" stopColor="#2C241D" />
                    </linearGradient>
                  </defs>

                  {/* Left pocket flap */}
                  <polygon
                    points="0,0 180,135 0,250"
                    fill="url(#pocketLeftGrad)"
                    stroke="rgba(212,175,55,0.35)"
                    strokeWidth="1"
                  />
                  {/* Right pocket flap */}
                  <polygon
                    points="360,0 180,135 360,250"
                    fill="url(#pocketRightGrad)"
                    stroke="rgba(212,175,55,0.35)"
                    strokeWidth="1"
                  />
                  {/* Bottom pocket flap */}
                  <polygon
                    points="0,250 180,120 360,250"
                    fill="url(#pocketBottomGrad)"
                    stroke="rgba(212,175,55,0.45)"
                    strokeWidth="1.2"
                  />
                </svg>
              </motion.div>

              {/* Golden Wax Seal on Flap (Breaks with gold sparkles) */}
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: [1, 1.25, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  delay: 0.25,
                  duration: 0.5,
                  ease: "easeIn",
                }}
                style={{
                  position: "absolute",
                  top: 115,
                  left: "50%",
                  marginLeft: -26,
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 35%, #F5E0A3 0%, #C9A96E 40%, #8C6220 85%, #593D12 100%)",
                  border: "2px solid #E8D5A3",
                  boxShadow:
                    "0 6px 18px rgba(0,0,0,0.7), 0 0 25px rgba(229, 192, 110, 0.6)",
                  zIndex: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2D1C08" strokeWidth="2">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="#42290D"
                  />
                </svg>
              </motion.div>

              {/* Radiant Sparkle Bursts when wax seal breaks */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const dist = 55;
                const targetX = Math.cos(rad) * dist;
                const targetY = Math.sin(rad) * dist;

                return (
                  <motion.div
                    key={i}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                    animate={{
                      x: targetX,
                      y: targetY,
                      scale: [0, 1.3, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      delay: 0.28,
                      duration: 0.7,
                      ease: "easeOut",
                    }}
                    style={{
                      position: "absolute",
                      top: 141,
                      left: "50%",
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#FFE699",
                      boxShadow: "0 0 10px #FFD700, 0 0 16px #FFF",
                      zIndex: 7,
                    }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
