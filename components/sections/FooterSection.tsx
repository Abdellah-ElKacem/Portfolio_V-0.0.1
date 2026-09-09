"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import shape1_light from "@/public/shape1_light.svg";
import shape2_light from "@/public/shape2_light.svg";
import shape3_light from "@/public/shape3_light.svg";
import shape4_light from "@/public/shape4_light.svg";
import shape1_dark from "@/public/shape1_dark.svg";
import shape2_dark from "@/public/shape2_dark.svg";
import shape3_dark from "@/public/shape3_dark.svg";
import shape4_dark from "@/public/shape4_dark.svg";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import SpinWord from "@/components/SpinWord";

interface FooterSectionProps {
  theme: string | null;
}

export default function FooterSection({ theme }: FooterSectionProps) {
  return (
    <section className="w-full flex flex-col items-center">
      <div className="w-full relative max-w-[1536px] flex flex-col gap-2 justify-between items-center p-6">
        <div className="w-full flex flex-col items-center gap-5 md:gap-10 py-15 pb-40">
          <div className=" w-full flex justify-between items-center px-2 max-w-[550px] md:max-w-[750px] lg:max-w-[950px]">
            {theme === "dark" ? (
              <div className=" w-full flex justify-between items-center px-2 max-w-[550px] md:max-w-[750px] lg:max-w-[950px]">
                <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.2}>
                  <SpinWord duration={6}>
                    <Image src={shape1_dark} alt="shape1_dark" className="hover:scale-125 transition-all duration-300" />
                  </SpinWord>
                </AnimatedContent>
                <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.4}>
                  <SpinWord duration={6}>
                    <Image src={shape2_dark} alt="shape2_dark" className="hover:scale-125 transition-all duration-300" />
                  </SpinWord>
                </AnimatedContent>
              </div>
            ) : (
              <div className=" w-full flex justify-between items-center px-2 max-w-[550px] md:max-w-[750px] lg:max-w-[950px]">
                <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.2}>
                  <SpinWord duration={6}>
                    <Image src={shape1_light} alt="shape1_light" className="hover:scale-125 transition-all duration-300" />
                  </SpinWord>
                </AnimatedContent>
                <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.4}>
                  <SpinWord duration={6}>
                    <Image src={shape2_light} alt="shape2_light" className="hover:scale-125 transition-all duration-300" />
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
              <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.6}>
                <SpinWord duration={6}>
                  <Image src={shape3_dark} alt="shape3_dark" className="hover:scale-125 transition-all duration-300" />
                </SpinWord>
              </AnimatedContent>
              <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.8}>
                <SpinWord duration={6}>
                  <Image src={shape4_dark} alt="shape4_dark" className="hover:scale-125 transition-all duration-300" />
                </SpinWord>
              </AnimatedContent>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center max-w-[550px] md:max-w-[750px] lg:max-w-[950px] px-6 md:px-25">
              <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.6}>
                <SpinWord duration={6}>
                  <Image src={shape3_light} alt="shape3_light" className="hover:scale-125 transition-all duration-300" />
                </SpinWord>
              </AnimatedContent>
              <AnimatedContent distance={30} direction="vertical" reverse={false} duration={0.9} delay={0.8}>
                <SpinWord duration={6}>
                  <Image src={shape4_light} alt="shape4_light" className="hover:scale-125 transition-all duration-300" width={100} />
                </SpinWord>
              </AnimatedContent>
            </div>
          )}
        </div>

        {/* Footer nav + copyright */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
          <nav className="flex items-center gap-2 uppercase">
            <div className="flex items-center md:items-start gap-4 md:gap-6 flex-col md:flex-row text-sm">
              <a href="#home" className="sm:w-auto md:max-w-[120px]">
                {theme === "dark" ? (
                  <Image src="/logo_aek1.svg" alt="Logo" width={50} height={50} className="w-auto h-auto" />
                ) : (
                  <Image src="/logo_aek.svg" alt="Logo" width={50} height={50} className="w-auto h-auto" />
                )}
              </a>
              <div className="flex gap-4 md:gap-6 self-end">
                <a href="#about">About</a>
                <a href="#skills">Skills</a>
                <a href="#projects">Projects</a>
                <a href="#contact" className="flex items-center underline">
                  <span>let&apos;s talk</span>
                  <ArrowUpRight size={20} />
                </a>
              </div>
            </div>
          </nav>
          <span className="text-[11px] text-foreground-title1 ">
            © {new Date().getFullYear()} Abdellah El Kacem, All rights reserved.
          </span>
        </div>
      </div>
    </section>
  );
}
