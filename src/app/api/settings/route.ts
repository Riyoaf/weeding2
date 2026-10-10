import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

async function ensureExtraColumns() {
  try {
    await sql`
      ALTER TABLE wedding_settings 
      ADD COLUMN IF NOT EXISTS cover_photo_url TEXT DEFAULT '/dita 2.jpeg',
      ADD COLUMN IF NOT EXISTS cover_badge_text TEXT DEFAULT 'Pernikahan dari',
      ADD COLUMN IF NOT EXISTS cover_couple_name TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS cover_date_text TEXT DEFAULT '',
      ADD COLUMN IF NOT EXISTS cover_bg_url TEXT DEFAULT '/cover-bg.jpg',
      ADD COLUMN IF NOT EXISTS countdown_target TEXT DEFAULT '2026-09-12T10:00:00',
      ADD COLUMN IF NOT EXISTS countdown_title TEXT DEFAULT 'Menuju Hari Bahagia',
      ADD COLUMN IF NOT EXISTS closing_photo_url TEXT DEFAULT '/dita.jpeg',
      ADD COLUMN IF NOT EXISTS music_start_second INTEGER DEFAULT 0
    `;
  } catch (e) {
    console.error("Migration error (safe to ignore if already altered):", e);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

const fallbackGallery = [
  { id: 9, title: "Foto Galeri", subtitle: "", image_url: "/uploads/mempelai_sherly_1791474620669.jpeg", is_featured: true, display_order: 0 },
  { id: 6, title: "Foto Galeri", subtitle: "", image_url: "/uploads/mempelai_1_1791474574640.jpeg", is_featured: false, display_order: 0 },
  { id: 7, title: "Foto Galeri", subtitle: "", image_url: "/uploads/mempelai_2_1791474594703.jpeg", is_featured: false, display_order: 0 },
  { id: 8, title: "Foto Galeri", subtitle: "", image_url: "/uploads/mempelai_3_1791474604158.jpeg", is_featured: false, display_order: 0 },
];

const fallbackSettings = {
  id: 1,
  groom_name: "Sherly",
  groom_full_name: "Sherly Virdayana",
  groom_parent_of: "Putri dari Bapak Sarjono & Ibu Hariyanti Astutik",
  bride_name: "Dimas",
  bride_full_name: "Dimas Rama Ardianto",
  bride_parent_of: "Putra dari Bapak Alfan Maharto & Ibu Hartatik",
  akad_date: "2026-10-16",
  akad_display_date: "16 Oktober 2026",
  akad_display_day: "Jumat",
  akad_time: "15.00 WIB",
  akad_label: "Akad Nikah",
  resepsi_date: "2026-10-16",
  resepsi_display_date: "16 Oktober 2026",
  resepsi_display_day: "Jumat",
  resepsi_time: "15.00 WIB",
  resepsi_label: "Resepsi Pernikahan",
  venue_name: "Kediaman Mempelai Wanita",
  venue_address: "Tanjungrejo, RT/RW 01/04, Sembulung, Cluring",
  venue_lat: -8.454732810178411,
  venue_lng: 114.21402893606697,
  google_maps_url: "https://maps.app.goo.gl/kV8LAuR6sCvYA5a37",
  closing_quote_text: "Berikanlah maskawin kepada wanita (yang kamu nikahi) sebagai pemberian dengan penuh kerelaan. Kemudian jika mereka menyerahkan kepada kamu sebagian dari maskawin itu dengan senang hati, maka makanlah (ambillah) pemberian itu (sebagai makanan) yang sedap lagi baik akibatnya.",
  closing_quote_source: "QS. An Nisa: 4",
  music_url: "/uploads/ASMARANALA_Lirik_-_Wahyu_F_Giri_ft_Adinda_Anggun_1791522660241.mp3",
  cover_photo_url: "/uploads/mempelai_sherly_1791473986141.jpeg",
  cover_badge_text: "Pernikahan dari",
  cover_couple_name: "Sherly & Dimas",
  cover_date_text: "Jumat, 16 Oktober 2026",
  cover_bg_url: "/uploads/latar_1791136432133.png",
  countdown_target: "2026-10-16T15:00",
  countdown_title: "Menuju Hari Bahagia",
  closing_photo_url: "/uploads/mempelai_sherly_1791478061860.jpeg",
  music_start_second: 238,
};

export async function GET() {
  if (!sql) {
    return NextResponse.json(
      {
        success: true,
        data: {
          settings: fallbackSettings,
          bankAccounts: [
            { id: 2, bank: "BCA", account_number: "8980811710", account_name: "sherly virdayana", logo: "BCA" },
          ],
          galleryItems: fallbackGallery,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }

  try {
    await ensureExtraColumns();

    const settingsRes = await sql`SELECT * FROM wedding_settings WHERE id = 1`;
    const bankAccountsRes = await sql`SELECT * FROM bank_accounts ORDER BY id ASC`;
    const galleryRes = await sql`SELECT * FROM gallery_items ORDER BY is_featured DESC, display_order ASC, id ASC`;

    const settings = settingsRes[0] || fallbackSettings;

    return NextResponse.json(
      {
        success: true,
        data: {
          settings,
          bankAccounts: bankAccountsRes,
          galleryItems: galleryRes.length > 0 ? galleryRes : fallbackGallery,
        },
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      {
        success: true,
        data: {
          settings: fallbackSettings,
          bankAccounts: [],
          galleryItems: fallbackGallery,
        },
        error: (error as Error).message,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await ensureExtraColumns();
    const body = await request.json();

    const {
      groom_name = "",
      groom_full_name = "",
      groom_parent_of = "",
      bride_name = "",
      bride_full_name = "",
      bride_parent_of = "",
      akad_date = "",
      akad_display_date = "",
      akad_display_day = "",
      akad_time = "",
      akad_label = "Akad Nikah",
      resepsi_date = "",
      resepsi_display_date = "",
      resepsi_display_day = "",
      resepsi_time = "",
      resepsi_label = "Resepsi Pernikahan",
      venue_name = "",
      venue_address = "",
      venue_lat = 0,
      venue_lng = 0,
      google_maps_url = "",
      closing_quote_text = "",
      closing_quote_source = "",
      music_url = "/kusuma_jaya.mp3",
      cover_photo_url = "/dita 2.jpeg",
      cover_badge_text = "Pernikahan dari",
      cover_couple_name = "",
      cover_date_text = "",
      cover_bg_url = "/cover-bg.jpg",
      countdown_target = "2026-09-12T10:00:00",
      countdown_title = "Menuju Hari Bahagia",
      closing_photo_url = "/dita.jpeg",
      music_start_second = 0,
    } = body;

    const startSec = Math.max(0, parseInt(music_start_second, 10) || 0);

    await sql`
      UPDATE wedding_settings
      SET
        groom_name = ${groom_name},
        groom_full_name = ${groom_full_name},
        groom_parent_of = ${groom_parent_of},
        bride_name = ${bride_name},
        bride_full_name = ${bride_full_name},
        bride_parent_of = ${bride_parent_of},
        akad_date = ${akad_date},
        akad_display_date = ${akad_display_date},
        akad_display_day = ${akad_display_day},
        akad_time = ${akad_time},
        akad_label = ${akad_label},
        resepsi_date = ${resepsi_date},
        resepsi_display_date = ${resepsi_display_date},
        resepsi_display_day = ${resepsi_display_day},
        resepsi_time = ${resepsi_time},
        resepsi_label = ${resepsi_label},
        venue_name = ${venue_name},
        venue_address = ${venue_address},
        venue_lat = ${parseFloat(venue_lat) || 0},
        venue_lng = ${parseFloat(venue_lng) || 0},
        google_maps_url = ${google_maps_url},
        closing_quote_text = ${closing_quote_text},
        closing_quote_source = ${closing_quote_source},
        music_url = ${music_url},
        music_start_second = ${startSec},
        cover_photo_url = ${cover_photo_url},
        cover_badge_text = ${cover_badge_text},
        cover_couple_name = ${cover_couple_name},
        cover_date_text = ${cover_date_text},
        cover_bg_url = ${cover_bg_url},
        countdown_target = ${countdown_target},
        countdown_title = ${countdown_title},
        closing_photo_url = ${closing_photo_url},
        updated_at = NOW()
      WHERE id = 1
    `;

    return NextResponse.json({ success: true, message: "Pengaturan berhasil diperbarui" });
  } catch (error) {
    console.error("PUT /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal memperbarui pengaturan: " + (error as Error).message },
      { status: 500 }
    );
  }
}
