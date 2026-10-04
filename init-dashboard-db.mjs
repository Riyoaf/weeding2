import { neon } from "@neondatabase/serverless";
import fs from "fs";

let dbUrl = process.env.DATABASE_URL;

if (!dbUrl && fs.existsSync(".env.local")) {
  const envText = fs.readFileSync(".env.local", "utf8");
  const match = envText.match(/^DATABASE_URL=(.*)$/m);
  if (match) {
    dbUrl = match[1].trim();
  }
}

if (!dbUrl) {
  console.error("DATABASE_URL not found in environment or .env.local!");
  process.exit(1);
}

const sql = neon(dbUrl);

async function initDashboardDb() {
  console.log("Initializing Neon Postgres tables for Admin Dashboard...");

  try {
    // 1. Table for General Wedding Settings (Groom, Bride, Akad, Resepsi, Venue, Quote, Music)
    await sql`
      CREATE TABLE IF NOT EXISTS wedding_settings (
        id INT PRIMARY KEY DEFAULT 1,
        groom_name TEXT NOT NULL,
        groom_full_name TEXT NOT NULL,
        groom_parent_of TEXT NOT NULL,
        bride_name TEXT NOT NULL,
        bride_full_name TEXT NOT NULL,
        bride_parent_of TEXT NOT NULL,
        akad_date TEXT NOT NULL,
        akad_display_date TEXT NOT NULL,
        akad_display_day TEXT NOT NULL,
        akad_time TEXT NOT NULL,
        akad_label TEXT NOT NULL,
        resepsi_date TEXT NOT NULL,
        resepsi_display_date TEXT NOT NULL,
        resepsi_display_day TEXT NOT NULL,
        resepsi_time TEXT NOT NULL,
        resepsi_label TEXT NOT NULL,
        venue_name TEXT NOT NULL,
        venue_address TEXT NOT NULL,
        venue_lat DOUBLE PRECISION NOT NULL,
        venue_lng DOUBLE PRECISION NOT NULL,
        google_maps_url TEXT NOT NULL,
        closing_quote_text TEXT NOT NULL,
        closing_quote_source TEXT NOT NULL,
        music_url TEXT NOT NULL DEFAULT '/kusuma_jaya.mp3',
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log("Table 'wedding_settings' created/verified.");

    // Seed initial settings if table is empty
    const settingsCount = await sql`SELECT COUNT(*) FROM wedding_settings`;
    if (parseInt(settingsCount[0].count) === 0) {
      await sql`
        INSERT INTO wedding_settings (
          id, groom_name, groom_full_name, groom_parent_of,
          bride_name, bride_full_name, bride_parent_of,
          akad_date, akad_display_date, akad_display_day, akad_time, akad_label,
          resepsi_date, resepsi_display_date, resepsi_display_day, resepsi_time, resepsi_label,
          venue_name, venue_address, venue_lat, venue_lng, google_maps_url,
          closing_quote_text, closing_quote_source, music_url
        ) VALUES (
          1, 'Bagus', 'Bagus Purnama', 'Putra dari Bapak Abdullah & Ibu Tumini Utami',
          'Dita', 'Dita Indah Cahyani', 'Putri dari Bapak Maliki & Ibu Alm. Mulyani',
          '2026-09-12', '12 September 2026', 'Sabtu', '10.00 WIB', 'Akad Nikah',
          '2026-09-12', '12 September 2026', 'Sabtu', '15.00 WIB', 'Resepsi Pernikahan',
          'Kolam Pemancingan Panorama', 'Gang Kelinci, Dusun Karajan, Rt04/Rw02, Desa Cluring , Kec. Cluring',
          -8.432554547542662, 114.21325058263719, 'https://maps.app.goo.gl/G2Ms2BDwSWHZQSpH8',
          'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang.',
          'QS. Ar-Rum: 21', '/kusuma_jaya.mp3'
        );
      `;
      console.log("Initial 'wedding_settings' data seeded.");
    }

    // 2. Table for Bank Accounts
    await sql`
      CREATE TABLE IF NOT EXISTS bank_accounts (
        id SERIAL PRIMARY KEY,
        bank TEXT NOT NULL,
        account_number TEXT NOT NULL,
        account_name TEXT NOT NULL,
        logo TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log("Table 'bank_accounts' created/verified.");

    const bankCount = await sql`SELECT COUNT(*) FROM bank_accounts`;
    if (parseInt(bankCount[0].count) === 0) {
      await sql`
        INSERT INTO bank_accounts (bank, account_number, account_name, logo)
        VALUES ('BCA', '8980840400', 'Dita Indah Cahyani', 'BCA')
      `;
      console.log("Initial 'bank_accounts' data seeded.");
    }

    // 3. Table for Gallery Items
    await sql`
      CREATE TABLE IF NOT EXISTS gallery_items (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT DEFAULT '',
        image_url TEXT NOT NULL,
        is_featured BOOLEAN DEFAULT FALSE,
        display_order INT DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log("Table 'gallery_items' created/verified.");

    const galleryCount = await sql`SELECT COUNT(*) FROM gallery_items`;
    if (parseInt(galleryCount[0].count) === 0) {
      await sql`
        INSERT INTO gallery_items (title, subtitle, image_url, is_featured, display_order)
        VALUES
          ('Ikatan Janji Suci', 'Kidung Kasmaran', '/dita.jpeg', TRUE, 1),
          ('Cincin Emas', 'Simbol Keabadian', '/gallery_cincin.jpg', FALSE, 2),
          ('Ronce Melati', 'Wanginya Doa Restu', '/gallery_melati.jpg', FALSE, 3),
          ('Batik Prada', 'Lestarinya Tradisi', '/gallery_batik.jpg', FALSE, 4),
          ('Seserahan Agung', 'Tanda Kasih Sayang', '/dita 2.jpeg', FALSE, 5)
      `;
      console.log("Initial 'gallery_items' data seeded.");
    }

    console.log("SUCCESS: All dashboard database tables initialized and seeded!");
  } catch (err) {
    console.error("ERROR initializing database tables:", err);
  }
}

initDashboardDb();
