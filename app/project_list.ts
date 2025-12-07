import { StaticImageData } from "next/image";
import Domicilia from "@/images/domicilia_moke_up.png";
import Portfolio from "@/images/portfolio_moke_up.png";
import AuraPrestigeTech from "@/images/web_aura_moke_up.png";
import AdminPanelDomicilia from "@/images/admin_panel_moke_up.png";
import FtTranscendance from "@/images/Transcendance_moke_up.png";
import MGHUnivers from "@/images/mgh_unvers_moke_up.png";
import Virtus from "@/images/Vertus_Platrorm_moke_up.png";

export interface ProjectItem {
    id: number;
    image: StaticImageData;
    title: string;
    year: string;
    description: string;
    skills: string[];
    tags: string[];
    url?: string;
}

const listProject: ProjectItem[] = [
    {
        id: 1,
        image: Portfolio,
        title: "Portfolio",
        year: "2025",
        description:
            "A highly interactive, performance-driven portfolio showcasing my best work. Every project is designed to be fully responsive, delivering an optimal experience across all devices. Animations are executed with the power of GSAP (GreenSock) for smooth, fluid page transitions and complex timeline management. I leverage Framer Motion for subtle, delightful micro-interactions and state-based component transitions. This portfolio emphasizes technical excellence and modern front-end execution.",
        skills: [
            "/html.svg",
            "/css.svg",
            "/talwindcss.svg",
            "/typescript.svg",
            "/react.svg",
            "/nextjs.svg",
            "/figma.svg",
            "/ps.svg",
            "/ai.svg",
        ],
        tags: ["Website", "UI/UX Design", "Application Mobile"],
        url: "https://www.kacimo.me",
    },
    {
        id: 2,
        image: AuraPrestigeTech,
        title: "Aura Prestige Tech",
        year: "2025",
        description:
            "Aura Prestige Tech: A full-stack web solution for a company specializing in advanced technology services. I was responsible for the end-to-end UX/UI Design and Development, ensuring a highly polished, responsive interface. The front-end was built using Next.js and styled efficiently with Tailwind CSS. Firebase was implemented for essential backend services, showcasing proficiency in modern, performance-driven web application architecture.",
        skills: [
            "/html.svg",
            "/css.svg",
            "/talwindcss.svg",
            "/typescript.svg",
            "/react.svg",
            "/nextjs.svg",
            "/firbase.svg",
            "/figma.svg",
            "/ps.svg",
            "/ai.svg",
        ],
        tags: [
            "Website",
            "Front-end",
            "UI/UX Design",
            "Web Development",
            "SEO",
            "Landing Page",
        ],
        url: "https://auraprestigetech.com",
    },
    {
        id: 3,
        image: Domicilia,
        title: "Domicilia",
        year: "2025",
        description:
            "Domicilia: A comprehensive UX/UI case study for a dual-sided mobile platform focused on nettoyage à domicile (home cleaning services). I conducted in-depth research for both customers and providers to solve critical problems in trust and efficiency. The resulting design features an intuitive, secure booking flow with seamless customization for users, and a highly optimized task management interface for service providers. The final application design is characterized by a clean, good UI and strong visual hierarchy, ensuring a frictionless experience for all parties.",
        skills: ["/figma.svg", "/ps.svg", "/ai.svg"],
        tags: ["Application Mobile", "UI/UX Design"],
    },
    {
        id: 4,
        image: AdminPanelDomicilia,
        title: "Admin Panel Domicilia",
        year: "2025",
        description:
            "This article provides a deep dive into the development and design of the Domicilia Admin Panel, the critical internal control system for the nettoyage à domicile service. My work focused on creating a high-efficacy dashboard that gives administrators full control over operations. Key features include highly optimized tools for user and provider account management, real-time report generation for business health monitoring, and system-wide content control. The final product is a robust, data-dense interface designed purely for operational speed and data integrity.",
        skills: [
            "/html.svg",
            "/css.svg",
            "/talwindcss.svg",
            "/typescript.svg",
            "/react.svg",
            "/nextjs.svg",
            "/firbase.svg",
            "/github.svg",
            "/graphql.svg",
            "/figma.svg",
            "/ps.svg",
            "/ai.svg",
        ],
        tags: ["Website", "UI/UX Design", "Web Development", "Platform", "Admin Panel"],
    },
    {
        id: 5,
        image: FtTranscendance,
        title: "Ft_Transcendance",
        year: "2024",
        description:
            "ft_transcendance is a modern, real-time web application focused on delivering a competitive online Pong game experience. My primary contributions were leading the UX/UI design to ensure a highly engaging and intuitive user interface, coupled with robust Front-End development. I also contributed to the Back-End logic (often related to game state or user authentication) and managed the containerization (Docker) for seamless deployment. This project showcases proficiency in collaborative full-stack development and complex real-time application design.",
        skills: [
            "/html.svg",
            "/css.svg",
            "/talwindcss.svg",
            "/javascript.svg",
            "/typescript.svg",
            "/react.svg",
            "/github.svg",
            "/py.svg",
            "/django.svg",
            "/postgre.svg",
            "/docker.svg",
            "/figma.svg",
            "/ps.svg",
            "/ai.svg",
        ],
        tags: [
            "Front-end",
            "UI/UX Design",
            "Web Development",
            "Game Platform",
            "Pong Game",
        ],
        url: "https://www.behance.net/gallery/209703901/PingPong-Project-ft_transcendence-WebSite-UIUX",
    },
    {
        id: 6,
        image: MGHUnivers,
        title: "MGH Univers",
        year: "2024",
        description:
            "MGH Univers is a printing press company project where I designed and developed the primary landing page. The goal was to create a highly effective page focused on lead generation and clearly communicating their diverse range of printing capabilities. The design emphasizes a clean, professional aesthetic using strong visual hierarchy to guide visitors toward key calls-to-action (CTAs) like requesting a quote or viewing their portfolio. This landing page serves as the digital front door, built to convert traffic into qualified business leads.",
        skills: [
            "/html.svg",
            "/css.svg",
            "/talwindcss.svg",
            "/typescript.svg",
            "/react.svg",
            "/figma.svg",
            "/ps.svg",
            "/ai.svg",
        ],
        tags: [
            "Website",
            "UI/UX Design",
            "Web Development",
            "Landing Page",
            "Printing Company",
        ],
        url: "https://mgh-univers-website.vercel.app/",
    },
    {
        id: 7,
        image: Virtus,
        title: "Virtus",
        year: "2024",
        description:
            "Virtus is a specialized platform designed to streamline and manage the complex process of obtaining ISO certification for companies. My primary contribution was the UX/UI design, focused on transforming bureaucratic procedures into an intuitive, user-friendly digital journey. I designed key modules for document submission, audit scheduling, and compliance tracking. The platform's success relies on a clear visual hierarchy and structure, ensuring companies can navigate complex requirements efficiently and achieve their certification goals with clarity and speed.",
        skills: [
            "/figma.svg",
            "/ps.svg",
            "/ai.svg",
        ],
        tags: [
            "Platform",
            "UI/UX Design",
            "Web Development",
            "Admin Panel",
        ],
    },
];

export default listProject;
