"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: number;
  title?: string;
  subtitle?: string;
  image: string;
  isFeatured?: boolean;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: "/dita.jpeg",
    isFeatured: true,
  },
  {
    id: 2,
    image: "/gallery_cincin.jpg",
  },
  {
    id: 3,
    image: "/gallery_melati.jpg",
  },
  {
    id: 4,
    image: "/gallery_batik.jpg",
  },
  {
    id: 5,
    image: "/dita 2.jpeg",
  },
];

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>(GALLERY_ITEMS);
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data.galleryItems) && data.data.galleryItems.length > 0) {
          setItems(
            data.data.galleryItems.map((g: any) => ({
              id: g.id,
              image: g.image_url,
              isFeatured: g.is_featured,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const activeItem =
    activeItemIndex !== null ? items[activeItemIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) =>
        prev === 0 ? items.length - 1 : (prev as number) - 1
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeItemIndex !== null) {
      setActiveItemIndex((prev) =>
        prev === items.length - 1 ? 0 : (prev as number) + 1
      );
    }
  };

  const featuredItem = items.find((item) => item.isFeatured) || items[0];
  const gridItems = items.filter((item) => item.id !== featuredItem?.id);

  return (
    <section
      id="galeri"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="section-container"
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {/* Soft Glass Card Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "rgba(248, 246, 242, 0.94)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            padding: "2.75rem 1.5rem 2.25rem",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(201, 169, 110, 0.3)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Top Right Soft Sage Accent Circle */}
          <div
            style={{
              position: "absolute",
              top: -20,
              right: -20,
              width: 140,
              height: 140,
              borderRadius: "50%",
              background: "rgba(225, 235, 228, 0.55)",
              pointerEvents: "none",
            }}
          />

          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "linear-gradient(90deg, transparent, #C9A96E)",
                }}
              />
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  margin: 0,
                }}
              >
                Dokumentasi Cinta
              </p>
              <div
                style={{
                  width: 32,
                  height: 1,
                  background: "linear-gradient(90deg, #C9A96E, transparent)",
                }}
              />
            </div>

            <h2
              style={{
                fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
                fontSize: "clamp(2.4rem, 6vw, 3.4rem)",
                fontWeight: 400,
                color: "#2D3748",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Galeri Foto Bahagia
            </h2>
          </div>

          {/* Featured Large Top Card (Clean photo without title overlay) */}
          {featuredItem && (
            <motion.div
              whileHover={{ scale: 1.015 }}
              transition={{ duration: 0.3 }}
              onClick={() =>
                setActiveItemIndex(
                  items.findIndex((i) => i.id === featuredItem.id)
                )
              }
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(240px, 60vw, 360px)",
                borderRadius: 20,
                overflow: "hidden",
                marginBottom: "1.1rem",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.10)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
                background: "#E2E8F0",
              }}
            >
              <img
                src={featuredItem.image}
                alt="Foto Utama Galeri"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                  transition: "transform 0.5s ease",
                }}
              />
            </motion.div>
          )}

          {/* Grid Cards (Clean photos without title overlays) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.1rem",
            }}
          >
            {gridItems.map((item) => {
              const itemIndex = items.findIndex((i) => i.id === item.id);
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.025 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setActiveItemIndex(itemIndex)}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "clamp(160px, 42vw, 220px)",
                    borderRadius: 18,
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "#E2E8F0",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
                    border: "1px solid rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <img
                    src={item.image}
                    alt="Foto Galeri"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center center",
                      transition: "transform 0.4s ease",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Lightbox Fullscreen Modal (Clean without caption bar) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItemIndex(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              background: "rgba(10, 12, 11, 0.94)",
              backdropFilter: "blur(14px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveItemIndex(null)}
              aria-label="Tutup Galeri"
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10001,
                fontSize: "1.2rem",
                transition: "background 0.2s ease",
              }}
            >
              ✕
            </button>

            {/* Previous Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Foto Sebelumnya"
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10001,
              }}
            >
              ❮
            </button>

            {/* Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Foto Selanjutnya"
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255, 255, 255, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
                width: 44,
                height: 44,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10001,
              }}
            >
              ❯
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                maxWidth: 680,
                width: "100%",
                maxHeight: "88vh",
                borderRadius: 20,
                overflow: "hidden",
                boxShadow: "0 24px 48px rgba(0, 0, 0, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={activeItem.image}
                alt="Foto Galeri Penuh"
                style={{
                  width: "100%",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: 20,
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
