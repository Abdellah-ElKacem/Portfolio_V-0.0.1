import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const lang = searchParams.get("lang")?.toLowerCase();

        const isFrench = lang === "fr";
        const fileName = isFrench
            ? "Abdellah_El_Kacem_Resume_FR.pdf"
            : "Abdellah_El_Kacem_Resume_EN.pdf";

        const filePath = join(process.cwd(), "public", fileName);
        const fileBuffer = await readFile(filePath);

        return new Response(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${fileName}"`,
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
