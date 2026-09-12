"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import listProject, { ProjectItem } from "@/app/project_list";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import ProjectSlider from "@/components/ProjectSlider";
import FlowingMenu from "@/components/FlowingMenu";

import Hypertube1 from "@/images/hyper1.jpg";
import Portfolio from "@/images/portfolio_moke_up.png";
import AuraPrestigeTech from "@/images/web_aura_moke_up.png";
import Domicilia from "@/images/domicilia_moke_up.png";

interface ProjectsSectionProps {
  setSelectedProject: (p: ProjectItem) => void;
  setIsVisible: (v: boolean) => void;
  setSliderIndex: (i: number) => void;
}

export default function ProjectsSection({
  setSelectedProject,
  setIsVisible,
  setSliderIndex,
}: ProjectsSectionProps) {
  const processRowRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);
  const card3Ref = useRef<HTMLDivElement | null>(null);
  const [connectorPath12, setConnectorPath12] = useState<string>("");
  const [connectorPath23, setConnectorPath23] = useState<string>("");
  const [anchorP1, setAnchorP1] = useState<[number, number] | null>(null);
  const [anchorP2, setAnchorP2] = useState<[number, number] | null>(null);
  const [anchorP3, setAnchorP3] = useState<[number, number] | null>(null);
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(6);

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
    const d12 = `M ${p1x} ${p1y} C ${p1x + dx1} ${p1y - dy}, ${p2x - dx1} ${p2y - dy}, ${p2x} ${p2y}`;
    const d23 = `M ${p2x} ${p2y} C ${p2x + dx2} ${p2y - dy}, ${p3x - dx2} ${p3y - dy}, ${p3x} ${p3y}`;
    setConnectorPath12(d12);
    setConnectorPath23(d23);
    setAnchorP1([p1x, p1y]);
    setAnchorP2([p2x, p2y]);
    setAnchorP3([p3x, p3y]);
  };

  const demoItems = [
    {
      link: "/gallery?project=1",
      text: "Hypertube",
      image: Hypertube1,
      onClick: () => {
        const p = listProject.find((item) => item.id === 1) || listProject[0];
        setSelectedProject(p);
        setIsVisible(true);
        setSliderIndex(0);
      },
    },
    {
      link: "/gallery?project=2",
      text: "Portfolio",
      image: Portfolio,
      onClick: () => {
        const p = listProject.find((item) => item.id === 2) || listProject[1];
        setSelectedProject(p);
        setIsVisible(true);
        setSliderIndex(0);
      },
    },
    {
      link: "/gallery?project=3",
      text: "Aura Prestige Tech",
      image: AuraPrestigeTech,
      onClick: () => {
        const p = listProject.find((item) => item.id === 3) || listProject[2];
        setSelectedProject(p);
        setIsVisible(true);
        setSliderIndex(0);
      },
    },
    {
      link: "/gallery?project=4",
      text: "Domicilia App",
      image: Domicilia,
      onClick: () => {
        const p = listProject.find((item) => item.id === 4) || listProject[3];
        setSelectedProject(p);
        setIsVisible(true);
        setSliderIndex(0);
      },
    },
  ];

  useEffect(() => {
    computeConnectors();
    const onResize = () => computeConnectors();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      className="w-full flex flex-col items-center pt-6 scroll-mt-[30px]"
      id="projects"
    >
      <div className="w-full max-w-[1536px] flex flex-col items-center gap-10 px-6">
        <div className="w-full flex md:flex-row flex-col gap-2">
          <div className="flex -space-x-17  flex-1">
            <AnimatedContent direction="vertical" duration={0.9} delay={0.4}>
              <Image
                src="/Portal1.png"
                alt="shape"
                width={120}
                height={120}
                className="w-20 h-20 md:w-27 md:h-27"
              />
            </AnimatedContent>
            <div className="flex items-center gap-1 ">
              <AnimatedContent direction="vertical" duration={0.9} delay={0.1}>
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
              text="Here's how it works"
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

        {/* Process cards with connectors */}
        <div
          ref={processRowRef}
          className="relative flex md:flex-row flex-col flex-wrap justify-center md:py-30 lg:py-40 md:gap-5 md:-space-y-2"
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
                  Understanding your goals, users, and challenges through
                  research and strategy.
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
                  Transforming insight into intuitive, beautiful, and functional
                  product experiences.
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
                  Testing, refining, and launching the final product with
                  clarify and precision.
                </p>
              </div>
            </div>
          </AnimatedContent>
        </div>

        {/* Selected Works grid */}
        <div className="w-full flex flex-col items-center gap-10 md:pb-30 pb-10">
          <SplitText
            text="Selected Works"
            className="text-xl md:text-2xl lg:text-4xl font-medium self-end"
            splitType="words"
          />
        </div>
      </div>
      <div className="w-full relative" style={{ height: "800px", paddingBottom: "100px" }}>
        <FlowingMenu
          items={demoItems}
          speed={6}
          textColor="var(--foreground)"
          bgColor="var(--background)"
          marqueeBgColor="var(--foreground-title2)"
          marqueeTextColor="var(--background)"
          borderColor="var(--foreground1-16)"
        />
      </div>
      <div className="w-full flex justify-center pt-8 pb-4">
        <Link
          href="/gallery"
          className="group px-6 py-2.5 rounded-full bg-background2/70 hover:bg-foreground hover:text-background text-foreground text-xs md:text-sm font-medium flex items-center gap-2 transition-all duration-300 border border-foreground1/20 shadow-sm"
        >
          <span>Explore More in Gallery</span>
          <ArrowUpRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
