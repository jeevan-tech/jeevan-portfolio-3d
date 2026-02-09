'use client'

import { useStore } from '@/store/useStore'
import { Volume2, VolumeX } from 'lucide-react'

// CSS Logic integrated via Tailwind + inline styles for specific needs
const HUDOverlay = () => {
    const { isMuted, toggleMute } = useStore() // Use shared state

    return (
        <div id="hud-overlay" className="pointer-events-none fixed inset-0 z-[100] font-mono text-[11px] text-[#00ff96] select-none">
            {/* Styles for HUD corners */}
            <style jsx>{`
                .hud-corner {
                    position: fixed;
                    padding: 15px;
                    background: rgba(0, 255, 150, 0.03);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    border: 1px solid rgba(0, 255, 150, 0.15);
                    z-index: 100;
                }
                /* Mobile/Tablet adaptations */
                @media (max-width: 768px) {
                    .hud-corner {
                        background: none;
                        border: none;
                        backdrop-filter: none;
                        -webkit-backdrop-filter: none;
                        padding: 5px; /* Minimal padding */
                        font-size: 9px;
                    }
                    .top-left, .top-right {
                        top: 20px; /* Fallback */
                        top: env(safe-area-inset-top, 20px); /* Notch safety */
                    }
                }
            `}</style>

            {/* Top Left - System Monitor */}
            <div className="hud-corner top-left flex flex-col gap-1 left-4 top-4 md:left-6 md:top-6">
                <p className="font-bold">SYSTEM_MONITOR_v2.06</p>
                <div className="flex items-center gap-2">
                    <span>STATUS:</span>
                    <span className="animate-pulse text-green-400">ACTIVE</span>
                </div>
                <p className="hidden md:block">REGION: us-east-1</p>
                <p className="hidden md:block">LATENCY: 24ms</p>
            </div>

            {/* Top Right - Coordinates (Hidden on mobile to save space) */}
            <div className="hud-corner top-right right-4 top-4 md:right-6 md:top-6 hidden md:block text-right">
                <p>COORDS: [34.0522, -118.2437]</p>
                <p>GRID: A-7</p>
            </div>

            {/* Bottom Left - Dependencies (Hidden on tablet/mobile) */}
            <div className="hud-corner bottom-left left-4 bottom-4 md:left-6 md:bottom-6 hidden lg:block">
                <p className="mb-1 text-green-400/70">Dependencies_Loaded:</p>
                <ul className="space-y-0.5 opacity-70">
                    <li>&gt; React Three Fiber</li>
                    <li>&gt; GSAP Animation</li>
                    <li>&gt; Tailwind CSS</li>
                </ul>
            </div>

            {/* Bottom Right - Controls */}
            <div className="hud-corner bottom-right right-4 bottom-4 md:right-6 md:bottom-6">
                <div className="flex flex-col items-end gap-2 pointer-events-auto">
                    <button
                        onClick={() => toggleMute()}
                        className="flex items-center gap-2 hover:bg-[#00ff96]/10 px-3 py-1.5 rounded transition-colors border border-[#00ff96]/20 bg-black/20 backdrop-blur-sm"
                    >
                        <span>[ AUDIO: {isMuted ? 'MUTED' : 'ACTIVE'} ]</span>
                        {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>

                    <div className="text-[9px] opacity-50 hidden md:block">
                        PRESS [SPACE] TO PAUSE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HUDOverlay
