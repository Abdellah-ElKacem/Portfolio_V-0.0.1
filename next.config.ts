import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    experimental: {
        optimizePackageImports: [
            "lucide-react",
            "@fortawesome/react-fontawesome",
        ],
    },
    // Reduce unnecessary preloading
    onDemandEntries: {
        maxInactiveAge: 25 * 1000,
        pagesBufferLength: 2,
    },
};

export default nextConfig;
