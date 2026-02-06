'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Error occurred:', error)
    }, [error])

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
            <div className="max-w-2xl w-full px-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="border-4 border-white p-12 bg-black text-center"
                >
                    {/* Error Code */}
                    <motion.h1
                        className="text-9xl font-bold font-mono text-white mb-4"
                        animate={{
                            textShadow: [
                                '0 0 20px rgba(239, 68, 68, 0.8)',
                                '0 0 40px rgba(234, 179, 8, 0.8)',
                                '0 0 20px rgba(239, 68, 68, 0.8)',
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        500
                    </motion.h1>

                    {/* Message */}
                    <h2 className="text-2xl font-mono text-white mb-2">
                        Something Went Wrong
                    </h2>
                    <p className="text-gray-400 font-mono text-sm mb-8">
                        An unexpected error occurred. Please try again.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-center flex-wrap">
                        <motion.button
                            onClick={reset}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-white px-8 py-3 bg-black text-white font-mono text-lg tracking-wide hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            TRY AGAIN
                        </motion.button>
                        <motion.button
                            onClick={() => window.location.href = '/'}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-white px-8 py-3 bg-white text-black font-mono text-lg tracking-wide hover:bg-black hover:text-white transition-colors duration-300"
                        >
                            GO HOME
                        </motion.button>
                    </div>

                    {/* Error Details (Development Only) */}
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mt-8 text-left">
                            <summary className="cursor-pointer text-sm font-mono text-gray-500 hover:text-white">
                                Error Details
                            </summary>
                            <pre className="mt-4 p-4 bg-gray-900 rounded text-xs text-red-400 overflow-auto max-h-40">
                                {error.message}
                            </pre>
                        </details>
                    )}

                    {/* Decorative Element */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 mt-8"
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ originX: 0.5 }}
                    />
                </motion.div>

                {/* Corner Accents */}
                <div className="relative">
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-red-500" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-500" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-yellow-500" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-red-500" />
                </div>
            </div>
        </div>
    )
}
