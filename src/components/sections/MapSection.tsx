"use client";

import { useState, useEffect } from "react";
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
  const [venue, setVenue] = useState(weddingData.venue);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.settings) {
          const s = data.data.settings;
          setVenue({
            name: s.venue_name || weddingData.venue.name,
            address: s.venue_address || weddingData.venue.address,
            lat: typeof s.venue_lat === "number" ? s.venue_lat : (parseFloat(s.venue_lat) || weddingData.venue.lat),
            lng: typeof s.venue_lng === "number" ? s.venue_lng : (parseFloat(s.venue_lng) || weddingData.venue.lng),
            googleMapsUrl: s.google_maps_url || weddingData.venue.googleMapsUrl,
          });
        }
      })
      .catch(() => {});
  }, []);
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
      <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        {/* Header OUTSIDE the Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", marginBottom: "0.5rem", fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.68rem, 2vw, 0.78rem)" }}>
            Peta &amp; Petunjuk
          </p>
          <h2 style={{ fontFamily: "'Cookie', cursive, serif", fontSize: "clamp(2rem, 5.5vw, 3rem)", fontWeight: 400, color: "#F5F0E6", marginBottom: "0.5rem", lineHeight: 1.2 }}>
            Lokasi Acara
          </h2>
          <div className="gold-line" />
          <p className="body-md" style={{ color: "#D1CCC2", marginTop: "0.6rem", fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.82rem, 2vw, 0.95rem)", lineHeight: 1.5 }}>
            {venue.address}
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
            background: "rgba(22, 22, 22, 0.78)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            padding: "clamp(1rem, 3vw, 1.5rem) clamp(0.75rem, 2.5vw, 1.5rem) clamp(1.25rem, 3vw, 1.75rem)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(201, 169, 110, 0.35)",
            position: "relative",
            width: "100%",
          }}
        >
          {/* Interactive Leaflet GIS Map */}
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: "1.5rem" }}>
            <LeafletMap
              lat={venue.lat}
              lng={venue.lng}
              name={venue.name || "Lokasi Acara"}
              address={venue.address}
              height={320}
            />
          </div>

          {/* Action Button: BUKA GOOGLE MAPS */}
          <a
            href={venue.googleMapsUrl}
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
              background: "linear-gradient(135deg, #C9A96E 0%, #A6874E 100%)",
              color: "#161616",
              borderRadius: 50,
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              boxShadow: "0 6px 18px rgba(201, 169, 110, 0.25)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(201, 169, 110, 0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 18px rgba(201, 169, 110, 0.25)";
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
