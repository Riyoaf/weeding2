// ============================================================
// WEDDING DATA — Dita & Bagus
// Edit file ini untuk mengubah konten undangan
// ============================================================

export const weddingData = {
  // --- PASANGAN ---
  groom: {
    name: "Sherly",
    fullName: "Sherly Virdayana",
    parentOf: "Putri dari Bapak Sarjono & Ibu Hariyanti Astutik",
  },
  bride: {
    name: "Dimas",
    fullName: "Dimas Rama Ardianto",
    parentOf: "Putra dari Bapak Alfan Maharto & Ibu Hartatik",
  },

  // --- TANGGAL & WAKTU ---
  akad: {
    date: "2026-10-16", // Format: YYYY-MM-DD
    displayDate: "16 Oktober 2026",
    displayDay: "Jumat",
    time: "15.00 WIB",
    label: "Akad Nikah",
  },
  resepsi: {
    date: "2026-10-16",
    displayDate: "16 Oktober 2026",
    displayDay: "Jumat",
    time: "15.00 WIB",
    label: "Resepsi Pernikahan",
  },

  // --- VENUE ---
  venue: {
    name: "Kediaman Mempelai Wanita",
    address: "Tanjungrejo, RT/RW 01/04, Sembulung, Cluring",
    lat: -8.454732810178411,
    lng: 114.21402893606697,
    googleMapsUrl: "https://maps.app.goo.gl/kV8LAuR6sCvYA5a37",
  },

  // --- AMPLOP DIGITAL ---
  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "8980811710",
      accountName: "sherly virdayana",
      logo: "BCA",
    },
  ],

  // --- QUOTE PENUTUP ---
  closingQuote: {
    text: "Berikanlah maskawin kepada wanita (yang kamu nikahi) sebagai pemberian dengan penuh kerelaan. Kemudian jika mereka menyerahkan kepada kamu sebagian dari maskawin itu dengan senang hati, maka makanlah (ambillah) pemberian itu (sebagai makanan) yang sedap lagi baik akibatnya.",
    source: "QS. An Nisa: 4",
  },

  // --- COUNTDOWN TARGET (sama dengan tanggal akad) ---
  countdownTarget: "2026-10-16T15:00:00",
};

export type WeddingData = typeof weddingData;
