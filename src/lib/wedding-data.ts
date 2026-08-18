// ============================================================
// WEDDING DATA — Dita & Bagus
// Edit file ini untuk mengubah konten undangan
// ============================================================

export const weddingData = {
  // --- PASANGAN ---
  groom: {
    name: "Bagus",
    fullName: "Bagus Purnama",
    parentOf: "Putra dari Bapak Abdullah & Ibu Tumini Utami",
  },
  bride: {
    name: "Dita",
    fullName: "Dita Indah Cahyani",
    parentOf: "Putri dari Bapak Maliki & Ibu Alm. Mulyani",
  },

  // --- TANGGAL & WAKTU ---
  akad: {
    date: "2026-09-12", // Format: YYYY-MM-DD
    displayDate: "12 September 2026",
    displayDay: "Sabtu",
    time: "10.00 WIB",
    label: "Akad Nikah",
  },
  resepsi: {
    date: "2026-09-12",
    displayDate: "12 September 2026",
    displayDay: "Sabtu",
    time: "15.00 WIB",
    label: "Resepsi Pernikahan",
  },

  // --- VENUE ---
  venue: {
    name: "Kolam Pemancingan Panorama",
    address: "Gang Kelinci, Dusun Karajan, Rt04/Rw02, Desa Cluring , Kec. Cluring",
    lat: -8.432554547542662,
    lng: 114.21325058263719,
    googleMapsUrl: "https://maps.app.goo.gl/G2Ms2BDwSWHZQSpH8",
  },

  // --- AMPLOP DIGITAL ---
  bankAccounts: [
    {
      bank: "BCA",
      accountNumber: "8980840400",
      accountName: "Dita Indah Cahyani",
      logo: "BCA",
    }
    // {
    //   bank: "Mandiri",
    //   accountNumber: "0987654321",
    //   accountName: "Bagus Prasetyo",
    //   logo: "Mandiri",
    // },
  ],

  // --- QUOTE PENUTUP ---
  closingQuote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.",
    source: "QS. Ar-Rum: 21",
  },

  // --- COUNTDOWN TARGET (sama dengan tanggal akad) ---
  countdownTarget: "2026-09-12T10:00:00",
};

export type WeddingData = typeof weddingData;
