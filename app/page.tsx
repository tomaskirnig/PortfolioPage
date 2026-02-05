"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

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
    </main>
  );
}
