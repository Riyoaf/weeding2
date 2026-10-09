"use client";

import React, { useState, useEffect } from "react";

export default function AdminPengaturanPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    music_url: "/kusuma_jaya.mp3",
    music_start_second: 0,
    closing_quote_text: "",
    closing_quote_source: "",
    closing_photo_url: "/dita.jpeg",
  });

  const previewAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const [settingsFull, setSettingsFull] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.settings) {
          setSettingsFull(data.data.settings);
          setForm({
            music_url: data.data.settings.music_url || "/kusuma_jaya.mp3",
            music_start_second: parseInt(data.data.settings.music_start_second, 10) || 0,
            closing_quote_text: data.data.settings.closing_quote_text || "",
            closing_quote_source: data.data.settings.closing_quote_source || "",
            closing_photo_url: data.data.settings.closing_photo_url || "/dita.jpeg",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const minutes = Math.floor((form.music_start_second || 0) / 60);
  const seconds = (form.music_start_second || 0) % 60;

  const handleTimeChange = (newMin: number, newSec: number) => {
    const safeMin = Math.max(0, newMin);
    const safeSec = Math.max(0, Math.min(59, newSec));
    const total = safeMin * 60 + safeSec;
    setForm((prev) => ({ ...prev, music_start_second: total }));
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleGrabCurrentTime = () => {
    if (previewAudioRef.current) {
      const current = Math.floor(previewAudioRef.current.currentTime || 0);
      setForm((prev) => ({ ...prev, music_start_second: current }));
      setMessage({
        type: "success",
        text: `Waktu mulai musik diatur ke menit ${formatTime(current)} (${current} detik)!`,
      });
    }
  };

  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  const handleAudioLoadedMetadata = () => {
    if (previewAudioRef.current && previewAudioRef.current.duration) {
      setAudioDuration(Math.floor(previewAudioRef.current.duration));
    }
  };

  const handleTestPlay = async () => {
    const audio = previewAudioRef.current;
    if (!audio) return;

    const targetSec = Math.max(0, form.music_start_second || 0);

    if (audio.duration && targetSec >= audio.duration) {
      setMessage({
        type: "error",
        text: `Waktu mulai (${formatTime(targetSec)}) melebihi durasi lagu (${formatTime(Math.floor(audio.duration))})! Silakan pilih menit yang lebih awal.`,
      });
      return;
    }

    try {
      await audio.play();

      if (targetSec > 0) {
        if (audio.readyState >= 1) {
          audio.currentTime = targetSec;
        } else {
          const onMetadata = () => {
            audio.removeEventListener("loadedmetadata", onMetadata);
            try {
              audio.currentTime = targetSec;
            } catch (_) {}
          };
          audio.addEventListener("loadedmetadata", onMetadata, { once: true });
        }
      } else {
        audio.currentTime = 0;
      }
    } catch (err) {
      if ((err as Error)?.name === "AbortError") {
        return;
      }
      console.error("Playback error:", err);
      setMessage({
        type: "error",
        text: "Gagal memutar audio: " + ((err as Error).message || "Periksa file audio Anda."),
      });
    }
  };

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
        setForm((prev) => ({ ...prev, music_url: data.url }));
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

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
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
        setForm((prev) => ({ ...prev, closing_photo_url: data.url }));
        setMessage({ type: "success", text: "Foto penutup berhasil diunggah!" });
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengunggah foto." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan upload foto: " + (err as Error).message });
    } finally {
      setUploadingPhoto(false);
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
        music_start_second: Number(form.music_start_second) || 0,
        closing_quote_text: form.closing_quote_text,
        closing_quote_source: form.closing_quote_source,
        closing_photo_url: form.closing_photo_url,
      };

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Pengaturan Musik, Kutipan & Foto Penutup Berhasil Diperbarui!" });
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
          Pengaturan Musik, Kutipan &amp; Foto Penutup
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Unggah file musik latar (.mp3), sesuaikan teks ayat/kutipan, serta ganti foto mempelai di bagian penutup undangan.
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
        {/* CLOSING PHOTO SECTION */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
            <div>
              <h2
                style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "#111827",
                  margin: 0,
                }}
              >
                Foto Penutup Undangan (Closing Photo)
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#6B7280", margin: "0.2rem 0 0" }}>
                Foto ini tampil di halaman penutup undangan dengan bingkai lengkung di bawah nama mempelai &amp; di atas tanggal acara.
              </p>
            </div>
            <span
              style={{
                fontSize: "0.72rem",
                padding: "0.25rem 0.65rem",
                borderRadius: 999,
                background: "#FEF3C7",
                color: "#92400E",
                fontWeight: 600,
              }}
            >
              Halaman Penutup
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", alignItems: "center" }}>
            {/* Upload & URL Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Unggah Foto Penutup Baru</label>
                <div
                  style={{
                    border: "2px dashed #D1D5DB",
                    borderRadius: 10,
                    padding: "1.5rem",
                    textAlign: "center",
                    background: "#F9FAFB",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: "none" }}
                    id="closing-photo-upload"
                  />
                  <label htmlFor="closing-photo-upload" style={{ cursor: "pointer", display: "block" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={{ margin: "0 auto 0.5rem" }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", margin: 0 }}>
                      Klik untuk memilih foto dari galeri / file
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", margin: "0.25rem 0 0" }}>
                      Format: JPG, PNG, WEBP (Rekomendasi rasio portrait/vertikal)
                    </p>
                  </label>
                </div>
                {uploadingPhoto && (
                  <p style={{ color: "#2563EB", fontSize: "0.8rem", marginTop: "0.5rem", fontWeight: 500 }}>
                    Mengunggah foto...
                  </p>
                )}
              </div>

              <div>
                <label style={labelStyle}>Path / URL Direct Foto</label>
                <input
                  type="text"
                  value={form.closing_photo_url}
                  onChange={(e) => setForm({ ...form, closing_photo_url: e.target.value })}
                  style={inputStyle}
                  placeholder="/dita.jpeg atau URL https://..."
                />
              </div>
            </div>

            {/* Live Arched Preview */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FDFCFB", padding: "1.25rem", borderRadius: 12, border: "1px solid #F3F4F6" }}>
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6B7280", margin: "0 0 0.75rem" }}>
                Pratinjau Tampilan Bingkai Penutup:
              </p>
              <div style={{ position: "relative", width: 140, marginBottom: "0.5rem" }}>
                <div
                  style={{
                    width: 140,
                    height: 180,
                    borderRadius: "90px 90px 14px 14px",
                    overflow: "hidden",
                    border: "4px solid #FFFFFF",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                    background: "#E5E7EB",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {form.closing_photo_url ? (
                    <img
                      src={form.closing_photo_url}
                      alt="Pratinjau Foto Penutup"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 25%" }}
                    />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#9CA3AF", fontSize: "0.75rem" }}>
                      Belum ada foto
                    </div>
                  )}
                </div>

                {/* Wayang frame in preview */}
                <img
                  src="/wayang_frame.png"
                  alt="Wayang Frame"
                  style={{
                    position: "absolute",
                    bottom: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 170,
                    height: "auto",
                    zIndex: 2,
                    pointerEvents: "none",
                    filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
                  }}
                />
              </div>
              <p style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "0.9rem", textAlign: "center" }}>
                Bingkai melengkung (arch) elegan dengan hiasan ornamen wayang
              </p>
            </div>
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

            {/* START TIME SECTION */}
            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: 10,
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <label style={{ ...labelStyle, marginBottom: "0.2rem" }}>
                    Waktu Mulai Putar Musik (Menit &amp; Detik)
                  </label>
                  <p style={{ fontSize: "0.8rem", color: "#64748B", margin: 0 }}>
                    Tentukan dari menit keberapa musik mulai diputar saat tamu membuka undangan (misal: langsung ke bagian reff / intro favorit).
                  </p>
                </div>
                <div
                  style={{
                    background: "#EEF2F6",
                    border: "1px solid #CBD5E1",
                    borderRadius: 6,
                    padding: "0.3rem 0.65rem",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    fontFamily: "monospace",
                  }}
                >
                  Mulai: {formatTime(form.music_start_second || 0)} ({form.music_start_second || 0}s)
                </div>
              </div>

              {/* Minute & Second Inputs */}
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>Menit:</label>
                  <input
                    type="number"
                    min={0}
                    max={60}
                    value={minutes}
                    onChange={(e) => handleTimeChange(parseInt(e.target.value, 10) || 0, seconds)}
                    style={{
                      ...inputStyle,
                      width: 75,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  />
                </div>

                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#94A3B8" }}>:</span>

                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#334155" }}>Detik:</label>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={seconds}
                    onChange={(e) => handleTimeChange(minutes, parseInt(e.target.value, 10) || 0)}
                    style={{
                      ...inputStyle,
                      width: 75,
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  />
                </div>

                {/* Quick Presets */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginLeft: "auto", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748B" }}>Pintasan:</span>
                  {[
                    { label: "00:00 (Awal)", sec: 0 },
                    { label: "00:30", sec: 30 },
                    { label: "01:00", sec: 60 },
                    { label: "01:30", sec: 90 },
                    { label: "02:00", sec: 120 },
                  ].map((p) => (
                    <button
                      key={p.sec}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, music_start_second: p.sec }))}
                      style={{
                        padding: "0.25rem 0.55rem",
                        background: form.music_start_second === p.sec ? "#0F172A" : "#FFFFFF",
                        color: form.music_start_second === p.sec ? "#FFFFFF" : "#334155",
                        border: "1px solid #CBD5E1",
                        borderRadius: 5,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Audio Preview Player with Grab & Test Play Controls */}
            {form.music_url && (
              <div style={{ marginTop: "0.25rem", padding: "1.1rem", background: "#F3F4F6", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151", margin: 0 }}>
                      Pratinjau Pemutar Audio:
                    </p>
                    {audioDuration !== null && (
                      <span style={{ fontSize: "0.75rem", color: "#475569", background: "#E2E8F0", padding: "2px 8px", borderRadius: 4, fontWeight: 600 }}>
                        Durasi: {formatTime(audioDuration)}
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      type="button"
                      onClick={handleGrabCurrentTime}
                      title="Ambil detik audio yang sedang diputar"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.35rem 0.75rem",
                        background: "#FFFFFF",
                        border: "1px solid #CBD5E1",
                        borderRadius: 6,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#0F172A",
                        cursor: "pointer",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Ambil dari Posisi Putar
                    </button>

                    <button
                      type="button"
                      onClick={handleTestPlay}
                      title="Dengarkan mulai dari menit yang dipilih"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.35rem",
                        padding: "0.35rem 0.75rem",
                        background: "#0F172A",
                        border: "none",
                        borderRadius: 6,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#FFFFFF",
                        cursor: "pointer",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      Uji Putar dari {formatTime(form.music_start_second || 0)}
                    </button>
                  </div>
                </div>
                <audio
                  ref={previewAudioRef}
                  controls
                  src={`/api/music?file=${encodeURIComponent(form.music_url)}`}
                  preload="none"
                  onLoadedMetadata={handleAudioLoadedMetadata}
                  style={{ width: "100%", height: 38 }}
                />
              </div>
            )}
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
