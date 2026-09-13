"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const [theme, setTheme] = useState<string>("dark");
  const [isClient, setIsClient] = useState(false);
  const [badgeText, setBadgeText] = useState<string>("");
  const badgeRef = useRef<string>("");

  const isHoveredRef = useRef(false);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse/trackpad, not touchscreens)
    if (typeof window === "undefined") return;
    const hasPointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasPointer) return;

    setIsClient(true);

    // Initial theme detection
    const getTheme = () =>
      document.documentElement.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");

    setTheme(getTheme());

    // Watch for theme attribute changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          setTheme(getTheme());
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isClient || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // High performance GSAP quickTo interpolators
    const ringXTo = gsap.quickTo(ring, "x", {
      duration: 0.32,
      ease: "power3.out",
    });
    const ringYTo = gsap.quickTo(ring, "y", {
      duration: 0.32,
      ease: "power3.out",
    });

    const dotXTo = gsap.quickTo(dot, "x", {
      duration: 0.06,
      ease: "power2.out",
    });
    const dotYTo = gsap.quickTo(dot, "y", {
      duration: 0.06,
      ease: "power2.out",
    });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePosRef.current = { x, y };

      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }

      // Center offset
      dotXTo(x);
      dotYTo(y);
      ringXTo(x);
      ringYTo(y);

      // Check for hover state
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor]'
      );
      const cursorBadge =
        target.closest("[data-cursor]")?.getAttribute("data-cursor") || "";

      if (interactiveEl) {
        if (!isHoveredRef.current || cursorBadge !== badgeRef.current) {
          isHoveredRef.current = true;
          badgeRef.current = cursorBadge;
          setBadgeText(cursorBadge);

          gsap.to(ring, {
            width: cursorBadge ? 72 : 54,
            height: cursorBadge ? 72 : 54,
            duration: 0.3,
            ease: "back.out(1.8)",
          });

          gsap.to(dot, {
            scale: cursorBadge ? 0 : 0.3,
            opacity: cursorBadge ? 0 : 0.4,
            duration: 0.2,
          });
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          badgeRef.current = "";
          setBadgeText("");

          gsap.to(ring, {
            width: 32,
            height: 32,
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.2,
          });
        }
      }
    };

    const onMouseDown = () => {
      gsap.to(ring, {
        scale: 0.8,
        duration: 0.15,
        ease: "power2.out",
      });
      gsap.to(dot, {
        scale: 1.4,
        duration: 0.15,
      });
    };

    const onMouseUp = () => {
      gsap.to(ring, {
        scale: 1,
        duration: 0.25,
        ease: "back.out(2)",
      });
      gsap.to(dot, {
        scale: isHoveredRef.current ? 0.3 : 1,
        duration: 0.2,
      });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isClient]);

  if (!isClient) return null;

  const isDark = theme === "dark";

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block">
      {/* Outer Spring Follower Ring */}
      <div
        ref={ringRef}
        className="fixed -top-4 -left-4 w-8 h-8 rounded-full pointer-events-none flex items-center justify-center transition-colors duration-300 will-change-transform"
        style={{
          opacity: 0,
          border: badgeText
            ? "1.5px solid var(--foreground)"
            : isDark
            ? "1.5px solid rgba(147, 162, 163, 0.45)"
            : "1.5px solid rgba(39, 69, 70, 0.45)",
          backgroundColor: badgeText
            ? isDark
              ? "rgba(44, 57, 48, 0.75)"
              : "rgba(216, 216, 216, 0.75)"
            : isDark
            ? "rgba(147, 162, 163, 0.08)"
            : "rgba(39, 69, 70, 0.06)",
          backdropFilter: "blur(2.5px)",
          boxShadow: badgeText
            ? isDark
              ? "0 0 20px rgba(216, 216, 216, 0.18)"
              : "0 0 20px rgba(23, 23, 23, 0.12)"
            : isDark
            ? "0 0 15px rgba(147, 162, 163, 0.15)"
            : "0 0 15px rgba(39, 69, 70, 0.12)",
        }}
      >
        {/* Text badge when hovering elements with data-cursor */}
        {badgeText && (
          <span
            ref={textRef}
            className="text-[11px] uppercase font-bold tracking-wider select-none animate-in fade-in duration-200"
            style={{
              color: "var(--foreground)",
            }}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        className="fixed -top-1 -left-1 w-2 h-2 rounded-full pointer-events-none transition-colors duration-300 will-change-transform"
        style={{
          opacity: 0,
          backgroundColor: isDark ? "#93a2a3" : "#274546",
          boxShadow: isDark
            ? "0 0 8px rgba(147, 162, 163, 0.8), 0 0 2px #d8d8d8"
            : "0 0 8px rgba(39, 69, 70, 0.7), 0 0 2px #171717",
        }}
      />
    </div>
  );
}
