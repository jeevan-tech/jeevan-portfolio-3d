'use client'

import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { useStore } from '@/store/useStore'
import gsap from 'gsap'

// Camera positions for different modes
const CAMERA_POSITIONS = {
    overview: {
        position: [0, 5, 10],
        target: [0, 0, 0],
    },
    focused: {
        position: [0, 1.8, 3.5],
        target: [0, 1.8, 0],
    },
}

export default function CameraController() {
    const { camera } = useThree()
    const cameraMode = useStore((state) => state.cameraMode)
    const targetRef = useRef([0, 0, 0])

    useEffect(() => {
        const config = CAMERA_POSITIONS[cameraMode]

        // Animate camera position
        gsap.to(camera.position, {
            x: config.position[0],
            y: config.position[1],
            z: config.position[2],
            duration: 2,
            ease: 'power2.inOut',
        })

        // Animate lookAt target
        gsap.to(targetRef.current, {
            0: config.target[0],
            1: config.target[1],
            2: config.target[2],
            duration: 2,
            ease: 'power2.inOut',
        })
    }, [cameraMode, camera])

    // Update camera lookAt on every frame
    useFrame(() => {
        camera.lookAt(targetRef.current[0], targetRef.current[1], targetRef.current[2])
    })

    return null
}
