"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sun, Moon, Mouse, X } from "lucide-react";
import TextType from "@/components/TextType";
import CircularText from "@/components/CircularText";
import Magnet from "@/components/Magnet";
import me_1 from "@/images/me_1.jpeg";
import me_2 from "@/images/me_2.jpeg";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedContent from "@/components/AnimatedContent";
import CurvedLoop from "@/components/CurvedLoop";
import listSkill from "@/app/skill_list";
import SpotlightCard from "@/components/SpotlightCard";
import SpinWord from "@/components/SpinWord";
import Domicilia from "@/images/domicilia.png";
import { ArrowUpRight } from "lucide-react";
import shape1_light from "@/public/shape1_light.svg";
import { sendEmail } from "@/app/_email/send-email";
import shape2_light from "@/public/shape2_light.svg";
import shape3_light from "@/public/shape3_light.svg";
import shape4_light from "@/public/shape4_light.svg";
import shape1_dark from "@/public/shape1_dark.svg";
import shape2_dark from "@/public/shape2_dark.svg";
import shape3_dark from "@/public/shape3_dark.svg";
import shape4_dark from "@/public/shape4_dark.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faXTwitter,
    faBehance,
    faInstagram,
    faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import BubbleMenu from "@/components/BubbleMenu";
import Loading from "@/components/Loading";

