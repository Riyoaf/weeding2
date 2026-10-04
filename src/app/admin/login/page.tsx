"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Password salah, silakan coba lagi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan sistem: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F8F9FA",
        padding: "1.5rem",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#FFFFFF",
          borderRadius: 12,
          padding: "2rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05), 0 10px 15px -5px rgba(0,0,0,0.04)",
          border: "1px solid #E5E7EB",
          textAlign: "center",
        }}
      >
        {/* Header Icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: "#F3F4F6",
            border: "1px solid #E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem",
            color: "#111827",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "#111827",
            margin: 0,
            marginBottom: "0.35rem",
            letterSpacing: "-0.01em",
          }}
        >
          Masuk ke Dashboard
        </h1>

        <p
          style={{
            fontSize: "0.82rem",
            color: "#6B7280",
            margin: 0,
            marginBottom: "1.75rem",
          }}
        >
          Masukkan password admin untuk mengelola undangan.
        </p>

        {error && (
          <div
            style={{
              padding: "0.65rem 0.85rem",
              background: "#FEE2E2",
              border: "1px solid #FECACA",
              borderRadius: 8,
              color: "#991B1B",
              fontSize: "0.8rem",
              marginBottom: "1.25rem",
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ textAlign: "left" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "0.4rem",
              }}
            >
              Password Admin
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin..."
              required
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                background: "#FFFFFF",
                border: "1px solid #D1D5DB",
                borderRadius: 8,
                color: "#111827",
                fontSize: "0.85rem",
                outline: "none",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem",
              background: loading ? "#9CA3AF" : "#111827",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.15s ease",
            }}
          >
            {loading ? "Memverifikasi..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
