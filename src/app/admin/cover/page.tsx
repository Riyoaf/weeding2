"use client";

import React, { useState, useEffect } from "react";

export default function AdminCoverPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [form, setForm] = useState({
    cover_photo_url: "/uploads/mempelai_sherly_1791473986141.jpeg",
    cover_badge_text: "Pernikahan dari",
    cover_couple_name: "Sherly & Dimas",
    groom_name: "Dimas",
    bride_name: "Sherly",
    cover_date_text: "Jumat, 16 Oktober 2026",
    cover_bg_url: "/uploads/latar_1791136432133.png",
  });

  const [settingsFull, setSettingsFull] = useState<any>({});

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data?.settings) {
          const s = data.data.settings;
          setSettingsFull(s);

          let groom = s.groom_name;
          let bride = s.bride_name;
          if ((!groom || !bride) && s.cover_couple_name) {
            const parts = s.cover_couple_name.split(/&|dan|\+/i).map((p: string) => p.trim());
            if (parts.length >= 2) {
              groom = groom || parts[0];
              bride = bride || parts[1];
            }
          }

          setForm({
            cover_photo_url: s.cover_photo_url || "/uploads/mempelai_sherly_1791473986141.jpeg",
            cover_badge_text: s.cover_badge_text || "Pernikahan dari",
            cover_couple_name: s.cover_couple_name || (groom && bride ? `${groom} & ${bride}` : "Sherly & Dimas"),
            groom_name: groom || "Dimas",
            bride_name: bride || "Sherly",
            cover_date_text: s.cover_date_text || (s.akad_display_day && s.akad_display_date ? `${s.akad_display_day}, ${s.akad_display_date}` : "Jumat, 16 Oktober 2026"),
            cover_bg_url: s.cover_bg_url || "/uploads/latar_1791136432133.png",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCoverCoupleNameChange = (val: string) => {
    const parts = val.split(/&|dan|\+/i).map((p: string) => p.trim());
    if (parts.length >= 2 && parts[0] && parts[1]) {
      setForm((prev) => ({
        ...prev,
        cover_couple_name: val,
        groom_name: parts[0],
        bride_name: parts[1],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        cover_couple_name: val,
      }));
    }
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "cover_photo_url" | "cover_bg_url",
    setUploading: (val: boolean) => void
  ) => {
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
        setForm((prev) => ({ ...prev, [field]: data.url }));
        setMessage({ type: "success", text: "File berhasil diunggah langsung dari komputer!" });
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengunggah file." });
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
        cover_photo_url: form.cover_photo_url,
        cover_badge_text: form.cover_badge_text,
        cover_couple_name: form.cover_couple_name,
        groom_name: form.groom_name,
        bride_name: form.bride_name,
        cover_date_text: form.cover_date_text,
        cover_bg_url: form.cover_bg_url,
      };

      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Pengaturan Cover & Nama Halaman Utama Berhasil Disimpan!" });
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
    return <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>Memuat pengaturan cover...</p>;
  }

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Cover Depan Undangan
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Sesuaikan teks judul, nama pasangan pengantin, tanggal acara, serta foto profil pada layar pembuka (Opening Cover).
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

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "1.75rem", alignItems: "start" }}>
        {/* FORM SETTINGS */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Card 1: Foto Profil & Background Cover */}
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
              Foto Profil Cover
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Unggah File Foto Cover dari Komputer</label>
                <div
                  style={{
                    border: "2px dashed #D1D5DB",
                    borderRadius: 10,
                    padding: "1.25rem",
                    textAlign: "center",
                    background: "#F9FAFB",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "cover_photo_url", setUploadingPhoto)}
                    style={{ display: "none" }}
                    id="cover-photo-upload"
                  />
                  <label htmlFor="cover-photo-upload" style={{ cursor: "pointer", display: "block" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" style={{ margin: "0 auto 0.4rem" }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#374151", margin: 0 }}>
                      Pilih foto profil cover dari perangkat
                    </p>
                    <p style={{ fontSize: "0.72rem", color: "#9CA3AF", margin: "0.2rem 0 0" }}>
                      Format didukung: JPG, PNG, WEBP (disarankan rasio 1:1 persegi)
                    </p>
                  </label>
                </div>
                {uploadingPhoto && <p style={{ color: "#2563EB", fontSize: "0.8rem", marginTop: "0.4rem", fontWeight: 500 }}>Mengunggah foto...</p>}
              </div>

              <div>
                <label style={labelStyle}>URL Foto Cover (otomatis terisi saat upload)</label>
                <input
                  type="text"
                  value={form.cover_photo_url}
                  onChange={(e) => setForm({ ...form, cover_photo_url: e.target.value })}
                  style={inputStyle}
                  placeholder="/dita 2.jpeg"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Teks & Tanggal Cover */}
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
              Teks &amp; Tanggal Cover
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Teks Label Atas (Badge)</label>
                <input
                  type="text"
                  value={form.cover_badge_text}
                  onChange={(e) => setForm({ ...form, cover_badge_text: e.target.value })}
                  style={inputStyle}
                  placeholder="Pernikahan dari"
                />
              </div>

              <div>
                <label style={labelStyle}>Nama Pasangan di Cover</label>
                <input
                  type="text"
                  value={form.cover_couple_name}
                  onChange={(e) => handleCoverCoupleNameChange(e.target.value)}
                  style={inputStyle}
                  placeholder="Sherly & Dimas"
                />
                <span style={{ fontSize: "0.72rem", color: "#9CA3AF", marginTop: "0.25rem", display: "block" }}>
                  Tampil pada layar pembuka (Cover). Mengetik &quot;NamaPria &amp; NamaWanita&quot; otomatis mengisi nama di bawah.
                </span>
              </div>

              {/* SINKRONISASI NAMA HALAMAN PALING ATAS (HERO SECTION) */}
              <div
                style={{
                  background: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: 10,
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700, color: "#111827" }}>
                      Nama di Halaman Paling Atas (Hero Section)
                    </h3>
                    <p style={{ margin: "0.15rem 0 0", fontSize: "0.72rem", color: "#6B7280" }}>
                      Nama yang tampil besar saat cover dibuka (&quot;The Wedding of ... &amp; ...&quot;).
                    </p>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.75rem" }}>Nama Pengantin Pria (Atas)</label>
                    <input
                      type="text"
                      value={form.groom_name}
                      onChange={(e) => setForm({ ...form, groom_name: e.target.value })}
                      style={{ ...inputStyle, background: "#FFFFFF" }}
                      placeholder="Dimas"
                    />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, fontSize: "0.75rem" }}>Nama Pengantin Wanita (Bawah)</label>
                    <input
                      type="text"
                      value={form.bride_name}
                      onChange={(e) => setForm({ ...form, bride_name: e.target.value })}
                      style={{ ...inputStyle, background: "#FFFFFF" }}
                      placeholder="Sherly"
                    />
                  </div>
                </div>

                {/* Mini Preview Box */}
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: 8,
                    padding: "0.75rem",
                    textAlign: "center",
                  }}
                >
                  <p style={{ margin: "0 0 0.25rem", fontSize: "0.62rem", color: "#C9A96E", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    THE WEDDING OF
                  </p>
                  <p style={{ margin: 0, fontSize: "1.35rem", fontFamily: "var(--font-cookie), 'Cookie', cursive", color: "#1F2937", lineHeight: 1.2 }}>
                    {form.groom_name || "Pria"}
                  </p>
                  <p style={{ margin: 0, fontSize: "1rem", fontFamily: "var(--font-cookie), 'Cookie', cursive", color: "#C9A96E", lineHeight: 1.1 }}>
                    &amp;
                  </p>
                  <p style={{ margin: 0, fontSize: "1.35rem", fontFamily: "var(--font-cookie), 'Cookie', cursive", color: "#1F2937", lineHeight: 1.2 }}>
                    {form.bride_name || "Wanita"}
                  </p>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Tanggal di Cover</label>
                <input
                  type="text"
                  value={form.cover_date_text}
                  onChange={(e) => setForm({ ...form, cover_date_text: e.target.value })}
                  style={inputStyle}
                  placeholder="Sabtu, 12 September 2026"
                />
              </div>

              <div>
                <label style={labelStyle}>Background Cover Latar (Opsional)</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={form.cover_bg_url}
                    onChange={(e) => setForm({ ...form, cover_bg_url: e.target.value })}
                    style={{ ...inputStyle, flex: 1 }}
                    placeholder="/cover-bg.jpg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "cover_bg_url", setUploadingBg)}
                    style={{ display: "none" }}
                    id="bg-upload"
                  />
                  <label
                    htmlFor="bg-upload"
                    style={{
                      padding: "0.6rem 0.9rem",
                      background: "#F3F4F6",
                      border: "1px solid #D1D5DB",
                      borderRadius: 8,
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      color: "#374151",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {uploadingBg ? "Upload..." : "Pilih File"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
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
            {saving ? "Menyimpan..." : "Simpan Cover Undangan"}
          </button>
        </form>

        {/* LIVE PREVIEW CARD */}
        <div
          style={{
            position: "sticky",
            top: "5rem",
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: 12,
            padding: "1.5rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", margin: 0 }}>
              Pratinjau Cover Depan
            </h3>
            <span style={{ fontSize: "0.72rem", color: "#6B7280", background: "#F3F4F6", padding: "0.2rem 0.5rem", borderRadius: 4 }}>
              Live Preview
            </span>
          </div>

          {/* Miniature Simulation of Opening Animation Glass Card */}
          <div
            style={{
              position: "relative",
              borderRadius: 16,
              overflow: "hidden",
              backgroundImage: `url('${form.cover_bg_url || "/cover-bg.jpg"}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "2rem 1.25rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 400,
              border: "1px solid #E5E7EB",
            }}
          >
            {/* Dark transparent overlay so background pattern/texture is visible */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.65) 65%, rgba(0, 0, 0, 0.85) 100%)" }} />

            {/* Glass Card */}
            <div
              style={{
                position: "relative",
                zIndex: 2,
                width: "100%",
                maxWidth: 280,
                padding: "1.75rem 1.25rem",
                background: "rgba(18, 18, 18, 0.72)",
                backdropFilter: "blur(16px)",
                borderRadius: 20,
                border: "1px solid rgba(212, 175, 55, 0.35)",
                boxShadow: "0 16px 36px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.1)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Badge text */}
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.62rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#E8D5A3",
                  margin: "0 0 1rem",
                }}
              >
                {form.cover_badge_text || "Pernikahan dari"}
              </p>

              {/* Photo Avatar with Wayang Frame Cradle */}
              <div
                style={{
                  position: "relative",
                  width: 155,
                  height: 130,
                  marginBottom: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                {/* Profile Photo - Lowered slightly */}
                <div
                  style={{
                    position: "relative",
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    marginTop: 10,
                    padding: 2.5,
                    background:
                      "linear-gradient(135deg, #E8D5A3 0%, #C9A96E 50%, #B8934A 100%)",
                    boxShadow: "0 0 0 1.5px rgba(18, 18, 18, 0.9), 0 6px 16px rgba(0, 0, 0, 0.6)",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={form.cover_photo_url || "/dita 2.jpeg"}
                    alt="Cover Photo"
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      objectFit: "cover",
                      objectPosition: "center 15%",
                    }}
                  />
                </div>

                {/* Wayang Frame Ornament */}
                <img
                  src="/wayang_frame.png"
                  alt="Ornamen Wayang"
                  style={{
                    position: "absolute",
                    bottom: -2,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 132,
                    height: "auto",
                    zIndex: 2,
                    pointerEvents: "none",
                    filter: "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.7))",
                  }}
                />
              </div>

              {/* Couple Name */}
              <h2
                style={{
                  fontFamily: "var(--font-cookie), 'Cookie', cursive, serif",
                  fontSize: "2.1rem",
                  fontWeight: 400,
                  color: "#E5C06E",
                  textShadow: "0 2px 10px rgba(229, 192, 110, 0.35)",
                  lineHeight: 1.1,
                  margin: "0 0 0.5rem",
                }}
              >
                {form.cover_couple_name || "Nama Pengantin"}
              </h2>

              {/* Date */}
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 500,
                  margin: "0 0 1.25rem",
                }}
              >
                {form.cover_date_text || "Tanggal Acara"}
              </p>

              {/* Simulated Button */}
              <div
                style={{
                  padding: "0.5rem 1.25rem",
                  background: "linear-gradient(135deg, #D4AF37 0%, #B8934A 100%)",
                  border: "1px solid rgba(255, 235, 170, 0.5)",
                  borderRadius: 9999,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#1c180e",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
                }}
              >
                Buka Undangan
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
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
