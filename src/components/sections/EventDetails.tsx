"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface EventCardProps {
  title: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  headerIcon: React.ReactNode;
  delay?: number;
}

const HeartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C9A96E"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.78-8.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const RingsIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C9A96E"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="12" r="5" />
    <circle cx="15" cy="12" r="5" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C9A96E"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MapPinIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C9A96E"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

function EventCard({
  title,
  day,
  date,
  time,
  venue,
  address,
  headerIcon,
  delay = 0,
}: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      style={{
        width: "100%",
        minWidth: 0,
        background: "rgba(22, 22, 22, 0.78)",
        backdropFilter: "blur(12px)",
        borderRadius: 18,
        padding: "clamp(0.9rem, 2.2vw, 1.35rem) clamp(0.6rem, 1.8vw, 1.1rem)",
        boxShadow: "0 12px 32px rgba(0, 0, 0, 0.45)",
        border: "1px solid rgba(201, 169, 110, 0.35)",
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* Top Right Subtle Gold Aura Glow */}
      <div
        style={{
          position: "absolute",
          top: -15,
          right: -15,
          width: 95,
          height: 95,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201, 169, 110, 0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header Row: Icon + Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "0.85rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          {headerIcon}
        </div>
        <h3
          style={{
            fontFamily: "'Cookie', cursive, serif",
            fontSize: "clamp(1.15rem, 3.2vw, 1.7rem)",
            fontWeight: 400,
            color: "#F5F0E6",
            margin: 0,
            lineHeight: 1.15,
            wordBreak: "break-word",
          }}
        >
          {title}
        </h3>
      </div>

      {/* Date & Time Row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.45rem",
          marginBottom: "0.85rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginTop: "0.15rem", flexShrink: 0 }}>
          <CalendarIcon />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.68rem, 1.8vw, 0.8rem)",
              fontWeight: 600,
              color: "#F5F0E6",
              marginBottom: "0.15rem",
              lineHeight: 1.3,
            }}
          >
            {day}, {date}
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.64rem, 1.6vw, 0.74rem)",
              color: "#C9A96E",
              margin: 0,
            }}
          >
            {time}
          </p>
        </div>
      </div>

      {/* Location & Address Row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "0.45rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginTop: "0.15rem", flexShrink: 0 }}>
          <MapPinIcon />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.68rem, 1.8vw, 0.8rem)",
              fontWeight: 600,
              color: "#F5F0E6",
              marginBottom: "0.15rem",
              lineHeight: 1.3,
            }}
          >
            {venue}
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.62rem, 1.5vw, 0.72rem)",
              color: "#D1CCC2",
              lineHeight: 1.35,
              margin: 0,
            }}
          >
            {address}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function EventDetails() {
  const [eventData, setEventData] = useState({
    akad: weddingData.akad,
    resepsi: weddingData.resepsi,
    venue: weddingData.venue,
    groom: weddingData.groom,
    bride: weddingData.bride,
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.settings) {
          const s = data.data.settings;
          setEventData({
            akad: {
              label: s.akad_label || weddingData.akad.label,
              displayDay: s.akad_display_day || weddingData.akad.displayDay,
              displayDate: s.akad_display_date || weddingData.akad.displayDate,
              time: s.akad_time || weddingData.akad.time,
              date: s.akad_date || weddingData.akad.date,
            },
            resepsi: {
              label: s.resepsi_label || weddingData.resepsi.label,
              displayDay: s.resepsi_display_day || weddingData.resepsi.displayDay,
              displayDate: s.resepsi_display_date || weddingData.resepsi.displayDate,
              time: s.resepsi_time || weddingData.resepsi.time,
              date: s.resepsi_date || weddingData.resepsi.date,
            },
            venue: {
              name: s.venue_name || weddingData.venue.name,
              address: s.venue_address || weddingData.venue.address,
              lat: s.venue_lat || weddingData.venue.lat,
              lng: s.venue_lng || weddingData.venue.lng,
              googleMapsUrl: s.google_maps_url || weddingData.venue.googleMapsUrl,
            },
            groom: {
              name: s.groom_name || weddingData.groom.name,
              fullName: s.groom_full_name || weddingData.groom.fullName,
              parentOf: s.groom_parent_of || weddingData.groom.parentOf,
            },
            bride: {
              name: s.bride_name || weddingData.bride.name,
              fullName: s.bride_full_name || weddingData.bride.fullName,
              parentOf: s.bride_parent_of || weddingData.bride.parentOf,
            },
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="acara"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container) calc(var(--spacing-section-mobile) + 2rem)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Rama Element (Kiri) */}
      <motion.div
        initial={{ opacity: 0, x: -25, scale: 0.95 }}
        whileInView={{ opacity: 0.8, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "10px",
          left: "max(-10px, calc(50% - 320px))",
          width: "clamp(75px, 16vw, 150px)",
          zIndex: 1,
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
        }}
      >
        <img
          src="/uploads/rama.png"
          alt="Wayang Rama"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </motion.div>

      {/* Sinta Element (Kanan) */}
      <motion.div
        initial={{ opacity: 0, x: 25, scale: 0.95 }}
        whileInView={{ opacity: 0.8, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "10px",
          right: "max(-10px, calc(50% - 320px))",
          width: "clamp(75px, 16vw, 150px)",
          zIndex: 1,
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
        }}
      >
        <img
          src="/uploads/sinta.png"
          alt="Wayang Sinta"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </motion.div>

      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 620,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "1.75rem" }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", marginBottom: "0.4rem", fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(0.68rem, 2vw, 0.78rem)" }}>
            Detail Acara
          </p>
          <h2
            style={{
              fontFamily: "'Cookie', cursive, serif",
              fontSize: "clamp(2rem, 5.5vw, 3rem)",
              fontWeight: 400,
              color: "#F5F0E6",
              marginBottom: "0.5rem",
              lineHeight: 1.2,
            }}
          >
            Hari Istimewa Kami
          </h2>
          <div className="gold-line-lg" style={{ margin: "0 auto 0.75rem" }} />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.78rem, 2vw, 0.85rem)",
              color: "#D1CCC2",
              maxWidth: 380,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Dengan segenap cinta dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk turut hadir dan memberikan doa restu.
          </p>
        </motion.div>

        {/* Event Cards Row - Sejajar Kanan & Kiri */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "clamp(0.5rem, 1.8vw, 1rem)",
            width: "100%",
            maxWidth: 590,
            margin: "0 auto",
            position: "relative",
            zIndex: 3,
          }}
        >
          <EventCard
            title={eventData.akad.label}
            day={eventData.akad.displayDay}
            date={eventData.akad.displayDate}
            time={eventData.akad.time}
            venue={eventData.venue.name}
            address={eventData.venue.address}
            headerIcon={<HeartIcon />}
            delay={0.1}
          />
          <EventCard
            title={eventData.resepsi.label}
            day={eventData.resepsi.displayDay}
            date={eventData.resepsi.displayDate}
            time={eventData.resepsi.time}
            venue={eventData.venue.name}
            address={eventData.venue.address}
            headerIcon={<RingsIcon />}
            delay={0.25}
          />
        </div>

        {/* Bottom Area: buttomground.png Full Frame Ornament + Mempelai Info Card */}
        <div
          className="couple-section-wrapper"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 590,
            margin: "1.25rem auto clamp(3.2rem, 8vw, 5rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Frame & Card Container */}
          <div
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Layer 1: Couple Card Background Box (zIndex: 1) */}
            <div
              className="couple-card-bg"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                maxWidth: "clamp(225px, 62vw, 320px)",
                margin: "0 auto",
                background: "rgba(22, 22, 22, 0.88)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderRadius: 20,
                border: "1px solid rgba(201, 169, 110, 0.38)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.55)",
                zIndex: 1,
              }}
            />

            {/* Layer 2: buttomground.png Full Frame Ornament (zIndex: 2) */}
            <div
              className="pointer-events-none select-none"
              style={{
                position: "absolute",
                bottom: "clamp(-125px, -24vw, -95px)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(320px, 94vw, 540px)",
                maxWidth: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 2,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  filter: "drop-shadow(0 6px 20px rgba(0, 0, 0, 0.65))",
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
                    src="/uploads/buttomground.png"
                    alt="Ornamen Wayang Bottom Ground"
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Layer 3: Couple Card Content & Text (zIndex: 3) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="couple-card"
              style={{
                position: "relative",
                zIndex: 3,
                width: "100%",
                maxWidth: "clamp(225px, 62vw, 320px)",
                textAlign: "center",
                padding: "clamp(1.4rem, 3.5vw, 1.8rem) clamp(0.65rem, 2vw, 1.1rem) clamp(1.6rem, 4vw, 2.2rem)",
                margin: "0 auto",
              }}
            >
              <p
                className="label-caps"
                style={{
                  color: "#C9A96E",
                  marginBottom: "0.5rem",
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: "0.18em",
                  fontSize: "clamp(0.65rem, 1.7vw, 0.72rem)",
                }}
              >
                Mempelai
              </p>

              {/* Groom */}
              <div style={{ textAlign: "center", marginBottom: "0.35rem" }}>
                <p
                  style={{
                    fontFamily: "'Cookie', cursive, serif",
                    fontSize: "clamp(1.45rem, 4.4vw, 2.1rem)",
                    fontWeight: 400,
                    color: "#F5F0E6",
                    marginBottom: "0.15rem",
                    lineHeight: 1.15,
                  }}
                >
                  {eventData.groom.fullName}
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#D1CCC2",
                    fontSize: "clamp(0.64rem, 1.7vw, 0.74rem)",
                    lineHeight: 1.35,
                    maxWidth: 240,
                    margin: "0 auto",
                  }}
                >
                  {eventData.groom.parentOf}
                </p>
              </div>

              {/* Separator / Ampersand */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.4rem",
                  margin: "0.2rem auto 0.35rem",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "1px",
                    background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.7))",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Cookie', cursive, serif",
                    fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                    color: "#C9A96E",
                    lineHeight: 1,
                  }}
                >
                  &amp;
                </span>
                <div
                  style={{
                    width: "18px",
                    height: "1px",
                    background: "linear-gradient(90deg, rgba(201,169,110,0.7), transparent)",
                  }}
                />
              </div>

              {/* Bride */}
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "'Cookie', cursive, serif",
                    fontSize: "clamp(1.45rem, 4.4vw, 2.1rem)",
                    fontWeight: 400,
                    color: "#F5F0E6",
                    marginBottom: "0.15rem",
                    lineHeight: 1.15,
                  }}
                >
                  {eventData.bride.fullName}
                </p>
                <p
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    color: "#D1CCC2",
                    fontSize: "clamp(0.64rem, 1.7vw, 0.74rem)",
                    lineHeight: 1.35,
                    maxWidth: 240,
                    margin: "0 auto",
                  }}
                >
                  {eventData.bride.parentOf}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
