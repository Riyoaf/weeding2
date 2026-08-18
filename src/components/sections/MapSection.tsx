"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface LeafletMapProps {
  lat: number;
  lng: number;
  name: string;
  address: string;
  height?: number;
}

const LeafletMap = dynamic<LeafletMapProps>(() => import("@/components/sections/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 320,
        borderRadius: 16,
        background: "linear-gradient(135deg, #F5F0E8, #EAE8E7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p className="label-caps" style={{ color: "#C9A96E" }}>Memuat peta...</p>
    </div>
  ),
});

export default function MapSection() {
  return (
    <section
      id="lokasi"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header OUTSIDE the Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.5rem" }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", marginBottom: "0.75rem", fontFamily: "'Montserrat', sans-serif" }}>
            Peta &amp; Petunjuk
          </p>
          <h2 style={{ fontFamily: "'Cookie', cursive, serif", fontSize: "clamp(2.4rem, 6vw, 3.4rem)", fontWeight: 400, color: "#333333", marginBottom: "0.75rem" }}>
            Lokasi Acara
          </h2>
          <div className="gold-line" />
          <p className="body-md" style={{ color: "#757873", marginTop: "0.75rem", fontFamily: "'Montserrat', sans-serif" }}>
            {weddingData.venue.address}
          </p>
        </motion.div>

        {/* Map Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          style={{
            maxWidth: 460,
            margin: "0 auto",
            background: "#F8F6F2",
            borderRadius: 24,
            padding: "1.5rem 1.5rem 1.75rem",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.06)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            position: "relative",
          }}
        >
          {/* Interactive Leaflet GIS Map */}
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: "1.5rem" }}>
            <LeafletMap
              lat={weddingData.venue.lat}
              lng={weddingData.venue.lng}
              name="Lokasi Acara"
              address={weddingData.venue.address}
              height={320}
            />
          </div>

          {/* Action Button: BUKA GOOGLE MAPS */}
          <a
            href={weddingData.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="buka-google-maps-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              width: "100%",
              padding: "1rem 1.75rem",
              background: "#4A5D52",
              color: "#FFFFFF",
              borderRadius: 50,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(74, 93, 82, 0.35)",
              transition: "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#3F5147";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 22px rgba(74, 93, 82, 0.45)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#4A5D52";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 18px rgba(74, 93, 82, 0.35)";
            }}
          >
            {/* Folded Map Icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            BUKA GOOGLE MAPS
          </a>
        </motion.div>
      </div>
    </section>
  );
}
