import { useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// Animated Cow Component
function Cow({ position, onClick }: { position: [number, number, number], onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
      scale={hovered ? 1.2 : 1}
    >
      {/* Body */}
      <boxGeometry args={[1.5, 0.8, 0.8]} />
      <meshStandardMaterial color={hovered ? "#8B4513" : "#A0522D"} />
      
      {/* Head */}
      <mesh position={[0.9, 0.3, 0]}>
        <boxGeometry args={[0.6, 0.5, 0.5]} />
        <meshStandardMaterial color={hovered ? "#8B4513" : "#A0522D"} />
      </mesh>
      
      {/* Legs */}
      {[[-0.4, -0.6, -0.3], [-0.4, -0.6, 0.3], [0.4, -0.6, -0.3], [0.4, -0.6, 0.3]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.1, 0.1, 0.4]} />
          <meshStandardMaterial color="#654321" />
        </mesh>
      ))}
      
      {hovered && (
        <Html>
          <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-lg text-center min-w-max">
            <p className="text-sm font-medium text-nature-forest">Click to report cattle health issues</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Animated Goat Component
function Goat({ position, onClick }: { position: [number, number, number], onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.03;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
      scale={hovered ? 1.3 : 1}
    >
      {/* Body */}
      <boxGeometry args={[1, 0.6, 0.6]} />
      <meshStandardMaterial color={hovered ? "#F5F5DC" : "#FFFAF0"} />
      
      {/* Head */}
      <mesh position={[0.6, 0.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color={hovered ? "#F5F5DC" : "#FFFAF0"} />
        
        {/* Horns */}
        <mesh position={[-0.1, 0.3, -0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
        <mesh position={[-0.1, 0.3, 0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      </mesh>
      
      {/* Legs */}
      {[[-0.3, -0.5, -0.2], [-0.3, -0.5, 0.2], [0.3, -0.5, -0.2], [0.3, -0.5, 0.2]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.08, 0.08, 0.3]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      ))}
      
      {hovered && (
        <Html>
          <div className="bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-lg text-center min-w-max">
            <p className="text-sm font-medium text-nature-forest">Click to schedule goat checkup</p>
          </div>
        </Html>
      )}
    </mesh>
  );
}

// Animated Bird Component
function Bird({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 1.5) * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {/* Body */}
      <sphereGeometry args={[0.2, 8, 6]} />
      <meshStandardMaterial color="#FF6B35" />
      
      {/* Wings */}
      <mesh position={[-0.2, 0, -0.3]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.1, 0.4, 0.05]} />
        <meshStandardMaterial color="#FF8C42" />
      </mesh>
      <mesh position={[-0.2, 0, 0.3]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.1, 0.4, 0.05]} />
        <meshStandardMaterial color="#FF8C42" />
      </mesh>
    </mesh>
  );
}

// Ground Component
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#90EE90" />
    </mesh>
  );
}

// Trees Component
function Trees() {
  const trees = [
    { position: [-6, 0, -6] },
    { position: [6, 0, -6] },
    { position: [-6, 0, 6] },
    { position: [6, 0, 6] },
    { position: [0, 0, -8] },
  ];

  return (
    <>
      {trees.map((tree, i) => (
        <mesh key={i} position={tree.position}>
          {/* Trunk */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Leaves */}
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[1.2, 8, 6]} />
            <meshStandardMaterial color="#228B22" />
          </mesh>
        </mesh>
      ))}
    </>
  );
}

interface FarmSceneProps {
  onAnimalClick: (type: string) => void;
}

export function FarmScene({ onAnimalClick }: FarmSceneProps) {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        <Ground />
        <Trees />
        
        <Cow position={[-2, 0, 0]} onClick={() => onAnimalClick('cattle')} />
        <Goat position={[2, 0, 2]} onClick={() => onAnimalClick('goat')} />
        <Bird position={[0, 3, -2]} />
        <Bird position={[3, 4, -1]} />
        
        <Environment preset="sunset" />
        <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 2} />
      </Canvas>
    </div>
  );
}
