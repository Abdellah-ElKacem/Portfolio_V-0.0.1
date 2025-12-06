"use client";

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const Loading: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [percentage, setPercentage] = useState(0);
    const loadingRef = useRef<HTMLDivElement>(null);
    const progressContainerRef = useRef<HTMLDivElement>(null);
    const progressLayer1Ref = useRef<HTMLDivElement>(null);
    const progressLayer2Ref = useRef<HTMLDivElement>(null);
    const progressLayer3Ref = useRef<HTMLDivElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Small delay to ensure refs are set and DOM is ready
        const initTimeout = setTimeout(() => {
            // Check if all refs are available
            if (
                !progressLayer1Ref.current ||
                !progressLayer2Ref.current ||
                !progressLayer3Ref.current ||
                !numberRef.current
            ) {
                console.warn("Loading refs not ready");
                return;
            }

            // Set initial state for all 3 layers (bottom aligned, hidden)
            gsap.set(progressLayer1Ref.current, {
                height: "0%",
                bottom: 0,
                opacity: 0,
                width: "100%",
            });
            gsap.set(progressLayer2Ref.current, {
                height: "0%",
                bottom: 0,
                opacity: 0,
                width: "100%",
            });
            gsap.set(progressLayer3Ref.current, {
                height: "0%",
                bottom: 0,
                opacity: 0,
                width: "100%",
            });

            // Animate number appearance first (start visible, just scale in)
            gsap.set(numberRef.current, { opacity: 1, scale: 0.8 });
            gsap.to(numberRef.current, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out",
            });

            // Create main timeline
            const mainTl = gsap.timeline();

            // Step 1: Animate percentage number from 0 to 100 (slower from 80% to 100%)
            // First phase: 0% to 80% (faster)
            mainTl.to(
                {},
                {
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: function () {
                        const progress = this.progress();
                        const value = Math.round(progress * 80); // 0 to 80
                        setPercentage(value);
                    },
                }
            );

            // Second phase: 80% to 100% (much slower)
            mainTl.to(
                {},
                {
                    duration: 2.5, // Much slower duration for the last 20%
                    ease: "power1.out",
                    onUpdate: function () {
                        const progress = this.progress();
                        const value = 80 + Math.round(progress * 20); // 80 to 100
                        setPercentage(value);
                    },
                }
            );

            // Step 2: Show and animate 3 color layers from bottom to top AFTER 100%
            // Hide percentage number when layers start
            mainTl.to(
                numberRef.current,
                {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.4,
                    ease: "power2.in",
                },
                "+=1.2" // Start hiding when layers start
            );

            // Layer 1: First color (0-33%) - fill from bottom
            mainTl.to(
                progressLayer1Ref.current,
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power1.out",
                },
                "-=0.1" // Start slightly before number fades out
            );
            mainTl.to(
                progressLayer1Ref.current,
                {
                    height: "33%",
                    duration: 1.2,
                    ease: "power1.inOut",
                },
                "-=0.4"
            ); // Start fill during opacity for smoother transition

            // Layer 2: Second color (33-66%) - fill on top of layer 1 with smooth overlap
            mainTl.to(
                progressLayer2Ref.current,
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power1.out",
                },
                "-=0.7" // Start during layer 1 fill for smoother transition
            );
            mainTl.to(
                progressLayer2Ref.current,
                {
                    height: "66%",
                    duration: 1.2,
                    ease: "power1.inOut",
                },
                "-=0.4" // Overlap with layer 1 fill animation
            );

            // Layer 3: Third color (66-100%) - fill on top of layer 2
            mainTl.to(
                progressLayer3Ref.current,
                {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power1.out",
                },
                "-=0.7" // Start during layer 2 fill for smoother transition
            );
            mainTl.to(
                progressLayer3Ref.current,
                {
                    height: "100%",
                    duration: 1.2,
                    ease: "power1.inOut",
                },
                "-=0.4" // Overlap with layer 2 fill animation
            );

            // Final step: All layers slide up to the top with fade out
            mainTl.to(
                [
                    progressLayer1Ref.current,
                    progressLayer2Ref.current,
                    progressLayer3Ref.current,
                ],
                {
                    y: "-100%",
                    opacity: 0,
                    duration: 1.2,
                    ease: "power1.inOut",
                    onComplete: () => {
                        // Wait a bit then animate out
                        setTimeout(() => {
                            animateOut();
                        }, 100);
                    },
                },
                "-=0.2" // Start slightly before layer 3 finishes
            );
        }, 100);

        // Fallback: ensure animation completes even if page loads quickly
        const maxTime = setTimeout(() => {
            // Animation should complete by now, but ensure we exit
            setTimeout(() => {
                animateOut();
            }, 2000);
        }, 4500);

        return () => {
            clearTimeout(initTimeout);
            clearTimeout(maxTime);
        };
    }, []);

    const animateOut = () => {
        if (!loadingRef.current) return;

        const tl = gsap.timeline({
            onComplete: () => {
                setIsLoading(false);
            },
        });

        // Fade out number and all progress layers
        tl.to(
            [
                numberRef.current,
                progressLayer1Ref.current,
                progressLayer2Ref.current,
                progressLayer3Ref.current,
            ],
            {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            },
            0
        );

        // Slide up and fade out the entire loading screen
        tl.to(
            loadingRef.current,
            {
                y: "-100%",
                opacity: 0,
                duration: 0.6,
                ease: "power3.inOut",
            },
            0.2
        );
    };

    if (!isLoading) return null;

    return (
        <div
            ref={loadingRef}
            className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
            {/* 3 Color Layers filling the entire page from bottom to top */}
            {/* Layer 1: First color (bottom layer) */}
            <div
                ref={progressLayer1Ref}
                className="fixed bottom-0 left-0 right-0"
                style={{
                    height: "0%",
                    backgroundColor: "#7692a9", // foreground1 color
                    zIndex: 1,
                    willChange: "height, opacity",
                    opacity: 0,
                }}
            />
            {/* Layer 2: Second color (middle layer) */}
            <div
                ref={progressLayer2Ref}
                className="fixed bottom-0 left-0 right-0"
                style={{
                    height: "0%",
                    backgroundColor: "#93a2a3", // foreground-title color
                    zIndex: 2,
                    willChange: "height, opacity",
                    opacity: 0,
                }}
            />
            {/* Layer 3: Third color (top layer) */}
            <div
                ref={progressLayer3Ref}
                className="fixed bottom-0 left-0 right-0"
                style={{
                    height: "0%",
                    backgroundColor: "#ffffff", // foreground-title1 color
                    zIndex: 3,
                    willChange: "height, opacity",
                    opacity: 0,
                }}
            />

            {/* Percentage Number - bottom right with padding */}
            <div
                ref={numberRef}
                className="fixed bottom-5 right-5 z-10 text-8xl md:text-9xl font-light text-foreground-title1 tabular-nums"
                style={{ opacity: 1 }}
            >
                {percentage}%
            </div>
        </div>
    );
};

export default Loading;
