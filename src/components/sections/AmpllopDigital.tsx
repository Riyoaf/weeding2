"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface BankCardProps {
  bank: string;
  accountNumber: string;
  accountName: string;
  delay?: number;
}

function CopyCardIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8" y="8" width="13" height="13" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

{/* Official BCA Logo from uploads/bca.png */}
function BcaLogo({ height = 36 }: { height?: number }) {
  return (
    <img
      src="/uploads/bca.png"
      alt="Bank Central Asia (BCA)"
      style={{
        height: height,
        maxHeight: "clamp(28px, 6.5vw, 40px)",
        width: "auto",
        objectFit: "contain",
        display: "block",
      }}
    />
  );
}

{/* Generic / Multi-Bank Logo Fallback */}
function BankLogoBadge({ bank }: { bank: string }) {
  const b = bank.toUpperCase().trim();
  if (b === "BCA") {
    return <BcaLogo height={36} />;
  }
  if (b === "MANDIRI") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.2rem", fontWeight: 900, color: "#003D79" }}>
          mandiri
        </span>
      </div>
    );
  }
  if (b === "BRI") {
    return (
      <div style={{ background: "#00529C", color: "#FFFFFF", padding: "4px 10px", borderRadius: 6, fontWeight: 900, fontSize: "1rem" }}>
        BRI
      </div>
    );
  }
  if (b === "BNI") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
        <span style={{ fontFamily: "'Arial Black', sans-serif", fontSize: "1.2rem", fontWeight: 900, color: "#005E6A" }}>BNI</span>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F15A24", display: "inline-block" }}></span>
      </div>
    );
  }
  return (
    <div style={{ background: "#1F2937", color: "#F9FAFB", padding: "4px 12px", borderRadius: 6, fontWeight: 700, fontSize: "0.95rem" }}>
      {bank}
    </div>
  );
}

{/* Realistic EMV Smart Chip from uploads/chip.png */}
function EmvChip({ width = 48, height }: { width?: number; height?: number }) {
  return (
    <img
      src="/uploads/chip.png"
      alt="Chip Kartu ATM"
      style={{
        width: width,
        maxWidth: "clamp(42px, 10vw, 52px)",
        height: height || "auto",
        objectFit: "contain",
        display: "block",
        filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))",
      }}
    />
  );
}

{/* Decorative Debit Card Wave Ribbons and Dotted Watermark */}
function CardPattern() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
      preserveAspectRatio="none"
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cardWave1" x1="0" y1="240" x2="400" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DCE2E9" stopOpacity="0.65" />
          <stop offset="50%" stopColor="#EDF1F5" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cardWave2" x1="0" y1="240" x2="400" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D0D8E2" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#F5F8FA" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Soft curved diagonal waves */}
      <path
        d="M-30 260 Q 120 180 220 100 T 430 20 L 430 260 Z"
        fill="url(#cardWave1)"
      />
      <path
        d="M-30 260 Q 160 210 270 140 T 430 70 L 430 260 Z"
        fill="url(#cardWave2)"
      />

      {/* Dotted watermark pattern cluster on bottom-right */}
      <g fill="#CBD5DF" opacity="0.95">
        <circle cx="260" cy="216" r="2.2" />
        <circle cx="280" cy="216" r="2.2" />
        <circle cx="300" cy="216" r="2.2" />
        <circle cx="320" cy="216" r="2.2" />
        <circle cx="340" cy="216" r="2.2" />
        <circle cx="360" cy="216" r="2.2" />
        <circle cx="380" cy="216" r="2.2" />

        <circle cx="280" cy="200" r="2.2" />
        <circle cx="300" cy="200" r="2.2" />
        <circle cx="320" cy="200" r="2.2" />
        <circle cx="340" cy="200" r="2.2" />
        <circle cx="360" cy="200" r="2.2" />
        <circle cx="380" cy="200" r="2.2" />

        <circle cx="300" cy="184" r="2.2" />
        <circle cx="320" cy="184" r="2.2" />
        <circle cx="340" cy="184" r="2.2" />
        <circle cx="360" cy="184" r="2.2" />
        <circle cx="380" cy="184" r="2.2" />

        <circle cx="320" cy="168" r="2.2" />
        <circle cx="340" cy="168" r="2.2" />
        <circle cx="360" cy="168" r="2.2" />
        <circle cx="380" cy="168" r="2.2" />

        <circle cx="340" cy="152" r="2.2" />
        <circle cx="360" cy="152" r="2.2" />
        <circle cx="380" cy="152" r="2.2" />

        <circle cx="360" cy="136" r="2.2" />
        <circle cx="380" cy="136" r="2.2" />
      </g>
    </svg>
  );
}

