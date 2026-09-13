"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

interface LoadingProps {
  onComplete?: () => void;
}

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
  }, [isLoading]);

  useEffect(() => {
    // Avoid blocking repeat navigations in the same session
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

      // Initial state: layers at bottom, 0% height with rounded tops
      gsap.set(
        [
          progressLayer1Ref.current,
          progressLayer2Ref.current,
          progressLayer3Ref.current,
        ],
        {
          height: "0%",
          bottom: 0,
          opacity: 1,
          y: 0,
        }
      );

      // Number initial state: scale in smoothly
      gsap.fromTo(
        numberRef.current,
        { opacity: 0, scale: 0.85, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );

      // Create main timeline
      const mainTl = gsap.timeline();

      // Synchronize 3 color layers with the counting percentage:
      // - 0% -> 35%: Layer 1 (#7692a9) rises from bottom
      // - 30% -> 70%: Layer 2 (#93a2a3) rises over Layer 1
      // - 65% -> 100%: Layer 3 (#ffffff) rises to fill the whole screen
      const updateProgressAndLayers = (val: number) => {
        if (numberTextRef.current) {
          numberTextRef.current.textContent = `${val}`;
        }

        // Layer 1 height (0% -> 35%)
        const l1 = Math.min(36, (val / 35) * 36);
        if (progressLayer1Ref.current) {
          progressLayer1Ref.current.style.height = `${l1}%`;
        }

        // Layer 2 height (30% -> 70%)
        if (val >= 28) {
          const l2 = Math.min(70, ((val - 28) / 38) * 70);
          if (progressLayer2Ref.current) {
            progressLayer2Ref.current.style.height = `${l2}%`;
          }
        }

        // Layer 3 height (65% -> 100%)
        if (val >= 64) {
          const l3 = Math.min(100, ((val - 64) / 36) * 100);
          if (progressLayer3Ref.current) {
            progressLayer3Ref.current.style.height = `${l3}%`;
          }
        }
      };

      // Phase 1: 0% to 80% (dynamic, energetic climb)
      mainTl.to(
        {},
        {
          duration: 1.1,
          ease: "power2.out",
          onUpdate: function () {
            const progress = this.progress();
            const value = Math.round(progress * 80);
            updateProgressAndLayers(value);
          },
        }
      );

      // Phase 2: 80% to 100% (suspenseful finish into 100%)
      mainTl.to(
        {},
        {
          duration: 0.65,
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
          scale: 1.08,
          duration: 0.16,
          ease: "power2.out",
        },
        "+=0.04"
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
          duration: 0.65,
          ease: "power4.inOut",
          stagger: 0.03,
          onComplete: () => {
            animateOut();
          },
        },
        "+=0.12"
      );
    }, 40);

    // Fallback safety timeout
    const maxTime = setTimeout(() => {
      animateOut();
    }, 2800);

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
        duration: 0.25,
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
    >
      {/* 3 Color Layers filling the page from bottom to top with fluid rounded tops */}
      {/* Layer 1: First color (0-33%) */}
      <div
        ref={progressLayer1Ref}
        className="fixed bottom-0 left-0 right-0 pointer-events-none rounded-t-[40px] sm:rounded-t-[80px]"
        style={{
          height: "0%",
          backgroundColor: "#7692a9", // foreground1 color
          zIndex: 1,
          willChange: "transform, height",
        }}
      />

      {/* Layer 2: Second color (33-66%) */}
      <div
        ref={progressLayer2Ref}
        className="fixed bottom-0 left-0 right-0 pointer-events-none rounded-t-[40px] sm:rounded-t-[80px]"
        style={{
          height: "0%",
          backgroundColor: "#93a2a3", // foreground-title color
          zIndex: 2,
          willChange: "transform, height",
        }}
      />

      {/* Layer 3: Third color (66-100%) */}
      <div
        ref={progressLayer3Ref}
        className="fixed bottom-0 left-0 right-0 pointer-events-none rounded-t-[40px] sm:rounded-t-[80px]"
        style={{
          height: "0%",
          backgroundColor: "#274546", // signature brand deep teal
          zIndex: 3,
          willChange: "transform, height",
        }}
      />

      {/* Percentage Number - bottom right with normal font weight */}
      <div
        ref={numberRef}
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 md:bottom-12 md:right-12 z-20 flex items-baseline select-none pointer-events-none origin-bottom-right text-[#d8d8d8]"
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
