'use client'

export default function Lights() {
    return (
        <>
            {/* Ambient light for base illumination */}
            <ambientLight intensity={0.2} color="#4f46e5" />

            {/* Main directional light (sunlight from window) */}
            <directionalLight
                position={[10, 15, 5]}
                intensity={1.2}
                color="#ffffff"
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={50}
                shadow-camera-left={-15}
                shadow-camera-right={15}
                shadow-camera-top={15}
                shadow-camera-bottom={-15}
            />

            {/* Colored accent lights */}
            {/* Purple accent from left */}
            <pointLight
                position={[-10, 3, 0]}
                intensity={1.5}
                distance={15}
                color="#8b5cf6"
                decay={2}
            />

            {/* Cyan accent from right */}
            <pointLight
                position={[10, 3, 0]}
                intensity={1.5}
                distance={15}
                color="#06b6d4"
                decay={2}
            />

            {/* Top fill light (soft) */}
            <pointLight
                position={[0, 8, 0]}
                intensity={0.8}
                distance={20}
                color="#ec4899"
                decay={2}
            />

            {/* Desk area spot light */}
            <spotLight
                position={[0, 6, -2]}
                angle={0.5}
                penumbra={1}
                intensity={1.5}
                color="#ffffff"
                castShadow
                target-position={[0, 0.9, 0]}
            />

            {/* Back wall ambient */}
            <rectAreaLight
                position={[0, 5, -5.9]}
                width={20}
                height={8}
                intensity={0.5}
                color="#4f46e5"
            />
        </>
    )
}
