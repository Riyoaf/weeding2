"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface WishItem {
  id?: number | string;
  name: string;
  attendance: string;
  message: string;
  created_at?: string;
  date?: string;
}

const initialSampleWishes: WishItem[] = [
  // {
  //   id: 1,
  //   name: "Budi & Ani",
  //   attendance: "Hadir",
  //   message:
  //     "Selamat menempuh hidup baru. Semoga kalian selalu berbahagia, saling melengkapi, dan diridhai Allah SWT. Aamiin.",
  //   date: "8 Sept 2025",
  // },
  // {
  //   id: 2,
  //   name: "Keluarga Susanto",
  //   attendance: "Hadir",
  //   message:
  //     "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Semoga rumah tangga kalian menjadi surga di dunia.",
  //   date: "9 Sept 2025",
  // },
  // {
  //   id: 3,
  //   name: "Rini Handayani",
  //   attendance: "Hadir",
  //   message:
  //     "Congratulations Dita & Bagus! Wishing you both a lifetime of love, laughter, and happily ever after 🌸",
  //   date: "10 Sept 2025",
  // },
];

function WishCard({ wish, index }: { wish: WishItem; index: number }) {
  const formattedDate = wish.date
    ? wish.date
    : wish.created_at
    ? new Date(wish.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Baru saja";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        padding: "1.5rem",
        background: "rgba(22, 22, 22, 0.78)",
        backdropFilter: "blur(12px)",
        borderRadius: 18,
        border: "1px solid rgba(201, 169, 110, 0.35)",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
        breakInside: "avoid",
        marginBottom: "1rem",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "2.5rem",
          color: "rgba(201, 169, 110, 0.4)",
          lineHeight: 1,
          marginBottom: "-0.4rem",
          marginLeft: "-0.25rem",
        }}
      >
        &ldquo;
      </div>

      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.9rem",
          color: "#EAE6DF",
          lineHeight: 1.65,
          marginBottom: "1rem",
        }}
      >
        {wish.message}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "0.95rem",
            fontWeight: 600,
            color: "#F5F0E6",
          }}
        >
          {wish.name}
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.65rem",
            color: "#C9A96E",
          }}
        >
          {formattedDate}
        </p>
      </div>
    </motion.div>
  );
}

export default function WishesWall() {
  const [wishes, setWishes] = useState<WishItem[]>(initialSampleWishes);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("Hadir");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing wishes from Neon Postgres API or LocalStorage fallback
  useEffect(() => {
    async function loadWishes() {
      try {
        const res = await fetch("/api/wishes");
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          setWishes(json.data);
          return;
        }
      } catch (err) {
        console.warn("Neon DB API fetch failed, checking localStorage fallback:", err);
      }

      // LocalStorage fallback
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("wedding_wishes_neon");
        if (saved) {
          try {
            setWishes(JSON.parse(saved));
          } catch (e) {
            console.error("Local storage error:", e);
          }
        }
      }
    }
    loadWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const wishPayload = {
      name: name.trim(),
      attendance,
      message: message.trim(),
    };

    let newWishItem: WishItem = {
      ...wishPayload,
      id: Date.now(),
      date: "Baru saja",
    };

    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wishPayload),
      });

      const json = await res.json();
      if (json.success && json.data) {
        newWishItem = json.data;
      }
    } catch (err) {
      console.warn("Neon DB API POST failed, saving to local state:", err);
    }

    setWishes((prev) => {
      const updated = [newWishItem, ...prev.filter((w) => w.id !== newWishItem.id)];
      if (typeof window !== "undefined") {
        localStorage.setItem("wedding_wishes_neon", JSON.stringify(updated));
      }
      return updated;
    });

    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setIsSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1.5px solid rgba(201, 169, 110, 0.4)",
    padding: "0.6rem 0",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.95rem",
    color: "#F5F0E6",
    outline: "none",
    borderRadius: 0,
  };

  return (
    <section
      id="ucapan"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 480, margin: "0 auto 2.5rem" }}
        >
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
            Kirim Ucapan &amp; Doa
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
              color: "#D1CCC2",
              lineHeight: 1.6,
            }}
          >
            Berbagi kebahagiaan dan harapan manis untuk perjalanan kami berdua.
          </p>
        </motion.div>

        {/* Wishes Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          style={{
            maxWidth: 460,
            margin: "0 auto 3rem",
            background: "rgba(22, 22, 22, 0.78)",
            backdropFilter: "blur(12px)",
            borderRadius: 24,
            padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem) clamp(1.4rem, 3.5vw, 2.25rem)",
            boxShadow: "0 12px 36px rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(201, 169, 110, 0.35)",
            textAlign: "left",
            width: "100%",
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "clamp(1.2rem, 3vw, 1.75rem)" }}>
            {/* Field 1: Nama Lengkap */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  marginBottom: "0.5rem",
                }}
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tuliskan nama Anda..."
                required
                style={inputStyle}
              />
            </div>

            {/* Field 2: Konfirmasi Kehadiran */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  marginBottom: "0.5rem",
                }}
              >
                Konfirmasi Kehadiran
              </label>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                style={{
                  ...inputStyle,
                  cursor: "pointer",
                  color: "#F5F0E6",
                }}
              >
                <option value="Hadir" style={{ background: "#1E1E1E", color: "#F5F0E6" }}>Hadir</option>
                <option value="Ragu-ragu" style={{ background: "#1E1E1E", color: "#F5F0E6" }}>Ragu-ragu</option>
                <option value="Maaf Tidak Bisa Hadir" style={{ background: "#1E1E1E", color: "#F5F0E6" }}>Maaf Tidak Bisa Hadir</option>
              </select>
            </div>

            {/* Field 3: Pesan & Doa */}
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#C9A96E",
                  marginBottom: "0.5rem",
                }}
              >
                Pesan &amp; Doa
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan pesan manis Anda..."
                required
                rows={3}
                style={{
                  ...inputStyle,
                  resize: "vertical",
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: "0.75rem 1.5rem",
                      background: "rgba(201, 169, 110, 0.15)",
                      borderRadius: 50,
                      border: "1px solid rgba(201, 169, 110, 0.4)",
                      display: "inline-block",
                    }}
                  >
                    <p style={{ color: "#F5F0E6", fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600 }}>
                      ✨ Terima kasih atas doa &amp; ucapannya!
                    </p>
                  </motion.div>
                ) : (
                  <button
                    key="submit"
                    type="submit"
                    id="kirim-ucapan-btn"
                    disabled={isSubmitting}
                    style={{
                      display: "inline-block",
                      padding: "0.85rem 2.5rem",
                      background: "linear-gradient(135deg, #C9A96E 0%, #A6874E 100%)",
                      color: "#161616",
                      borderRadius: 50,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      border: "none",
                      boxShadow: "0 6px 18px rgba(201, 169, 110, 0.25)",
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      opacity: isSubmitting ? 0.7 : 1,
                      transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(201, 169, 110, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 18px rgba(201, 169, 110, 0.25)";
                      }
                    }}
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Ucapan"}
                  </button>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>

        {/* Wishes List Grid */}
        <div
          style={{
            columns: "1",
            gap: "1rem",
            maxWidth: 700,
            margin: "0 auto",
            textAlign: "left",
          }}
          className="wishes-grid"
        >
          <style>{`
            @media (min-width: 600px) {
              .wishes-grid { columns: 2 !important; }
            }
          `}</style>
          <AnimatePresence>
            {wishes.map((wish, index) => (
              <WishCard key={wish.id || index} wish={wish} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
