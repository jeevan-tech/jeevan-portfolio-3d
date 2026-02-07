'use client'

import { Suspense, useCallback, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { AnimatePresence, motion } from 'framer-motion'
import { useStore } from '@/store/useStore'
import CameraController from './CameraController'
import Lights from './Lights'
import Room from './Room'
import Computer from './Computer'
import BackgroundMusic from '../BackgroundMusic'

export default function Experience() {
    const cameraMode = useStore((state) => state.cameraMode)
    const setCameraMode = useStore((state) => state.setCameraMode)
    const [isMobile, setIsMobile] = useState(false)

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Handle click to enter portfolio - fixed to prevent crashes
    const handleCanvasClick = useCallback(() => {
        if (cameraMode === 'overview') {
            console.log('Transitioning to focused mode')
            setCameraMode('focused')
        }
    }, [cameraMode, setCameraMode])

    return (
        <div className="w-full h-screen relative">
            <Canvas
                shadows
                camera={{
                    position: [0, 5, 10],
                    fov: isMobile ? 95 : 45,  // Very wide FOV for mobile portrait full screen
                }}
                gl={{
                    antialias: true,
                    alpha: false,
                    powerPreference: 'high-performance',
                }}
                dpr={[1, 2]} // Responsive pixel ratio
                onClick={(e) => {
                    handleCanvasClick()
                    // Start music on first click
                    if (typeof window !== 'undefined' && (window as any).startBackgroundMusic) {
                        (window as any).startBackgroundMusic()
                    }
                }}
                style={{ cursor: cameraMode === 'overview' ? 'pointer' : 'default' }}
            >
                <color attach="background" args={['#0a0a0a']} />

                {/* Lighting */}
                <Lights />

                {/* Camera Controller */}
                <CameraController />

                {/* 3D Scene */}
                <Suspense fallback={null}>
                    <Room />
                    <Computer />
                </Suspense>

                {/* Environment */}
                <Environment preset="city" />

                {/* Orbit Controls (disabled when focused) */}
                <OrbitControls
                    enabled={cameraMode === 'overview'}
                    enablePan={false}
                    enableZoom={true}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={5}
                    maxDistance={15}
                />
            </Canvas>

            {/* Top-Left Name Badge with Effects */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute top-4 left-4 md:top-6 md:left-6 z-10"
                >
                    <div className="relative group">
                        {/* Glowing Background Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse" />

                        {/* Main Badge */}
                        <div className="relative glass px-4 py-3 md:px-6 md:py-4 rounded-lg border-2 border-white/20 backdrop-blur-xl bg-black/40">
                            <motion.h2
                                className="text-white font-bold text-sm md:text-lg lg:text-xl mb-1 tracking-wide"
                                animate={{
                                    textShadow: [
                                        '0 0 10px rgba(147, 51, 234, 0.5)',
                                        '0 0 20px rgba(6, 182, 212, 0.5)',
                                        '0 0 10px rgba(147, 51, 234, 0.5)',
                                    ]
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                Jeevan Sai Santosh Baliji
                            </motion.h2>
                            <p className="text-cyan-400 text-xs md:text-sm font-mono">
                                Technical Manager
                            </p>

                            {/* Animated Underline */}
                            <motion.div
                                className="h-0.5 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 mt-2"
                                animate={{ scaleX: [0, 1, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                style={{ originX: 0 }}
                            />
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-purple-500" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-500" />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Instructions - Responsive */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white font-mono text-xs md:text-sm glass px-3 py-2 md:px-4 md:py-2 rounded-lg backdrop-blur-sm z-10"
            >
                <div className="font-bold">Mode: {cameraMode}</div>
                <div className="text-gray-400 mt-1 hidden md:block">
                    {cameraMode === 'overview' ? '🖱️ Click anywhere to enter' : '📄 Viewing Portfolio'}
                </div>
            </motion.div>

            {/* Back button when focused - Responsive */}
            <AnimatePresence>
                {cameraMode === 'focused' && (
                    <motion.button
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        onClick={() => setCameraMode('overview')}
                        className="absolute top-4 right-4 md:top-6 md:right-6 px-3 py-2 md:px-4 md:py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-all font-medium text-sm md:text-base z-10"
                    >
                        ← Back to 3D
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Loading Fallback */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="text-white font-mono text-sm md:text-base"
                >
                    Loading 3D Experience...
                </motion.div>
            </div>

            {/* Background Music */}
            <BackgroundMusic />
        </div>
    )
}
