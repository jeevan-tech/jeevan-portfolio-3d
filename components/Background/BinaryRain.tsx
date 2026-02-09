'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BinaryRain = () => {
    // Generate particles
    const count = 1000
    const pointsRef = useRef<THREE.Points>(null!)

    const [positions, velocities] = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const velocities = new Float32Array(count)

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50 // X spread
            positions[i * 3 + 1] = Math.random() * 50     // Y spread
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // Z depth (keep back)
            velocities[i] = 0.1 + Math.random() * 0.2     // Speed
        }
        return [positions, velocities]
    }, [])

    // Create binary texture
    const texture = useMemo(() => {
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

    useFrame(() => {
        if (!pointsRef.current) return

        const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

        for (let i = 0; i < count; i++) {
            // Move down
            positions[i * 3 + 1] -= velocities[i]

            // Reset loop
            if (positions[i * 3 + 1] < -25) {
                positions[i * 3 + 1] = 25
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
