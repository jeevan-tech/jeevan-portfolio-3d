'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Play } from 'lucide-react'

export default function BackgroundMusic() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isMuted, setIsMuted] = useState(true) // Start muted
    const [isPlaying, setIsPlaying] = useState(false)
    const [showPlayPrompt, setShowPlayPrompt] = useState(false)

    useEffect(() => {
        // Set volume via JavaScript
        if (audioRef.current) {
            audioRef.current.volume = 0.15
            audioRef.current.muted = true // Start muted

            // Handle audio load error
            audioRef.current.onerror = () => {
                console.warn('Background music file not found. Please add an MP3 file to /public/music/background.mp3')
            }
        }

        // Show play prompt after 3 seconds
        const promptTimeout = setTimeout(() => {
            if (!isPlaying) {
                setShowPlayPrompt(true)
            }
        }, 3000)

        // Global function to start music (called on first user interaction)
        const handleFirstInteraction = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true)
                    setIsMuted(false)
                    setShowPlayPrompt(false)
                    if (audioRef.current) {
                        audioRef.current.muted = false
                    }
                }).catch(err => {
                    console.log('Audio play failed:', err)
                    console.log('Tip: Add an MP3 file to /public/music/background.mp3')
                })
            }
        }

        // Add global click listener
        document.addEventListener('click', handleFirstInteraction, { once: true })

        return () => {
            clearTimeout(promptTimeout)
            document.removeEventListener('click', handleFirstInteraction)
        }
    }, [isPlaying])

    const toggleMute = () => {
        if (audioRef.current) {
            const newMutedState = !isMuted
            audioRef.current.muted = newMutedState
            setIsMuted(newMutedState)

            // If unmuting and not playing, try to play
            if (!newMutedState && !isPlaying) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true)
                    setShowPlayPrompt(false)
                }).catch(err => {
                    console.log('Audio play requires user interaction first')
                })
            }
        }
    }

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/background.mp3"
                loop
            />

            {/* Mute/Unmute Button - Always visible */}
            <button
                onClick={toggleMute}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-purple-600/80 hover:bg-purple-700 backdrop-blur-sm transition-all shadow-lg border border-white/20"
                aria-label={isMuted ? 'Unmute music' : 'Mute music'}
                title={isMuted ? 'Click to play music' : 'Mute music'}
            >
                {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                )}
            </button>

            {/* Play Prompt Tooltip */}
            {showPlayPrompt && !isPlaying && (
                <div className="fixed bottom-20 right-6 z-50 px-4 py-2 bg-black/80 backdrop-blur-sm text-white text-sm rounded-lg shadow-xl border border-white/20 animate-bounce">
                    <div className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        <span>Click to enable music</span>
                    </div>
                </div>
            )}
        </>
    )
}
