"use client";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

interface NavBarProps {
  theme: string | null;
  navHidden: boolean;
  toggleTheme: () => void;
}

export default function NavBar({ theme, navHidden, toggleTheme }: NavBarProps) {
  return (
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
        </a>
        <a
          href="#about"
          className="hidden md:inline-block group relative overflow-hidden"
        >
          <span className="flex transition-transform duration-300 group-hover:translate-y-full">
            ABOUT
          </span>
          <span className="absolute inset-0 flex -translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            ABOUT
          </span>
        </a>
        <a
          href="#skills"
          className="hidden md:inline-block group relative overflow-hidden"
        >
          <span className="flex transition-transform duration-300 group-hover:translate-y-full">
            SKILLS
          </span>
          <span className="absolute inset-0 flex -translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            SKILLS
          </span>
        </a>
        <a
          href="#projects"
          className="hidden md:inline-block group relative overflow-hidden"
        >
          <span className="flex transition-transform duration-300 group-hover:translate-y-full">
            PROJECTS
          </span>
          <span className="absolute inset-0 flex -translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            PROJECTS
          </span>
        </a>
        <a
          href="#contact"
          className="group relative px-4 py-2 border-2 rounded-full border-foreground bg-background1 text-nowrap hidden md:inline-flex overflow-hidden"
        >
          <span className="flex transition-transform duration-300 group-hover:translate-y-full">
            LET&apos;S TALK
          </span>
          <span className="absolute inset-0 flex items-center justify-center -translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            LET&apos;S TALK
          </span>
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
  );
}
