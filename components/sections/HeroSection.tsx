"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faBehance,
  faInstagram,
  faLinkedinIn,
  faDribbble
} from "@fortawesome/free-brands-svg-icons";
import { Mouse } from "lucide-react";
import me_3 from "@/images/photo.jpeg";
import SplitText from "@/components/SplitText";
import TextType from "@/components/TextType";
import Magnet from "@/components/Magnet";
import CircularText from "@/components/CircularText";

interface HeroSectionProps {
  theme: string | null;
}

export default function HeroSection({ theme }: HeroSectionProps) {
  return (
    <section
      id="home"
      className=" flex flex-col md:min-h-[1000px] justify-between w-full max-w-[1536px] px-6"
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
              I design intuitive interfaces and develop fast,
              <br />
              responsive web experiences — where functionality meets aesthetics.
              Let&apos;s build something exceptional.
            </p>
            <div className="flex gap-3 pt-4 text-foreground-title1 text-xs md:text-base items-start">
              <span className=" font-semibold">Follow Me — </span>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/abdellah_elkacem/"
                  className="transition-transform duration-200 hover:scale-125 hover:text-[#E1306C] hover:rotate-[-10deg] inline-block"
                >
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a
                  href="https://x.com/kacem_abdellah"
                  className="transition-transform duration-200 hover:scale-125 hover:text-[#000000] dark:hover:text-[#ffffff] hover:rotate-[10deg] inline-block"
                >
                  <FontAwesomeIcon icon={faXTwitter} size="lg" />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdellah-el-kacem/"
                  className="transition-transform duration-200 hover:scale-125 hover:text-[#0A66C2] hover:rotate-[-10deg] inline-block"
                >
                  <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
                </a>
                <a
                  href="https://dribbble.com/Kaciimo"
                  className="transition-transform duration-200 hover:scale-125 hover:text-[#ea4c89] hover:rotate-[10deg] inline-block"
                >
                  <FontAwesomeIcon icon={faDribbble} size="lg" />
                </a>
              </div>
              <div className="font-semibold group ">
                <a
                  href="/resume"
                  download
                  className="inline-block transition-all duration-200 hover:scale-102 hover:-rotate-3 hover:text-[#ffa958] shadow-2xl"
                >
                  Download Resume
                </a>
                <div className="h-0.5 mt-px w-0 group-hover:w-[120px] bg-[#ffa958] transition-all duration-200 origin-left group-hover:scale-110 group-hover:-rotate-3" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center -space-x-2 lg:-space-x-3 xl:-space-x-4">
              <div className="bg-foreground-title1 rounded-[100%] w-15 h-70 md:w-20 md:h-100 xl:w-25 xl:h-110" />
              <div className="bg-foreground-title1 rounded-[100%] w-25 h-70 md:w-30 md:h-100 xl:w-35 xl:h-110" />
              <div className="relative bg-[#274546] z-10 rounded-full w-55 h-90 md:w-85 md:h-130 xl:w-90 xl:h-140 overflow-hidden">
                <Image
                  src={me_3}
                  alt="Me"
                  placeholder="blur"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-[#222222]/20 pointer-events-none"></div>
              </div>
              <div className="bg-foreground-title1 rounded-[100%] w-[12%] h-70 md:w-10 md:h-100 xl:w-20 xl:h-110" />
            </div>
            <span className="group self-end text-3xl md:text-[40px] lg:text-5xl xl:text-6xl font-crust -rotate-15 pr-7 cursor-default inline-flex">
              Kacimo
            </span>
          </div>
        </div>
      </div>
      <div className="flex font-ankish justify-between items-center gap-3 text-lg md:text-4xl md:pt-20">
        <div>
          <span className="text-sm md:text-2xl font-bold">©</span>
          {new Date().getFullYear()}
        </div>
        <Magnet padding={150} disabled={false} magnetStrength={4}>
          <div className="hidden md:block relative mb-14">
            <div className="absolute inset-0 flex items-center justify-center">
              <Mouse size={28} className="text-foreground" />
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
          <span className="pt-3 flex gap-2 items-center">/house made</span>
          <Image
            src="/Portal.png"
            alt="Heart"
            width={120}
            height={120}
            className="w-20 h-20 md:w-27 md:h-27 z-[-1]"
          />
        </div>
      </div>
    </section>
  );
}
