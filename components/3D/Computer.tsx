'use client'

import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useStore } from '@/store/useStore'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Computer() {
    const groupRef = useRef<THREE.Group>(null)
    const cameraMode = useStore((state) => state.cameraMode)

    // Subtle floating animation
    useFrame((state) => {
        if (groupRef.current && cameraMode === 'overview') {
            groupRef.current.position.y = 0.95 + Math.sin(state.clock.elapsedTime * 0.5) * 0.01
        }
    })

    return (
        <group ref={groupRef} position={[0, 0.95, -0.3]}>
            {/* Monitor Base (Premium metal look) */}
            <mesh position={[0, 0, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.15, 0.05, 32]} />
                <meshStandardMaterial
                    color="#2a2a3e"
                    roughness={0.1}
                    metalness={0.9}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* Monitor Stand (Curved premium stand) */}
            <mesh position={[0, 0.35, 0]} castShadow>
                <cylinderGeometry args={[0.025, 0.025, 0.7, 16]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Monitor Back (Sleek design) - LARGER */}
            <mesh
                position={[0, 0.95, -0.05]}
                castShadow
            >
                <boxGeometry args={[2.6, 1.6, 0.08]} />
                <meshStandardMaterial
                    color="#0f0f1e"
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Monitor Frame (Thin bezel) - LARGER */}
            <mesh
                position={[0, 0.95, 0]}
                castShadow
            >
                <boxGeometry args={[2.5, 1.5, 0.02]} />
                <meshStandardMaterial
                    color={'#0a0a1e'}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Monitor Screen (Active display area) - LARGER */}
            <mesh position={[0, 0.95, 0.011]}>
                <planeGeometry args={[2.35, 1.35]} />
                <meshStandardMaterial
                    color="#000000"
                    emissive="#4f46e5"
                    emissiveIntensity={0.3}
                    roughness={0.1}
                />
            </mesh>

            {/* Keyboard - SIMPLIFIED (single mesh instead of 75 keys) */}
            <mesh position={[0, 0.02, 0.45]} castShadow receiveShadow>
                <boxGeometry args={[0.9, 0.03, 0.3]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    roughness={0.4}
                    metalness={0.6}
                />
            </mesh>

            {/* Keyboard texture (simple grid pattern) */}
            <mesh position={[0, 0.035, 0.45]}>
                <planeGeometry args={[0.85, 0.25]} />
                <meshStandardMaterial
                    color="#2a2a3e"
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Mouse - SIMPLIFIED */}
            <mesh position={[0.7, 0.025, 0.45]} castShadow>
                <boxGeometry args={[0.08, 0.04, 0.12]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Embedded HTML Portfolio - Your actual portfolio! LARGER SIZE */}
            <Html
                transform
                distanceFactor={0.56}
                position={[0, 0.95, 0.012]}
                style={{
                    width: '1600px',
                    height: '900px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    pointerEvents: cameraMode === 'focused' ? 'auto' : 'none',
                }}
            >
                {cameraMode === 'focused' ? (
                    <iframe
                        src="/portfolio/index.html"
                        style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            backgroundColor: '#161616',
                        }}
                        title="Jeevan Portfolio"
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        padding: '20px',
                    }}>
                        Click to view portfolio
                    </div>
                )}
            </Html>

            {/* Enhanced screen glow effect */}
            <pointLight
                position={[0, 0.95, 0.3]}
                intensity={cameraMode === 'focused' ? 1.5 : 0.6}
                distance={2.5}
                color="#6366f1"
                castShadow={false}
            />
        </group>
    )
}
