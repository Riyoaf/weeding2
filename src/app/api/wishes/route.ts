import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

// Table initialization check query (creates wishes table automatically if not exists)
async function ensureTableExists() {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS wishes (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        attendance TEXT NOT NULL DEFAULT 'Hadir',
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
  } catch (err) {
    console.error("Neon DB table initialization error:", err);
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET: Fetch all wishes
export async function GET() {
  if (!sql) {
    return NextResponse.json(
      { success: false, data: [], message: "DATABASE_URL is not set" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }

  try {
    await ensureTableExists();
    const rows = await sql`
      SELECT id, name, attendance, message, created_at
      FROM wishes
      ORDER BY created_at DESC;
    `;
    return NextResponse.json(
      { success: true, data: rows },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Neon DB GET error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  }
}

// POST: Insert a new wish
export async function POST(request: Request) {
  if (!sql) {
    return NextResponse.json({ success: false, message: "DATABASE_URL is not set" }, { status: 400 });
  }

  try {
    await ensureTableExists();
    const body = await request.json();
    const { name, attendance, message } = body;

    if (!name || !message) {
      return NextResponse.json({ success: false, error: "Name and message are required" }, { status: 400 });
    }

    const inserted = await sql`
      INSERT INTO wishes (name, attendance, message)
      VALUES (${name}, ${attendance || 'Hadir'}, ${message})
      RETURNING id, name, attendance, message, created_at;
    `;

    return NextResponse.json({ success: true, data: inserted[0] });
  } catch (error: any) {
    console.error("Neon DB POST error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// DELETE: Delete a wish by ID
export async function DELETE(request: Request) {
  if (!sql) {
    return NextResponse.json({ success: false, message: "DATABASE_URL is not set" }, { status: 400 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID ucapan tidak ditemukan" }, { status: 400 });
    }

    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return NextResponse.json({ success: false, message: "ID ucapan tidak valid" }, { status: 400 });
    }

    await sql`DELETE FROM wishes WHERE id = ${numericId};`;

    return NextResponse.json(
      { success: true, message: "Ucapan berhasil dihapus" },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: any) {
    console.error("Neon DB DELETE error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
