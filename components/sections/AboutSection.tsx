"use client";
import Image from "next/image";
import me_1 from "@/images/photo main.jpg";
import SplitText from "@/components/SplitText";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedContent from "@/components/AnimatedContent";
import CurvedLoop from "@/components/CurvedLoop";
import DecayCard from "@/components/DecayCard";

export default function AboutSection() {
  return (
    <section
      className="relative flex flex-col justify-center items-center w-full -scrosll-mt-[50px]"
      id="about"
    >
      <div className="relative flex flex-col justify-around w-full max-w-[1536px] p-6 gap-15">
        <div className="flex flex-col lg:flex-row justify-between items-start">
          <div className="flex -space-x-17 pt-6">
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
              My name is Abdellah EL KACEM, and I&apos;m passionate about
              crafting digital experiences that people love to use. With over 5
              years of design experience and 1 year of front-end development
              experience, I work at the intersection of UI/UX design, graphic
              design, and front-end development, turning concepts into
              interactive, meaningful, and visually refined interfaces. I am
              also a student at 1337 Coding School in Khouribga, continuously
              sharpening my problem-solving and software development skills.
            </ScrollReveal>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center lg:items-end gap-9">
          <div className="flex flex-col md:flex-row gap-17 md:gap-9 md:items-end">
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
                  <span className="group font-crust inline-flex cursor-default">
                    <span
                      className="text-foreground-title1 transition-colors duration-300 group-hover:text-[#ffa958]"
                      style={{ transitionDelay: "0ms" }}
                    >
                      K
                    </span>
                    <span
                      className="text-foreground-title1 transition-colors duration-300 group-hover:text-[#E1306C]"
                      style={{ transitionDelay: "60ms" }}
                    >
                      a
                    </span>
                    <span
                      className="text-foreground-title1 transition-colors duration-300 group-hover:text-[#A855F7]"
                      style={{ transitionDelay: "120ms" }}
                    >
                      c
                    </span>
                    <span
                      className="text-foreground-title1 transition-colors duration-300 group-hover:text-[#0A66C2]"
                      style={{ transitionDelay: "180ms" }}
                    >
                      i
                    </span>
                    <span
                      className="text-foreground-title1 transition-colors duration-300 group-hover:text-[#10B981]"
                      style={{ transitionDelay: "240ms" }}
                    >
                      m
                    </span>
                    <span
                      className="text-foreground-title1 transition-colors duration-300 group-hover:text-[#ffa958]"
                      style={{ transitionDelay: "300ms" }}
                    >
                      o
                    </span>
                  </span>{" "}
                  a designer <br /> based in El Jadida
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
                <DecayCard image={me_1.src} width={300} height={450} baseFrequency={8} />
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
              I believe great design is more than visuals — it&apos;s about
              clarity, emotion, and usability. Whether I&apos;m writing code,
              shaping a layout, or refining a brand identity, I focus on
              creating smooth experiences and strong visual impact. Every
              project is an opportunity to learn, experiment, and bring ideas to
              life.
            </ScrollReveal>
          </div>
        </div>
      </div>
      <div className="text-foreground1 w-full z-[-1]">
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
  );
}
