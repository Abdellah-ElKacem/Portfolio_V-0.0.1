"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, CircleArrowRight } from "lucide-react";

interface NavBarProps {
  theme: string | null;
  navHidden: boolean;
  toggleTheme: () => void;
}

function RollingText({
  text,
  className = "",
  highlightClassName = "text-foreground",
}: {
  text: string;
  className?: string;
  highlightClassName?: string;
}) {
  return (
    <span className={`relative inline-flex overflow-hidden py-0.5 ${className}`}>
      <span className="inline-flex">
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
            className="inline-block transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>

      <span
        aria-hidden="true"
        className={`absolute inset-0 inline-flex py-0.5 select-none pointer-events-none ${highlightClassName}`}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
            className="inline-block translate-y-full transition-transform duration-350 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 will-change-transform"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
    </span>
  );
}

export default function NavBar({ theme, navHidden, toggleTheme }: NavBarProps) {
  const pathname = usePathname();
  const isGallery = pathname === "/gallery";

  return (
    <nav
      className={`fixed -top-2 md:top-0 left-0 right-0 py-6 transition-transform duration-800 z-50 bg-linear-to-b from-background to-transparent ${
        navHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="h-full flex justify-between md:justify-center items-center gap-8 font-medium px-6 text-base text-[#93A2A3]">
        <Link
          href="/#home"
          className="md:block hidden transition-transform duration-300 ease-out hover:scale-110 active:scale-95"
        >
          {theme === "dark" ? (
            <Image
              src="/logo_aek1.svg"
              alt="Logo"
              width={50}
              height={50}
              priority
              className="w-auto h-auto"
            />
          ) : (
            <Image
              src="/logo_aek.svg"
              alt="Logo"
              width={50}
              height={50}
              priority
              className="w-auto h-auto"
            />
          )}
        </Link>
        <Link
          href="/#about"
          className="hidden md:inline-block group relative"
        >
          <RollingText text="ABOUT" />
        </Link>
        <Link
          href="/#skills"
          className="hidden md:inline-block group relative"
        >
          <RollingText text="SKILLS" />
        </Link>
        <Link
          href="/#projects"
          className="hidden md:inline-block group relative"
        >
          <RollingText text="PROJECTS" />
        </Link>
        <Link
          href="/gallery"
          prefetch={true}
          className="hidden md:inline-flex items-center group relative"
        >
          <RollingText
            text="GALLERY"
            highlightClassName={isGallery ? "text-foreground" : "text-foreground"}
          />
          <CircleArrowRight
            size={30}
            strokeWidth={1}
            className={`ml-2 -rotate-45 transition-all duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-0 group-hover:translate-x-1 group-hover:-translate-y-0.5 group-hover:text-foreground group-hover:scale-105 ${
              isGallery ? "text-foreground" : ""
            }`}
          />
        </Link>
        <Link
          href="/#contact"
          className="group relative px-4 py-1.5 border-2 rounded-full border-foreground bg-background1 text-nowrap hidden md:inline-flex overflow-hidden items-center justify-center transition-all duration-300 ease-out hover:scale-105 active:scale-95 hover:shadow-[0_0_15px_rgba(216,216,216,0.15)]"
        >
          <RollingText text="LET'S TALK" />
        </Link>
        <div className="md:flex gap-2 items-center hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-foreground relative w-6 h-6 flex items-center justify-center transition-transform duration-200 hover:scale-110 active:scale-90"
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
  );
}
