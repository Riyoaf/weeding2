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
  console.log("Initializing Neon Postgres tables for Undangan 2...");

  try {
    // 1. Table: wedding_settings
    await sql`
      CREATE TABLE IF NOT EXISTS wedding_settings (
        id INT PRIMARY KEY DEFAULT 1,
        groom_name TEXT NOT NULL DEFAULT 'Sherly',
        groom_full_name TEXT NOT NULL DEFAULT 'Sherly Virdayana',
        groom_parent_of TEXT NOT NULL DEFAULT 'Putri dari Bapak Sarjono & Ibu Hariyanti Astutik',
        bride_name TEXT NOT NULL DEFAULT 'Dimas',
        bride_full_name TEXT NOT NULL DEFAULT 'Dimas Rama Ardianto',
        bride_parent_of TEXT NOT NULL DEFAULT 'Putra dari Bapak Alfan Maharto & Ibu Hartatik',
        akad_date TEXT NOT NULL DEFAULT '2026-10-16',
        akad_display_date TEXT NOT NULL DEFAULT '16 Oktober 2026',
        akad_display_day TEXT NOT NULL DEFAULT 'Jumat',
        akad_time TEXT NOT NULL DEFAULT '15.00 WIB',
        akad_label TEXT NOT NULL DEFAULT 'Pawiwahan',
        resepsi_date TEXT NOT NULL DEFAULT '2026-10-16',
        resepsi_display_date TEXT NOT NULL DEFAULT '16 Oktober 2026',
        resepsi_display_day TEXT NOT NULL DEFAULT 'Jumat',
        resepsi_time TEXT NOT NULL DEFAULT '15.00 WIB',
        resepsi_label TEXT NOT NULL DEFAULT 'Resepsi Pernikahan',
        venue_name TEXT NOT NULL DEFAULT 'Kediaman Mempelai Wanita',
        venue_address TEXT NOT NULL DEFAULT 'Tanjungrejo, RT/RW 01/04, Sembulung, Cluring',
        venue_lat DOUBLE PRECISION NOT NULL DEFAULT -8.454732810178411,
        venue_lng DOUBLE PRECISION NOT NULL DEFAULT 114.21402893606697,
        google_maps_url TEXT NOT NULL DEFAULT 'https://maps.app.goo.gl/kV8LAuR6sCvYA5a37',
        closing_quote_text TEXT NOT NULL DEFAULT '"Anyonyasyawyabhicaro, Bhawedamaranantikah.\nEsa dharmah samasena, Jneyah stripumsayoh parah."\n\nHendaknya hubungan suami-isteri dilandasi oleh kesetiaan dan berlangsung hingga selamanya. Singkatnya kesetiaanlah yang menjadi hukum yang tertinggi dalam membina keharmonisan sebuah keluarga.',
        closing_quote_source TEXT NOT NULL DEFAULT 'Weda Smrthi : IX.101',
        music_url TEXT NOT NULL DEFAULT '/uploads/ASMARANALA_Lirik_-_Wahyu_F_Giri_ft_Adinda_Anggun_1791522660241.mp3',
        cover_photo_url TEXT DEFAULT '/uploads/mempelai_sherly_1791473986141.jpeg',
        cover_badge_text TEXT DEFAULT 'Pernikahan dari',
        cover_couple_name TEXT DEFAULT 'Sherly & Dimas',
        cover_date_text TEXT DEFAULT 'Jumat, 16 Oktober 2026',
        cover_bg_url TEXT DEFAULT '/uploads/latar_1791136432133.png',
        countdown_target TEXT DEFAULT '2026-10-16T15:00',
        countdown_title TEXT DEFAULT 'Menuju Hari Bahagia',
        closing_photo_url TEXT DEFAULT '/uploads/mempelai_sherly_1791478061860.jpeg',
        music_start_second INTEGER DEFAULT 238,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log("Table 'wedding_settings' created/verified.");

    // Seed row id 1 if not exists
    const settingsCount = await sql`SELECT COUNT(*) FROM wedding_settings WHERE id = 1`;
    if (parseInt(settingsCount[0].count) === 0) {
      await sql`
        INSERT INTO wedding_settings (
          id, groom_name, groom_full_name, groom_parent_of,
          bride_name, bride_full_name, bride_parent_of,
          akad_date, akad_display_date, akad_display_day, akad_time, akad_label,
          resepsi_date, resepsi_display_date, resepsi_display_day, resepsi_time, resepsi_label,
          venue_name, venue_address, venue_lat, venue_lng, google_maps_url,
          closing_quote_text, closing_quote_source, music_url,
          cover_photo_url, cover_badge_text, cover_couple_name, cover_date_text, cover_bg_url,
          countdown_target, countdown_title, closing_photo_url, music_start_second
        ) VALUES (
          1, 'Sherly', 'Sherly Virdayana', 'Putri dari Bapak Sarjono & Ibu Hariyanti Astutik',
          'Dimas', 'Dimas Rama Ardianto', 'Putra dari Bapak Alfan Maharto & Ibu Hartatik',
          '2026-10-16', '16 Oktober 2026', 'Jumat', '15.00 WIB', 'Pawiwahan',
          '2026-10-16', '16 Oktober 2026', 'Jumat', '15.00 WIB', 'Resepsi Pernikahan',
          'Kediaman Mempelai Wanita', 'Tanjungrejo, RT/RW 01/04, Sembulung, Cluring',
          -8.454732810178411, 114.21402893606697, 'https://maps.app.goo.gl/kV8LAuR6sCvYA5a37',
          '"Anyonyasyawyabhicaro, Bhawedamaranantikah.\nEsa dharmah samasena, Jneyah stripumsayoh parah."\n\nHendaknya hubungan suami-isteri dilandasi oleh kesetiaan dan berlangsung hingga selamanya. Singkatnya kesetiaanlah yang menjadi hukum yang tertinggi dalam membina keharmonisan sebuah keluarga.',
          'Weda Smrthi : IX.101', '/uploads/ASMARANALA_Lirik_-_Wahyu_F_Giri_ft_Adinda_Anggun_1791522660241.mp3',
          '/uploads/mempelai_sherly_1791473986141.jpeg', 'Pernikahan dari', 'Sherly & Dimas', 'Jumat, 16 Oktober 2026', '/uploads/latar_1791136432133.png',
          '2026-10-16T15:00', 'Menuju Hari Bahagia', '/uploads/mempelai_sherly_1791478061860.jpeg', 238
        );
      `;
      console.log("Initial 'wedding_settings' data seeded.");
    }

    // 2. Table: wishes
    await sql`
      CREATE TABLE IF NOT EXISTS wishes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        attendance TEXT NOT NULL DEFAULT 'Hadir',
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log("Table 'wishes' created/verified.");

    // 3. Table: gallery_items
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
          ('Foto Galeri Utama', '', '/uploads/mempelai_sherly_1791474620669.jpeg', TRUE, 0),
          ('Foto Galeri 1', '', '/uploads/mempelai_1_1791474574640.jpeg', FALSE, 1),
          ('Foto Galeri 2', '', '/uploads/mempelai_2_1791474594703.jpeg', FALSE, 2),
          ('Foto Galeri 3', '', '/uploads/mempelai_3_1791474604158.jpeg', FALSE, 3)
      `;
      console.log("Initial 'gallery_items' data seeded.");
    }

    console.log("\n SUCCESS: All tables for Undangan 2 are fully initialized and ready!");
  } catch (err) {
    console.error("ERROR initializing database tables:", err);
  }
}

initDashboardDb();