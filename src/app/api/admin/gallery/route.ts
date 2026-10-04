import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { title, subtitle, image_url, is_featured, display_order } = await request.json();

    // If marked as featured, unmark previous featured items
    if (is_featured) {
      await sql`UPDATE gallery_items SET is_featured = FALSE`;
    }

    const res = await sql`
      INSERT INTO gallery_items (title, subtitle, image_url, is_featured, display_order)
      VALUES (${title || "Foto Galeri"}, ${subtitle || ""}, ${image_url}, ${is_featured || false}, ${display_order || 0})
      RETURNING *
    `;

    return NextResponse.json({ success: true, message: "Foto galeri berhasil ditambahkan", data: res[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID Foto tidak ditemukan" }, { status: 400 });
    }

    await sql`DELETE FROM gallery_items WHERE id = ${parseInt(id)}`;

    return NextResponse.json({ success: true, message: "Foto galeri berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}
