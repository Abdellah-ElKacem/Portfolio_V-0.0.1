"use client";

import React, { useState, useRef, useEffect } from "react";
import { CircleChevronDown, FileDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function ResumeDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const resumeOptions = [
    {
      lang: "EN",
      title: "English Version",
      description: "Full CV / Resume in English",
      url: "/resume?lang=en",
      fileName: "Abdellah_El_Kacem_Resume_EN.pdf",
    },
    {
      lang: "FR",
      title: "Version Française",
      description: "CV complet en français",
      url: "/resume?lang=fr",
      fileName: "Abdellah_El_Kacem_Resume_FR.pdf",
    },
  ];

  return (
    <div ref={dropdownRef} className="relative inline-block font-semibold group">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200 hover:scale-102 hover:-rotate-3 hover:text-[#ffa958] shadow-2xl focus:outline-none text-foreground-title1"
      >
        <span>Download Resume</span>
        <CircleChevronDown
          size={20}
          strokeWidth={1}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180 text-[#ffa958]" : "text-foreground-title1"
          }`}
        />
      </button>

      {/* Underline hover effect matching the portfolio style */}
      <div
        className={`h-0.5 mt-2 bg-[#ffa958] transition-all duration-200 origin-left ${
          isOpen
            ? "w-full scale-110 -rotate-3"
            : "w-0 group-hover:w-[70%] group-hover:scale-110 group-hover:-rotate-3"
        }`}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute left-0 sm:left-auto sm:right-0 mt-3 w-72 rounded-2xl p-2 z-50 bg-background2/95 backdrop-blur-xl border border-foreground1/20 shadow-2xl text-foreground-title1"
          >
            <div className="px-3 py-2 border-b border-foreground1/15 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground-title">
                Select Language
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {resumeOptions.map((opt) => (
                <a
                  key={opt.lang}
                  href={opt.url}
                  download={opt.fileName}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-background/90 transition-all duration-150 group/item"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-background1 border border-foreground1/15 flex items-center justify-center text-xs font-bold font-mono text-foreground-title1 group-hover/item:bg-foreground1/20 group-hover/item:text-foreground1 group-hover/item:border-foreground1/40 transition-colors">
                      {opt.lang}
                    </span>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold leading-tight text-foreground-title1 group-hover/item:text-foreground1 transition-colors">
                        {opt.title}
                      </span>
                      <span className="text-[11px] text-foreground1 leading-tight mt-0.5 opacity-80 group-hover/item:opacity-100">
                        {opt.description}
                      </span>
                    </div>
                  </div>
                  <FileDown
                    size={18}
                    className="text-foreground1 opacity-60 group-hover/item:opacity-100 group-hover/item:translate-y-0.5 transition-all"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
