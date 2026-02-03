"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function ViewToggle() {
  const pathname = usePathname();
  const isGridView = pathname === "/grid";

  return (
    <div className="fixed top-8 right-8 z-50 flex gap-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
      <Link href="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full transition-colors ${
            !isGridView
              ? "bg-purple-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          3D View
        </motion.button>
      </Link>
      <Link href="/grid">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-full transition-colors ${
            isGridView
              ? "bg-purple-600 text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          Grid View
        </motion.button>
      </Link>
    </div>
  );
}
