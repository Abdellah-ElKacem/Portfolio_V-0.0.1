"use client";

import React, { useEffect, useRef, useState } from "react";
import { ProjectItem } from "@/app/project_list";
import Loading from "@/components/Loading";
import BubbleMenu from "@/components/BubbleMenu";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ProjectModal from "@/components/sections/ProjectModal";
import ContactSection from "@/components/sections/ContactSection";
import FooterSection from "@/components/sections/FooterSection";

export default function LandingPage() {
  const [theme, setTheme] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [autoPlay] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset slider when project changes
  useEffect(() => {
    setSliderIndex(0);
  }, [selectedProject]);

  // Auto-advance modal slider
  useEffect(() => {
    if (selectedProject && selectedProject.image.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setSliderIndex((i) => (i + 1) % selectedProject.image.length);
      }, 3000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [selectedProject]);

  // Lock scroll when loading or modal is open (both html and body)
  useEffect(() => {
    const isLocked = isLoading || isVisible;
    if (isLocked) {
      document.documentElement.classList.add("no-scroll");
      document.body.classList.add("no-scroll");
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isLoading, isVisible]);

  // Theme + scroll detection
  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(current);

    const onScroll = () => {
      const y = window.scrollY || 0;
      const goingDown = y > lastY.current;
      if (y <= 8) setNavHidden(false);
      else if (goingDown && y > 24) setNavHidden(true);
      else setNavHidden(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <>
      <Loading onComplete={() => setIsLoading(false)} />

      <NavBar theme={theme} navHidden={navHidden} toggleTheme={toggleTheme} />

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
        <HeroSection theme={theme} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection
          setSelectedProject={setSelectedProject}
          setIsVisible={setIsVisible}
          setSliderIndex={setSliderIndex}
        />
        <ContactSection />
        <FooterSection theme={theme} />
      </section>

      {/* Project detail modal — rendered at root level to avoid stacking context issues */}
      <ProjectModal
        selectedProject={selectedProject}
        isVisible={isVisible}
        sliderIndex={sliderIndex}
        setIsVisible={setIsVisible}
        setSliderIndex={setSliderIndex}
      />
    </>
  );
}
