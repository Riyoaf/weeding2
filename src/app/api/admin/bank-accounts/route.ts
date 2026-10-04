import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { bank, account_number, account_name, logo } = await request.json();

    const res = await sql`
      INSERT INTO bank_accounts (bank, account_number, account_name, logo)
      VALUES (${bank}, ${account_number}, ${account_name}, ${logo || bank})
      RETURNING *
    `;

    return NextResponse.json({ success: true, message: "Rekening berhasil ditambahkan", data: res[0] });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID Rekening tidak ditemukan" }, { status: 400 });
    }

    await sql`DELETE FROM bank_accounts WHERE id = ${parseInt(id)}`;

    return NextResponse.json({ success: true, message: "Rekening berhasil dihapus" });
  } catch (error) {
    return NextResponse.json({ success: false, message: (error as Error).message }, { status: 500 });
  }
}
