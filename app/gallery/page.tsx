import type { Metadata } from "next";
import { Suspense } from "react";
import GalleryView from "@/components/sections/GalleryView";

export const metadata: Metadata = {
    title: "Project Gallery | Abdellah El Kacem",
    description:
        "Explore the comprehensive project gallery and design archive of Abdellah El Kacem. UI/UX design case studies, web applications, and interactive platforms.",
    openGraph: {
        title: "Project Gallery | Abdellah El Kacem",
        description:
            "Explore the comprehensive project gallery and design archive of Abdellah El Kacem. UI/UX design case studies, web applications, and interactive platforms.",
    },
};

export default function GalleryPage() {
    return (
        <Suspense fallback={null}>
            <GalleryView />
        </Suspense>
    );
}