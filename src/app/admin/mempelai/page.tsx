"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminMempelaiPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    groom_name: "",
    groom_full_name: "",
    groom_parent_of: "",
    bride_name: "",
    bride_full_name: "",
    bride_parent_of: "",
    akad_date: "",
    akad_display_date: "",
    akad_display_day: "",
    akad_time: "",
    akad_label: "Akad Nikah",
    resepsi_date: "",
    resepsi_display_date: "",
    resepsi_display_day: "",
    resepsi_time: "",
    resepsi_label: "Resepsi Pernikahan",
    venue_name: "",
    venue_address: "",
    venue_lat: 0,
    venue_lng: 0,
    google_maps_url: "",
    closing_quote_text: "",
    closing_quote_source: "",
    music_url: "/kusuma_jaya.mp3",
    countdown_target: "2026-09-12T10:00",
    countdown_title: "Menuju Hari Bahagia",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.settings) {
          const s = data.data.settings;
          setForm({
            ...s,
            countdown_target: s.countdown_target || "2026-09-12T10:00",
            countdown_title: s.countdown_title || "Menuju Hari Bahagia",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Informasi Mempelai, Acara, & Lokasi Berhasil Diperbarui!" });
      } else {
        setMessage({ type: "error", text: data.message || "Gagal menyimpan perubahan." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan: " + (err as Error).message });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>Memuat data mempelai &amp; acara...</p>;
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Kelola Mempelai &amp; Acara
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Atur informasi nama pasangan pengantin, jadwal akad/resepsi, serta koordinat lokasi venue.
        </p>
      </div>

      {message && (
        <div
          style={{
            padding: "0.85rem 1rem",
            borderRadius: 8,
            marginBottom: "1.5rem",
            fontSize: "0.85rem",
            background: message.type === "success" ? "#D1FAE5" : "#FEE2E2",
            border: message.type === "success" ? "1px solid #A7F3D0" : "1px solid #FECACA",
            color: message.type === "success" ? "#065F46" : "#991B1B",
            fontWeight: 500,
          }}
        >
          {message.text}
        </div>
      )}

      {/* Cover Undangan Notice / Quick Link */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "#F3F4F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#111827",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="12" cy="10" r="3" />
              <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
            </svg>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 600, color: "#111827" }}>
              Cover Depan Undangan (Opening Screen)
            </p>
            <p style={{ margin: 0, fontSize: "0.75rem", color: "#6B7280" }}>
              Ubah foto profil, nama pasangan, dan format tanggal khusus layar depan.
            </p>
          </div>
        </div>
        <Link
          href="/admin/cover"
          style={{
            fontSize: "0.8rem",
            fontWeight: 500,
            color: "#111827",
            textDecoration: "none",
            border: "1px solid #E5E7EB",
            padding: "0.45rem 0.85rem",
            borderRadius: 6,
            background: "#F9FAFB",
          }}
        >
          Kelola Cover &rarr;
        </Link>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* GROOM & BRIDE CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginTop: 0, marginBottom: "1.25rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
            Informasi Pasangan Mempelai
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* GROOM */}
            <div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#374151", marginBottom: "0.85rem" }}>
                Mempelai Pria (Groom)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label style={labelStyle}>Nama Panggilan</label>
                  <input type="text" name="groom_name" value={form.groom_name} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input type="text" name="groom_full_name" value={form.groom_full_name} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Keterangan Orang Tua</label>
                  <input type="text" name="groom_parent_of" value={form.groom_parent_of} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* BRIDE */}
            <div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#374151", marginBottom: "0.85rem" }}>
                Mempelai Wanita (Bride)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label style={labelStyle}>Nama Panggilan</label>
                  <input type="text" name="bride_name" value={form.bride_name} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nama Lengkap</label>
                  <input type="text" name="bride_full_name" value={form.bride_full_name} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Keterangan Orang Tua</label>
                  <input type="text" name="bride_parent_of" value={form.bride_parent_of} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SCHEDULE CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginTop: 0, marginBottom: "1.25rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
            Jadwal Akad &amp; Resepsi
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* AKAD */}
            <div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#374151", marginBottom: "0.85rem" }}>Akad Nikah</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label style={labelStyle}>Hari (misal: Sabtu)</label>
                  <input type="text" name="akad_display_day" value={form.akad_display_day} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Tampilan Tanggal (misal: 12 September 2026)</label>
                  <input type="text" name="akad_display_date" value={form.akad_display_date} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Waktu (misal: 10.00 WIB)</label>
                  <input type="text" name="akad_time" value={form.akad_time} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
            </div>

            {/* RESEPSI */}
            <div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#374151", marginBottom: "0.85rem" }}>Resepsi Pernikahan</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                <div>
                  <label style={labelStyle}>Hari (misal: Sabtu)</label>
                  <input type="text" name="resepsi_display_day" value={form.resepsi_display_day} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Tampilan Tanggal (misal: 12 September 2026)</label>
                  <input type="text" name="resepsi_display_date" value={form.resepsi_display_date} onChange={handleChange} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Waktu (misal: 15.00 WIB)</label>
                  <input type="text" name="resepsi_time" value={form.resepsi_time} onChange={handleChange} style={inputStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COUNTDOWN TIMER CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
            <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", margin: 0 }}>
              Waktu Berjalan Menuju Hari H (Countdown Timer)
            </h2>
            <button
              type="button"
              onClick={() => {
                if (form.akad_date) {
                  const timeClean = form.akad_time?.replace(/[^0-9.]/g, "").replace(".", ":") || "10:00";
                  const parts = timeClean.split(":");
                  const hour = parts[0]?.padStart(2, "0") || "10";
                  const min = parts[1]?.padStart(2, "0") || "00";
                  setForm({ ...form, countdown_target: `${form.akad_date}T${hour}:${min}` });
                }
              }}
              style={{
                fontSize: "0.75rem",
                color: "#111827",
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                padding: "0.35rem 0.65rem",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Samakan dengan Jadwal Akad
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Target Tanggal &amp; Jam Acara (Hari H)</label>
              <input
                type="datetime-local"
                name="countdown_target"
                value={form.countdown_target || "2026-09-12T10:00"}
                onChange={handleChange}
                style={inputStyle}
              />
              <span style={{ fontSize: "0.72rem", color: "#6B7280", marginTop: "0.35rem", display: "block" }}>
                Format: Tanggal dan jam dimulainya acara pernikahan.
              </span>
            </div>

            <div>
              <label style={labelStyle}>Judul Bagian Countdown</label>
              <input
                type="text"
                name="countdown_title"
                value={form.countdown_title || "Menuju Hari Bahagia"}
                onChange={handleChange}
                placeholder="Menuju Hari Bahagia"
                style={inputStyle}
              />
              <span style={{ fontSize: "0.72rem", color: "#6B7280", marginTop: "0.35rem", display: "block" }}>
                Judul teks yang tampil di atas angka hitung mundur.
              </span>
            </div>
          </div>
        </div>

        {/* VENUE & GIS CARD */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginTop: 0, marginBottom: "1.25rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
            Lokasi Venue &amp; GIS Map
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <div>
              <label style={labelStyle}>Nama Lokasi Tempat</label>
              <input type="text" name="venue_name" value={form.venue_name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Alamat Lengkap</label>
              <textarea name="venue_address" value={form.venue_address} onChange={handleChange} rows={3} style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Latitude GIS</label>
                <input type="number" step="any" name="venue_lat" value={form.venue_lat} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Longitude GIS</label>
                <input type="number" step="any" name="venue_lng" value={form.venue_lng} onChange={handleChange} style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>URL Google Maps</label>
              <input type="text" name="google_maps_url" value={form.google_maps_url} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "0.75rem 1.75rem",
            background: saving ? "#9CA3AF" : "#111827",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: "0.88rem",
            cursor: saving ? "not-allowed" : "pointer",
            alignSelf: "flex-end",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          {saving ? "Menyimpan..." : "Simpan Perubahan Data"}
        </button>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  fontWeight: 600,
  color: "#4B5563",
  display: "block",
  marginBottom: "0.35rem",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  background: "#FFFFFF",
  border: "1px solid #D1D5DB",
  borderRadius: 8,
  color: "#111827",
  fontSize: "0.85rem",
  outline: "none",
};
