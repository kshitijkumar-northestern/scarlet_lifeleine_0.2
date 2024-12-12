// src/components/common/GlobeComponent.js
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "@mui/material";

const Globe = () => {
  const theme = useTheme();
  const meshRef = useRef();
  const groupRef = useRef();
  const isDarkMode = theme.palette.mode === "dark";

  // Create dots on the sphere surface
  const createDots = () => {
    const dots = [];
    const sphereRadius = 10;
    const dotsCount = 800;

    for (let i = 0; i < dotsCount; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.acos(2 * Math.random() - 1);
      const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(theta);
      dots.push(new THREE.Vector3(x, y, z));
    }
    return dots;
  };

  // Create lines connecting random dots
  const createConnections = () => {
    const connections = [];
    const dots = createDots();
    const connectionsCount = 50;

    for (let i = 0; i < connectionsCount; i++) {
      const start = dots[Math.floor(Math.random() * dots.length)];
      const end = dots[Math.floor(Math.random() * dots.length)];
      connections.push({ start, end });
    }
    return connections;
  };

  // Animation hook
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base sphere - only visible in dark mode */}
      {isDarkMode && (
        <mesh ref={meshRef}>
          <sphereGeometry args={[10, 64, 64]} />
          <meshPhongMaterial
            color="#3b82f6"
            transparent
            opacity={0.2}
            wireframe={true}
          />
        </mesh>
      )}

      {/* Light mode wireframe */}
      {!isDarkMode && (
        <mesh ref={meshRef}>
          <sphereGeometry args={[10, 64, 64]} />
          <meshBasicMaterial
            color="#e5e7eb"
            transparent
            opacity={0.15}
            wireframe={true}
            wireframeLinewidth={0.5}
          />
        </mesh>
      )}

      {/* Dots */}
      {createDots().map((position, index) => (
        <mesh key={index} position={[position.x, position.y, position.z]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={isDarkMode ? 1 : 0.7}
          />
        </mesh>
      ))}

      {/* Connections - only in dark mode */}
      {isDarkMode &&
        createConnections().map((connection, index) => {
          const points = [connection.start, connection.end];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={index} geometry={geometry}>
              <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
            </line>
          );
        })}

      {/* Very subtle atmosphere */}
      <mesh>
        <sphereGeometry args={[10.2, 64, 64]} />
        <meshPhongMaterial
          color="#3b82f6"
          transparent
          opacity={isDarkMode ? 0.1 : 0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const GlobeComponent = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 45 }}
      style={{
        background: "transparent",
        width: "100%",
        height: "100%",
      }}
    >
      <ambientLight intensity={isDarkMode ? 0.5 : 0.3} />
      <pointLight position={[10, 10, 10]} intensity={isDarkMode ? 1 : 0.8} />
      <Globe />
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.1}
      />
    </Canvas>
  );
};

export default GlobeComponent;
