"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";

export default function ProjectSlider({
  images,
  title,
}: {
  images: StaticImageData[];
  title: string;
}) {
  const [idx, setIdx] = React.useState(0);

  return (
    <div className="relative w-full h-[300px] overflow-hidden rounded-3xl shadow-md/10 border-5 border-background">
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 1 : 0 }}
        >
          <Image
            src={img}
            alt={`${title} – slide ${i + 1}`}
            fill
            priority={i === 0}
            className="object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      ))}

      {/* Bottom gradient for bar visibility */}
      {images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/70 to-transparent z-[5] pointer-events-none rounded-b-sm" />
      )}

      {/* Bottom bar indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-3 right-3 z-10 flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="flex-1 h-[3px] rounded-sm transition-all duration-300 ease-in-out cursor-pointer"
              style={{
                background:
                  i === idx
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.35)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
