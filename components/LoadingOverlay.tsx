'use client'

import { useEffect, useState } from 'react'

export default function LoadingOverlay() {
    const [isVisible, setIsVisible] = useState(true)
    const [dots, setDots] = useState('')

    useEffect(() => {
        // Animated dots
        const dotsInterval = setInterval(() => {
            setDots(prev => (prev.length >= 5 ? '' : prev + '|'))
        }, 200)

        // Hide after 2 seconds
        const hideTimeout = setTimeout(() => {
            setIsVisible(false)
        }, 2000)

        return () => {
            clearInterval(dotsInterval)
            clearTimeout(hideTimeout)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            <div className="text-center font-mono">
                <div className="text-purple-400 text-lg mb-4">
                    &gt; System Initializing...
                </div>
                <div className="text-white text-2xl">
                    [{dots.padEnd(5, ' ')}]
                </div>
                <div className="text-gray-500 text-sm mt-4">
                    Loading Physics Engine
                </div>
            </div>
        </div>
    )
}
