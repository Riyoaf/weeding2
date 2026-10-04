"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetStr: string): TimeLeft {
  const target = new Date(targetStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (isNaN(diff) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

const UNITS = [
  { key: "days" as const, label: "Hari" },
  { key: "hours" as const, label: "Jam" },
  { key: "minutes" as const, label: "Menit" },
  { key: "seconds" as const, label: "Detik" },
];

export default function CountdownTimer() {
  const [targetDateStr, setTargetDateStr] = useState<string>(weddingData.countdownTarget);
  const [title, setTitle] = useState<string>("Menuju Hari Bahagia");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(weddingData.countdownTarget));
  const [hasPassed, setHasPassed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [meta, setMeta] = useState({
    groom: weddingData.groom.name,
    bride: weddingData.bride.name,
    venueName: weddingData.venue.name,
    venueAddress: weddingData.venue.address,
  });

  useEffect(() => {
    setMounted(true);

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.settings) {
          const s = data.data.settings;
          const target = s.countdown_target || weddingData.countdownTarget;
          setTargetDateStr(target);
          if (s.countdown_title) setTitle(s.countdown_title);
          setMeta({
            groom: s.groom_name || weddingData.groom.name,
            bride: s.bride_name || weddingData.bride.name,
            venueName: s.venue_name || weddingData.venue.name,
            venueAddress: s.venue_address || weddingData.venue.address,
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const tl = calculateTimeLeft(targetDateStr);
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setHasPassed(true);
      } else {
        setHasPassed(false);
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  const buildCalendarUrl = (): string => {
    try {
      const startDate = new Date(targetDateStr);
      const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

      const fmt = (d: Date) =>
        d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

      const params = new URLSearchParams({
        action: "TEMPLATE",
        text: `Pernikahan ${meta.groom} & ${meta.bride}`,
        dates: `${fmt(startDate)}/${fmt(endDate)}`,
        details: `Pernikahan ${meta.groom} & ${meta.bride}\n\n${meta.venueName}\n${meta.venueAddress}`,
        location: meta.venueAddress,
      });

      return `https://calendar.google.com/calendar/render?${params.toString()}`;
    } catch {
      return "#";
    }
  };

  return (
    <section
      id="countdown"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Countdown Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            maxWidth: 460,
            margin: "0 auto",
            background: "#F8F6F2",
            borderRadius: 24,
            padding: "2.75rem 2rem 2.25rem",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.06)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top-Right Soft Blush Accent Circle */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 130,
              height: 130,
              borderRadius: "50%",
              background: "rgba(240, 222, 218, 0.55)",
              pointerEvents: "none",
            }}
          />

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
              fontSize: "2.4rem",
              fontWeight: 400,
              color: "#2D3748",
              marginBottom: "2rem",
              position: "relative",
              zIndex: 2,
            }}
          >
            {hasPassed ? "Hari Bahagia Telah Tiba" : title}
          </h2>

          {/* Countdown Display Row */}
          {hasPassed ? (
            <p
              style={{
                fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
                fontSize: "1.8rem",
                color: "#4A5D52",
                marginBottom: "2rem",
              }}
            >
              Acara telah berlangsung
            </p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "0.5rem",
                alignItems: "center",
                marginBottom: "2.5rem",
                position: "relative",
                zIndex: 2,
              }}
            >
              {UNITS.map((unit) => {
                const val = mounted ? timeLeft[unit.key] : 0;
                return (
                  <div
                    key={unit.key}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
                        fontWeight: 600,
                        color: "#1A202C",
                        lineHeight: 1.1,
                        marginBottom: "0.4rem",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {String(val).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#4A5568",
                      }}
                    >
                      {unit.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Simpan Tanggal Action Button */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <a
              href={buildCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              id="simpan-tanggal-btn"
              style={{
                display: "inline-block",
                padding: "0.85rem 2.4rem",
                background: "#4A5D52",
                color: "#FFFFFF",
                borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.02em",
                textDecoration: "none",
                boxShadow: "0 4px 14px rgba(74, 93, 82, 0.35)",
                transition: "transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#3F5147";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 18px rgba(74, 93, 82, 0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#4A5D52";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 14px rgba(74, 93, 82, 0.35)";
              }}
            >
              Simpan Tanggal
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
