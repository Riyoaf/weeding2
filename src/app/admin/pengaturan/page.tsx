"use client";

import React, { useState, useEffect } from "react";

export default function AdminPengaturanPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    music_url: "/kusuma_jaya.mp3",
    closing_quote_text: "",
    closing_quote_source: "",
  });

  const [settingsFull, setSettingsFull] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.settings) {
          setSettingsFull(data.data.settings);
          setForm({
            music_url: data.data.settings.music_url || "/kusuma_jaya.mp3",
            closing_quote_text: data.data.settings.closing_quote_text || "",
            closing_quote_source: data.data.settings.closing_quote_source || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setForm({ ...form, music_url: data.url });
        setMessage({ type: "success", text: "File musik (.mp3) berhasil diunggah!" });
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengunggah file musik." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan upload: " + (err as Error).message });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const updatedData = {
        ...settingsFull,
        music_url: form.music_url,
        closing_quote_text: form.closing_quote_text,
        closing_quote_source: form.closing_quote_source,
      };

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Pengaturan Musik & Kutipan Berhasil Diperbarui!" });
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
    return <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>Memuat pengaturan musik &amp; quote...</p>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Pengaturan Musik &amp; Kutipan
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Unggah file audio latar (.mp3) atau sesuaikan teks ayat/mutiara kata penutup undangan.
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

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* MUSIC SECTION */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#111827",
              marginTop: 0,
              marginBottom: "1.25rem",
              borderBottom: "1px solid #F3F4F6",
              paddingBottom: "0.75rem",
            }}
          >
            Musik Latar Undangan (.mp3)
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Unggah File Audio Musik (.mp3)</label>
              <div
                style={{
                  border: "2px dashed #D1D5DB",
                  borderRadius: 10,
                  padding: "1.5rem",
                  textAlign: "center",
                  background: "#F9FAFB",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  style={{ display: "none" }}
                  id="music-upload"
                />
                <label htmlFor="music-upload" style={{ cursor: "pointer", display: "block" }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={{ margin: "0 auto 0.5rem" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 .895-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", margin: 0 }}>
                    Klik untuk memilih file musik .mp3 dari perangkat
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: "0.25rem 0 0" }}>
                    Format audio didukung: MP3, WAV, AAC
                  </p>
                </label>
              </div>
              {uploading && <p style={{ color: "#2563EB", fontSize: "0.8rem", marginTop: "0.5rem", fontWeight: 500 }}>Mengunggah musik...</p>}
            </div>

            <div>
              <label style={labelStyle}>Path / URL Direct File Musik</label>
              <input
                type="text"
                value={form.music_url}
                onChange={(e) => setForm({ ...form, music_url: e.target.value })}
                style={inputStyle}
                placeholder="/kusuma_jaya.mp3"
              />
            </div>

            {/* Audio Preview Player */}
            {form.music_url && (
              <div style={{ marginTop: "0.25rem", padding: "1rem", background: "#F3F4F6", borderRadius: 10 }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#4B5563", margin: "0 0 0.5rem" }}>
                  Pratinjau Pemutar Audio:
                </p>
                <audio controls src={form.music_url} style={{ width: "100%", height: 38 }} />
              </div>
            )}
          </div>
        </div>

        {/* CLOSING QUOTE SECTION */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <h2
            style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#111827",
              marginTop: 0,
              marginBottom: "1.25rem",
              borderBottom: "1px solid #F3F4F6",
              paddingBottom: "0.75rem",
            }}
          >
            Kutipan Pernikahan (Closing Quote)
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Teks Kutipan / Ayat Al-Qur&apos;an</label>
              <textarea
                value={form.closing_quote_text}
                onChange={(e) => setForm({ ...form, closing_quote_text: e.target.value })}
                rows={4}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
              />
            </div>

            <div>
              <label style={labelStyle}>Sumber Kutipan / Keterangan Ayat</label>
              <input
                type="text"
                value={form.closing_quote_source}
                onChange={(e) => setForm({ ...form, closing_quote_source: e.target.value })}
                style={inputStyle}
                placeholder="QS. Ar-Rum: 21"
              />
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
          {saving ? "Menyimpan..." : "Simpan Pengaturan"}
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
