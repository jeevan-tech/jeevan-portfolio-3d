'use client'

import { Canvas } from '@react-three/fiber'
import BinaryRain from './Background/BinaryRain'
import OrbitalIcons from './Background/OrbitalIcons'
import HUDOverlay from './Background/HUDOverlay'

const BackgroundLayer = () => {
    return (
        <>
            {/* HUD Overlay - HTML Layer */}
            <HUDOverlay />

            {/* 3D Background Layer - Canvas */}
            <div className="fixed inset-0 -z-10 bg-black">
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 75 }}
                    gl={{ alpha: false, antialias: true }} // Opaque background for this layer
                    dpr={[1, 2]}
                >
                    <color attach="background" args={['#000000']} />

                    {/* Effects */}
                    <BinaryRain />
                    <OrbitalIcons />
                </Canvas>
            </div>
        </>
    )
}

export default BackgroundLayer
