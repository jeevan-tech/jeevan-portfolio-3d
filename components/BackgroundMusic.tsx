'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isMuted, setIsMuted] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        // Set volume via JavaScript
        if (audioRef.current) {
            audioRef.current.volume = 0.15
        }

        // Global function to start music (called after user interaction)
        if (typeof window !== 'undefined') {
            (window as any).startBackgroundMusic = () => {
                if (audioRef.current && !isPlaying) {
                    audioRef.current.play().catch(err => {
                        console.log('Audio play failed:', err)
                    })
                    setIsPlaying(true)
                }
            }
        }

        return () => {
            if (typeof window !== 'undefined') {
                delete (window as any).startBackgroundMusic
            }
        }
    }, [isPlaying])

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/background.mp3"
                loop
            />

            {/* Mute/Unmute Button */}
            <button
                onClick={toggleMute}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg"
                aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                )}
            </button>
        </>
    )
}
