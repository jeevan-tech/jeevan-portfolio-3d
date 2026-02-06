'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
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
                                '0 0 20px rgba(147, 51, 234, 0.8)',
                                '0 0 40px rgba(6, 182, 212, 0.8)',
                                '0 0 20px rgba(147, 51, 234, 0.8)',
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <h2 className="text-2xl font-mono text-white mb-2">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 font-mono text-sm mb-8">
                        The page you're looking for doesn't exist or has been moved.
                    </p>

                    {/* Back Button */}
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-white px-8 py-3 bg-black text-white font-mono text-lg tracking-wide hover:bg-white hover:text-black transition-colors duration-300"
                        >
                            RETURN HOME
                        </motion.button>
                    </Link>

                    {/* Decorative Element */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 mt-8"
                        animate={{ scaleX: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ originX: 0.5 }}
                    />
                </motion.div>

                {/* Corner Accents */}
                <div className="relative">
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-purple-500" />
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-500" />
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-500" />
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-purple-500" />
                </div>
            </div>
        </div>
    )
}
