"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SphereGeometry, BoxGeometry, TetrahedronGeometry, MathUtils } from "three";
import { Float } from "@react-three/drei";

function MorphingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create geometries with same vertex count for morphing
  // For simplicity and performance, we'll use a shader-like approach or just lerp positions
  // However, a very effective way to "morph" is to use a displacement shader on a sphere
  // OR we can use the same number of vertices and map them.
  
  const vertexCount = 1024; // Use a decent number of vertices
  
  const { spherePositions, boxPositions, trianglePositions } = useMemo(() => {
    const sphereGeom = new SphereGeometry(1, 32, 32);
    const boxGeom = new BoxGeometry(1.5, 1.5, 1.5, 16, 16, 16);
    const triGeom = new TetrahedronGeometry(1.5, 12); // Using detail to get enough vertices

    // Function to sample positions from a geometry to a fixed size array
    const getPositions = (geom: any, count: number) => {
      const pos = geom.attributes.position.array;
      const result = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const stride = i * 3;
        const sourceStride = (i % (pos.length / 3)) * 3;
        result[stride] = pos[sourceStride];
        result[stride + 1] = pos[sourceStride + 1];
        result[stride + 2] = pos[sourceStride + 2];
      }
      return result;
    };

    return {
      spherePositions: getPositions(sphereGeom, vertexCount),
      boxPositions: getPositions(boxGeom, vertexCount),
      trianglePositions: getPositions(triGeom, vertexCount),
    };
  }, []);

  const geomRef = useRef<THREE.BufferGeometry>(null);

  useFrame(({ clock }) => {
    if (!geomRef.current) return;

    const t = clock.getElapsedTime() % 12; // 12 seconds for full cycle (4s each)
    const phase = t / 4; // 0 to 3
    const section = Math.floor(phase);
    const alpha = MathUtils.smoothstep(phase % 1, 0, 1);

    const positions = geomRef.current.attributes.position.array as Float32Array;
    
    let from, to;
    if (section === 0) { // Sphere to Box
      from = spherePositions;
      to = boxPositions;
    } else if (section === 1) { // Box to Triangle
      from = boxPositions;
      to = trianglePositions;
    } else { // Triangle to Sphere
      from = trianglePositions;
      to = spherePositions;
    }

    for (let i = 0; i < vertexCount * 3; i++) {
      positions[i] = MathUtils.lerp(from[i], to[i], alpha);
    }
    
    geomRef.current.attributes.position.needsUpdate = true;
    
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.003;
    }
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          count={vertexCount}
          array={spherePositions}
          itemSize={3}
          args={[spherePositions, 3]}
        />
      </bufferGeometry>
      <meshStandardMaterial 
        color="#4f46e5" 
        wireframe 
        emissive="#4f46e5" 
        emissiveIntensity={0.5} 
      />
    </mesh>
  );
}

export default function AboutBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <MorphingShape />
        </Float>
      </Canvas>
    </div>
  );
}
