"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function HeroSection() {
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
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Diagonal Corner Floral Elements */}
      {/* Top Left (Enlarged) */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(380px, 55vw, 760px)",
          height: "clamp(380px, 55vw, 760px)",
          zIndex: 1,
          mixBlendMode: "multiply",
        }}
      >
        <img
          src="/elemen pojok atas kiri.jpg"
          alt="Elemen Pojok Atas Kiri"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "top left",
          }}
        />
      </div>

      {/* Bottom Right (Enlarged) */}
      <div
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "clamp(380px, 55vw, 760px)",
          height: "clamp(380px, 55vw, 760px)",
          zIndex: 1,
          mixBlendMode: "multiply",
        }}
      >
        <img
          src="/elemen pojok bawah kanan.jpg"
          alt="Elemen Pojok Bawah Kanan"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "bottom right",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 700 }}>
        {/* Sub-label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="label-caps"
          style={{ color: "#C9A96E", marginBottom: "1.5rem" }}
        >
          The Wedding of
        </motion.p>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="gold-line-lg"
        />

        {/* Groom Name */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
            fontSize: "clamp(3.5rem, 12vw, 6rem)",
            fontWeight: 400,
            color: "#333333",
            marginBottom: "0.25rem",
          }}
        >
          {weddingData.groom.name}
        </motion.h2>

        {/* Ampersand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            color: "#C9A96E",
            lineHeight: 1.2,
            marginBottom: "0.25rem",
          }}
        >
          &amp;
        </motion.div>

        {/* Bride Name */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          style={{
            fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
            fontSize: "clamp(3.5rem, 12vw, 6rem)",
            fontWeight: 400,
            color: "#333333",
            marginBottom: "2.5rem",
          }}
        >
          {weddingData.bride.name}
        </motion.h2>

        {/* Gold line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="gold-line-lg"
          style={{ marginBottom: "2.5rem" }}
        />

        {/* Date Badge (Front Date in Montserrat) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="date-badge"
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.35rem",
            padding: "1.25rem 2.5rem",
            background: "rgba(252, 251, 247, 0.8)",
            backdropFilter: "blur(8px)",
            border: "0.5px solid rgba(201, 169, 110, 0.4)",
            borderRadius: "var(--radius-xl)",
            boxShadow: "var(--shadow-card)",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", fontFamily: "'Montserrat', sans-serif" }}>
            {weddingData.akad.displayDay}
          </p>
          <p style={{ color: "#333333", fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: "1.1rem" }}>
            {weddingData.akad.displayDate}
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
            color: "#C5C7C1",
          }}
        >
          <p className="label-caps" style={{ fontSize: "0.65rem" }}>Gulir ke bawah</p>
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
