"use client";

import React, { useState, useEffect } from "react";

interface WishItem {
  id: number;
  name: string;
  attendance: string;
  message: string;
  created_at: string;
}

export default function AdminUcapanPage() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setWishes(data.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ucapan ini?")) return;

    try {
      const res = await fetch(`/api/wishes?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Ucapan berhasil dihapus." });
        fetchWishes();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Gagal menghapus: " + (err as Error).message });
    }
  };

  const filteredWishes = wishes.filter((w) => {
    const matchesSearch =
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.message.toLowerCase().includes(search.toLowerCase());

    if (filterAttendance === "all") return matchesSearch;
    if (filterAttendance === "hadir") return matchesSearch && w.attendance.toLowerCase() === "hadir";
    if (filterAttendance === "tidak_hadir") return matchesSearch && w.attendance.toLowerCase() !== "hadir";

    return matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1050, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Moderasi Ucapan &amp; Doa Tamu
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Pantau seluruh ucapan tamu, cari pengirim, atau hapus ucapan yang tidak pantas/spam.
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

      {/* SEARCH & FILTER BAR */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: "1rem 1.25rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          marginBottom: "1.5rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari berdasarkan nama atau pesan ucapan..."
          style={{
            flex: "1 1 260px",
            padding: "0.55rem 0.85rem",
            background: "#FFFFFF",
            border: "1px solid #D1D5DB",
            borderRadius: 8,
            fontSize: "0.85rem",
            color: "#111827",
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => setFilterAttendance("all")}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: 6,
              border: "1px solid #E5E7EB",
              background: filterAttendance === "all" ? "#111827" : "#FFFFFF",
              color: filterAttendance === "all" ? "#FFFFFF" : "#374151",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Semua ({wishes.length})
          </button>
          <button
            onClick={() => setFilterAttendance("hadir")}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: 6,
              border: "1px solid #A7F3D0",
              background: filterAttendance === "hadir" ? "#10B981" : "#FFFFFF",
              color: filterAttendance === "hadir" ? "#FFFFFF" : "#065F46",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Hadir
          </button>
          <button
            onClick={() => setFilterAttendance("tidak_hadir")}
            style={{
              padding: "0.45rem 0.85rem",
              borderRadius: 6,
              border: "1px solid #FECACA",
              background: filterAttendance === "tidak_hadir" ? "#EF4444" : "#FFFFFF",
              color: filterAttendance === "tidak_hadir" ? "#FFFFFF" : "#991B1B",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            Tidak Hadir
          </button>
        </div>
      </div>

      {/* WISHES TABLE */}
      <div
        style={{
          background: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: 12,
          padding: "1.5rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        {loading ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>Memuat ucapan...</p>
        ) : filteredWishes.length === 0 ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>Tidak ada ucapan sesuai filter.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E5E7EB", color: "#6B7280", fontSize: "0.75rem", textTransform: "uppercase" }}>
                  <th style={{ padding: "0.75rem 1rem" }}>Nama Tamu</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Pesan Ucapan</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Konfirmasi</th>
                  <th style={{ padding: "0.75rem 1rem" }}>Waktu Kirim</th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredWishes.map((w) => (
                  <tr key={w.id} style={{ borderBottom: "1px solid #F3F4F6" }}>
                    <td style={{ padding: "0.85rem 1rem", fontWeight: 600, color: "#111827", whiteSpace: "nowrap" }}>
                      {w.name}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "#374151", maxWidth: 360 }}>
                      {w.message}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", whiteSpace: "nowrap" }}>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          padding: "0.2rem 0.55rem",
                          borderRadius: 12,
                          background: w.attendance.toLowerCase() === "hadir" ? "#D1FAE5" : "#FEE2E2",
                          color: w.attendance.toLowerCase() === "hadir" ? "#065F46" : "#991B1B",
                        }}
                      >
                        {w.attendance}
                      </span>
                    </td>
                    <td style={{ padding: "0.85rem 1rem", color: "#9CA3AF", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                      {new Date(w.created_at).toLocaleString("id-ID")}
                    </td>
                    <td style={{ padding: "0.85rem 1rem", textAlign: "right" }}>
                      <button
                        onClick={() => handleDelete(w.id)}
                        style={{
                          background: "#FFFFFF",
                          color: "#DC2626",
                          border: "1px solid #FCA5A5",
                          borderRadius: 6,
                          padding: "0.35rem 0.6rem",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Hapus
                      </button>
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
