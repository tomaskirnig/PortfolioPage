"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { CameraControls, Html, useGLTF, Float, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";
import { Color, Vector3, Group, Box3 } from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { portfolioData, PortfolioItem } from "../data/portfolio";

const targetPosition = new Vector3();

// Define positions for the projects relative to the map center
// Using your provided bounds: X [-12, 11], Y [-5, 5], Z [-2, 4]
const PROJECT_POSITIONS: Record<string, [number, number, number]> = {
  "1": [-7, 3.5, 3.0],   // Top Left
  "2": [7, 3.5, 3.0],    // Top Right
  "3": [-4, 0.5, 1.5],   // Middle Left
  "4": [4, 0.5, 1.5],    // Middle Right
  "5": [-8, -2.5, -0.5], // Bottom Left
  "6": [8, -2.5, -0.5],  // Bottom Right
};

function Model() {
  const { scene } = useGLTF("/models/LandingPageMap-transformed.glb");
  const meshRef = useRef<Group>(null);

  useEffect(() => {
    if (meshRef.current) {
      const box = new Box3().setFromObject(meshRef.current);
      console.log("📍 Map Boundaries (World Space):", {
        min: { x: box.min.x.toFixed(2), y: box.min.y.toFixed(2), z: box.min.z.toFixed(2) },
        max: { x: box.max.x.toFixed(2), y: box.max.y.toFixed(2), z: box.max.z.toFixed(2) },
        center: { 
          x: ((box.min.x + box.max.x) / 2).toFixed(2), 
          y: ((box.min.y + box.max.y) / 2).toFixed(2), 
          z: ((box.min.z + box.max.z) / 2).toFixed(2) 
        }
      });
    }
  }, [scene]);

  // Keeping original transforms
  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      scale={0.0001} 
      position={[0, 0, 0]} 
      rotation={[Math.PI / 3, 0, 0]} 
    />
  );
}

function ProjectMarker({
  item,
  position,
  onFocus
}: {
  item: PortfolioItem;
  position: [number, number, number];
  onFocus: (pos: [number, number, number]) => void;
}) {
  const [hovered, setHovered] = useState(false);
  // Dark blue when normal, Cyan when hovered
  const color = useMemo(() => new Color(hovered ? "#00ffff" : "#003366"), [hovered]);

  return (
    <group position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onFocus(position);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color}
            emissiveIntensity={hovered ? 4 : 1.5}
            transparent={true}
            opacity={0.6}
            toneMapped={false}
          />
        </mesh>
      </Float>

      {/* Label / Tooltip */}
      <Html
        position={[0, 0.5, 0]}
        center
        distanceFactor={10}
        style={{
          transition: "all 0.3s",
          opacity: hovered ? 1 : 0.7,
          transform: `scale(${hovered ? 1.1 : 1})`,
          pointerEvents: "none",
        }}
      >
        <div className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-lg text-white text-xs font-mono whitespace-nowrap select-none">
          {item.title}
        </div>
      </Html>
    </group>
  );
}

function CameraRig({ selectedPos }: { selectedPos: [number, number, number] | null }) {
  const controls = useRef<CameraControls>(null);

  useEffect(() => {
    if (!controls.current) return;

    if (selectedPos) {
      // Zoom in to the selected marker
      controls.current.setLookAt(
        selectedPos[0], selectedPos[1] + 2, selectedPos[2] + 4,
        selectedPos[0], selectedPos[1], selectedPos[2],
        true
      );
    } else {
      // Reset to initial view
      controls.current.setLookAt(
        0, 5, 10, // Default Camera Position
        0, 0, 0,  // Default LookAt (Center)
        true
      );
    }
  }, [selectedPos]);

  return (
    <CameraControls 
      ref={controls} 
      makeDefault
      minDistance={2} 
      maxDistance={20}
      polarRotateSpeed={0.5}
      azimuthRotateSpeed={0.5}
      maxPolarAngle={Math.PI / 1.8}
    />
  );
}

export default function Scene3D() {
  const [focusPoint, setFocusPoint] = useState<[number, number, number] | null>(null);

  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950">
      <Canvas 
        camera={{ position: [0, 5, 10], fov: 45 }}
        onPointerMissed={() => setFocusPoint(null)}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[-5, 5, 5]} intensity={1} color="#4f46e5" />
        <directionalLight position={[0, 0, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[5, 5, -5]} intensity={20} color="#ec4899" />

        {/* The World */}
        <Model />

        {/* Portfolio Markers */}
        {portfolioData.map((item) => (
          <ProjectMarker
            key={item.id}
            item={item}
            position={PROJECT_POSITIONS[item.id] || [0, 1, 0]}
            onFocus={(pos) => setFocusPoint(pos)}
          />
        ))}

        {/* Controls & Interaction */}
        <CameraRig selectedPos={focusPoint} />

        {/* Development Gizmos */}
        <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
          <GizmoViewport labelColor="white" axisColors={["#ff4d4d", "#4dff4d", "#4d4dff"]} />
        </GizmoHelper>
        <axesHelper args={[5]} />

        {/* Post Processing for the "Digital" Look */}
        <EffectComposer>
          <Bloom 
            luminanceThreshold={1} 
            mipmapBlur 
            intensity={1.5} 
            radius={0.6}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/LandingPageMap-transformed.glb");
