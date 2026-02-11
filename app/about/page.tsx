"use client";

import AboutBackground from "@/components/AboutBackground";
import Navbar from "@/components/Navbar";
import { useEffect, useRef } from "react";
import { aboutTranslations } from "@/data/translations";
import { useLanguage } from "@/data/LanguageContext";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = aboutTranslations[language];

  const bgOffsetRef = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;
      const viewCenter = window.scrollY + vh * 0.5;

      const keyframes: { center: number; target: number }[] = [];

      if (heroRef.current) {
        keyframes.push({
          center: heroRef.current.offsetTop + heroRef.current.offsetHeight * 0.5,
          target: 0,
        });
      }

      sectionRefs.current.forEach((ref, i) => {
        if (ref) {
          keyframes.push({
            center: ref.offsetTop + ref.offsetHeight * 0.5,
            target: i % 2 === 0 ? 1 : -1,
          });
        }
      });

      if (keyframes.length === 0) return;

      if (viewCenter <= keyframes[0].center) {
        bgOffsetRef.current = keyframes[0].target;
        return;
      }

      if (viewCenter >= keyframes[keyframes.length - 1].center) {
        bgOffsetRef.current = keyframes[keyframes.length - 1].target;
        return;
      }

      for (let i = 0; i < keyframes.length - 1; i++) {
        if (
          viewCenter >= keyframes[i].center &&
          viewCenter <= keyframes[i + 1].center
        ) {
          const t =
            (viewCenter - keyframes[i].center) /
            (keyframes[i + 1].center - keyframes[i].center);
          const smooth = t * t * (3 - 2 * t);
          bgOffsetRef.current =
            keyframes[i].target +
            (keyframes[i + 1].target - keyframes[i].target) * smooth;
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <Navbar />
      <AboutBackground offsetRef={bgOffsetRef} />

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 uppercase">
          {t.hero.title}
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
          {t.hero.subtitle}
        </p>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-24 space-y-64">
        {t.sections.map((section, index) => (
          <div 
            key={index}
            ref={(el) => { sectionRefs.current[index] = el; }}
            className={`flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-indigo-400">
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                {section.content}
              </p>
            </div>

            {/* Placeholder for Image or extra element */}
            <div className="flex-1 w-full aspect-video bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center relative group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
               <span className="text-slate-500 font-mono text-sm tracking-widest uppercase">
                 [ Visual Element {index + 1} ]
               </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer-like section */}
      <section className="py-24 text-center border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <h2 className="text-3xl font-bold mb-8">{t.footer.heading}</h2>
        <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all font-semibold">
          {t.footer.cta}
        </button>
      </section>
    </main>
  );
}
