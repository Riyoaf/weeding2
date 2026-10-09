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

export async function GET() {
  try {
    await ensureExtraColumns();

    const settingsRes = await sql`SELECT * FROM wedding_settings WHERE id = 1`;
    const bankAccountsRes = await sql`SELECT * FROM bank_accounts ORDER BY id ASC`;
    const galleryRes = await sql`SELECT * FROM gallery_items ORDER BY is_featured DESC, display_order ASC, id ASC`;

    const settings = settingsRes[0] || null;

    return NextResponse.json({
      success: true,
      data: {
        settings,
        bankAccounts: bankAccountsRes,
        galleryItems: galleryRes,
      },
    });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data settings: " + (error as Error).message },
      { status: 500 }
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