export default function LandingPage() {
    const [theme, setTheme] = useState<string | null>(null);
    const [navHidden, setNavHidden] = useState(false);
    const lastY = useRef(0);
    const processRowRef = useRef<HTMLDivElement | null>(null);
    const card1Ref = useRef<HTMLDivElement | null>(null);
    const card2Ref = useRef<HTMLDivElement | null>(null);
    const card3Ref = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [connectorPath12, setConnectorPath12] = useState<string>("");
    const [connectorPath23, setConnectorPath23] = useState<string>("");
    const [anchorP1, setAnchorP1] = useState<[number, number] | null>(null);
    const [anchorP2, setAnchorP2] = useState<[number, number] | null>(null);
    const [anchorP3, setAnchorP3] = useState<[number, number] | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error" | null;
        message: string;
    }>({ type: null, message: "" });

    useEffect(() => {
        const current =
            document.documentElement.getAttribute("data-theme") ||
            (window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light");
        setTheme(current);
        const onScroll = () => {
            const y = window.scrollY || 0;
            const goingDown = y > lastY.current;
            if (y <= 8) {
                setNavHidden(false);
            } else if (goingDown && y > 24) {
                setNavHidden(true);
            } else {
                setNavHidden(false);
            }
            lastY.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const toggleTheme = () => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
            localStorage.setItem("theme", next);
        } catch {}
        setTheme(next);
    };

    const computeConnectors = () => {
        const row = processRowRef.current;
        const c1 = card1Ref.current;
        const c2 = card2Ref.current;
        const c3 = card3Ref.current;
        if (!row || !c1 || !c2 || !c3) return;
        const r = row.getBoundingClientRect();
        const b1 = c1.getBoundingClientRect();
        const b2 = c2.getBoundingClientRect();
        const b3 = c3.getBoundingClientRect();
        const p1x = b1.left - r.left + b1.width * 0.8;
        const p1y = b1.top - r.top + b1.height * 0.55;
        const p2x = b2.left - r.left + b2.width * 0.83;
        const p2y = b2.top - r.top + b2.height * 0.2;
        const p3x = b3.left - r.left + b3.width * 0.65;
        const p3y = b3.top - r.top + b3.height * 0.3;
        const dx1 = Math.abs(p2x - p1x) * 0.35;
        const dx2 = Math.abs(p3x - p2x) * 0.35;
        const dy = Math.min(80, Math.max(30, r.width * 0.04));
        const d12 = `M ${p1x} ${p1y} C ${p1x + dx1} ${p1y - dy}, ${p2x - dx1} ${
            p2y - dy
        }, ${p2x} ${p2y}`;
        const d23 = `M ${p2x} ${p2y} C ${p2x + dx2} ${p2y - dy}, ${p3x - dx2} ${
            p3y - dy
        }, ${p3x} ${p3y}`;
        setConnectorPath12(d12);
        setConnectorPath23(d23);
        setAnchorP1([p1x, p1y]);
        setAnchorP2([p2x, p2y]);
        setAnchorP3([p3x, p3y]);
    };

    useEffect(() => {
        computeConnectors();
        const onResize = () => computeConnectors();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        if (isVisible) {
            // Lock body scroll when modal is open
            document.body.style.overflow = "hidden !important";
        } else {
            // Restore body scroll when modal is closed
            document.body.style.overflow = "auto !important";
        }
        // Cleanup: restore scroll when component unmounts
        return () => {
            document.body.style.overflow = "auto !important";
        };
    }, [isVisible]);

    const details_stats = () => {
        setIsVisible(!isVisible);
    };

    const details_project = () => {
        return (
            <>
                <div
                    onClick={details_stats}
                    className={`fixed bottom-0 w-dvw h-dvh bg-black/80 backdrop-blur-xs flex justify-center items-center z-500 transition-opacity duration-500 ease-in-out ${
                        isVisible
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                    }`}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`w-full flex flex-col bg-background4 max-w-[350px] md:max-w-[750px] h-full max-h-[90vh] rounded-2xl shadow-2xl border border-background2 p-2 overflow-hidden transition-all duration-500 ease-in-out ${
                            isVisible
                                ? "scale-100 translate-y-0"
                                : "scale-95 translate-y-4"
                        }`}
                    >
                        <div className="flex flex-col gap-3 overflow-x-hidden overflow-y-auto h-full max-h-full hide-scrollbar">
                            <div className="w-full relative">
                                <Image
                                    src={Domicilia}
                                    alt="dovil"
                                    width={30}
                                    className="w-full h-[250px] object-cover rounded-lg"
                                />
                                <button
                                    onClick={details_stats}
                                    className="cursor-pointer self-end absolute bg-black/70 rounded-full top-2 right-2 p-[6px]"
                                >
                                    <X size={15} color="background" />
                                </button>
                            </div>
                            <div className="flex flex-col"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const services_check = (service: string) => {
        return selectedService === service
            ? "border-foreground-title1 text-foreground-title1 underline"
            : "border-[#93A2A3] text-[#93A2A3]";
    };

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [message]);

    useEffect(() => {
        if (submitStatus.type === "success") {
            const timer = setTimeout(() => {
                setSubmitStatus({ type: null, message: "" });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [submitStatus.type]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !message) {
            setSubmitStatus({
                type: "error",
                message: "Please fill in all required fields",
            });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: "" });

        try {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("lastName", lastName);
            formData.append("email", email);
            formData.append("message", message);
            formData.append("service", selectedService || "");

            const result = await sendEmail(formData);

            if (result.success) {
                setSubmitStatus({
                    type: "success",
                    message: "Message sent successfully!",
                });
                // Reset form
                setFirstName("");
                setLastName("");
                setEmail("");
                setMessage("");
                setSelectedService(null);
            } else {
                setSubmitStatus({
                    type: "error",
                    message: result.error || "Failed to send message",
                });
            }
        } catch (error) {
            setSubmitStatus({
                type: "error",
                message: "An unexpected error occurred",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Loading />
            <nav
                className={`fixed -top-2 md:top-0 left-0 right-0 py-6 transition-transform duration-800 z-50 bg-linear-to-b from-background to-transparent ${
                    navHidden ? "-translate-y-full" : "translate-y-0"
                }`}
            >
                <div className="h-full flex justify-between md:justify-center items-center gap-8 font-medium px-6 text-base text-[#93A2A3]">
                    <a href="#home" className="md:block hidden">
                        {theme === "dark" ? (
                            <Image
                                src="/logo_aek1.svg"
                                alt="Logo"
                                width={50}
                                height={50}
                            />
                        ) : (
                            <Image
                                src="/logo_aek.svg"
                                alt="Logo"
                                width={50}
                                height={50}
                            />
                        )}
                    </a>
                    <a href="#about" className="hidden md:inline-block">
                        ABOUT
                    </a>
                    <a href="#skills" className="hidden md:inline-block">
                        SKILLS
                    </a>
                    <a href="#projects" className="hidden md:inline-block">
                        PROJECTS
                    </a>
                    <a
                        href="#contact"
                        className="px-4 py-2 border-2 rounded-full border-foreground bg-background1 text-nowrap hidden md:inline-block"
                    >
                        LET'S TALK
                    </a>
                    <div className="md:flex gap-2 items-center hidden">
                        <button
                            onClick={toggleTheme}
                            className="text-foreground relative w-6 h-6 flex items-center justify-center"
                        >
                            <Sun
                                size={24}
                                className={`absolute transition-all duration-500 ease-in-out ${
                                    theme === "dark"
                                        ? "opacity-100 rotate-0 scale-100"
                                        : "opacity-0 rotate-90 scale-0"
                                }`}
                            />
                            <Moon
                                size={24}
                                className={`absolute transition-all duration-500 ease-in-out ${
                                    theme === "dark"
                                        ? "opacity-0 -rotate-90 scale-0"
                                        : "opacity-100 rotate-0 scale-100"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </nav>
            <BubbleMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(!isMenuOpen)}
                menuItems={[
                    { label: "Home", number: "(01)", link: "#home" },
                    { label: "About", number: "(02)", link: "#about" },
                    { label: "Skills", number: "(03)", link: "#skills" },
                    { label: "Projects", number: "(04)", link: "#projects" },
                    { label: "Contact", number: "(05)", link: "#contact" },
                ]}
                theme={theme}
                onToggleTheme={toggleTheme}
                navHidden={navHidden}
            />
            <section className="flex flex-col items-center w-full gap-4">
                <section
                    id="home"
                    className=" flex flex-col md:h-screen justify-between w-full max-w-[1536px] px-6"
                >
                    <div className="flex flex-col">
                        <h1 className="font-ankish pt-20 md:pt-34 font-bold text-center mx-auto w-full tracking-wide leading-[.9] text-6xl sm:text-9xl md:text-[140px] lg:text-[180px] xl:text-[230px] 2xl:text-[250px] bg-[linear-gradient(to_bottom,var(--color-foreground1-16),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_%,transparent_100%)] bg-clip-text text-transparent">
                            PORTFOLIO
                        </h1>
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 md:-mt-[12%]">
                            <div className="flex flex-col gap-1">
                                <SplitText
                                    text="Hello, I'm"
                                    tag="h2"
                                    splitType="words"
                                    className="font-ankish font-medium text-foreground-title text-2xl md:text-4xl"
                                />
                                <SplitText
                                    text="ABDELLAH EL KACEM"
                                    tag="h2"
                                    splitType="words"
                                    className="font-ankish font-medium text-3xl md:text-5xl xl:text-7xl"
                                />
                                <span className="font-ankish font-medium text-2xl md:text-3xl xl:text-5xl -tracking-widest flex gap-3 ">
                                    A{" "}
                                    <TextType
                                        className="font-ankish font-medium text-2xl md:text-3xl xl:text-5xl text-foreground1 -tracking-widest"
                                        text={[
                                            "GRAPHIC DESIGNER",
                                            "UI/UX DESIGNER",
                                            "FRONTEND DEVELOPER",
                                        ]}
                                        typingSpeed={75}
                                        pauseDuration={1500}
                                        showCursor={true}
                                        cursorCharacter="❙"
                                    />
                                </span>
                                <p className="text-sm xl:text-base w-full max-w-[550px] pt-4">
                                    I design intuitive interfaces and develop
                                    fast,
                                    <br />
                                    responsive web experiences — where
                                    functionality meets aesthetics. Let’s build
                                    something exceptional.
                                </p>
                                <div className="flex gap-3 pt-4 text-foreground-title1 text-xs md:text-base items-start">
                                    <span className=" font-semibold">
                                        Follow Me —{" "}
                                    </span>
                                    <div className="flex gap-3">
                                        <a href="https://x.com/kacem_abdellah">
                                            <FontAwesomeIcon
                                                icon={faXTwitter}
                                                size="lg"
                                            />
                                        </a>
                                        <a href="https://www.instagram.com/abdellah_elkacem/">
                                            <FontAwesomeIcon
                                                icon={faInstagram}
                                                size="lg"
                                            />
                                        </a>
                                        <a href="https://www.linkedin.com/in/abdellah-el-kacem/">
                                            <FontAwesomeIcon
                                                icon={faLinkedinIn}
                                                size="lg"
                                            />
                                        </a>
                                        <a href="https://www.behance.net/abdellahelkacem">
                                            <FontAwesomeIcon
                                                icon={faBehance}
                                                size="lg"
                                            />
                                        </a>
                                    </div>
                                    <div className="font-semibold group">
                                        <a
                                            href="/resume"
                                            download
                                            className="block"
                                        >
                                            Download Resume
                                        </a>
                                        <div className="h-1 mt-px w-0 group-hover:w-full bg-foreground1 transition-all duration-450 origin-left" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center -space-x-2 lg:-space-x-3 xl:-space-x-4">
                                    <div className="bg-foreground-title1 rounded-[100%] w-15 h-70 md:w-20 md:h-100 xl:w-25 xl:h-110" />
                                    <div className="bg-foreground-title1 rounded-[100%] w-25 h-70 md:w-30 md:h-100 xl:w-35 xl:h-110" />
                                    <div className="relative bg-[#274546] z-10 rounded-full w-55 h-90 md:w-85 md:h-130 xl:w-90 xl:h-140 overflow-hidden">
                                        <Image
                                            src={me_1}
                                            alt="Me"
                                            placeholder="blur"
                                            className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                                        />
                                        <div className="absolute inset-0 bg-[#222222]/20 pointer-events-none"></div>
                                    </div>
                                    <div className="bg-foreground-title1 rounded-[100%] w-[12%] h-70 md:w-10 md:h-100 xl:w-20 xl:h-110" />
                                </div>
                                <span className="text-foreground-title1 self-end text-3xl md:text-[40px] lg:text-5xl xl:text-6xl font-crust -rotate-15 pr-7">
                                    kacimo
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex font-ankish justify-between items-center gap-3 text-lg md:text-4xl">
                        <div>
                            <span className="text-sm md:text-2xl font-bold">
                                ©
                            </span>
                            2025
                        </div>
                        <Magnet
                            padding={150}
                            disabled={false}
                            magnetStrength={4}
                        >
                            <div className="hidden md:block relative mb-14">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Mouse
                                        size={28}
                                        className="text-foreground"
                                    />
                                </div>
                                <CircularText
                                    text="SCROLL DOWN ✦ SCROLL DOWN ✦ "
                                    onHover="speedUp"
                                    spinDuration={20}
                                    className="absolute inset-0"
                                />
                            </div>
                        </Magnet>
                        <div className="text-base md:text-3xl flex items-center -space-x-10 md:-space-x-15 -mr-5">
                            <span className="pt-3 flex gap-2 items-center">
                                /house made
                            </span>
                            <Image
                                src="/Portal.png"
                                alt="Heart"
                                width={120}
                                height={120}
                                className="w-20 h-20 md:w-27 md:h-27"
                            />
                        </div>
                    </div>
                </section>
                <section
                    className="relative flex flex-col justify-center items-center w-full -scroll-mt-[50px]"
                    id="about"
                >
                    <div className="relative flex flex-col justify-around w-full gap-3 md:h-screen max-w-[1536px] p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start">
                            <div className="flex -space-x-17 pt-6">
                                <AnimatedContent
                                    direction="vertical"
                                    duration={0.9}
                                    delay={0.4}
                                >
                                    <Image
                                        src="/Portal1.png"
                                        alt="shape"
                                        width={120}
                                        height={120}
                                        className="w-20 h-20 md:w-27 md:h-27"
                                    />
                                </AnimatedContent>
                                <div className="flex items-center gap-1 ">
                                    <AnimatedContent
                                        direction="vertical"
                                        duration={0.9}
                                        delay={0.1}
                                    >
                                        <div className="w-2 h-2 bg-foreground rounded-full"></div>
                                    </AnimatedContent>
                                    <SplitText
                                        text="About me"
                                        className="text-4xl text-center font-ankish"
                                        splitType="chars"
                                    />
                                    <SplitText
                                        text="(2)"
                                        className="text-sm pt-10"
                                        splitType="chars"
                                    />
                                </div>
                            </div>
                            <div className="w-full max-w-[500px] lg:max-w-[690px] pt-4 md:pt-10">
                                <ScrollReveal
                                    baseOpacity={0}
                                    enableBlur={true}
                                    baseRotation={5}
                                    blurStrength={10}
                                >
                                    My name is Abdellah EL KACEM, and I’m
                                    passionate about crafting digital
                                    experiences that people love to use. With
                                    over 5 years of design experience and 1 year
                                    of front-end development experience, I work
                                    at the intersection of UI/UX design, graphic
                                    design, and front-end development, turning
                                    concepts into interactive, meaningful, and
                                    visually refined interfaces. I am also a
                                    student at 1337 Coding School in Khouribga,
                                    continuously sharpening my problem-solving
                                    and software development skills.
                                </ScrollReveal>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row justify-center lg:items-end gap-6">
                            <div className="flex flex-col md:flex-row gap-17 md:gap-5 md:items-end">
                                <AnimatedContent
                                    distance={30}
                                    direction="vertical"
                                    reverse={false}
                                    duration={0.9}
                                    ease="ease-out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.4}
                                >
                                    <div className="font-medium text-sm">
                                        <p>
                                            Design <br /> by{" "}
                                            <span className="font-crust">
                                                Kacimo
                                            </span>{" "}
                                            a designer <br /> based in El
                                            Jadida, currently <br /> part of
                                            startup team at <br />{" "}
                                            <Link
                                                href="https://auraprestigetech.com/"
                                                className="font-ankish cursor-pointer underline-offset-4"
                                            >
                                                @aura_prestige_tech
                                            </Link>
                                        </p>
                                    </div>
                                </AnimatedContent>
                                <div className="self-center">
                                    <AnimatedContent
                                        distance={30}
                                        direction="vertical"
                                        reverse={false}
                                        duration={0.9}
                                        ease="ease-out"
                                        initialOpacity={0}
                                        animateOpacity
                                        scale={1}
                                        threshold={0.1}
                                        delay={0.4}
                                    >
                                        <Image
                                            src={me_2}
                                            alt="Abdellah El Kacem"
                                            width={300}
                                            className="rounded-lg shadow-2xl"
                                        />
                                    </AnimatedContent>
                                </div>
                            </div>
                            <div className="w-full max-w-[450px] text-[14px]">
                                <ScrollReveal
                                    baseOpacity={0}
                                    enableBlur={true}
                                    baseRotation={5}
                                    blurStrength={10}
                                >
                                    I believe great design is more than visuals
                                    — it’s about clarity, emotion, and
                                    usability. Whether I’m writing code, shaping
                                    a layout, or refining a brand identity, I
                                    focus on creating smooth experiences and
                                    strong visual impact. Every project is an
                                    opportunity to learn, experiment, and bring
                                    ideas to life.
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -bottom-115 md:-bottom-150 lg:-bottom-130 text-foreground1 w-full z-[-1]">
                        <CurvedLoop
                            marqueeText="illustration  ✦  DEVELOPEMENT  ✦  LANDING PAGE  ✦  LOGO CREATOR  ✦  UI/UX designer  ✦  wireframe  ✦  BRANDING IDENTITY  ✦  "
                            speedDesktop={0.5}
                            speedMobile={3}
                            curveAmount={200}
                            direction="left"
                            interactive={true}
                            className="font-ankish text-8xl md:text-4xl text-foreground1"
                        />
                    </div>
                </section>
                <section
                    className="w-full flex flex-col items-center mt-20 gap-20 p-6 scroll-mt-[12d0px]"
                    id="skills"
                >
                    <div className="flex flex-col md:h-screen w-full max-w-[1536px]">
                        <div className="flex -space-x-17 pt-6 flex-1">
                            <AnimatedContent
                                direction="vertical"
                                duration={0.9}
                                delay={0.4}
                            >
                                <Image
                                    src="/Portal1.png"
                                    alt="shape"
                                    width={120}
                                    height={120}
                                    className="w-20 h-20 md:w-27 md:h-27"
                                />
                            </AnimatedContent>
                            <div className="flex items-center gap-1 ">
                                <AnimatedContent
                                    direction="vertical"
                                    duration={0.9}
                                    delay={0.1}
                                >
                                    <div className="w-2 h-2 bg-foreground rounded-full"></div>
                                </AnimatedContent>
                                <SplitText
                                    text="Skills"
                                    className="text-4xl text-center font-ankish"
                                    splitType="chars"
                                />
                                <SplitText
                                    text="(3)"
                                    className="text-sm pt-10"
                                    splitType="chars"
                                />
                            </div>
                        </div>
                        <div className="md:flex-10 flex justify-center items-center h-full">
                            <div className="flex flex-wrap gap-7 justify-center md:w-[80%]">
                                {listSkill.map((item) => (
                                    <AnimatedContent
                                        distance={30}
                                        direction="vertical"
                                        reverse={false}
                                        duration={0.9}
                                        ease="ease-out"
                                        initialOpacity={0}
                                        animateOpacity
                                        scale={1}
                                        threshold={0.1}
                                        delay={item.id * 0.05}
                                        key={item.id}
                                    >
                                        <SpotlightCard spotlightColor="rgba(0, 0, 0, 0.2)">
                                            <div
                                                key={item.id}
                                                className="w-[80px] h-[100px] md:w-[110px] md:h-[130px] xl:w-[130px] gap-3 xl:h-[170px] flex flex-col items-center justify-between bg-background py-4"
                                            >
                                                <Image
                                                    src={item.icon}
                                                    alt={item.title}
                                                    width={35}
                                                    height={35}
                                                    className="w-8 h-8 md:w-12 md:h-12 xl:w-15 xl:h-15 xl:mt-4"
                                                />
                                                <span className="text-[11px] lg:text-sm xl:text-base font-semibold">
                                                    {item.title}
                                                </span>
                                            </div>
                                        </SpotlightCard>
                                    </AnimatedContent>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="w-full flex flex-col items-center p-6 scroll-mt-[30px]"
                    id="projects"
                >
                    <div className="w-full max-w-[1536px] flex flex-col items-center gap-10">
                        <div className="w-full flex md:flex-row flex-col gap-2">
                            <div className="flex -space-x-17  flex-1">
                                <AnimatedContent
                                    direction="vertical"
                                    duration={0.9}
                                    delay={0.4}
                                >
                                    <Image
                                        src="/Portal1.png"
                                        alt="shape"
                                        width={120}
                                        height={120}
                                        className="w-20 h-20 md:w-27 md:h-27"
                                    />
                                </AnimatedContent>
                                <div className="flex items-center gap-1 ">
                                    <AnimatedContent
                                        direction="vertical"
                                        duration={0.9}
                                        delay={0.1}
                                    >
                                        <div className="w-2 h-2 bg-foreground rounded-full"></div>
                                    </AnimatedContent>
                                    <SplitText
                                        text="Projects"
                                        className="text-4xl text-center font-ankish"
                                        splitType="chars"
                                    />
                                    <SplitText
                                        text="(4)"
                                        className="text-sm pt-10"
                                        splitType="chars"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 pt-10">
                                <SplitText
                                    text="Here’s how it works"
                                    className="text-2xl md:text-3xl lg:text-5xl font-medium"
                                    splitType="words"
                                />
                                <SplitText
                                    text="Our process explained"
                                    className="md:text-xl tracking-wide"
                                    splitType="words"
                                />
                            </div>
                        </div>
                        <div
                            ref={processRowRef}
                            className="relative flex md:flex-row flex-col flex-wrap justify-center md:py-40 md:gap-5 md:-space-y-2"
                        >
                            <AnimatedContent
                                distance={20}
                                direction="vertical"
                                duration={0.7}
                                initialOpacity={0}
                                animateOpacity
                                threshold={0.1}
                                delay={1.1}
                                className="absolute pointer-events-none top-0 left-0 w-full h-full z-20"
                            >
                                <svg className="w-full h-full text-foreground1 opacity-50">
                                    <path
                                        d={connectorPath12}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={20}
                                direction="vertical"
                                duration={0.7}
                                initialOpacity={0}
                                animateOpacity
                                threshold={0.1}
                                delay={1.3}
                                className="absolute pointer-events-none top-0 left-0 w-full h-full z-20"
                            >
                                <svg className="w-full h-full text-foreground1 opacity-50">
                                    <path
                                        d={connectorPath23}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={10}
                                direction="vertical"
                                duration={0.6}
                                initialOpacity={0}
                                animateOpacity
                                threshold={0.1}
                                delay={1.45}
                                className="absolute pointer-events-none top-0 left-0 w-full h-full z-20"
                            >
                                <svg className="w-full h-full text-foreground1 opacity-80">
                                    {anchorP1 && (
                                        <circle
                                            cx={anchorP1[0]}
                                            cy={anchorP1[1]}
                                            r="6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    )}
                                </svg>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={10}
                                direction="vertical"
                                duration={0.6}
                                initialOpacity={0}
                                animateOpacity
                                threshold={0.1}
                                delay={1.55}
                                className="absolute pointer-events-none top-0 left-0 w-full h-full z-20"
                            >
                                <svg className="w-full h-full text-foreground1 opacity-80">
                                    {anchorP2 && (
                                        <circle
                                            cx={anchorP2[0]}
                                            cy={anchorP2[1]}
                                            r="6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    )}
                                </svg>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={10}
                                direction="vertical"
                                duration={0.6}
                                initialOpacity={0}
                                animateOpacity
                                threshold={0.1}
                                delay={1.65}
                                className="absolute pointer-events-none top-0 left-0 w-full h-full z-20"
                            >
                                <svg className="w-full h-full text-foreground1 opacity-80">
                                    {anchorP3 && (
                                        <circle
                                            cx={anchorP3[0]}
                                            cy={anchorP3[1]}
                                            r="6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                    )}
                                </svg>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={30}
                                direction="vertical"
                                reverse={false}
                                duration={0.9}
                                ease="ease-out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1}
                                threshold={0.1}
                                delay={0}
                            >
                                <div
                                    ref={card1Ref}
                                    className="flex flex-col justify-between items-start p-6 border-5 border-background w-[250px] h-[310px] md:w-[300px] md:h-[360px] bg-background2 rounded-3xl shadow-xl/10 -rotate-6 md:-rotate-10 hover:scale-105 transition-all duration-500 ease-in-out"
                                >
                                    <h2 className="text-5xl">01</h2>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl">Discover</h3>
                                        <p className="text-xs w-[95%]">
                                            Understanding your goals, users, and
                                            challenges through research and
                                            strategy.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={30}
                                direction="vertical"
                                reverse={false}
                                duration={0.9}
                                ease="ease-out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1}
                                threshold={0.1}
                                delay={0.4}
                            >
                                <div
                                    ref={card2Ref}
                                    className="flex flex-col justify-between items-start p-6 border-5 border-background w-[250px] h-[310px] md:w-[300px] md:h-[360px] bg-background2 rounded-3xl shadow-xl/10 rotate-6 md:rotate-10 md:-mt-10 hover:scale-105 transition-all duration-500 ease-in-out"
                                >
                                    <h2 className="text-5xl">02</h2>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl">Design</h3>
                                        <p className="text-xs w-[95%]">
                                            Transforming insight into intuitive,
                                            beautiful, and functional product
                                            experiences.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedContent>
                            <AnimatedContent
                                distance={30}
                                direction="vertical"
                                reverse={false}
                                duration={0.9}
                                ease="ease-out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1}
                                threshold={0.1}
                                delay={0.8}
                            >
                                <div
                                    ref={card3Ref}
                                    className="flex flex-col justify-between items-start p-6 border-5 border-background w-[250px] h-[310px] md:w-[300px] md:h-[360px] bg-background2 rounded-3xl shadow-xl/10 -rotate-4 md:-rotate-7 hover:scale-105 transition-all duration-500 ease-in-out"
                                >
                                    <h2 className="text-5xl">03</h2>
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-2xl">Deliver</h3>
                                        <p className="text-xs w-[95%]">
                                            Testing, refining, and launching the
                                            final product with clarify and
                                            precision.
                                        </p>
                                    </div>
                                </div>
                            </AnimatedContent>
                        </div>
                        <div className="w-full flex flex-col pb-10 items-center gap-10">
                            <SplitText
                                text="Selected Works"
                                className="text-xl md:text-2xl lg:text-4xl font-medium self-end"
                                splitType="words"
                            />
                            {details_project()}
                            <div className="w-full max-w-[430px] flex flex-col items-center gap-5">
                                <div className="overflow-hidden rounded-3xl shadow-md/10 border-5 border-background">
                                    <Image
                                        src={Domicilia}
                                        alt="Domicilia"
                                        width={380}
                                        height={300}
                                        className="w-[430px] h-full max-h-[300px] hover:scale-105 transition-all duration-500 ease-in-out object-cover"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-3">
                                    <div className=" w-full flex items-center justify-between px-2">
                                        <h2 className="text-lg font-semibold">
                                            Domicilia
                                        </h2>
                                        <div className="flex gap-1 items-center">
                                            <div className="p-1 px-2 text-xs bg-background2 rounded-lg">
                                                <p>Mobile App</p>
                                            </div>
                                            <div className="p-1 px-2 text-xs bg-background2 rounded-lg">
                                                <p>UI/UX Design</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" w-full flex items-center justify-between px-2">
                                        <button
                                            onClick={details_stats}
                                            className="p-1 px-9 md:px-15 text-sm bg-background3 rounded-lg text-background flex items-center gap-2 cursor-pointer"
                                        >
                                            <p>Details</p>
                                            <ArrowUpRight size={18} />
                                        </button>
                                        <h2 className="text-sm">2025</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="contact"
                    className="w-full flex flex-col items-center scroll-mt-[80px]"
                >
                    <div className="w-full relative max-w-[1536px] flex gap-2 justify-between p-6 pb-20">
                        <div className="flex flex-col gap-2">
                            <SplitText
                                text="Let's Talk"
                                className="text-6xl md:text-8xl lg:text-9xl font-medium font-ankish"
                                splitType="words"
                            />
                            <SplitText
                                text="Every great project begins with a conversation,"
                                className="text-sm md:text-lg w-[80%]"
                                splitType="words"
                            />
                        </div>
                        <SpinWord
                            text="✦"
                            className="grid h-15 mt-10 place-items-center text-6xl md:text-8xl lg:text-9xl leading-none md:mr-40 lg:mr-60 text-foreground-title"
                            duration={7}
                        />
                    </div>
                    <div className="bg-background4 w-full py-15 flex items-center justify-center">
                        <form
                            onSubmit={handleSubmit}
                            className="relative w-full max-w-[1536px] flex flex-col gap-15 md:gap-25 p-6"
                        >
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-15 md:gap-25">
                                <AnimatedContent
                                    distance={30}
                                    direction="vertical"
                                    reverse={false}
                                    duration={0.9}
                                    ease="ease-out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.2}
                                >
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl md:text-4xl font-semibold">
                                            First name*
                                        </h3>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) =>
                                                setFirstName(e.target.value)
                                            }
                                            placeholder="Enter your first name"
                                            required
                                            className="bg-transparent text-foreground w-full h-[40px] outline-none text-sm"
                                        />
                                        <div className="h-px bg-foreground w-full" />
                                    </div>
                                </AnimatedContent>
                                <AnimatedContent
                                    distance={30}
                                    direction="vertical"
                                    reverse={false}
                                    duration={0.9}
                                    ease="ease-out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.3}
                                >
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl md:text-4xl font-semibold">
                                            Last name*
                                        </h3>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) =>
                                                setLastName(e.target.value)
                                            }
                                            placeholder="Enter your last name"
                                            required
                                            className="bg-transparent text-foreground w-full h-[40px] outline-none text-sm"
                                        />
                                        <div className="h-px bg-foreground w-full" />
                                    </div>
                                </AnimatedContent>
                                <AnimatedContent
                                    distance={30}
                                    direction="vertical"
                                    reverse={false}
                                    duration={0.9}
                                    ease="ease-out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.4}
                                >
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl md:text-4xl font-semibold">
                                            Email address*
                                        </h3>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="Enter your email address"
                                            required
                                            className="bg-transparent text-foreground w-full h-[40px] outline-none text-sm"
                                        />
                                        <div className="h-px bg-foreground w-full" />
                                    </div>
                                </AnimatedContent>
                                <AnimatedContent
                                    distance={30}
                                    direction="vertical"
                                    reverse={false}
                                    duration={0.9}
                                    ease="ease-out"
                                    initialOpacity={0}
                                    animateOpacity
                                    scale={1}
                                    threshold={0.1}
                                    delay={0.5}
                                >
                                    <div className="flex flex-col justify-between gap-4 md:gap-3 h-full">
                                        <h3 className="text-2xl md:text-4xl font-semibold ">
                                            Services
                                        </h3>
                                        <div className="flex gap-2 flex-wrap">
                                            <div
                                                onClick={() =>
                                                    setSelectedService(
                                                        "Web Design"
                                                    )
                                                }
                                                className={`p-[4px] px-3 border flex items-center justify-between rounded-lg text-sm w-fit cursor-pointer transition-all ${services_check(
                                                    "Web Design"
                                                )}`}
                                            >
                                                Web Design
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setSelectedService(
                                                        "App Design"
                                                    )
                                                }
                                                className={`p-[4px] px-3 border flex items-center justify-between rounded-lg text-sm w-fit cursor-pointer transition-all ${services_check(
                                                    "App Design"
                                                )}`}
                                            >
                                                App Design
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setSelectedService(
                                                        "Web Development"
                                                    )
                                                }
                                                className={`p-[4px] px-3 border flex items-center justify-between rounded-lg text-sm w-fit cursor-pointer transition-all ${services_check(
                                                    "Web Development"
                                                )}`}
                                            >
                                                Web Development
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setSelectedService(
                                                        "logo Branding"
                                                    )
                                                }
                                                className={`p-[4px] px-3 border flex items-center justify-between rounded-lg text-sm w-fit cursor-pointer transition-all ${services_check(
                                                    "logo Branding"
                                                )}`}
                                            >
                                                logo Branding
                                            </div>
                                            <div
                                                onClick={() =>
                                                    setSelectedService("Other")
                                                }
                                                className={`p-[4px] px-3 border flex items-center justify-between rounded-lg text-sm w-fit cursor-pointer transition-all ${services_check(
                                                    "Other"
                                                )}`}
                                            >
                                                Other
                                            </div>
                                        </div>
                                    </div>
                                </AnimatedContent>
                            </div>
                            <AnimatedContent
                                distance={30}
                                direction="vertical"
                                reverse={false}
                                duration={0.9}
                                ease="ease-out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1}
                                threshold={0.1}
                                delay={0.6}
                            >
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-2xl md:text-4xl font-semibold">
                                        Message
                                    </h3>
                                    <textarea
                                        ref={textareaRef}
                                        name="message"
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        placeholder="Write your message here..."
                                        required
                                        className="bg-transparent text-foreground w-full min-h-[30px] outline-none text-sm resize-none overflow-hidden"
                                        style={{ height: "auto" }}
                                    />
                                    <div className="h-px bg-foreground w-full -mt-2" />
                                </div>
                            </AnimatedContent>
                            {submitStatus.type && (
                                <div
                                    className={` absolute -bottom-8 md:bottom-6 md:right-0 p-4 rounded-lg w-fit text-xs md:text-base ${
                                        submitStatus.type === "success"
                                            ? "text-foreground-title1"
                                            : "text-red-800"
                                    }`}
                                >
                                    {submitStatus.message}
                                </div>
                            )}
                            <AnimatedContent
                                distance={30}
                                direction="vertical"
                                reverse={false}
                                duration={0.9}
                                ease="ease-out"
                                initialOpacity={0}
                                animateOpacity
                                scale={1}
                                threshold={0.1}
                                delay={0.7}
                            >
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex flex-row gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <div className="bg-foreground-title1 text-background p-3 px-8 rounded-full text-sm font-medium underline">
                                        {isSubmitting
                                            ? "Sending..."
                                            : "Send Message"}
                                    </div>
                                    <div className="bg-foreground-title1 text-background p-3 rounded-full text-sm font-medium underline">
                                        <ArrowUpRight size={24} />
                                    </div>
                                </button>
                            </AnimatedContent>
                        </form>
                    </div>
                </section>
                <section className="w-full flex flex-col items-center">
                    <div className="w-full relative max-w-[1536px] flex flex-col gap-2 justify-between items-center p-6">
                        <div className="w-full flex flex-col items-center gap-5 md:gap-10 py-15 pb-40">
                            <div className=" w-full flex justify-between items-center px-2 max-w-[550px] md:max-w-[750px] lg:max-w-[950px]">
                                {theme === "dark" ? (
                                    <div className=" w-full flex justify-between items-center px-2 max-w-[550px] md:max-w-[750px] lg:max-w-[950px]">
                                        <AnimatedContent
                                            distance={30}
                                            direction="vertical"
                                            reverse={false}
                                            duration={0.9}
                                            delay={0.2}
                                        >
                                            <SpinWord duration={6}>
                                                <Image
                                                    src={shape1_dark}
                                                    alt="shape1_dark"
                                                    className="hover:scale-125 transition-all duration-300"
                                                />
                                            </SpinWord>
                                        </AnimatedContent>
                                        <AnimatedContent
                                            distance={30}
                                            direction="vertical"
                                            reverse={false}
                                            duration={0.9}
                                            delay={0.4}
                                        >
                                            <SpinWord duration={6}>
                                                <Image
                                                    src={shape2_dark}
                                                    alt="shape2_dark"
                                                    className="hover:scale-125 transition-all duration-300"
                                                />
                                            </SpinWord>
                                        </AnimatedContent>
                                    </div>
                                ) : (
                                    <div className=" w-full flex justify-between items-center px-2 max-w-[550px] md:max-w-[750px] lg:max-w-[950px]">
                                        <AnimatedContent
                                            distance={30}
                                            direction="vertical"
                                            reverse={false}
                                            duration={0.9}
                                            delay={0.2}
                                        >
                                            <SpinWord duration={6}>
                                                <Image
                                                    src={shape1_light}
                                                    alt="shape1_light"
                                                    className="hover:scale-125 transition-all duration-300"
                                                />
                                            </SpinWord>
                                        </AnimatedContent>
                                        <AnimatedContent
                                            distance={30}
                                            direction="vertical"
                                            reverse={false}
                                            duration={0.9}
                                            delay={0.4}
                                        >
                                            <SpinWord duration={6}>
                                                <Image
                                                    src={shape2_light}
                                                    alt="shape2_light"
                                                    className="hover:scale-125 transition-all duration-300"
                                                />
                                            </SpinWord>
                                        </AnimatedContent>
                                    </div>
                                )}
                            </div>
                            <SplitText
                                text="Ready for change your big idea to extraordinary"
                                className="w-full text-3xl max-w-[400px] md:text-5xl md:max-w-[600px] lg:text-6xl lg:max-w-[800px] font-ankish"
                                splitType="words"
                                textAlign="center"
                            />
                            {theme === "dark" ? (
                                <div className="w-full flex justify-between items-center max-w-[550px] md:max-w-[750px] lg:max-w-[950px] px-6 md:px-25">
                                    <AnimatedContent
                                        distance={30}
                                        direction="vertical"
                                        reverse={false}
                                        duration={0.9}
                                        delay={0.6}
                                    >
                                        <SpinWord duration={6}>
                                            <Image
                                                src={shape3_dark}
                                                alt="shape3_dark"
                                                className="hover:scale-125 transition-all duration-300"
                                            />
                                        </SpinWord>
                                    </AnimatedContent>
                                    <AnimatedContent
                                        distance={30}
                                        direction="vertical"
                                        reverse={false}
                                        duration={0.9}
                                        delay={0.8}
                                    >
                                        <SpinWord duration={6}>
                                            <Image
                                                src={shape4_dark}
                                                alt="shape4_dark"
                                                className="hover:scale-125 transition-all duration-300"
                                            />
                                        </SpinWord>
                                    </AnimatedContent>
                                </div>
                            ) : (
                                <div className="w-full flex justify-between items-center max-w-[550px] md:max-w-[750px] lg:max-w-[950px] px-6 md:px-25">
                                    <AnimatedContent
                                        distance={30}
                                        direction="vertical"
                                        reverse={false}
                                        duration={0.9}
                                        delay={0.6}
                                    >
                                        <SpinWord duration={6}>
                                            <Image
                                                src={shape3_light}
                                                alt="shape3_light"
                                                className="hover:scale-125 transition-all duration-300"
                                            />
                                        </SpinWord>
                                    </AnimatedContent>
                                    <AnimatedContent
                                        distance={30}
                                        direction="vertical"
                                        reverse={false}
                                        duration={0.9}
                                        delay={0.8}
                                    >
                                        <SpinWord duration={6}>
                                            <Image
                                                src={shape4_light}
                                                alt="shape4_light"
                                                className="hover:scale-125 transition-all duration-300"
                                                width={100}
                                            />
                                        </SpinWord>
                                    </AnimatedContent>
                                </div>
                            )}
                        </div>
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
                            <nav className="flex items-center gap-2 uppercase">
                                <div className="flex items-center md:items-start gap-4 md:gap-6 flex-col md:flex-row text-sm">
                                    <a
                                        href="#home"
                                        className="sm:w-auto md:max-w-[120px]"
                                    >
                                        {theme === "dark" ? (
                                            <Image
                                                src="/logo_aek1.svg"
                                                alt="Logo"
                                                width={50}
                                                height={50}
                                            />
                                        ) : (
                                            <Image
                                                src="/logo_aek.svg"
                                                alt="Logo"
                                                width={50}
                                                height={50}
                                            />
                                        )}
                                    </a>
                                    <div className="flex gap-4 md:gap-6 self-end">
                                        <a href="#about">About</a>
                                        <a href="#skills">Skills</a>
                                        <a href="#projects">Projects</a>
                                        <a
                                            href="#contact"
                                            className="flex items-center underline"
                                        >
                                            <span>let's talk</span>
                                            <ArrowUpRight size={20} />
                                        </a>
                                    </div>
                                </div>
                            </nav>
                            <span className="text-[11px] text-foreground-title1 ">
                                © 2025 Abdellah El Kacem, All rights reserved.
                            </span>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
}
