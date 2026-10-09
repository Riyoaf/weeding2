import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { sql } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const urlParam = req.nextUrl.searchParams.get("url") || req.nextUrl.searchParams.get("file");
    let musicUrl = urlParam || "";

    if (!musicUrl) {
      try {
        const res = await sql`SELECT music_url FROM wedding_settings WHERE id = 1`;
        if (res && res[0]?.music_url) {
          musicUrl = res[0].music_url;
        }
      } catch (_) {}
    }

    if (!musicUrl) {
      musicUrl = "/kusuma_jaya.mp3";
    }

    // Clean leading slash
    const relativePath = musicUrl.startsWith("/") ? musicUrl.slice(1) : musicUrl;
    let filePath = path.join(process.cwd(), "public", relativePath);

    if (!fs.existsSync(filePath)) {
      filePath = path.join(process.cwd(), "public", "kusuma_jaya.mp3");
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Audio file not found", { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.get("range");

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize || end >= fileSize) {
        return new NextResponse(null, {
          status: 416,
          headers: { "Content-Range": `bytes */${fileSize}` },
        });
      }

      const chunksize = end - start + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });

      const stream = new ReadableStream({
        start(controller) {
          fileStream.on("data", (chunk) => controller.enqueue(chunk));
          fileStream.on("end", () => controller.close());
          fileStream.on("error", (err) => controller.error(err));
        },
        cancel() {
          fileStream.destroy();
        },
      });

      return new NextResponse(stream as any, {
        status: 206,
        headers: {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize.toString(),
          "Content-Type": "audio/mpeg",
          "Content-Disposition": "inline",
          "Cache-Control": "public, max-age=3600, no-transform",
        },
      });
    }

    const fileStream = fs.createReadStream(filePath);
    const stream = new ReadableStream({
      start(controller) {
        fileStream.on("data", (chunk) => controller.enqueue(chunk));
        fileStream.on("end", () => controller.close());
        fileStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        fileStream.destroy();
      },
    });

    return new NextResponse(stream as any, {
      status: 200,
      headers: {
        "Content-Length": fileSize.toString(),
        "Accept-Ranges": "bytes",
        "Content-Type": "audio/mpeg",
        "Content-Disposition": "inline",
        "Cache-Control": "public, max-age=3600, no-transform",
      },
    });
  } catch (error) {
    console.error("GET /api/music error:", error);
    return new NextResponse("Error streaming audio: " + (error as Error).message, { status: 500 });
  }
}
