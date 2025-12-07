import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const workSans = Work_Sans({
    variable: "--font-work-sans",
    subsets: ["latin"],
});

const ankish = localFont({
    src: "./font/ANKISH-V2.otf",
    variable: "--font-ankish",
    display: "swap",
});

const crustAce = localFont({
    src: "./font/FTCrustAce-FREE.otf",
    variable: "--font-crustace",
    display: "swap",
});

export const metadata: Metadata = {
    title: "El Kacem | UI/UX & Frontend Dev",
    description:
        "Portfolio of Abdellah El Kacem - UI/UX Designer & Frontend Developer",
    keywords: [
        "UI/UX Designer",
        "Frontend Developer",
        "Web Developer",
        "Portfolio",
        "Abdellah El Kacem",
    ],
    authors: [{ name: "Abdellah El Kacem" }],
    creator: "Abdellah El Kacem",
    openGraph: {
        title: "El Kacem | UI/UX & Frontend Dev",
        description:
            "Portfolio of Abdellah El Kacem - UI/UX Designer & Frontend Developer",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "El Kacem | UI/UX & Frontend Dev",
        description:
            "Portfolio of Abdellah El Kacem - UI/UX Designer & Frontend Developer",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    icons: {
        icon: ["/logo_aek1.svg", "/logo_aek.svg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: "(() => { try { const stored = localStorage.getItem('theme'); const theme = stored ? stored : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'); document.documentElement.setAttribute('data-theme', theme); } catch {} })();",
                    }}
                />
            </head>
            <body
                className={`${workSans.variable} ${ankish.variable} ${crustAce.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
