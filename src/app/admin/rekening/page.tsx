"use client";

import React, { useState, useEffect } from "react";

interface BankItem {
  id: number;
  bank: string;
  account_number: string;
  account_name: string;
  logo: string;
}

export default function AdminRekeningPage() {
  const [banks, setBanks] = useState<BankItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const fetchBanks = async () => {
    try {
      const res = await fetch("/api/settings");
      const data = await res.json();
      if (data.success && Array.isArray(data.data.bankAccounts)) {
        setBanks(data.data.bankAccounts);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleAddBank = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const res = await fetch("/api/admin/bank-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bank,
          account_number: accountNumber,
          account_name: accountName,
          logo: bank,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Rekening berhasil ditambahkan!" });
        setBank("");
        setAccountNumber("");
        setAccountName("");
        fetchBanks();
      } else {
        setMessage({ type: "error", text: data.message || "Gagal menambah rekening." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan: " + (err as Error).message });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus rekening ini?")) return;

    try {
      const res = await fetch(`/api/admin/bank-accounts?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setMessage({ type: "success", text: "Rekening berhasil dihapus." });
        fetchBanks();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Gagal menghapus: " + (err as Error).message });
    }
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#111827", margin: 0 }}>
          Amplop &amp; Rekening Bank
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#6B7280", margin: "0.25rem 0 0" }}>
          Kelola daftar rekening bank / e-wallet untuk fitur amplop digital.
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

      {/* ADD BANK FORM */}
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
          Tambah Rekening Baru
        </h2>

        <form onSubmit={handleAddBank} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Nama Bank / E-Wallet (BCA, Mandiri, DANA)</label>
              <input type="text" value={bank} onChange={(e) => setBank(e.target.value)} placeholder="BCA..." required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nomor Rekening</label>
              <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="8980840400..." required style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Atas Nama Pemilik</label>
              <input type="text" value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="Dita Indah Cahyani..." required style={inputStyle} />
            </div>
          </div>

          <button
            type="submit"
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
            Tambah Rekening
          </button>
        </form>
      </div>

      {/* BANK ACCOUNTS LIST */}
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
          Daftar Rekening ({banks.length})
        </h2>

        {loading ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>Memuat rekening...</p>
        ) : banks.length === 0 ? (
          <p style={{ color: "#9CA3AF", fontSize: "0.85rem" }}>Belum ada rekening terdaftar.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.25rem" }}>
            {banks.map((b) => (
              <div
                key={b.id}
                style={{
                  padding: "1.25rem",
                  background: "#F9FAFB",
                  borderRadius: 12,
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111827" }}>{b.bank}</span>
                    <span style={{ fontSize: "0.7rem", color: "#6B7280" }}>Bank Transfer</span>
                  </div>
                  <p style={{ fontFamily: "monospace", fontSize: "1.25rem", fontWeight: 700, color: "#111827", margin: "0.25rem 0" }}>
                    {b.account_number}
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "#4B5563", margin: 0 }}>a.n. {b.account_name}</p>
                </div>

                <button
                  onClick={() => handleDelete(b.id)}
                  style={{
                    marginTop: "1rem",
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
                  Hapus Rekening
                </button>
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
