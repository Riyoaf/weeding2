"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface WishItem {
  id: number;
  name: string;
  attendance: string;
  message: string;
  created_at: string;
}

export default function AdminOverviewPage() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/wishes", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setWishes(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const totalWishes = wishes.length;
  const totalHadir = wishes.filter((w) => w.attendance.toLowerCase() === "hadir").length;
  const totalTidakHadir = wishes.filter(
    (w) => w.attendance.toLowerCase().includes("tidak") || w.attendance.toLowerCase().includes("maaf")
  ).length;
  const attendanceRate = totalWishes > 0 ? Math.round((totalHadir / totalWishes) * 100) : 100;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      {/* Header Row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Dashboard
        </h1>

        <button
          onClick={() => window.location.reload()}
          title="Refresh Data"
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 6,
            padding: "0.45rem",
            color: "#6B7280",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
          </svg>
        </button>
      </div>

      {/* TOP 4 KPI STAT CARDS (CATMIN Exact Structure: Total Revenue, New Customers, Active Accounts, Growth Rate) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* KPI 1: Total Ucapan / Revenue style */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: 500 }}>Total Ucapan</span>
            <span style={{ color: "#9CA3AF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>
            {totalWishes}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0.4rem 0 0" }}>
            +20.1% from last month
          </p>
          <p style={{ fontSize: "0.72rem", color: "#10B981", margin: "0.25rem 0 0", fontWeight: 600 }}>
            ↗ +20.1%
          </p>
        </div>

        {/* KPI 2: Konfirmasi Hadir / New Customers style */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: 500 }}>Konfirmasi Hadir</span>
            <span style={{ color: "#9CA3AF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>
            {totalHadir}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0.4rem 0 0" }}>
            +180.1% from last month
          </p>
          <p style={{ fontSize: "0.72rem", color: "#10B981", margin: "0.25rem 0 0", fontWeight: 600 }}>
            ↗ +180.1%
          </p>
        </div>

        {/* KPI 3: Berhalangan / Active Accounts style */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: 500 }}>Tamu Berhalangan</span>
            <span style={{ color: "#9CA3AF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
              </svg>
            </span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>
            {totalTidakHadir}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0.4rem 0 0" }}>
            +19% from last month
          </p>
          <p style={{ fontSize: "0.72rem", color: "#10B981", margin: "0.25rem 0 0", fontWeight: 600 }}>
            ↗ +19%
          </p>
        </div>

        {/* KPI 4: Persentase Kehadiran / Growth Rate style */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#6B7280", fontWeight: 500 }}>Rasio Kehadiran</span>
            <span style={{ color: "#9CA3AF" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 700, color: "#111827", lineHeight: 1.1 }}>
            {attendanceRate}%
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0.4rem 0 0" }}>
            +5.4% from last month
          </p>
          <p style={{ fontSize: "0.72rem", color: "#10B981", margin: "0.25rem 0 0", fontWeight: 600 }}>
            ↗ +5.4%
          </p>
        </div>
      </div>

      {/* MIDDLE SECTION (3 WIDGET CARDS: Subscriptions Bar Chart, Revenue Line Chart, Budget Overview Progress) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1.25fr",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Widget 1: Subscriptions Bar Chart (solid black bars) */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", margin: 0 }}>
            Subscriptions
          </p>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginTop: "0.2rem" }}>
            +{totalHadir > 0 ? totalHadir * 10 : 2350}
          </div>
          <p style={{ fontSize: "0.72rem", color: "#6B7280", margin: "0.2rem 0 1.25rem" }}>
            +80.1% from last month
          </p>

          {/* Bar Chart Representation with pure black bars */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: 110 }}>
            {[
              { m: "Jan", h: 35 },
              { m: "Feb", h: 65 },
              { m: "Mar", h: 42 },
              { m: "Apr", h: 58 },
              { m: "May", h: 48 },
              { m: "Jun", h: 72 },
              { m: "Jul", h: 90 },
              { m: "Aug", h: 52 },
            ].map((bar, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    width: 14,
                    height: `${bar.h}%`,
                    background: "#000000",
                    borderRadius: 2,
                  }}
                />
                <span style={{ fontSize: "0.68rem", color: "#6B7280" }}>{bar.m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Line Chart Curve Simulation (Total Revenue Trend) */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", margin: 0 }}>
            Total Revenue
          </p>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", marginTop: "0.2rem" }}>
            $15,231.89
          </div>
          <p style={{ fontSize: "0.72rem", color: "#6B7280", margin: "0.2rem 0 1.25rem" }}>
            +20.1% from last month
          </p>

          {/* Minimalist Line Chart Curve with black dots matching CATMIN */}
          <div style={{ height: 110, display: "flex", alignItems: "center" }}>
            <svg viewBox="0 0 200 80" style={{ width: "100%", height: "100%" }}>
              <path
                d="M 10,65 Q 45,30 80,48 T 145,55 T 190,15"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
              />
              <circle cx="10" cy="65" r="3" fill="#000000" />
              <circle cx="45" cy="42" r="3" fill="#000000" />
              <circle cx="80" cy="48" r="3" fill="#000000" />
              <circle cx="115" cy="58" r="3" fill="#000000" />
              <circle cx="145" cy="55" r="3" fill="#000000" />
              <circle cx="190" cy="15" r="3" fill="#000000" />
            </svg>
          </div>
        </div>

        {/* Widget 3: Budget Overview (CATMIN style with black bars) */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 8,
            padding: "1.25rem",
            boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
          }}
        >
          <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#111827", margin: 0 }}>
            Budget Overview
          </p>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem", fontSize: "0.8rem" }}>
            <span style={{ fontWeight: 600, color: "#111827" }}>Total Spent</span>
            <span style={{ fontWeight: 600, color: "#111827" }}>$3,000 / $3,650</span>
          </div>

          {/* Main Black Progress Bar */}
          <div style={{ height: 7, background: "#E5E7EB", borderRadius: 4, margin: "0.5rem 0", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "82.2%", background: "#000000", borderRadius: 4 }} />
          </div>

          <p style={{ fontSize: "0.7rem", color: "#6B7280", textAlign: "right", margin: "0 0 1rem" }}>
            82.2% of budget used
          </p>

          {/* Sub progress list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { label: "Mempelai & Acara", pct: 100 },
              { label: "Galeri Foto", pct: 90 },
              { label: "Amplop Digital", pct: 86 },
              { label: "Musik & Kutipan", pct: 83 },
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "#374151", width: 110 }}>{item.label}</span>
                <div style={{ flex: 1, height: 4, background: "#E5E7EB", borderRadius: 2, margin: "0 0.75rem", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.pct}%`, background: "#000000", borderRadius: 2 }} />
                </div>
                <span style={{ color: "#6B7280", fontWeight: 500, width: 30, textAlign: "right" }}>{item.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: RECENT WISHES TABLE (Clean CATMIN monochrome Table) */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 8,
          padding: "1.25rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#111827", margin: 0 }}>
              Visitors &amp; Wishes
            </h3>
            <p style={{ fontSize: "0.75rem", color: "#6B7280", margin: "0.2rem 0 0" }}>
              Showing recent attendance responses and guest wishes
            </p>
          </div>

          <Link
            href="/admin/ucapan"
            style={{
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "#111827",
              textDecoration: "none",
              border: "1px solid #E5E7EB",
              padding: "0.35rem 0.65rem",
              borderRadius: 6,
              background: "#FFFFFF",
            }}
          >
            Lihat Semua Moderasi &rarr;
          </Link>
        </div>

        {loading ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.82rem" }}>Memuat data ucapan...</p>
        ) : wishes.length === 0 ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.82rem" }}>Belum ada data ucapan.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.82rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB", color: "#6B7280", fontSize: "0.72rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}>Nama Tamu</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}>Pesan Ucapan</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}>Kehadiran</th>
                  <th style={{ padding: "0.6rem 0.75rem", fontWeight: 600 }}>Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {wishes.slice(0, 5).map((w) => (
                  <tr key={w.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "0.65rem 0.75rem", fontWeight: 600, color: "#111827" }}>{w.name}</td>
                    <td style={{ padding: "0.65rem 0.75rem", color: "#4B5563" }}>{w.message}</td>
                    <td style={{ padding: "0.65rem 0.75rem" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 500,
                          padding: "0.2rem 0.5rem",
                          borderRadius: 4,
                          background: w.attendance === "Hadir" ? "#F3F4F6" : "#FEF2F2",
                          color: w.attendance === "Hadir" ? "#111827" : "#991B1B",
                          border: `1px solid ${w.attendance === "Hadir" ? "#E5E7EB" : "#FECACA"}`,
                        }}
                      >
                        {w.attendance}
                      </span>
                    </td>
                    <td style={{ padding: "0.65rem 0.75rem", color: "#9CA3AF", fontSize: "0.75rem" }}>
                      {new Date(w.created_at).toLocaleDateString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
