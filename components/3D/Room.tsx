'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Room() {
    const groupRef = useRef<THREE.Group>(null)

    // Subtle idle animation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.005
        }
    })

    return (
        <group ref={groupRef}>
            {/* Floor with premium gradient */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 0, 0]}
                receiveShadow
            >
                <planeGeometry args={[25, 25]} />
                <meshStandardMaterial
                    color="#0f0f1e"
                    roughness={0.7}
                    metalness={0.3}
                />
            </mesh>

            {/* Floor accent lights */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <circleGeometry args={[3, 64]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    emissive="#4f46e5"
                    emissiveIntensity={0.1}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Back Wall with gradient effect */}
            <mesh position={[0, 5, -6]} receiveShadow>
                <planeGeometry args={[25, 10]} />
                <meshStandardMaterial
                    color="#0a0a1e"
                    roughness={0.9}
                    emissive="#1e1b4b"
                    emissiveIntensity={0.05}
                />
            </mesh>

            {/* Left Wall */}
            <mesh position={[-12, 5, 5]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[25, 10]} />
                <meshStandardMaterial
                    color="#0a0a1e"
                    roughness={0.9}
                    emissive="#581c87"
                    emissiveIntensity={0.03}
                />
            </mesh>

            {/* Right Wall */}
            <mesh position={[12, 5, 5]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                <planeGeometry args={[25, 10]} />
                <meshStandardMaterial
                    color="#0a0a1e"
                    roughness={0.9}
                    emissive="#0c4a6e"
                    emissiveIntensity={0.03}
                />
            </mesh>

            {/* Ceiling with ambient glow */}
            <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]} receiveShadow>
                <planeGeometry args={[25, 25]} />
                <meshStandardMaterial
                    color="#050510"
                    roughness={1}
                    emissive="#1e1b4b"
                    emissiveIntensity={0.02}
                />
            </mesh>

            {/* Premium Desk */}
            <group position={[0, 0, 0]}>
                {/* Desk Top (Glass-like surface) */}
                <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
                    <boxGeometry args={[3.5, 0.08, 1.8]} />
                    <meshStandardMaterial
                        color="#1a1a2e"
                        roughness={0.1}
                        metalness={0.9}
                        envMapIntensity={1.5}
                        transparent
                        opacity={0.95}
                    />
                </mesh>

                {/* Desk edge glow */}
                <mesh position={[0, 0.94, 0]}>
                    <boxGeometry args={[3.52, 0.02, 1.82]} />
                    <meshStandardMaterial
                        color="#4f46e5"
                        emissive="#6366f1"
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.4}
                    />
                </mesh>

                {/* Premium Desk Legs (Cylindrical) */}
                {[
                    [-1.5, 0.45, -0.75],
                    [1.5, 0.45, -0.75],
                    [-1.5, 0.45, 0.75],
                    [1.5, 0.45, 0.75],
                ].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]} castShadow>
                        <cylinderGeometry args={[0.05, 0.06, 0.9, 16]} />
                        <meshStandardMaterial
                            color="#0f0f1e"
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </mesh>
                ))}

                {/* Desk Cable Management */}
                <mesh position={[0, 0.45, 0.8]} castShadow>
                    <boxGeometry args={[3, 0.08, 0.1]} />
                    <meshStandardMaterial
                        color="#0a0a1e"
                        roughness={0.4}
                        metalness={0.6}
                    />
                </mesh>
            </group>

            {/* Ambient room lighting strips */}
            {/* Left strip */}
            <mesh position={[-11.9, 2, 0]} rotation={[0, Math.PI / 2, 0]}>
                <planeGeometry args={[20, 0.1]} />
                <meshStandardMaterial
                    color="#8b5cf6"
                    emissive="#8b5cf6"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Right strip */}
            <mesh position={[11.9, 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
                <planeGeometry args={[20, 0.1]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#06b6d4"
                    emissiveIntensity={1}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Floating decorative elements */}
            {[
                { pos: [-3, 1.5, -5], color: '#8b5cf6', size: 0.08 },
                { pos: [3, 2, -5], color: '#06b6d4', size: 0.1 },
                { pos: [-4, 2.5, -4], color: '#ec4899', size: 0.06 },
                { pos: [4, 1.8, -4.5], color: '#6366f1', size: 0.09 },
            ].map((item, i) => (
                <mesh key={`float-${i}`} position={item.pos as [number, number, number]}>
                    <sphereGeometry args={[item.size, 16, 16]} />
                    <meshStandardMaterial
                        color={item.color}
                        emissive={item.color}
                        emissiveIntensity={2}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
            ))}
        </group>
    )
}
