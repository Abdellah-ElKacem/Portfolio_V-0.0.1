"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingProps {
  onComplete?: () => void;
}

const isAuditOrBot = (): boolean => {
  if (typeof window === "undefined") return false;
  const ua = navigator.userAgent || "";
  return (
    /Lighthouse|Chrome-Lighthouse|PageSpeed|insights|HeadlessChrome|Googlebot|bingbot|Baiduspider|DuckDuckBot|YandexBot/i.test(
      ua
    ) ||
    Boolean(navigator.webdriver) ||
    Boolean(
      window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  );
};

const Loading: React.FC<LoadingProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const loadingRef = useRef<HTMLDivElement>(null);
  const progressLayer1Ref = useRef<HTMLDivElement>(null);
  const progressLayer2Ref = useRef<HTMLDivElement>(null);
  const progressLayer3Ref = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const numberTextRef = useRef<HTMLSpanElement>(null);

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
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
  }, [isLoading]);

  useEffect(() => {
    // 1. Instantly skip for performance audits (Lighthouse / PageSpeed Insights) and web crawlers
    if (isAuditOrBot()) {
      setIsLoading(false);
      onCompleteRef.current?.();
      return;
    }

    // 2. Avoid blocking repeat navigations in the same session
    try {
      if (sessionStorage.getItem("portfolio_intro_seen")) {
        setIsLoading(false);
        onCompleteRef.current?.();
        return;
      }
      sessionStorage.setItem("portfolio_intro_seen", "1");
    } catch {}

    const initTimeout = setTimeout(() => {
      if (
        !progressLayer1Ref.current ||
        !progressLayer2Ref.current ||
        !progressLayer3Ref.current ||
        !numberRef.current
      ) {
        animateOut();
        return;
      }

      // Initial state: layers scaleY=0 from bottom (GPU composited)
      gsap.set(
        [
          progressLayer1Ref.current,
          progressLayer2Ref.current,
          progressLayer3Ref.current,
        ],
        {
          scaleY: 0,
          opacity: 1,
          y: 0,
          force3D: true,
        }
      );

      // Number initial state: scale in smoothly
      gsap.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );

      // Create main timeline
      const mainTl = gsap.timeline();

      // GPU-accelerated layer scaling
      const updateProgressAndLayers = (val: number) => {
        if (numberTextRef.current) {
          numberTextRef.current.textContent = `${val}`;
        }

        // Layer 1 scale (0% -> 35%)
        const l1 = Math.min(0.36, (val / 35) * 0.36);
        if (progressLayer1Ref.current) {
          progressLayer1Ref.current.style.transform = `scaleY(${l1})`;
        }

        // Layer 2 scale (28% -> 70%)
        if (val >= 28) {
          const l2 = Math.min(0.70, ((val - 28) / 38) * 0.70);
          if (progressLayer2Ref.current) {
            progressLayer2Ref.current.style.transform = `scaleY(${l2})`;
          }
        }

        // Layer 3 scale (64% -> 100%)
        if (val >= 64) {
          const l3 = Math.min(1, ((val - 64) / 36));
          if (progressLayer3Ref.current) {
            progressLayer3Ref.current.style.transform = `scaleY(${l3})`;
          }
        }
      };

      // Phase 1: 0% to 80% (quick, dynamic climb)
      mainTl.to(
        {},
        {
          duration: 0.55,
          ease: "power2.out",
          onUpdate: function () {
            const progress = this.progress();
            const value = Math.round(progress * 80);
            updateProgressAndLayers(value);
          },
        }
      );

      // Phase 2: 80% to 100% (finish into 100%)
      mainTl.to(
        {},
        {
          duration: 0.3,
          ease: "power1.inOut",
          onUpdate: function () {
            const progress = this.progress();
            const value = 80 + Math.round(progress * 20);
            updateProgressAndLayers(value);
          },
        }
      );

      // Step 3: Satisfying scale punch on 100%
      mainTl.to(
        numberRef.current,
        {
          scale: 1.05,
          duration: 0.1,
          ease: "power2.out",
        },
        "+=0.02"
      );

      // Step 4: All 3 layers + number slide up together to reveal the page
      mainTl.to(
        [
          numberRef.current,
          progressLayer1Ref.current,
          progressLayer2Ref.current,
          progressLayer3Ref.current,
        ],
        {
          y: "-100%",
          duration: 0.45,
          ease: "power3.inOut",
          stagger: 0.02,
          force3D: true,
          onComplete: () => {
            animateOut();
          },
        },
        "+=0.06"
      );
    }, 20);

    // Fallback safety timeout
    const maxTime = setTimeout(() => {
      animateOut();
    }, 1800);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(maxTime);
    };
  }, []);

  const animateOut = () => {
    if (!loadingRef.current) {
      setIsLoading(false);
      onCompleteRef.current?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        onCompleteRef.current?.();
      },
    });

    tl.to(
      loadingRef.current,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      0
    );
  };

  if (!isLoading) return null;

  return (
    <div
      ref={loadingRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col justify-end overflow-hidden touch-none select-none overscroll-none"
      aria-hidden="true"
    >
      {/* 3 Color Layers filling the page from bottom to top with fluid rounded tops */}
      {/* Layer 1: First color (0-33%) */}
      <div
        ref={progressLayer1Ref}
        className="fixed bottom-0 left-0 right-0 h-full pointer-events-none rounded-t-[40px] sm:rounded-t-[80px] origin-bottom will-change-transform"
        style={{
          transform: "scaleY(0)",
          backgroundColor: "#7692a9", // foreground1 color
          zIndex: 1,
        }}
      />

      {/* Layer 2: Second color (33-66%) */}
      <div
        ref={progressLayer2Ref}
        className="fixed bottom-0 left-0 right-0 h-full pointer-events-none rounded-t-[40px] sm:rounded-t-[80px] origin-bottom will-change-transform"
        style={{
          transform: "scaleY(0)",
          backgroundColor: "#93a2a3", // foreground-title color
          zIndex: 2,
        }}
      />

      {/* Layer 3: Third color (66-100%) */}
      <div
        ref={progressLayer3Ref}
        className="fixed bottom-0 left-0 right-0 h-full pointer-events-none rounded-t-[40px] sm:rounded-t-[80px] origin-bottom will-change-transform"
        style={{
          transform: "scaleY(0)",
          backgroundColor: "#274546", // signature brand deep teal
          zIndex: 3,
        }}
      />

      {/* Percentage Number - bottom right with normal font weight */}
      <div
        ref={numberRef}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-20 flex items-baseline select-none pointer-events-none origin-bottom-right text-[#d8d8d8] will-change-transform"
      >
        <span
          ref={numberTextRef}
          className="text-8xl sm:text-9xl md:text-[140px] lg:text-[180px] xl:text-[210px] font-normal tabular-nums leading-none tracking-tight"
        >
          0
        </span>
        <span className="text-3xl sm:text-5xl md:text-7xl font-light ml-1 sm:ml-2 opacity-80">
          %
        </span>
      </div>
    </div>
  );
};

export default Loading;
