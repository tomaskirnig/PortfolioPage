"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { PointLight, Vector3 } from "three";

const targetPosition = new Vector3();

function Model() {
  const { scene } = useGLTF("/models/LandingPageMap-transformed.glb");
  return <primitive object={scene} scale={0.0001} position={[0, 0, 0]} rotation={[Math.PI / 3, 0, 0]} />;
}

function CursorLight() {
  const lightRef = useRef<PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;

    // Map normalized mouse coordinates to a 3D area
    targetPosition.set(state.pointer.x * 12, state.pointer.y * 12, 5);
    
    // Smoothly interpolate the light's position
    lightRef.current.position.lerp(targetPosition, 0.1);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 5]}
      intensity={200}
      color="#ffffff"
      distance={30}
      decay={2}
    />
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 w-full h-full bg-slate-950">
      <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#000000" />
        
        <directionalLight position={[-10, 10, 5]} intensity={0.8} color="#fff" />
        
        <CursorLight />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/LandingPageMap-transformed.glb");
