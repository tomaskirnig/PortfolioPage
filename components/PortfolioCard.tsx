"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PortfolioItem } from "@/data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
}

export default function PortfolioCard({ item, index }: PortfolioCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group relative flex flex-col h-full bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700"
    >
      {/* Image Area */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {item.title}
        </h3>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        {item.link && (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors duration-300 mt-auto"
          >
            View Project
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        )}
      </div>
    </motion.article>
  );
}
