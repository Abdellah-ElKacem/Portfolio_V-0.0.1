import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { StaticImageData } from 'next/image';
import AnimatedContent from './AnimatedContent';

interface MenuItemData {
  link?: string;
  text: string;
  image: string | StaticImageData;
  onClick?: () => void;
}

interface FlowingMenuProps {
  items?: MenuItemData[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  expandedRatio?: number;
  animDelayBase?: number;
  animDelayStep?: number;
  animDistance?: number;
  animDuration?: number;
}

interface MenuItemProps extends MenuItemData {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
  expandedRatio: number;
  index: number;
  animDelayBase: number;
  animDelayStep: number;
  animDistance: number;
  animDuration: number;
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = 'var(--foreground)',
  bgColor = 'var(--background)',
  marqueeBgColor = 'var(--foreground)',
  marqueeTextColor = 'var(--background)',
  borderColor = 'var(--foreground1-16)',
  expandedRatio = 2.5,
  animDelayBase = 0.2,
  animDelayStep = 0.15,
  animDistance = 30,
  animDuration = 0.9,
}) => {
  return (
    <div className="w-full h-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={idx === 0}
            expandedRatio={expandedRatio}
            index={idx}
            animDelayBase={animDelayBase}
            animDelayStep={animDelayStep}
            animDistance={animDistance}
            animDuration={animDuration}
          />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
  expandedRatio,
  index,
  animDelayBase,
  animDelayStep,
  animDistance,
  animDuration,
  onClick,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [text, image]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee-part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, image, repetitions, speed]);

  const handleMouseEnter = (ev: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const imageUrl = typeof image === 'string' ? image : image.src;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="relative overflow-hidden text-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        flex: isHovered ? expandedRatio : 1,
        borderTop: isFirst ? 'none' : `1px solid ${borderColor}`,
      }}
    >
      <AnimatedContent
        distance={animDistance}
        direction="vertical"
        reverse={false}
        duration={animDuration}
        ease="ease-out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={animDelayBase + index * animDelayStep}
        className="w-full h-full flex items-center justify-center"
      >
        <a
          className={`flex items-center justify-center h-full w-full relative cursor-pointer uppercase no-underline tracking-wider font-ankish font-semibold text-[4vh] transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
          href={link || '#'}
          onClick={handleClick}
          style={{ color: textColor }}
        >
          {text}
        </a>
      </AnimatedContent>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none translate-y-[101%]"
        ref={marqueeRef}
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div className="h-full w-fit flex" ref={marqueeInnerRef}>
          {[...Array(repetitions)].map((_, idx) => (
            <div className="marquee-part flex items-center flex-shrink-0" key={idx} style={{ color: marqueeTextColor }}>
              <span className="whitespace-nowrap uppercase font-ankish font-semibold text-[4vh] tracking-wider leading-[1] px-[1vw]">{text}</span>
              <div
                className="w-[240px] md:w-[280px] h-[240px] md:h-[280px] my-[1.5em] mx-[2vw] rounded-[100px] -rotate-3 border-6 border-background shadow-2xl bg-cover bg-center bg-no-repeat overflow-hidden shrink-0"
                style={{ backgroundImage: `url("${imageUrl}")` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;
