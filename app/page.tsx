"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import ViewToggle from "@/components/ViewToggle";

// Dynamically import the 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import("@/components/Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-900" />
  ),
});

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <Scene3D />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Explore my work in an immersive 3D experience or browse through a
            simple grid layout.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex gap-4 justify-center"
          >
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-semibold hover:bg-purple-100 transition-colors shadow-lg"
            >
              View Projects
            </a>
            <a
              href="/grid"
              className="px-8 py-4 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            >
              Grid View
            </a>
          </motion.div>
        </motion.div>

        {/* Placeholder for portfolio items in 3D view */}
        <motion.div
          id="projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-32 text-center"
        >
          <p className="text-white/80 text-lg">
            3D Portfolio Item Viewer Coming Soon
          </p>
          <p className="text-white/60 text-sm mt-2">
            Use the Grid View button above to see all projects
          </p>
        </motion.div>
      </div>

      {/* View Toggle */}
      <ViewToggle />
    </main>
  );
}