function BankCard({ bank, accountNumber, accountName, delay = 0 }: BankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      const el = document.createElement("textarea");
      el.value = accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className="atm-debit-card"
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 420,
        margin: "0 auto",
        aspectRatio: "1.65 / 1",
        minHeight: 215,
        background: "linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 45%, #EEF2F6 100%)",
        borderRadius: 22,
        padding: "clamp(1.1rem, 3.6vw, 1.5rem) clamp(1.2rem, 4.2vw, 1.65rem)",
        overflow: "hidden",
        boxShadow: "0 18px 42px rgba(0, 0, 0, 0.45), 0 2px 10px rgba(0, 0, 0, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.9)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
      }}
    >
      {/* Background Graphic: Waves & Dotted Watermark */}
      <CardPattern />

      {/* TOP ROW: Bank Logo on Top Right */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <BankLogoBadge bank={bank} />
      </div>

      {/* MIDDLE ROW: Gold EMV Smart Chip on Mid-Left */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          marginTop: "0.15rem",
          marginBottom: "auto",
        }}
      >
        <EmvChip width={48} height={38} />
      </div>

      {/* BOTTOM ROW: Name & Number on Left, Salin button on Right */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "0.75rem",
          width: "100%",
        }}
      >
        {/* Bottom Left: Account Holder Name & Account Number */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: "clamp(1.05rem, 3.5vw, 1.25rem)",
              fontWeight: 600,
              color: "#1A202C",
              margin: 0,
              lineHeight: 1.2,
              textTransform: "capitalize",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {accountName}
          </p>
          <p
            style={{
              fontFamily: "'Inter', -apple-system, sans-serif",
              fontSize: "clamp(0.95rem, 3vw, 1.1rem)",
              fontWeight: 500,
              color: "#2D3748",
              letterSpacing: "0.06em",
              margin: "0.28rem 0 0 0",
            }}
          >
            {accountNumber}
          </p>
        </div>

        {/* Bottom Right: Dark Translucent Salin Button */}
        <button
          type="button"
          onClick={handleCopy}
          id={`salin-rekening-${bank.toLowerCase()}-btn`}
          style={{
            flexShrink: 0,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 13px",
            background: copied
              ? "linear-gradient(135deg, #10B981 0%, #059669 100%)"
              : "rgba(65, 70, 75, 0.8)",
            backdropFilter: "blur(6px)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            borderRadius: 7,
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 600,
            letterSpacing: "0.02em",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.22)",
            transition: "all 0.2s ease",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.22)";
          }}
        >
          {copied ? (
            <>
              <CheckIcon size={14} />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <CopyCardIcon size={14} />
              <span>Salin</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function AmpllopDigital() {
  const [bankAccounts, setBankAccounts] = useState(weddingData.bankAccounts);
  const [showAccounts, setShowAccounts] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data.bankAccounts) && data.data.bankAccounts.length > 0) {
          setBankAccounts(
            data.data.bankAccounts.map((b: any) => ({
              bank: b.bank,
              accountNumber: b.account_number,
              accountName: b.account_name,
              logo: b.logo || b.bank,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section
      id="amplop"
      style={{
        padding: "var(--spacing-section-mobile) var(--spacing-container)",
        background: "transparent",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Couple Wayang (Kiri) - Berhadapan ke Kanan with alternating gentle shake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "clamp(36px, 7vw, 80px)",
          left: "max(clamp(2px, 1.2vw, 16px), calc(50% - 335px))",
          width: "clamp(98px, 23vw, 175px)",
          zIndex: 1,
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
        }}
      >
        <motion.div
          animate={{
            rotate: [0, -3.5, 3.5, -2.5, 2, -1, 0, 0, 0],
            x: [0, -2.5, 2.5, -1.5, 1.5, -0.5, 0, 0, 0],
            y: [0, -2, 1, -2, 1, -0.5, 0, 0, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.08, 0.16, 0.24, 0.32, 0.40, 0.48, 0.75, 1],
          }}
          style={{
            width: "100%",
            transformOrigin: "bottom center",
          }}
        >
          <img
            src="/uploads/couple_wayang.png"
            alt="Couple Wayang Kiri"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              transform: "scaleX(-1)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Couple Wayang (Kanan) - Berhadapan ke Kiri with alternating gentle shake */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "clamp(36px, 7vw, 80px)",
          right: "max(clamp(2px, 1.2vw, 16px), calc(50% - 335px))",
          width: "clamp(98px, 23vw, 175px)",
          zIndex: 1,
          filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.5))",
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 0, 0, -3.5, 3.5, -2.5, 2, -1, 0, 0],
            x: [0, 0, 0, -2.5, 2.5, -1.5, 1.5, -0.5, 0, 0],
            y: [0, 0, 0, -2, 1, -2, 1, -0.5, 0, 0],
          }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.25, 0.50, 0.58, 0.66, 0.74, 0.82, 0.90, 0.95, 1],
          }}
          style={{
            width: "100%",
            transformOrigin: "bottom center",
          }}
        >
          <img
            src="/uploads/couple_wayang.png"
            alt="Couple Wayang Kanan"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </motion.div>
      </motion.div>

      <div className="section-container" style={{ position: "relative", zIndex: 3, width: "100%" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "1.75rem" }}
        >
          {/* Envelope Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              background: "rgba(201, 169, 110, 0.15)",
              border: "1px solid rgba(201, 169, 110, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
              color: "#C9A96E",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </motion.div>

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
            Amplop Digital
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(0.82rem, 2vw, 0.95rem)",
              color: "#D1CCC2",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Kehadiran dan doa restu Anda adalah hadiah terbesar bagi kami. Bagi
            yang ingin memberikan tanda kasih secara digital, silakan klik tombol di bawah ini:
          </p>

          {/* Opsi Tombol Lihat Rekening */}
          <div style={{ marginTop: "1.6rem" }}>
            <button
              type="button"
              onClick={() => setShowAccounts((prev) => !prev)}
              id="toggle-lihat-rekening-btn"
              aria-expanded={showAccounts}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.65rem",
                padding: "0.85rem 2.2rem",
                background: showAccounts
                  ? "linear-gradient(135deg, rgba(201, 169, 110, 0.22) 0%, rgba(166, 135, 78, 0.32) 100%)"
                  : "linear-gradient(135deg, #C9A96E 0%, #A6874E 100%)",
                color: showAccounts ? "#F5F0E6" : "#161616",
                border: showAccounts
                  ? "1px solid rgba(201, 169, 110, 0.55)"
                  : "1px solid transparent",
                borderRadius: 50,
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.03em",
                cursor: "pointer",
                boxShadow: showAccounts
                  ? "0 4px 18px rgba(0, 0, 0, 0.35)"
                  : "0 6px 22px rgba(201, 169, 110, 0.38)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.12)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1)";
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              }}
            >
              {/* ATM / Card Icon */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
              <span>{showAccounts ? "Tutup Rekening" : "Lihat Rekening"}</span>
              {/* Animated Chevron */}
              <motion.svg
                animate={{ rotate: showAccounts ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </button>
          </div>
        </motion.div>

        {/* Bank Cards Container (Hidden by default, smoothly animated on toggle) */}
        <AnimatePresence>
          {showAccounts && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.96 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", width: "100%" }}
            >
              <div
                className="bank-cards-row"
                style={{
                  display: "flex",
                  gap: "clamp(0.85rem, 2.5vw, 1.5rem)",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  width: "100%",
                  paddingTop: "0.5rem",
                  paddingBottom: "1rem",
                }}
              >
                {bankAccounts.map((account, idx) => (
                  <BankCard
                    key={`${account.bank}-${account.accountNumber}-${idx}`}
                    bank={account.bank}
                    accountNumber={account.accountNumber}
                    accountName={account.accountName}
                    delay={idx * 0.12}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
