"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface OpeningAnimationProps {
  onOpen: () => void;
}

export default function OpeningAnimation({ onOpen }: OpeningAnimationProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [coverData, setCoverData] = useState({
    badgeText: "Pernikahan dari",
    photoUrl: "/dita 2.jpeg",
    coupleName: `${weddingData.groom.name} & ${weddingData.bride.name}`,
    dateText: `${weddingData.akad.displayDay}, ${weddingData.akad.displayDate}`,
    bgUrl: "/cover-bg.jpg",
  });

  useEffect(() => {
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

          setCoverData({
            badgeText: s.cover_badge_text || "Pernikahan dari",
            photoUrl: s.cover_photo_url || "/dita 2.jpeg",
            coupleName: couple,
            dateText: date,
            bgUrl: s.cover_bg_url || "/cover-bg.jpg",
          });
        }
      })
      .catch((err) => console.error("Error loading cover settings:", err));
  }, []);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpen();
    }, 900);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
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
            backgroundColor: "#e8e0d5",
          }}
        >
          {/* Layer 1: Blur filter pseudo-overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          />

          {/* Layer 2: Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.55) 60%, rgba(255,255,255,0.82) 100%)",
            }}
          />

          {/* GLASSMORPHISM CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            style={{
              position: "relative",
              zIndex: 1,
              width: "min(370px, 90vw)",
              padding: "2.5rem 2rem 2.25rem",
              background: "rgba(255, 255, 255, 0.48)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderRadius: "1.5rem",
              border: "1px solid rgba(255, 255, 255, 0.65)",
              boxShadow:
                "0 12px 36px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
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
              transition={{ delay: 0.45, duration: 0.5 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#555550",
                marginBottom: "1.25rem",
              }}
            >
              {coverData.badgeText}
            </motion.p>

            {/* Profile Avatar with Enlarged Rounded Frame Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.65, ease: "easeOut" }}
              style={{
                position: "relative",
                width: 200,
                height: 200,
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Profile Photo - Dynamic from settings */}
              <img
                src={coverData.photoUrl}
                alt={`Profil ${coverData.coupleName}`}
                style={{
                  position: "absolute",
                  top: "45%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "74%",
                  height: "74%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "center 10%",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.10)",
                  zIndex: 1,
                }}
              />
              {/* Frame Overlay (rounded.png) */}
              <img
                src="/rounded.png"
                alt="Frame Profil"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            </motion.div>

            {/* Nama Pasangan */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.65, ease: "easeOut" }}
              style={{
                fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
                fontSize: "clamp(2.4rem, 9vw, 3.2rem)",
                fontWeight: 400,
                color: "#1a1a18",
                lineHeight: 1.15,
                margin: 0,
                marginBottom: "0.75rem",
              }}
            >
              {coverData.coupleName}
            </motion.h1>

            {/* Tanggal di Depan (Montserrat) */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.875rem",
                color: "#555550",
                marginBottom: "1.75rem",
                fontWeight: 500,
              }}
            >
              {coverData.dateText}
            </motion.p>

            {/* Tombol Buka Undangan */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              onClick={handleOpen}
              whileHover={{ scale: 1.03, boxShadow: "0 6px 24px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.85rem",
                background: "rgba(255,255,255,0.85)",
                border: "1px solid rgba(255,255,255,0.9)",
                borderRadius: "9999px",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#333330",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                letterSpacing: "0.01em",
              }}
            >
              Buka Undangan
              <ArrowIcon />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
