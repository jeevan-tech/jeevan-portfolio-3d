'use client'

const HUDOverlay = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {/* Top Left Corner */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 text-xs font-mono text-green-500/80 leading-tight">
                <p>SYSTEM_MONITOR_v2.06</p>
                <div className="flex items-center gap-2">
                    <p>STATUS:</p>
                    <span className="animate-pulse text-green-400 font-bold">ACTIVE</span>
                </div>
                <p>REGION: us-east-1</p>
                <p>Lat: 12.9716 N | Long: 77.5946 E</p>
            </div>

            {/* Bottom Right Corner */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-xs font-mono text-green-500/80 text-right space-y-1">
                <p>[ GRAVITY: <span className="text-green-400">NORMAL</span> ]</p>
                <p>[ SECURITY: <span className="text-green-400">ENCRYPTED</span> ]</p>
                <p>[ MEMORY: <span className="text-green-400">OPTIMAL</span> ]</p>
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-green-500/20 rounded-tl-3xl m-4" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-green-500/20 rounded-br-3xl m-4" />
        </div>
    )
}

export default HUDOverlay
