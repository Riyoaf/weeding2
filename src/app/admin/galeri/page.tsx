"use client";

import React, { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  title: string;
  subtitle: string;
  image_url: string;
  is_featured: boolean;
  display_order: number;
}

export default function AdminGaleriPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState(0);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && Array.isArray(data.data.galleryItems)) {
        setItems(data.data.galleryItems);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
        setImageUrl(data.url);
        setMessage({ type: "success", text: "Foto berhasil diunggah langsung dari komputer!" });
      } else {
        setMessage({ type: "error", text: data.message || "Gagal mengunggah foto." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan upload: " + (err as Error).message });
    } finally {
      setUploading(false);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      setMessage({ type: "error", text: "Silakan unggah foto atau masukan URL foto terlebih dahulu." });
      return;
    }

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          subtitle,
          image_url: imageUrl,
          is_featured: isFeatured,
          display_order: Number(displayOrder),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Foto galeri berhasil ditambahkan!" });
        setTitle("");
        setSubtitle("");
        setImageUrl("");
        setIsFeatured(false);
        fetchGallery();
      } else {
        setMessage({ type: "error", text: data.message || "Gagal menambah foto." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan: " + (err as Error).message });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto ini?")) return;

    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Foto galeri berhasil dihapus." });
        fetchGallery();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Gagal menghapus: " + (err as Error).message });
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Kelola Galeri Foto Bahagia
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Unggah foto fisik langsung dari komputer atau atur foto utama (featured) galeri.
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

      {/* ADD NEW PHOTO FORM */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          marginBottom: "1.75rem",
        }}
      >
        <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111827", marginTop: 0, marginBottom: "1.25rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
          Tambah Foto Baru
        </h2>

        <form onSubmit={handleAddPhoto} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Label / Catatan Foto (Opsional)</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Catatan internal (opsional)..." style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Keterangan Tambahan (Opsional)</label>
              <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Keterangan (opsional)..." style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#111827", display: "block", marginBottom: "0.4rem" }}>
              Unggah File Foto dari Komputer
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{
                width: "100%",
                padding: "0.65rem 0.85rem",
                background: "#F9FAFB",
                border: "1px dashed #D1D5DB",
                borderRadius: 8,
                fontSize: "0.85rem",
                color: "#374151",
                cursor: "pointer",
              }}
            />
            {uploading && <p style={{ color: "#2563EB", fontSize: "0.8rem", marginTop: "0.35rem" }}>Mengunggah foto...</p>}
          </div>

          <div>
            <label style={labelStyle}>URL Foto (terisi otomatis setelah unggah file)</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="/uploads/nama_foto.jpg atau URL..." style={inputStyle} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              style={{ width: 16, height: 16, cursor: "pointer" }}
            />
            <label htmlFor="isFeatured" style={{ fontSize: "0.85rem", color: "#374151", cursor: "pointer", fontWeight: 500 }}>
              Jadikan Foto Utama (Featured) Besar di Atas
            </label>
          </div>

          <button
            type="submit"
            disabled={uploading}
            style={{
              padding: "0.75rem 1.5rem",
              background: "#111827",
              color: "#FFFFFF",
              border: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: "0.88rem",
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
          >
            Tambah ke Galeri
          </button>
        </form>
      </div>

      {/* GALLERY ITEMS GRID */}
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
          Daftar Foto ({items.length})
        </h2>

        {loading ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>Memuat foto...</p>
        ) : items.length === 0 ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>Belum ada foto di galeri.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  background: "#FFFFFF",
                  border: item.is_featured ? "2px solid #2563EB" : "1px solid #E5E7EB",
                  borderRadius: 12,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                {item.is_featured && (
                  <span
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      background: "#111827",
                      color: "#FFFFFF",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.5rem",
                      borderRadius: 4,
                      zIndex: 2,
                    }}
                  >
                    FOTO UTAMA
                  </span>
                )}
                <img src={item.image_url} alt={item.title} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                <div style={{ padding: "0.85rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem", color: "#111827" }}>{item.title}</p>
                    {item.subtitle && <p style={{ margin: 0, fontSize: "0.75rem", color: "#6B7280" }}>{item.subtitle}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      marginTop: "0.75rem",
                      background: "#FFFFFF",
                      color: "#DC2626",
                      border: "1px solid #FCA5A5",
                      borderRadius: 6,
                      padding: "0.35rem 0.5rem",
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Hapus Foto
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
