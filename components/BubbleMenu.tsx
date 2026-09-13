"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

interface BubbleMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    label: string;
    link: string;
    number?: string;
  }>;
  theme?: string | null;
  onToggleTheme?: () => void;
  navHidden?: boolean;
}

const BubbleMenu: React.FC<BubbleMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  theme,
  onToggleTheme,
  navHidden = false,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const accentLayerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<SVGSVGElement>(null);

  const isFirstMount = useRef(true);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Prevent background scrolling on mobile while menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useGSAP(
    () => {
      if (!menuRef.current || !overlayRef.current) return;

      // On first mount: initialize hidden state without running animations
      if (isFirstMount.current) {
        isFirstMount.current = false;
        gsap.set(menuRef.current, {
          scale: 0,
          borderRadius: "100%",
          x: 50,
          y: -50,
          opacity: 0,
        });
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
          gsap.set(overlayRef.current, { opacity: 0 });
        }
        if (accentLayerRef.current) {
          accentLayerRef.current.style.display = "none";
          gsap.set(accentLayerRef.current, { xPercent: 0, opacity: 0 });
        }
        if (menuItemsRef.current) {
          const items = Array.from(
            menuItemsRef.current.children,
          ) as HTMLElement[];
          gsap.set(items, { yPercent: 140, rotate: 10, opacity: 0 });
        }
        if (headerRef.current) {
          gsap.set(headerRef.current, { opacity: 0, y: -30 });
        }
        return;
      }

      // Kill any active timeline to avoid conflicts
      if (tlRef.current) {
        tlRef.current.kill();
      }

      if (isOpen) {
        // Open animation - identical to original opening
        const tl = gsap.timeline();
        tlRef.current = tl;

        if (accentLayerRef.current) {
          accentLayerRef.current.style.display = "none";
        }

        // Show menu and overlay
        if (menuRef.current) {
          menuRef.current.style.display = "block";
        }
        if (overlayRef.current) {
          overlayRef.current.style.display = "block";
        }
        tl.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0);

        // Set initial states for menu items
        if (menuItemsRef.current) {
          const items = Array.from(
            menuItemsRef.current.children,
          ) as HTMLElement[];
          gsap.set(items, { x: 0, yPercent: 140, rotate: 10, opacity: 0 });
        }

        // Set initial state for header
        if (headerRef.current) {
          gsap.set(headerRef.current, { opacity: 0, y: -30, x: 0 });
        }

        // Animate bubble from top-right corner (scale from 0)
        tl.fromTo(
          menuRef.current,
          {
            xPercent: 0,
            scale: 0,
            borderRadius: "100%",
            x: 50,
            y: -50,
            opacity: 0,
          },
          {
            xPercent: 0,
            scale: 1,
            borderRadius: "0%",
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.65,
            ease: "power4.out",
          },
          0,
        );

        // Animate header (logo and hamburger) - starts at 15% of panel duration
        if (headerRef.current) {
          tl.to(
            headerRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            0.1,
          );
        }

        // Animate menu items with stagger
        if (menuItemsRef.current) {
          const items = Array.from(
            menuItemsRef.current.children,
          ) as HTMLElement[];
          const itemsStart = 0.15; // Start at 15% of panel duration
          tl.to(
            items,
            {
              yPercent: 0,
              rotate: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              stagger: { each: 0.1, from: "start" },
            },
            itemsStart,
          );
        }
      } else {
        // Close animation - remove nav items first, then slide div from left to right with dual-color accent layer
        const tl = gsap.timeline({
          onComplete: () => {
            if (overlayRef.current) {
              overlayRef.current.style.display = "none";
            }
            if (accentLayerRef.current) {
              accentLayerRef.current.style.display = "none";
              gsap.set(accentLayerRef.current, { xPercent: 0 });
            }
            if (menuRef.current) {
              menuRef.current.style.display = "none";
              gsap.set(menuRef.current, {
                xPercent: 0,
                x: 50,
                y: -50,
                scale: 0,
                borderRadius: "100%",
              });
            }
            // Reset menu items to initial state
            if (menuItemsRef.current) {
              const items = Array.from(
                menuItemsRef.current.children,
              ) as HTMLElement[];
              gsap.set(items, {
                x: 0,
                yPercent: 140,
                rotate: 10,
                opacity: 0,
              });
            }
            if (headerRef.current) {
              gsap.set(headerRef.current, { opacity: 0, y: -30 });
            }
          },
        });
        tlRef.current = tl;

        // Show secondary accent layer (vibrant brand color var(--foreground1))
        if (accentLayerRef.current) {
          accentLayerRef.current.style.display = "block";
          gsap.set(accentLayerRef.current, {
            xPercent: 0,
            opacity: 1,
          });
        }

        // 1. Remove nav items first (slide & fade out with stagger)
        if (menuItemsRef.current) {
          const items = Array.from(
            menuItemsRef.current.children,
          ) as HTMLElement[];
          tl.to(
            items,
            {
              x: 50,
              opacity: 0,
              duration: 0.22,
              stagger: { each: 0.035, from: "start" },
              ease: "power2.in",
            },
            0,
          );
        }

        // Animate header out
        if (headerRef.current) {
          tl.to(
            headerRef.current,
            {
              opacity: 0,
              x: 30,
              duration: 0.2,
              ease: "power2.in",
            },
            0,
          );
        }

        // 2. Remove the primary div from left to right (starts at 0.18s)
        tl.to(
          menuRef.current,
          {
            xPercent: 100,
            duration: 0.45,
            ease: "power3.inOut",
          },
          0.18,
        );

        // 3. Remove the secondary accent layer trailing behind (starts at 0.30s so the second color is boldly visible!)
        if (accentLayerRef.current) {
          tl.to(
            accentLayerRef.current,
            {
              xPercent: 100,
              duration: 0.45,
              ease: "power3.inOut",
            },
            0.30,
          );
        }

        // Fade overlay out in sync
        if (overlayRef.current) {
          tl.to(
            overlayRef.current,
            {
              opacity: 0,
              duration: 0.35,
              ease: "power2.inOut",
            },
            0.32,
          );
        }
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <>
      {/* Header with Logo, Theme Switch, and Hamburger - Always visible */}
      <div
        className={`md:hidden fixed top-0 left-0 -right-3 py-6 px-6 flex justify-between items-center z-102 bg-linear-to-b from-background to-transparent transition-transform duration-800 ${
          navHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <a href="#home">
          {theme === "dark" ? (
            <Image
              src="/logo_aek1.svg"
              alt="Logo"
              width={50}
              height={50}
              priority
              className="w-[50px] h-[50px] object-contain"
            />
          ) : (
            <Image
              src="/logo_aek.svg"
              alt="Logo"
              width={50}
              height={50}
              priority
              className="w-[50px] h-[50px] object-contain"
            />
          )}
        </a>
        <div className="flex gap-2 items-center">
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="text-foreground relative w-6 h-6 flex items-center justify-center"
            >
              <Sun
                size={24}
                className={`absolute transition-all duration-500 ease-in-out ${
                  theme === "dark"
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-0"
                }`}
              />
              <Moon
                size={24}
                className={`absolute transition-all duration-500 ease-in-out ${
                  theme === "dark"
                    ? "opacity-0 -rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
            </button>
          )}
          <svg
            ref={hamburgerRef}
            className={`ham hamRotate ham8 ${isOpen ? "active" : ""}`}
            viewBox="0 0 100 100"
            width="43"
            onClick={onClose}
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"
            />
            <path className="line middle" d="m 30,50 h 40" />
            <path
              className="line bottom"
              d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"
            />
          </svg>
        </div>
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[99]"
        style={{ display: "none" }}
        onClick={onClose}
      />

      {/* Secondary accent layer revealed when closing from left to right */}
      <div
        ref={accentLayerRef}
        className="fixed top-0 right-0 w-full h-full shadow-2xl z-[100] pointer-events-none"
        style={{ display: "none", backgroundColor: "var(--foreground1)" }}
      />

      {/* Menu Bubble */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-full bg-background z-[101] overflow-hidden"
        style={{
          transformOrigin: "top right",
          borderRadius: "100%",
          display: "none",
        }}
      >
        <div className="w-full h-full flex flex-col px-6 py-6">
          <div className="flex-1 flex pt-25">
            <nav ref={menuItemsRef} className="flex flex-col gap-4">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.link}
                  onClick={onClose}
                  className="text-5xl font-regular text-foreground-title1 hover:text-foreground-title transition-colors duration-300 uppercase flex items-start gap-2"
                >
                  {item.label}
                  {item.number && (
                    <span className="text-foreground1 text-lg font-regular duration-300 uppercase">
                      {item.number}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default BubbleMenu;
