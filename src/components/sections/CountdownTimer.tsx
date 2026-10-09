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
        {/* Countdown Container (Clean without bulky outer card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{
            maxWidth: 460,
            margin: "0 auto",
            position: "relative",
            width: "100%",
          }}
        >
          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
              fontSize: "clamp(2rem, 5.5vw, 2.8rem)",
              fontWeight: 400,
              color: "#F5F0E6",
              marginBottom: "clamp(1.2rem, 3.5vw, 1.8rem)",
              position: "relative",
              zIndex: 2,
              lineHeight: 1.2,
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
                color: "#C9A96E",
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
                gap: "clamp(6px, 1.8vw, 12px)",
                alignItems: "center",
                maxWidth: 400,
                margin: "0 auto 2rem",
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
                      justifyContent: "center",
                      minWidth: 0,
                      padding: "clamp(0.65rem, 2vw, 1rem) clamp(0.2rem, 1vw, 0.5rem)",
                      background: "rgba(12, 12, 12, 0.85)",
                      borderRadius: 8,
                      border: "1.5px solid #C9A96E",
                      boxShadow: "0 4px 14px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(201, 169, 110, 0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', 'Playfair Display', serif",
                        fontSize: "clamp(1.4rem, 4.4vw, 2.2rem)",
                        fontWeight: 600,
                        color: "#DFBA73",
                        lineHeight: 1.05,
                        marginBottom: "0.25rem",
                        fontVariantNumeric: "tabular-nums",
                        textShadow: "0 2px 6px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {String(val).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), 'Cormorant Garamond', 'Playfair Display', serif",
                        fontSize: "clamp(0.75rem, 2.2vw, 0.95rem)",
                        fontWeight: 400,
                        color: "#DFBA73",
                        lineHeight: 1,
                        textTransform: "capitalize",
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
                background: "linear-gradient(135deg, #C9A96E 0%, #A6874E 100%)",
                color: "#161616",
                borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
                boxShadow: "0 4px 18px rgba(201, 169, 110, 0.35)",
                transition: "transform 0.2s ease, filter 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.1)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 6px 22px rgba(201, 169, 110, 0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1)";
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 18px rgba(201, 169, 110, 0.35)";
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
