"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingData } from "@/lib/wedding-data";

interface BankCardProps {
  bank: string;
  accountNumber: string;
  accountName: string;
  delay?: number;
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
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

function BankCard({ bank, accountNumber, accountName, delay = 0 }: BankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = accountNumber;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="bank-card-item"
      style={{
        flex: 1,
        minWidth: 280,
        maxWidth: 380,
        background: "linear-gradient(135deg, #4A5D52 0%, #3F5147 60%, #33423A 100%)",
        borderRadius: 24,
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 16px 40px rgba(74, 93, 82, 0.25), 0 4px 16px rgba(0,0,0,0.1)",
        border: "1px solid rgba(201, 169, 110, 0.25)",
        textAlign: "left",
      }}
    >
      {/* Card Shimmer Glow Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse at top left, rgba(201, 169, 110, 0.20) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Modern Card Decorative Concentric Rings */}
      <div
        style={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 130,
          height: 130,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(201, 169, 110, 0.15)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -10,
          right: -10,
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(201, 169, 110, 0.2)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Bank Header */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#E2D1A6",
              letterSpacing: "0.06em",
              margin: 0,
              marginBottom: "0.2rem",
            }}
          >
            {bank}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(255, 255, 255, 0.6)",
              margin: 0,
            }}
          >
            Bank Transfer
          </p>
        </div>

        {/* Account Number */}
        <div style={{ marginBottom: "1.25rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.35rem",
            }}
          >
            Nomor Rekening
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              margin: 0,
            }}
          >
            {accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ")}
          </p>
        </div>

        {/* Account Name */}
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C9A96E",
              marginBottom: "0.35rem",
            }}
          >
            Atas Nama
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "#E2D1A6",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              margin: 0,
            }}
          >
            {accountName}
          </p>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          id={`salin-rekening-${bank.toLowerCase()}-btn`}
          style={{
            width: "100%",
            padding: "0.85rem 1.25rem",
            background: copied
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(255, 255, 255, 0.12)",
            border: `1px solid ${copied ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 255, 255, 0.25)"}`,
            borderRadius: 50,
            color: "#FFFFFF",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            backdropFilter: "blur(4px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "all 0.25s ease",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.22)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = copied ? "rgba(255, 255, 255, 0.3)" : "rgba(255, 255, 255, 0.12)";
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <CheckIcon /> Nomor Rekening Tersalin!
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
              >
                <CopyIcon /> Salin Nomor Rekening
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}

export default function AmpllopDigital() {
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
      {/* Burung Merak Element (Top-Right Side, Facing Left) */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="pointer-events-none select-none"
        style={{
          position: "absolute",
          top: "-55px",
          right: "max(0px, calc(50% - 390px))",
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
            transform: "scaleX(1)", // Facing left
          }}
        />
      </motion.div>

      <div className="section-container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          {/* Envelope Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              width: 58,
              height: 58,
              borderRadius: "50%",
              background: "rgba(74, 93, 82, 0.1)",
              border: "1px solid rgba(74, 93, 82, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.25rem",
              color: "#4A5D52",
            }}
          >
            <svg
              width="26"
              height="26"
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
              fontSize: "clamp(2.4rem, 6vw, 3.4rem)",
              fontWeight: 400,
              color: "#2D3748",
              marginBottom: "0.75rem",
            }}
          >
            Amplop Digital
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.95rem",
              color: "#4A5568",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Kehadiran dan doa restu Anda adalah hadiah terbesar bagi kami. Bagi
            yang ingin memberikan tanda kasih, berikut rekening kami:
          </p>
        </motion.div>

        {/* Bank Cards Row */}
        <div
          className="bank-cards-row"
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {weddingData.bankAccounts.map((account, idx) => (
            <BankCard
              key={account.accountNumber}
              bank={account.bank}
              accountNumber={account.accountNumber}
              accountName={account.accountName}
              delay={idx * 0.15}
            />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            color: "#718096",
            fontSize: "0.95rem",
          }}
        >
          Terima kasih atas kebaikan hati Anda ✨
        </motion.p>
      </div>
    </section>
  );
}
