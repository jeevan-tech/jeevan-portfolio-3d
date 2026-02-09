'use client'

import { useRef, useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { useStore } from '@/store/useStore'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export default function Computer() {
    const groupRef = useRef<THREE.Group>(null)
    const cameraMode = useStore((state) => state.cameraMode)
    const [isMobile, setIsMobile] = useState(false)
    const [htmlPosition, setHtmlPosition] = useState<[number, number, number]>([0, 0.95, 0.012])
    const [htmlDistance, setHtmlDistance] = useState(0.56)

    // Dynamic positioning based on viewport aspect ratio for ALL devices
    useEffect(() => {
        const calculatePosition = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            const aspectRatio = width / height

            let yPos = 0.95
            let distanceFactor = 0.56
            let deviceType = 'DESKTOP'

            // Mobile phones (portrait)
            if (width < 768) {
                deviceType = 'MOBILE'
                if (aspectRatio < 0.5) {
                    // Very tall phones (iPhone 14 Pro, 13, etc.)
                    yPos = 0.75
                    distanceFactor = 0.62
                } else if (aspectRatio < 0.55) {
                    // Standard tall phones (iPhone 12 Mini, etc.)
                    yPos = 0.78
                    distanceFactor = 0.60
                } else {
                    // Wider phones or landscape
                    yPos = 0.82
                    distanceFactor = 0.58
                }
            }
            // Tablets (portrait and landscape)
            else if (width >= 768 && width < 1024) {
                deviceType = 'TABLET'
                if (aspectRatio < 0.75) {
                    // Portrait tablets (iPad Pro portrait, etc.)
                    yPos = 0.88
                    distanceFactor = 0.57
                } else {
                    // Landscape tablets
                    yPos = 0.92
                    distanceFactor = 0.56
                }
            }
            // Laptops and desktops
            else {
                deviceType = 'DESKTOP'
                if (aspectRatio < 1.5) {
                    // Square-ish monitors (4:3, 16:10)
                    yPos = 0.93
                    distanceFactor = 0.56
                } else if (aspectRatio < 1.8) {
                    // Standard widescreen (16:9)
                    yPos = 0.95
                    distanceFactor = 0.56
                } else {
                    // Ultrawide monitors (21:9, 32:9)
                    yPos = 0.96
                    distanceFactor = 0.55
                }
            }

            setHtmlPosition([0, yPos, 0.01])
            setHtmlDistance(distanceFactor)
            setIsMobile(width < 768)

            console.log('📱 Universal dynamic positioning:', {
                deviceType,
                width,
                height,
                aspectRatio: aspectRatio.toFixed(3),
                yPosition: yPos,
                distanceFactor
            })
        }

        calculatePosition()
        window.addEventListener('resize', calculatePosition)
        window.addEventListener('orientationchange', () => {
            setTimeout(calculatePosition, 100)
        })

        return () => {
            window.removeEventListener('resize', calculatePosition)
            window.removeEventListener('orientationchange', calculatePosition)
        }
    }, [])

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

            {/* Embedded HTML Portfolio - Dynamic viewport-based positioning */}
            <Html
                transform
                distanceFactor={htmlDistance}
                position={htmlPosition}
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

            {/* Debug / Calibration UI - Mobile Only */}
            {isMobile && (
                <Html fullscreen style={{ pointerEvents: 'none', zIndex: 999 }}>
                    <div style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        background: 'rgba(0,0,0,0.85)',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        color: '#00ff00',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        pointerEvents: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        width: '140px'
                    }}>
                        <div style={{ fontWeight: 'bold', borderBottom: '1px solid #555', paddingBottom: '4px' }}>
                            CALIBRATION
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Y-Pos:</span>
                            <span>{htmlPosition[1].toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => setHtmlPosition(p => [p[0], p[1] + 0.01, p[2]])} style={{ flex: 1, background: '#333', border: 'none', color: 'white', padding: '4px' }}>+</button>
                            <button onClick={() => setHtmlPosition(p => [p[0], p[1] - 0.01, p[2]])} style={{ flex: 1, background: '#333', border: 'none', color: 'white', padding: '4px' }}>-</button>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Scale:</span>
                            <span>{htmlDistance.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={() => setHtmlDistance(d => d + 0.01)} style={{ flex: 1, background: '#333', border: 'none', color: 'white', padding: '4px' }}>+</button>
                            <button onClick={() => setHtmlDistance(d => d - 0.01)} style={{ flex: 1, background: '#333', border: 'none', color: 'white', padding: '4px' }}>-</button>
                        </div>

                        <div style={{ fontSize: '10px', color: '#aaa', marginTop: '4px' }}>
                            Screenshot this values when it looks good!
                        </div>
                    </div>
                </Html>
            )}

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
