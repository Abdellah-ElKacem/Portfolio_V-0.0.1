"use client";
import Image from "next/image";
import listSkill from "@/app/skill_list";
import SplitText from "@/components/SplitText";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";

export default function SkillsSection() {
  return (
    <section
      className="w-full flex flex-col items-center mtx-20 gap-20 p-6"
      id="skills"
    >
      <div className="flex flex-col md:min-h-[1000px] w-full max-w-[1536px]">
        <div className="flex -space-x-17 pt-6 flex-1">
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
  );
}
