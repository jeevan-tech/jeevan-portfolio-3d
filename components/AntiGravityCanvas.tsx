'use client'

import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'

export default function AntiGravityCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const engineRef = useRef<Matter.Engine | null>(null)
    const renderRef = useRef<Matter.Render | null>(null)
    const mouseConstraintRef = useRef<Matter.MouseConstraint | null>(null)
    const [isMobile, setIsMobile] = useState(false)
    const [fps, setFps] = useState(60)
    const [isFallbackMode, setIsFallbackMode] = useState(false)
    const fpsQueue = useRef<number[]>([])

    // Physics bodies refs for easy access
    const groundRef = useRef<Matter.Body | null>(null)
    const leftWallRef = useRef<Matter.Body | null>(null)
    const rightWallRef = useRef<Matter.Body | null>(null)
    const ceilingRef = useRef<Matter.Body | null>(null)
    const iconsRef = useRef<Matter.Body[]>([])

    useEffect(() => {
        // Detect mobile on mount
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkMobile()

        // Initialize Matter.js
        const engine = Matter.Engine.create({
            gravity: { x: 0, y: -0.5, scale: 0.001 } // Negative gravity (anti-gravity)
        })
        engineRef.current = engine

        const canvas = canvasRef.current
        if (!canvas) return

        // Create renderer
        const render = Matter.Render.create({
            canvas: canvas,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio
            }
        })
        renderRef.current = render

        // Create boundaries (walls)
        const createBoundaries = () => {
            const thickness = 60
            const w = window.innerWidth
            const h = window.innerHeight

            // Ground (bottom)
            if (groundRef.current) Matter.World.remove(engine.world, groundRef.current)
            const ground = Matter.Bodies.rectangle(w / 2, h + thickness / 2, w, thickness, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            })
            groundRef.current = ground
            Matter.World.add(engine.world, ground)

            // Ceiling (top) - where icons float up to
            if (ceilingRef.current) Matter.World.remove(engine.world, ceilingRef.current)
            const ceiling = Matter.Bodies.rectangle(w / 2, -thickness / 2, w, thickness, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            })
            ceilingRef.current = ceiling
            Matter.World.add(engine.world, ceiling)

            // Left wall
            if (leftWallRef.current) Matter.World.remove(engine.world, leftWallRef.current)
            const leftWall = Matter.Bodies.rectangle(-thickness / 2, h / 2, thickness, h, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            })
            leftWallRef.current = leftWall
            Matter.World.add(engine.world, leftWall)

            // Right wall
            if (rightWallRef.current) Matter.World.remove(engine.world, rightWallRef.current)
            const rightWall = Matter.Bodies.rectangle(w + thickness / 2, h / 2, thickness, h, {
                isStatic: true,
                render: { fillStyle: 'transparent' }
            })
            rightWallRef.current = rightWall
            Matter.World.add(engine.world, rightWall)
        }

        // Create tech icons
        const createIcons = () => {
            // Remove existing icons
            iconsRef.current.forEach(icon => Matter.World.remove(engine.world, icon))
            iconsRef.current = []

            const iconSize = isMobile ? 40 : 60
            const numIcons = isMobile ? 8 : 15

            // Tech stack icons with colors
            const techStack = [
                { name: 'React', color: '#61DAFB' },
                { name: 'Node', color: '#68A063' },
                { name: 'TS', color: '#3178C6' },
                { name: 'Next', color: '#000000' },
                { name: 'AWS', color: '#FF9900' },
                { name: 'Docker', color: '#2496ED' },
                { name: 'Git', color: '#F05032' },
                { name: 'JS', color: '#F7DF1E' },
                { name: 'Python', color: '#3776AB' },
                { name: 'SQL', color: '#4479A1' },
                { name: 'API', color: '#009688' },
                { name: 'CSS', color: '#1572B6' },
                { name: 'HTML', color: '#E34F26' },
                { name: 'Vue', color: '#42B883' },
                { name: 'K8s', color: '#326CE5' }
            ]

            for (let i = 0; i < numIcons; i++) {
                const x = Math.random() * (window.innerWidth - 100) + 50
                const y = window.innerHeight + Math.random() * 200 // Start from bottom
                const tech = techStack[i % techStack.length]

                const icon = Matter.Bodies.circle(x, y, iconSize / 2, {
                    restitution: 0.6,
                    friction: 0.01,
                    density: 0.04,
                    render: {
                        fillStyle: tech.color,
                        strokeStyle: '#ffffff',
                        lineWidth: 2
                    },
                    label: tech.name
                })

                iconsRef.current.push(icon)
                Matter.World.add(engine.world, icon)
            }
        }

        createBoundaries()
        createIcons()

        // Mouse/Touch control (disabled on mobile for better scrolling)
        if (!isMobile) {
            const mouse = Matter.Mouse.create(canvas)
            const mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false }
                }
            })
            mouseConstraintRef.current = mouseConstraint
            Matter.World.add(engine.world, mouseConstraint)
        }

        // Run the engine and renderer
        Matter.Runner.run(engine)
        Matter.Render.run(render)

        // FPS Monitor
        let lastTime = performance.now()
        const monitorFPS = () => {
            const currentTime = performance.now()
            const delta = currentTime - lastTime
            const currentFPS = 1000 / delta
            lastTime = currentTime

            fpsQueue.current.push(currentFPS)
            if (fpsQueue.current.length > 60) fpsQueue.current.shift()

            const avgFPS = fpsQueue.current.reduce((a, b) => a + b, 0) / fpsQueue.current.length
            setFps(Math.round(avgFPS))

            // Fallback mode if FPS < 30
            if (avgFPS < 30 && !isFallbackMode) {
                setIsFallbackMode(true)
                console.warn('Low FPS detected, enabling fallback mode')
            }

            requestAnimationFrame(monitorFPS)
        }
        requestAnimationFrame(monitorFPS)

        // Resize handler
        const handleResize = () => {
            const w = window.innerWidth
            const h = window.innerHeight

            // Update canvas size
            canvas.width = w
            canvas.height = h

            // Update render dimensions
            render.canvas.width = w
            render.canvas.height = h
            render.options.width = w
            render.options.height = h

            // Update pixel ratio for retina
            Matter.Render.setPixelRatio(render, window.devicePixelRatio)

            // Recreate boundaries at new dimensions
            createBoundaries()

            // Check mobile status
            checkMobile()
        }

        // Orientation change handler
        const handleOrientationChange = () => {
            setTimeout(handleResize, 100) // Small delay for orientation change
        }

        window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleOrientationChange)

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('orientationchange', handleOrientationChange)

            if (renderRef.current) {
                Matter.Render.stop(renderRef.current)
                Matter.Render.stop(renderRef.current)
            }
            if (engineRef.current) {
                Matter.Engine.clear(engineRef.current)
            }
        }
    }, [isMobile, isFallbackMode])

    // Reset function
    const handleReset = () => {
        if (!engineRef.current) return

        // Remove all icons
        iconsRef.current.forEach(icon => Matter.World.remove(engineRef.current!.world, icon))
        iconsRef.current = []

        // Recreate icons
        const iconSize = isMobile ? 40 : 60
        const numIcons = isMobile ? 8 : 15

        const techStack = [
            { name: 'React', color: '#61DAFB' },
            { name: 'Node', color: '#68A063' },
            { name: 'TS', color: '#3178C6' },
            { name: 'Next', color: '#000000' },
            { name: 'AWS', color: '#FF9900' },
            { name: 'Docker', color: '#2496ED' },
            { name: 'Git', color: '#F05032' },
            { name: 'JS', color: '#F7DF1E' },
            { name: 'Python', color: '#3776AB' },
            { name: 'SQL', color: '#4479A1' },
            { name: 'API', color: '#009688' },
            { name: 'CSS', color: '#1572B6' },
            { name: 'HTML', color: '#E34F26' },
            { name: 'Vue', color: '#42B883' },
            { name: 'K8s', color: '#326CE5' }
        ]

        for (let i = 0; i < numIcons; i++) {
            const x = Math.random() * (window.innerWidth - 100) + 50
            const y = window.innerHeight + Math.random() * 200
            const tech = techStack[i % techStack.length]

            const icon = Matter.Bodies.circle(x, y, iconSize / 2, {
                restitution: 0.6,
                friction: 0.01,
                density: 0.04,
                render: {
                    fillStyle: tech.color,
                    strokeStyle: '#ffffff',
                    lineWidth: 2
                },
                label: tech.name
            })

            iconsRef.current.push(icon)
            Matter.World.add(engineRef.current!.world, icon)
        }
    }

    if (isFallbackMode) {
        return (
            <div className="fixed inset-0 z-1 bg-gradient-to-b from-purple-900/20 to-blue-900/20">
                <p className="text-white/50 text-xs absolute bottom-4 left-4">
                    Physics disabled (low performance)
                </p>
            </div>
        )
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                className="physics-canvas"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    zIndex: 1,
                    pointerEvents: isMobile ? 'none' : 'auto' // Disable touch on mobile
                }}
            />

            {/* Reset Button */}
            <button
                onClick={handleReset}
                className="fixed bottom-24 right-6 z-50 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-lg shadow-lg transition-all text-sm border border-white/20"
                aria-label="Reset physics"
            >
                ↻ Reset
            </button>

            {/* FPS Counter (dev mode) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="fixed top-4 left-4 z-50 text-white/50 text-xs font-mono">
                    FPS: {fps}
                </div>
            )}
        </>
    )
}
