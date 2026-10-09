"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function HeroSection() {
  const [heroData, setHeroData] = useState({
    groomName: weddingData.groom.name,
    brideName: weddingData.bride.name,
    displayDay: weddingData.akad.displayDay,
    displayDate: weddingData.akad.displayDate,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.settings) {
          const s = data.data.settings;
          let groom = s.groom_name;
          let bride = s.bride_name;

          // If groom or bride not explicitly set, auto-extract from cover_couple_name
          if ((!groom || !bride) && s.cover_couple_name) {
            const parts = s.cover_couple_name.split(/&|dan|\+/i).map((p: string) => p.trim());
            if (parts.length >= 2) {
              groom = groom || parts[0];
              bride = bride || parts[1];
            } else if (parts.length === 1 && !groom) {
              groom = parts[0];
            }
          }

          let day = s.akad_display_day;
          let date = s.akad_display_date;
          if ((!day || !date) && s.cover_date_text) {
            const dateParts = s.cover_date_text.split(",").map((p: string) => p.trim());
            if (dateParts.length >= 2) {
              day = day || dateParts[0];
              date = date || dateParts.slice(1).join(", ").trim();
            } else {
              date = date || s.cover_date_text;
            }
          }

          setHeroData({
            groomName: groom || weddingData.groom.name,
            brideName: bride || weddingData.bride.name,
            displayDay: day || weddingData.akad.displayDay,
            displayDate: date || weddingData.akad.displayDate,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "clamp(4.5rem, 10vh, 6rem) clamp(1rem, 4vw, 1.5rem)",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Top Bar Ornament */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/uploads/topbar.png"
          alt="Top Bar Ornament"
          style={{
            width: "100%",
            height: "clamp(45px, 10vw, 84px)",
            objectFit: "fill",
            display: "block",
            filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.6))",
          }}
        />
      </div>

      {/* Sub-label: The Wedding of (Center Top right after topbar element) */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: "absolute",
          top: "clamp(56px, 12.5vw, 98px)",
          left: 0,
          right: 0,
          width: "100%",
          zIndex: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "none",
          padding: "0 1rem",
        }}
      >
        <p
          className="label-caps"
          style={{
            color: "#C9A96E",
            fontSize: "clamp(0.72rem, 2.2vw, 0.85rem)",
            letterSpacing: "0.28em",
            margin: 0,
            textAlign: "center",
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          The Wedding of
        </p>
      </motion.div>

      {/* Bottom Gunungan Ornament (Please.png) with subtle lifelike pulse */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "min(100vw, 760px)",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.div
          animate={{
            scale: [1, 1.02, 1, 1.015, 1],
            y: [0, -3, 0, -1.5, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            transformOrigin: "bottom center",
          }}
        >
          <img
            src="/uploads/Please.png"
            alt="Bottom Ornament"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "contain",
              filter: "drop-shadow(0 -4px 16px rgba(0,0,0,0.5))",
              opacity: 0.95,
            }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 700,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "clamp(1.5rem, 3.5vw, 2.5rem)",
          marginBottom: "clamp(1rem, 3vh, 2rem)",
        }}
      >
        {/* Vector Main Illustration (Mid Center - Enlarged with continuous subtle lifelike sway) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
          style={{
            width: "clamp(200px, 52vw, 290px)",
            maxWidth: "85vw",
            margin: "0 auto clamp(0.7rem, 2vw, 1.1rem)",
            display: "flex",
            justifyContent: "center",
            filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.65))",
          }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0, 4, 0],
              rotate: [0, 1.2, 0, -1.2, 0],
              x: [0, -1, 0, 1, 0],
            }}
            transition={{
              duration: 5.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              transformOrigin: "50% 90%",
            }}
          >
            <img
              src="/uploads/vectormain.png"
              alt="Ilustrasi Pengantin Vectormain"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Gold line top (Balanced symmetrical spacing above couple names) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="gold-line-lg"
          style={{ margin: "0 auto clamp(0.45rem, 1.5vw, 0.65rem)" }}
        />

        {/* Couple Names Row (Bersejajar Kanan Kiri with continuous shimmering light) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(0.4rem, 2vw, 0.9rem)",
            margin: "0 auto",
          }}
        >
          <h2
            className="couple-shimmer-groom"
            style={{
              fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
              fontSize: "clamp(2.5rem, 7.5vw, 4.4rem)",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {heroData.groomName}
          </h2>
          <span
            className="couple-shimmer-ampersand"
            style={{
              fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
              fontSize: "clamp(1.8rem, 5.5vw, 3rem)",
              lineHeight: 1.1,
              margin: "0 0.15rem",
            }}
          >
            &amp;
          </span>
          <h2
            className="couple-shimmer-bride"
            style={{
              fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
              fontSize: "clamp(2.5rem, 7.5vw, 4.4rem)",
              fontWeight: 400,
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            {heroData.brideName}
          </h2>
        </motion.div>

        {/* Gold line bottom (Equal symmetrical spacing below couple names) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="gold-line-lg"
          style={{ margin: "clamp(0.45rem, 1.5vw, 0.65rem) auto clamp(0.9rem, 2.4vw, 1.3rem)" }}
        />

        {/* Date Badge (Front Date in Montserrat) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="date-badge"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.3rem",
            padding: "clamp(0.9rem, 2.5vw, 1.25rem) clamp(1.5rem, 5vw, 2.5rem)",
            background: "rgba(22, 22, 22, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(201, 169, 110, 0.45)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            fontFamily: "'Montserrat', sans-serif",
            maxWidth: "90vw",
          }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", fontFamily: "'Montserrat', sans-serif", textTransform: "capitalize", fontSize: "clamp(0.65rem, 1.8vw, 0.75rem)" }}>
            {heroData.displayDay}
          </p>
          <p style={{ color: "#F5F0E6", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)", margin: 0 }}>
            {heroData.displayDate}
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
          style={{
            marginTop: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            color: "#C9A96E",
          }}
        >
          <p className="label-caps" style={{ fontSize: "0.68rem", color: "#C9A96E" }}>Gulir ke bawah</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
