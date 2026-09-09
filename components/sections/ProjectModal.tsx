"use client";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import { ProjectItem } from "@/app/project_list";

interface ProjectModalProps {
  selectedProject: ProjectItem | null;
  isVisible: boolean;
  sliderIndex: number;
  setIsVisible: (v: boolean) => void;
  setSliderIndex: (i: number) => void;
}

export default function ProjectModal({
  selectedProject,
  isVisible,
  sliderIndex,
  setIsVisible,
  setSliderIndex,
}: ProjectModalProps) {
  if (!selectedProject) return null;

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

  return (
    <>
      <div
        onClick={() => setIsVisible(!isVisible)}
        className={`fixed inset-0 w-full h-full bg-black/80 backdrop-blur-xs flex justify-center items-center z-500 transition-opacity duration-500 ease-in-out overscroll-contain ${
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full flex flex-col bg-background max-w-[350px] md:max-w-[750px] h-full max-h-[90vh] rounded-2xl shadow-2xl border border-background2 p-2 md:p-4 overflow-hidden transition-all duration-500 ease-in-out overscroll-contain ${
            isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
          }`}
        >
          <div className="flex flex-col justify-between gap-3 overflow-x-hidden overflow-y-auto h-full max-h-full hide-scrollbar overscroll-contain">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <div className="w-full relative overflow-hidden rounded-sm">
                  {/* Slide track */}
                  <div
                    className="flex transition-transform duration-500 ease-in-out h-[250px]"
                    style={{
                      transform: `translateX(-${sliderIndex * 100}%)`,
                    }}
                  >
                    {selectedProject.image.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative min-w-full h-[250px] flex-shrink-0"
                      >
                        <Image
                          src={img}
                          alt={`${selectedProject.title} ${idx + 1}`}
                          fill
                          className="object-cover"
                          priority={idx === 0}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="absolute top-3 right-3 z-10 cursor-pointer bg-black/70 rounded-full p-[6px]"
                  >
                    <X size={15} color="white" />
                  </button>

                  {/* Bottom gradient for bar visibility */}
                  {selectedProject.image.length > 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent z-[5] pointer-events-none rounded-b-sm" />
                  )}

                  {/* Bar indicators */}
                  {selectedProject.image.length > 1 && (
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-1.5">
                      {selectedProject.image.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSliderIndex(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className="flex-1 h-[3px] rounded-sm transition-all duration-300 ease-in-out cursor-pointer"
                          style={{
                            background:
                              i === sliderIndex
                                ? "rgba(255,255,255,0.95)"
                                : "rgba(255,255,255,0.35)",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4 pb-10">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center pr-1">
                      <h3 className="text-2xl md:text-4xl font-medium">
                        {selectedProject.title}
                      </h3>
                      <div className="p-2 px-3 text-xs md:text-sm bg-background1 rounded-lg w-fit h-fit">
                        <p>{selectedProject.year}</p>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm font-medium md:w-[95%] md:pl-2 leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <span className="text-xl text-foreground-title1 font-medium">
                      Technologies &amp; Skills
                    </span>
                    <div className="flex gap-5 pl-2 flex-wrap md:w-[75%]">
                      {selectedProject.skills.map((skill, skillIdx) => {
                        const name =
                          skillNames[skill] ??
                          skill.replace("/", "").replace(".svg", "");
                        return (
                          <div
                            key={skillIdx}
                            className="relative group/skill flex flex-col items-center"
                          >
                            <Image
                              src={skill}
                              alt={name}
                              width={30}
                              height={30}
                              className={`w-8 h-8 md:w-12 md:h-12 transition-transform duration-200 group-hover/skill:scale-110 ${
                                skill.includes("express") || skill.includes("github")
                                  ? "dark:invert [html[data-theme='dark']_&]:invert"
                                  : ""
                              }`}
                            />
                            <span className="pointer-events-none absolute -bottom-5 left-1/2 whitespace-nowrap rounded-md bg-background px-2 py-1 text-xs text-foreground-title opacity-0 transition-opacity duration-200 group-hover/skill:opacity-100">
                              {name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 flex-wrap">
                {selectedProject.tags.map((tag, tagIdx) => (
                  <div
                    key={tagIdx}
                    className="p-2 px-3 text-xs bg-background4 rounded-lg w-fit"
                  >
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
              <div className="h-px bg-foreground-title1 rounded-full" />
              <div className="w-full flex gap-4 justify-end items-center">
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="text-sm text-foreground-title1 cursor-pointer"
                >
                  Close
                </button>
                {selectedProject.url ? (
                  <a
                    href={selectedProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 px-6 text-sm bg-background3 rounded-lg text-background flex items-center gap-2 cursor-pointer"
                  >
                    <p>View the Project</p>
                    <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="p-2 px-6 text-sm bg-background3/80 rounded-lg text-background/90 flex items-center gap-2 cursor-not-allowed "
                  >
                    <p>Coming Soon</p>
                    <ArrowUpRight size={18} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
