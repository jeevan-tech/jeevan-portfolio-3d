'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const BinaryRain = () => {
    // Generate particles based on viewport
    const { viewport } = useThree()
    const isMobile = viewport.width < 10
    const count = isMobile ? 300 : 1000 // Adaptive count
    const pointsRef = useRef<THREE.Points>(null!)

    const [positions, velocities] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const velocities = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50 // X spread
            positions[i * 3 + 1] = Math.random() * 50     // Y spread
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // Z depth
            velocities[i] = 0.1 + Math.random() * 0.2     // Speed
        }
        return [positions, velocities]
    }, [count])

    // Create binary texture
    const texture = useMemo(() => {
        if (typeof document === 'undefined') return null // SSR Guard
        const canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        const context = canvas.getContext('2d')
        if (context) {
            context.fillStyle = 'transparent'
            context.fillRect(0, 0, 32, 32)
            context.font = '24px monospace'
            context.fillStyle = '#00ff96'
            context.textAlign = 'center'
            context.textBaseline = 'middle'
            context.fillText(Math.random() > 0.5 ? '1' : '0', 16, 16)
        }
        const tex = new THREE.CanvasTexture(canvas)
        tex.needsUpdate = true
        return tex
    }, [])

    // Interaction State
    const mouse = useRef({ x: 9999, y: 9999 }) // Start off-screen

    useFrame(({ pointer }) => {
        if (!pointsRef.current) return

        // Update mouse pos (pointer is normalized -1 to 1)
        mouse.current.x = pointer.x * 25 // Scale to world space approx
        mouse.current.y = pointer.y * 25

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            const i3 = i * 3
            // 1. Gravity Move
            positions[i3 + 1] -= velocities[i]

            // 2. Repulsion Physics
            const dx = positions[i3] - mouse.current.x
            const dy = positions[i3 + 1] - mouse.current.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            const repulsionRadius = 5

            if (dist < repulsionRadius) {
                const force = (repulsionRadius - dist) / repulsionRadius
                const angle = Math.atan2(dy, dx)
                positions[i3] += Math.cos(angle) * force * 0.5
                positions[i3 + 1] += Math.sin(angle) * force * 0.5
            }

            // 3. Reset loop
            if (positions[i3 + 1] < -25) {
                positions[i3 + 1] = 25
                positions[i3] = (Math.random() - 0.5) * 50 // Reset X too for variety
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.2}
                transparent
                opacity={0.6}
                color="#00ff96"
                map={texture}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default BinaryRain
