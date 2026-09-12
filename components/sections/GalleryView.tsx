"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  Github,
  Search,
  X,
  Sparkles,
  Layers,
  SlidersHorizontal,
} from "lucide-react";
import listProject, { ProjectItem } from "@/app/project_list";
import NavBar from "@/components/sections/NavBar";
import BubbleMenu from "@/components/BubbleMenu";
import ProjectSlider from "@/components/ProjectSlider";
import ProjectModal from "@/components/sections/ProjectModal";
import FooterSection from "@/components/sections/FooterSection";
import AnimatedContent from "@/components/AnimatedContent";
import SplitText from "@/components/SplitText";

const skillNames: Record<string, string> = {
  "/html.svg": "HTML",
  "/css.svg": "CSS",
  "/talwindcss.svg": "Tailwind CSS",
  "/typescript.svg": "TypeScript",
  "/javascript.svg": "JavaScript",
  "/react.svg": "React",
  "/nextjs.svg": "Next.js",
  "/expressjs.svg": "Express.js",
  "/express.svg": "Express.js",
  "/figma.svg": "Figma",
  "/ps.svg": "Photoshop",
  "/ai.svg": "Illustrator",
  "/firbase.svg": "Firebase",
  "/github.svg": "GitHub",
  "/graphql.svg": "GraphQL",
  "/py.svg": "Python",
  "/django.svg": "Django",
  "/postgre.svg": "PostgreSQL",
  "/docker.svg": "Docker",
};

