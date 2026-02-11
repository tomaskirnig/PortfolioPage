"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLanguage } from "@/data/LanguageContext";
import { aboutTranslations } from "@/data/translations";

export default function Navbar() {
  const pathname = usePathname();
  const isGridView = pathname === "/grid";
  const { language, toggleLanguage } = useLanguage();
  const t = aboutTranslations[language].navbar;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6">
          <Link href="/" className="text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
            {t.home}
          </Link>
          <Link href="/grid" className="text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
            {t.work}
          </Link>
          <Link href="/about" className="text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
            {t.about}
          </Link>
          <a href="#contact" className="text-slate-600 dark:text-white/80 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">
            {t.contact}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex gap-1 bg-slate-100 dark:bg-white/10 backdrop-blur-sm rounded-full p-1 shadow-inner border border-slate-200 dark:border-white/10">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                !isGridView
                  ? "bg-white dark:bg-purple-600 text-purple-600 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
              }`}
            >
              3D
            </motion.button>
          </Link>
          <Link href="/grid">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isGridView
                  ? "bg-white dark:bg-purple-600 text-purple-600 dark:text-white shadow-md"
                  : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10"
              }`}
            >
              Grid
            </motion.button>
          </Link>
        </div>

        <button 
          onClick={toggleLanguage}
          className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 cursor-pointer border-l border-slate-200 dark:border-white/10 pl-6 group"
        >
          <span className={`transition-all duration-300 ${language === 'en' ? 'text-indigo-500 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]' : 'text-slate-400 group-hover:text-slate-300'}`}>EN</span>
          <span className="text-slate-300">/</span>
          <span className={`transition-all duration-300 ${language === 'cs' ? 'text-indigo-500 drop-shadow-[0_0_8px_rgba(79,70,229,0.5)]' : 'text-slate-400 group-hover:text-slate-300'}`}>CZ</span>
        </button>
      </div>
    </nav>
  );
}
