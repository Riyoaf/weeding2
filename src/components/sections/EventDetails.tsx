"use client";

import React from "react";
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
    stroke="#4A5D52"
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
    stroke="#4A5D52"
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
    stroke="#4A5D52"
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
    stroke="#4A5D52"
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
        flex: "1 1 240px",
        minWidth: 230,
        maxWidth: 285,
        background: "rgba(248, 246, 242, 0.94)",
        backdropFilter: "blur(8px)",
        borderRadius: 18,
        padding: "1.4rem 1.2rem",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      {/* Top Right Soft Sage Accent Circle */}
      <div
        style={{
          position: "absolute",
          top: -15,
          right: -15,
          width: 95,
          height: 95,
          borderRadius: "50%",
          background: "rgba(225, 235, 228, 0.55)",
          pointerEvents: "none",
        }}
      />

      {/* Header Row: Icon + Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          marginBottom: "1.25rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {headerIcon}
        </div>
        <h3
          style={{
            fontFamily: "'Cookie', cursive, serif",
            fontSize: "1.8rem",
            fontWeight: 400,
            color: "#2D3748",
            margin: 0,
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
          gap: "0.75rem",
          marginBottom: "1.1rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginTop: "0.15rem" }}>
          <CalendarIcon />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#2D3748",
              marginBottom: "0.1rem",
            }}
          >
            {day}, {date}
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.75rem",
              color: "#718096",
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
          gap: "0.75rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ marginTop: "0.15rem" }}>
          <MapPinIcon />
        </div>
        <div>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 600,
              color: "#2D3748",
              marginBottom: "0.1rem",
            }}
          >
            {venue}
          </p>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.75rem",
              color: "#718096",
              lineHeight: 1.4,
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
  return (
    <section
      id="acara"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Burung Merak Element */}
      <motion.div
        initial={{ opacity: 0, x: -40, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "-55px",
          left: "max(0px, calc(50% - 390px))",
          width: "clamp(180px, 38vw, 320px)",
          zIndex: 2,
          mixBlendMode: "multiply",
        }}
      >
        <img
          src="/merak.png"
          alt="Elemen Burung Merak"
          style={{
            width: "100%",
            height: "auto",
            objectFit: "contain",
            transform: "scaleX(-1)",
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
        }}
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "2.25rem" }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", marginBottom: "0.4rem", fontFamily: "'Montserrat', sans-serif" }}>
            Detail Acara
          </p>
          <h2
            style={{
              fontFamily: "'Cookie', cursive, serif",
              fontSize: "clamp(2.2rem, 6vw, 3.2rem)",
              fontWeight: 400,
              color: "#2D3748",
              marginBottom: "0.6rem",
            }}
          >
            Hari Istimewa Kami
          </h2>
          <div className="gold-line-lg" style={{ margin: "0 auto 0.85rem" }} />
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.84rem",
              color: "#4A5568",
              maxWidth: 380,
              margin: "0 auto",
              lineHeight: 1.65,
            }}
          >
            Dengan segenap cinta dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk turut hadir dan memberikan doa restu.
          </p>
        </motion.div>

        {/* Event Cards Row */}
        <div
          style={{
            display: "flex",
            gap: "1.1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <EventCard
            title={weddingData.akad.label}
            day={weddingData.akad.displayDay}
            date={weddingData.akad.displayDate}
            time={weddingData.akad.time}
            venue={weddingData.venue.name}
            address={weddingData.venue.address}
            headerIcon={<HeartIcon />}
            delay={0.1}
          />
          <EventCard
            title={weddingData.resepsi.label}
            day={weddingData.resepsi.displayDay}
            date={weddingData.resepsi.displayDate}
            time={weddingData.resepsi.time}
            venue={weddingData.venue.name}
            address={weddingData.venue.address}
            headerIcon={<RingsIcon />}
            delay={0.25}
          />
        </div>

        {/* Couple Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="couple-card"
          style={{
            marginTop: "1.75rem",
            textAlign: "center",
            padding: "1.5rem 1rem",
            background: "rgba(248, 246, 242, 0.94)",
            backdropFilter: "blur(8px)",
            borderRadius: 18,
            border: "1px solid rgba(0, 0, 0, 0.05)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.04)",
            position: "relative",
            overflow: "hidden",
            maxWidth: 590,
            margin: "1.75rem auto 0",
          }}
        >
          <p className="label-caps" style={{ color: "#C9A96E", marginBottom: "0.85rem", fontFamily: "'Montserrat', sans-serif" }}>
            Mempelai
          </p>

          <div
            className="couple-row"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {/* Groom */}
            <div style={{ textAlign: "center", flex: "1 1 0px", maxWidth: "240px" }}>
              <p
                style={{
                  fontFamily: "'Cookie', cursive, serif",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "#2D3748",
                  marginBottom: "0.15rem",
                }}
              >
                {weddingData.groom.fullName}
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#718096",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {weddingData.groom.parentOf}
              </p>
            </div>

            {/* Separator / Ampersand */}
            <div
              className="couple-ampersand-divider"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                minWidth: "70px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.6))",
                }}
              />
              <span
                style={{
                  fontFamily: "'Cookie', cursive, serif",
                  fontSize: "2rem",
                  color: "#C9A96E",
                  lineHeight: 1,
                }}
              >
                &amp;
              </span>
              <div
                style={{
                  width: "20px",
                  height: "1px",
                  background: "linear-gradient(90deg, rgba(201,169,110,0.6), transparent)",
                }}
              />
            </div>

            {/* Bride */}
            <div style={{ textAlign: "center", flex: "1 1 0px", maxWidth: "240px" }}>
              <p
                style={{
                  fontFamily: "'Cookie', cursive, serif",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "#2D3748",
                  marginBottom: "0.15rem",
                }}
              >
                {weddingData.bride.fullName}
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#718096",
                  fontSize: "0.75rem",
                  lineHeight: 1.4,
                }}
              >
                {weddingData.bride.parentOf}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
