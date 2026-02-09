import { useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'

const icons = [
    { name: 'AWS', path: '/icons/aws.png', radius: 15, speed: 0.2 },
    { name: 'Docker', path: '/icons/docker.png', radius: 20, speed: 0.15 },
    { name: 'Jenkins', path: '/icons/jenkins.png', radius: 25, speed: 0.1 },
]

const OrbitalIcons = () => {
    const groupRef = useRef<THREE.Group>(null!)
    const [paused, setPaused] = useState(false)
    const { camera } = useThree()

    useFrame((state, delta) => {
        if (!paused && groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1
        }
    })

    const handleIconClick = (e: any, iconName: string, ref: any) => {
        e.stopPropagation()
        setPaused(true)

        // Fly to center animation
        gsap.to(ref.current.position, {
            x: 0,
            y: 0,
            z: 5,
            duration: 1,
            ease: 'power2.out',
            onComplete: () => {
                // Return to orbit after 2 seconds
                setTimeout(() => {
                    gsap.to(ref.current.position, {
                        x: Math.sin(ref.current.userData.angle) * ref.current.userData.radius,
                        z: Math.cos(ref.current.userData.angle) * ref.current.userData.radius,
                        y: 0,
                        duration: 1,
                        onComplete: () => setPaused(false)
                    })
                }, 2000)
            }
        })
    }

    return (
        <group ref={groupRef}>
            {icons.map((icon, index) => {
                const angle = (index / icons.length) * Math.PI * 2
                const x = Math.sin(angle) * icon.radius
                const z = Math.cos(angle) * icon.radius

                return (
                    <IconItem
                        key={icon.name}
                        icon={icon}
                        position={[x, 0, z]}
                        angle={angle}
                        onClick={handleIconClick}
                    />
                )
            })}
        </group>
    )
}

const IconItem = ({ icon, position, angle, onClick }: any) => {
    const ref = useRef<THREE.Group>(null!)

    // Store initial data for reset
    useFrame(() => {
        if (ref.current) {
            ref.current.userData = { radius: icon.radius, angle }
        }
    })

    return (
        <group ref={ref} position={position}>
            <Html transform sprite>
                <div
                    className="w-16 h-16 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center border border-green-500 cursor-pointer hover:scale-110 transition-transform"
                    onClick={(e) => onClick(e, icon.name, ref)}
                    style={{ pointerEvents: 'auto' }}
                >
                    <img src={icon.path} alt={icon.name} className="w-10 h-10 object-contain" />
                </div>
            </Html>
        </group>
    )
}

export default OrbitalIcons
