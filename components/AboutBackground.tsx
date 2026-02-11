"use client";

import { useRef, useMemo, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { SphereGeometry, BoxGeometry, TetrahedronGeometry, MathUtils } from "three";
import { Float } from "@react-three/drei";

function MorphingShapes() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.BufferGeometry>(null);

  const { boxPositions, spherePositions, tetraPositions, vertexCount } = useMemo(() => {
    // 1. Create a segmented Box as the base (ensures flat faces)
    const segments = 16;
    const size = 2;
    const baseBox = new BoxGeometry(size, size, size, segments, segments, segments);
    
    // Convert to non-indexed to make vertex manipulation straightforward
    const boxGeom = baseBox.toNonIndexed();
    const posAttr = boxGeom.attributes.position;
    const rawPos = posAttr.array;
    
    // 2. Filter for only 3 faces (+x, +y, +z)
    const filtered: number[] = [];
    const threshold = (size / 2) - 0.01;

    for (let i = 0; i < rawPos.length; i += 9) {
      // Check if the triangle belongs to one of the 3 faces we want
      // We check the center of the triangle
      const mx = (rawPos[i] + rawPos[i+3] + rawPos[i+6]) / 3;
      const my = (rawPos[i+1] + rawPos[i+4] + rawPos[i+7]) / 3;
      const mz = (rawPos[i+2] + rawPos[i+5] + rawPos[i+8]) / 3;

      if (mx > threshold || my > threshold || mz > threshold) {
        for (let j = 0; j < 9; j++) filtered.push(rawPos[i + j]);
      }
    }

    const count = filtered.length / 3;
    const boxPos = new Float32Array(filtered);
    const spherePos = new Float32Array(filtered.length);
    const tetraPos = new Float32Array(filtered.length);

    // Tetrahedron planes
    const tetraSize = 2.2;
    const tetraD = tetraSize * 0.4;
    const s = 1 / Math.sqrt(3);
    const tetraNormals = [
      new THREE.Vector3(s, s, s),
      new THREE.Vector3(s, -s, -s),
      new THREE.Vector3(-s, s, -s),
      new THREE.Vector3(-s, -s, s)
    ];

    const vec = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      vec.set(boxPos[i * 3], boxPos[i * 3 + 1], boxPos[i * 3 + 2]);

      // --- Sphere: Spherify the box point ---
      const sVec = vec.clone().normalize().multiplyScalar(1.5);
      spherePos[i * 3] = sVec.x;
      spherePos[i * 3 + 1] = sVec.y;
      spherePos[i * 3 + 2] = sVec.z;

      // --- Tetra: Project onto planes ---
      const dir = vec.clone().normalize();
      let minT = Infinity;
      for (const n of tetraNormals) {
        const denom = n.dot(dir);
        if (denom > 0.001) {
          const t = tetraD / denom;
          if (t < minT) minT = t;
        }
      }
      const tVec = dir.multiplyScalar(minT === Infinity ? 1 : minT);
      tetraPos[i * 3] = tVec.x;
      tetraPos[i * 3 + 1] = tVec.y;
      tetraPos[i * 3 + 2] = tVec.z;
    }

    return { 
      boxPositions: boxPos, 
      spherePositions: spherePos, 
      tetraPositions: tetraPos,
      vertexCount: count 
    };
  }, []);

  useFrame(({ clock }) => {
    if (!geomRef.current) return;

    const t = clock.getElapsedTime() % 12;
    const phase = Math.floor(t / 4);
    const subTime = t % 4;
    const alpha = MathUtils.smoothstep(subTime, 2, 4);

    let from, to;
    if (phase === 0) { from = spherePositions; to = boxPositions; }
    else if (phase === 1) { from = boxPositions; to = tetraPositions; }
    else { from = tetraPositions; to = spherePositions; }

    const pos = geomRef.current.attributes.position.array as Float32Array;
    for (let i = 0; i < vertexCount * 3; i++) {
      pos[i] = MathUtils.lerp(from[i], to[i], alpha);
    }
    geomRef.current.attributes.position.needsUpdate = true;

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.z += 0.001;
    }
  });

  return (
    <mesh ref={meshRef}>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          count={vertexCount}
          array={new Float32Array(spherePositions)}
          itemSize={3}
          args={[new Float32Array(spherePositions), 3]}
        />
      </bufferGeometry>
      <meshStandardMaterial 
        color="#4f46e5" 
        wireframe 
        emissive="#4f46e5" 
        emissiveIntensity={2} 
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function ScrollPositioner({
  offsetRef,
  children,
}: {
  offsetRef: { current: number };
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const currentX = useRef(0);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetX = (offsetRef.current ?? 0) * 1.7;
      const speed = 2;
      const lerpFactor = 1 - Math.exp(-speed * delta);
      currentX.current += (targetX - currentX.current) * lerpFactor;
      groupRef.current.position.x = currentX.current;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

interface AboutBackgroundProps {
  offsetRef?: { current: number };
}

export default function AboutBackground({ offsetRef }: AboutBackgroundProps) {
  const defaultRef = useRef(0);
  const activeRef = offsetRef ?? defaultRef;

  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <ScrollPositioner offsetRef={activeRef}>
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <MorphingShapes />
          </Float>
        </ScrollPositioner>
      </Canvas>
    </div>
  );
}
