"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function ClosingSection() {
  const [couple, setCouple] = useState({
    groom: weddingData.groom.name,
    bride: weddingData.bride.name,
    displayDate: weddingData.akad.displayDate,
    closingPhoto: "/uploads/mempelai_sherly_1791478061860.jpeg",
    quoteText: weddingData.closingQuote.text,
    quoteSource: weddingData.closingQuote.source,
  });

  useEffect(() => {
    fetch("/api/settings", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.settings) {
          const s = d.data.settings;
          let groom = s.groom_name;
          let bride = s.bride_name;
          if ((!groom || !bride) && s.cover_couple_name) {
            const parts = s.cover_couple_name.split(/&|dan|\+/i).map((p: string) => p.trim());
            if (parts.length >= 2) {
              groom = groom || parts[0];
              bride = bride || parts[1];
            }
          }
          setCouple({
            groom: groom || weddingData.groom.name,
            bride: bride || weddingData.bride.name,
            displayDate: s.akad_display_date || s.cover_date_text || weddingData.akad.displayDate,
            closingPhoto: s.closing_photo_url || "/uploads/mempelai_sherly_1791478061860.jpeg",
            quoteText: s.closing_quote_text || weddingData.closingQuote.text,
            quoteSource: s.closing_quote_source || weddingData.closingQuote.source,
          });
        }
      })
      .catch(() => {});
  }, []);
  return (
    <section
      id="penutup"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Top Gold Line Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: 160,
            height: 1,
            background: "linear-gradient(90deg, transparent, #C9A96E 30%, #C9A96E 70%, transparent)",
            margin: "0 auto 3rem",
          }}
        />

        {/* Closing Quran Quote Card Wrapper */}
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto 3rem", width: "100%" }}>
          {/* Top Left Bordercard Element (Outside Above Card Corner) */}
          <div
            className="pointer-events-none select-none"
            style={{
              position: "absolute",
              top: "clamp(-35px, -5vw, -20px)",
              left: "clamp(-15px, -2vw, 0px)",
              width: "clamp(90px, 20vw, 190px)",
              height: "clamp(90px, 20vw, 190px)",
              zIndex: 3,
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
            }}
          >
            <img
              src="/uploads/bordercard.png"
              alt="Bordercard Pojok Kiri"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Top Right Bordercard Element (Outside Above Card Corner) */}
          <div
            className="pointer-events-none select-none"
            style={{
              position: "absolute",
              top: "clamp(-35px, -5vw, -20px)",
              right: "clamp(-15px, -2vw, 0px)",
              width: "clamp(90px, 20vw, 190px)",
              height: "clamp(90px, 20vw, 190px)",
              zIndex: 3,
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
              transform: "scaleX(-1)",
            }}
          >
            <img
              src="/uploads/bordercard.png"
              alt="Bordercard Pojok Kanan"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="closing-quote-card"
            style={{
              position: "relative",
              zIndex: 2,
              padding: "clamp(1.5rem, 4vw, 2.75rem) clamp(1rem, 3vw, 2rem) clamp(1.4rem, 3.5vw, 2.5rem)",
              background: "rgba(22, 22, 22, 0.78)",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              border: "1px solid rgba(201, 169, 110, 0.35)",
              boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 2,
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                color: "rgba(201, 169, 110, 0.4)",
                lineHeight: 0.8,
                marginBottom: "0.4rem",
              }}
            >
              &ldquo;
            </div>

            <p
              style={{
                position: "relative",
                zIndex: 2,
                color: "#F5F0E6",
                fontStyle: "italic",
                lineHeight: 1.8,
                marginBottom: "1rem",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(0.88rem, 2.2vw, 1.15rem)",
                whiteSpace: "pre-line",
              }}
            >
              {couple.quoteText}
            </p>

            <p className="label-caps" style={{ position: "relative", zIndex: 2, color: "#C9A96E", fontSize: "clamp(0.68rem, 1.8vw, 0.75rem)" }}>
              {couple.quoteSource}
            </p>
          </motion.div>
        </div>

        {/* Dengan Segenap Cinta */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p
            className="label-caps"
            style={{ color: "#C9A96E", marginBottom: "0.75rem", letterSpacing: "0.15em" }}
          >
            Dengan segenap cinta,
          </p>
        </motion.div>

        {/* Terima Kasih Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          style={{ maxWidth: 580, margin: "0 auto 2.5rem" }}
        >
          <h2
            style={{
              fontFamily: "'Cookie', cursive, serif",
              fontSize: "clamp(2.4rem, 6vw, 3.4rem)",
              fontWeight: 400,
              color: "#F5F0E6",
              marginBottom: "1.25rem",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            Terima Kasih
          </h2>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.95rem",
              color: "#D1CCC2",
              lineHeight: 1.75,
              maxWidth: 480,
              margin: "0 auto 1.25rem",
            }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>

          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.05rem, 2.5vw, 1.3rem)",
              color: "#C9A96E",
              fontStyle: "italic",
              letterSpacing: "0.06em",
              margin: "0 auto 2rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            Om Shanti, Shanti, Shanti, Om
          </p>

          <p
            style={{
              fontFamily: "'Cookie', cursive, serif",
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              fontWeight: 400,
              color: "#F5F0E6",
              textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            }}
          >
            {couple.groom}{" "}
            <span style={{ color: "#C9A96E", fontWeight: 400 }}>&amp;</span>{" "}
            {couple.bride}
          </p>
        </motion.div>

        {/* Arched Photo Card with Symmetrical Left & Right Bunga1 Floral Accents */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0 auto 3rem" }}>
          <div style={{ position: "relative", width: "clamp(240px, 78vw, 340px)" }}>
            {/* Arched Photo Frame */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "clamp(320px, 95vw, 440px)",
                borderRadius: "200px 200px 24px 24px",
                overflow: "hidden",
                border: "4px solid rgba(201, 169, 110, 0.4)",
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.3)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <img
                src={couple.closingPhoto}
                alt={`Foto ${couple.groom} & ${couple.bride}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                }}
              />
            </motion.div>

            {/* Wayang Frame Ornament (Centered at Bottom of Photo Frame) */}
            <div
              className="pointer-events-none select-none"
              style={{
                position: "absolute",
                bottom: "-28px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(280px, 95vw, 440px)",
                maxWidth: "100vw",
                zIndex: 2,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "928 / 581",
                  filter:
                    "drop-shadow(0 6px 16px rgba(0, 0, 0, 0.12)) drop-shadow(0 2px 6px rgba(201, 169, 110, 0.3))",
                }}
              >
                {/* 1. Kipas Kiri (Left Gunungan & Wing) - Buka Tutup Animation */}
                <motion.div
                  animate={{
                    rotate: [0, 3.2, 0, -2.2, 0],
                    y: [0, -1.5, 0, 0.8, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    transformOrigin: "36% 88%",
                    zIndex: 1,
                  }}
                >
                  <img
                    src="/wayang_kipas_left.png"
                    alt="Wayang Kipas Kiri"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </motion.div>

                {/* 2. Kipas Kanan (Right Gunungan & Wing) - Symmetrical Buka Tutup Animation */}
                <motion.div
                  animate={{
                    rotate: [0, -3.2, 0, 2.2, 0],
                    y: [0, -1.5, 0, 0.8, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    transformOrigin: "64% 88%",
                    zIndex: 1,
                  }}
                >
                  <img
                    src="/wayang_kipas_right.png"
                    alt="Wayang Kipas Kanan"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </motion.div>

                {/* 3. Base Ornament (Center Lotus & Pedestal) in Front */}
                <motion.div
                  animate={{
                    scale: [1, 1.015, 1, 1.01, 1],
                    y: [0, -1, 0, -0.5, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    transformOrigin: "50% 90%",
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/wayang_base.png"
                    alt="Wayang Base Ornament"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Date line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="gold-line"
          style={{ margin: "1.5rem auto" }}
        />

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            color: "#D1CCC2",
            fontSize: "0.95rem",
            fontWeight: 500,
          }}
        >
          {couple.displayDate}
        </p>

        {/* Footer Credit */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            marginTop: "3.5rem",
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.8rem",
            color: "#A0A09B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.35rem",
          }}
        >
          <span>Dibuat oleh</span>
          <a
            href="https://www.instagram.com/galleri.yo"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-ig-link"
            style={{
              color: "#C9A96E",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#E2D1A6";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E";
            }}
          >
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
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            @galleri.yo
          </a>
        </motion.p>
      </div>
    </section>
  );
}
