"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import Navbar from "./Navbar";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Background from "./public/images/home.gif";

function Pokeball() {
  const group = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(({ mouse }) => {
    if (group.current) {
      const xRotation = (mouse.x * 0.3 - targetRotation.current.y) * 0.1;
      const yRotation = (-mouse.y * 0.3 - targetRotation.current.x) * 0.1;

      targetRotation.current.y += xRotation;
      targetRotation.current.x += yRotation;

      group.current.rotation.x = targetRotation.current.x;
      group.current.rotation.y = targetRotation.current.y;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 64, 64);
    const colors = [] as number[];
    for (let i = 0; i < geo.attributes.position.count; i++) {
      const y = geo.attributes.position.getY(i);
      if (y > 0) {
        colors.push(2, 0, 0);
      } else {
        colors.push(2, 2, 2);
      }
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, []);

  return (
    <group ref={group} scale={2}>
      <mesh geometry={geometry}>
        <meshStandardMaterial
          vertexColors={true}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.01, 1.01, 0.1, 64]} />
        <meshStandardMaterial color="black" roughness={0.5} metalness={1} />
      </mesh>

      <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.05, 32]} />
        <meshStandardMaterial color="white" roughness={0.1} metalness={0.6} />
      </mesh>

      <mesh position={[0, 0, 1]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.22, 0.03, 16, 100]} />
        <meshStandardMaterial color="black" roughness={0.5} metalness={1} />
      </mesh>
    </group>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        className="flex justify-center items-start h-screen py-12"
        style={{
          backgroundImage: `url(${Background.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Canvas className="w-full h-full max-w-lg max-h-lg">
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />
          <Pokeball />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </>
  );
}