export default function GalleryView() {
  const [theme, setTheme] = useState<string | null>(null);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const searchParams = useSearchParams();

  // Auto-open project modal if linked with ?project=ID or ?project=NAME
  useEffect(() => {
    const projQuery = searchParams.get("project");
    if (projQuery) {
      const match = listProject.find(
        (p) =>
          String(p.id) === projQuery ||
          p.title.toLowerCase().includes(projQuery.toLowerCase())
      );
      if (match) {
        setSelectedProject(match);
        setIsVisible(true);
        setSliderIndex(0);
      }
    }
  }, [searchParams]);

  // Auto-advance modal slider
  useEffect(() => {
    setSliderIndex(0);
  }, [selectedProject]);

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

  // Lock scroll when modal is open
  useEffect(() => {
    if (isVisible) {
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
  }, [isVisible]);

  // Theme & scroll listener
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

  // Derive unique tags and counts
  const { allTags, tagCounts } = useMemo(() => {
    const counts: Record<string, number> = { All: listProject.length };
    const tagSet = new Set<string>();

    listProject.forEach((project) => {
      project.tags.forEach((tag) => {
        tagSet.add(tag);
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });

    return {
      allTags: ["All", ...Array.from(tagSet)],
      tagCounts: counts,
    };
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return listProject.filter((project) => {
      const matchesTag =
        selectedTag === "All" || project.tags.includes(selectedTag);

      if (!matchesTag) return false;
      if (!q) return true;

      const titleMatch = project.title.toLowerCase().includes(q);
      const descMatch = project.description.toLowerCase().includes(q);
      const tagMatch = project.tags.some((t) => t.toLowerCase().includes(q));
      const yearMatch = project.year.toLowerCase().includes(q);
      const skillMatch = project.skills.some((s) => {
        const name = skillNames[s] || s;
        return name.toLowerCase().includes(q);
      });

      return titleMatch || descMatch || tagMatch || yearMatch || skillMatch;
    });
  }, [selectedTag, searchQuery]);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center overflow-x-hidden">
      {/* Top Navigation */}
      <NavBar theme={theme} navHidden={navHidden} toggleTheme={toggleTheme} />

      {/* Mobile Drawer Menu */}
      <BubbleMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(!isMenuOpen)}
        menuItems={[
          { label: "Home", number: "(01)", link: "/#home" },
          { label: "About", number: "(02)", link: "/#about" },
          { label: "Skills", number: "(03)", link: "/#skills" },
          { label: "Projects", number: "(04)", link: "/#projects" },
          { label: "Gallery", number: "(05)", link: "/gallery" },
          { label: "Contact", number: "(06)", link: "/#contact" },
        ]}
        theme={theme}
        onToggleTheme={toggleTheme}
        navHidden={navHidden}
      />

      {/* Main Gallery Container */}
      <main className="w-full max-w-[1536px] flex flex-col items-center px-4 sm:px-6 md:px-10 pt-28 md:pt-36 pb-20 gap-10 md:gap-14">
        {/* Back Link + Breadcrumbs */}
        <div className="w-full flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm md:text-base text-[#93A2A3] hover:text-foreground transition-all duration-200 group"
          >
            <div className="p-2 rounded-full bg-background2/60 group-hover:bg-background2 transition-colors">
              <ArrowLeft
                size={16}
                className="transition-transform group-hover:-translate-x-0.5"
              />
            </div>
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-xs md:text-sm text-[#93A2A3]">
            <span className="hidden sm:inline">Portfolio</span>
            <span className="hidden sm:inline">/</span>
            <span className="text-foreground font-medium">Gallery Archive</span>
          </div>
        </div>

        {/* Gallery Hero Header */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-foreground1/15">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <AnimatedContent direction="vertical" duration={0.8} delay={0.1}>
                <Image
                  src="/Portal1.png"
                  alt="Decorative portal shape"
                  width={60}
                  height={60}
                  className="w-12 h-12 md:w-14 md:h-14"
                />
              </AnimatedContent>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffa958] animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-semibold text-foreground1">
                  All Works & Explorations
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-ankish tracking-tight">
                Projects Gallery
              </h1>
              <span className="text-sm md:text-base text-[#93A2A3] font-sans font-medium">
                ({listProject.length})
              </span>
            </div>

            <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
              Explore the complete design and engineering archive: from full-stack platforms
              and modern streaming applications to design systems and mobile case studies.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative flex items-center">
            <Search
              size={18}
              className="absolute left-3.5 text-[#93A2A3] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, stack, tags..."
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-background2/50 border border-foreground1/20 focus:border-foreground focus:outline-none text-sm text-foreground placeholder:text-[#93A2A3] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 text-[#93A2A3] hover:text-foreground p-1 transition-colors"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Tag Filters */}
        <div className="w-full flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-[#93A2A3] mr-2 shrink-0">
            <SlidersHorizontal size={14} />
            <span className="font-medium">Filter:</span>
          </div>

          {allTags.map((tag) => {
            const isActive = selectedTag === tag;
            const count = tagCounts[tag] || 0;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-foreground text-background shadow-md shadow-foreground/10"
                    : "bg-background2/60 text-[#93A2A3] hover:text-foreground hover:bg-background2 border border-foreground1/10"
                }`}
              >
                <span>{tag}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-background/25 text-background"
                      : "bg-foreground1/10 text-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => (
              <AnimatedContent
                key={project.id}
                direction="vertical"
                duration={0.7}
                delay={index * 0.05}
              >
                <div className="group w-full h-full flex flex-col justify-between rounded-3xl bg-background2/35 hover:bg-background2/65 border border-foreground1/15 hover:border-foreground/30 p-4 transition-all duration-300 hover:shadow-xl/10">
                  <div className="flex flex-col gap-4">
                    {/* Project Slider Image Preview */}
                    <div className="w-full">
                      <ProjectSlider
                        images={project.image}
                        title={project.title}
                      />
                    </div>

                    {/* Header: Title + Year */}
                    <div className="flex items-start justify-between gap-2 px-1">
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-foreground transition-colors">
                          {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {project.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 text-[11px] rounded-md bg-background2 text-foreground font-normal"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-1.5 py-0.5 text-[10px] text-[#93A2A3]">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-background border border-foreground1/20 text-foreground/50 shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Brief Description */}
                    <p className="px-1 text-xs md:text-sm text-[#93A2A3] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack Preview Icons */}
                    <div className="px-1 pt-1 flex items-center gap-1.5 overflow-hidden">
                      {project.skills.slice(0, 6).map((iconPath, sIdx) => {
                        const name = skillNames[iconPath] || "Tech";
                        return (
                          <div
                            key={sIdx}
                            title={name}
                            className="p-1.5 rounded-lg bg-background border border-foreground1/15 flex items-center justify-center shrink-0 hover:scale-110 transition-transform"
                          >
                            <Image
                              src={iconPath}
                              alt={name}
                              width={18}
                              height={18}
                              className="w-4 h-4 object-contain"
                            />
                          </div>
                        );
                      })}
                      {project.skills.length > 6 && (
                        <span className="text-[11px] text-[#93A2A3] font-medium pl-1">
                          +{project.skills.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-5 px-1 flex items-center justify-between gap-2 border-t border-foreground1/10 mt-4">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setIsVisible(true);
                        setSliderIndex(0);
                      }}
                      className="flex-1 py-2 px-4 rounded-xl bg-background3 text-background hover:bg-background3/90 text-xs md:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200"
                    >
                      <span>Case Details</span>
                      <ArrowUpRight size={16} />
                    </button>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Open Live Website / Preview"
                        className="p-2 rounded-xl bg-background border border-foreground1/20 hover:border-foreground text-foreground flex items-center justify-center transition-all hover:scale-105"
                      >
                        <ArrowUpRight size={17} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View GitHub Repository"
                        className="p-2 rounded-xl bg-background border border-foreground1/20 hover:border-foreground text-foreground flex items-center justify-center transition-all hover:scale-105"
                      >
                        <Github size={17} />
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
          <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-center rounded-3xl bg-background2/20 border border-dashed border-foreground1/20 p-8">
            <div className="p-4 rounded-full bg-background2/40 text-[#93A2A3]">
              <Layers size={32} />
            </div>
            <h3 className="text-lg font-semibold">No projects match your filter</h3>
            <p className="text-sm text-[#93A2A3] max-w-md">
              No results found for &ldquo;{searchQuery || selectedTag}&rdquo;. Try
              clearing the search input or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedTag("All");
                setSearchQuery("");
              }}
              className="mt-2 px-5 py-2 rounded-xl bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* Project Details Modal */}
      <ProjectModal
        selectedProject={selectedProject}
        isVisible={isVisible}
        sliderIndex={sliderIndex}
        setIsVisible={setIsVisible}
        setSliderIndex={setSliderIndex}
      />

      {/* Footer */}
      <FooterSection theme={theme} />
    </div>
  );
}
