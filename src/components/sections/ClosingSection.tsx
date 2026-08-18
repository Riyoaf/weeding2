"use client";

import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

export default function ClosingSection() {
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

        {/* Closing Quran Quote Card Wrapper with Extra Large Transparent Floral Accent Above Card */}
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto 3.5rem" }}>
          {/* Top Left Floral Element (Extra Large Pure Transparent PNG Outside Above Card) */}
          <div
            className="pointer-events-none select-none"
            style={{
              position: "absolute",
              top: "-95px",
              left: "-45px",
              width: "clamp(260px, 52vw, 420px)",
              height: "clamp(260px, 52vw, 420px)",
              zIndex: 3,
            }}
          >
            <img
              src="/elemen_pojok_kiri.png"
              alt="Elemen Pojok Atas Kiri"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "bottom left",
              }}
            />
          </div>

          {/* Top Right Floral Element (Extra Large Pure Transparent PNG Outside Above Card) */}
          <div
            className="pointer-events-none select-none"
            style={{
              position: "absolute",
              top: "-95px",
              right: "-45px",
              width: "clamp(260px, 52vw, 420px)",
              height: "clamp(260px, 52vw, 420px)",
              zIndex: 3,
            }}
          >
            <img
              src="/elemen_pojok_kanan.png"
              alt="Elemen Pojok Atas Kanan"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "bottom right",
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
              padding: "2.75rem 2rem 2.5rem",
              background: "#F8F6F2",
              backdropFilter: "blur(12px)",
              borderRadius: 24,
              border: "1px solid rgba(201,169,110,0.3)",
              boxShadow: "0 12px 36px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "3.5rem",
                color: "rgba(201,169,110,0.3)",
                lineHeight: 0.8,
                marginBottom: "0.5rem",
              }}
            >
              &ldquo;
            </div>

            <p
              style={{
                color: "#333330",
                fontStyle: "italic",
                lineHeight: 1.85,
                marginBottom: "1.25rem",
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1rem, 2.5vw, 1.15rem)",
              }}
            >
              {weddingData.closingQuote.text}
            </p>

            <p className="label-caps" style={{ color: "#C9A96E" }}>
              {weddingData.closingQuote.source}
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
            style={{ color: "#718096", marginBottom: "0.75rem", letterSpacing: "0.15em" }}
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
              color: "#2D3748",
              marginBottom: "1.25rem",
            }}
          >
            Terima Kasih
          </h2>

          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.95rem",
              color: "#4A5568",
              lineHeight: 1.75,
              maxWidth: 480,
              margin: "0 auto 2rem",
            }}
          >
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>

          <p
            style={{
              fontFamily: "'Cookie', cursive, serif",
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              fontWeight: 400,
              color: "#2D3748",
            }}
          >
            {weddingData.groom.name}{" "}
            <span style={{ color: "#C9A96E", fontWeight: 400 }}>&amp;</span>{" "}
            {weddingData.bride.name}
          </p>
        </motion.div>

        {/* Arched Photo Card with Symmetrical Left & Right Bunga1 Floral Accents */}
        <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "0 auto 3.5rem" }}>
          <div style={{ position: "relative", width: "clamp(280px, 85vw, 360px)" }}>
            {/* Arched Photo Frame */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              style={{
                width: "100%",
                height: "clamp(380px, 105vw, 470px)",
                borderRadius: "200px 200px 24px 24px",
                overflow: "hidden",
                border: "5px solid #FAF8F5",
                boxShadow:
                  "0 20px 50px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.06)",
                position: "relative",
                zIndex: 1,
              }}
            >
              <img
                src="/dita.jpeg"
                alt={`Foto ${weddingData.groom.name} & ${weddingData.bride.name}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 25%",
                }}
              />
            </motion.div>

            {/* Left Floral Accent (bunga1_trans.png - Shifted Slightly Further Right) */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="pointer-events-none select-none"
              style={{
                position: "absolute",
                bottom: "-70px",
                left: "clamp(-110px, -18vw, -45px)",
                width: "clamp(240px, 48vw, 360px)",
                height: "clamp(240px, 48vw, 360px)",
                zIndex: 2,
              }}
            >
              <img
                src="/bunga1_trans.png"
                alt="Elemen Bunga1 Kiri"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "left bottom",
                }}
              />
            </motion.div>

            {/* Right Floral Accent (bunga1_trans.png - Shifted Slightly Further Right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="pointer-events-none select-none"
              style={{
                position: "absolute",
                bottom: "-70px",
                right: "clamp(-170px, -32vw, -100px)",
                width: "clamp(240px, 48vw, 360px)",
                height: "clamp(240px, 48vw, 360px)",
                zIndex: 2,
              }}
            >
              <img
                src="/bunga1_trans.png"
                alt="Elemen Bunga1 Kanan"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "right bottom",
                  transform: "scaleX(-1)",
                }}
              />
            </motion.div>
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
            color: "#888880",
            fontSize: "0.9rem",
            fontWeight: 500,
          }}
        >
          {weddingData.akad.displayDate}
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
            color: "#718096",
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
              (e.currentTarget as HTMLAnchorElement).style.color = "#4A5D52";
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
