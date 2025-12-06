import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET() {
    try {
        const filePath = join(process.cwd(), "public", "Resume.pdf");
        const fileBuffer = await readFile(filePath);

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="Resume.pdf"',
                "Content-Length": fileBuffer.byteLength.toString(),
            },
        });
    } catch (error) {
        console.error("Error serving resume:", error);
        return NextResponse.json(
            { error: "Resume not found" },
            { status: 404 }
        );
    }
}
