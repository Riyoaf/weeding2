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
    label: "Pawiwahan",
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
    text:
      "\"Anyonyasyawyabhicaro, Bhawedamaranantikah.\nEsa dharmah samasena, Jneyah stripumsayoh parah.\"\n\nHendaknya hubungan suami-isteri dilandasi oleh kesetiaan dan berlangsung hingga selamanya. Singkatnya kesetiaanlah yang menjadi hukum yang tertinggi dalam membina keharmonisan sebuah keluarga.",
    source: "Weda Smrthi : IX.101",
  },

  // --- COUNTDOWN TARGET (sama dengan tanggal akad) ---
  countdownTarget: "2026-10-16T15:00:00",
};

export type WeddingData = typeof weddingData;
