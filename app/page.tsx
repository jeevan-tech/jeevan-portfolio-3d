'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Experience from '@/components/3D/Experience'

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
          >
            <div className="max-w-2xl w-full px-4">
              {/* Main Card */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="border-4 border-white p-8 md:p-12 bg-black"
              >
                {/* Title */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <h1 className="text-white font-mono text-xl md:text-2xl lg:text-3xl mb-2 tracking-wide">
                    Jeevan Sai Santosh Baliji Portfolio Showcase 2026
                  </h1>
                  <p className="text-white font-mono text-sm md:text-base flex items-center justify-center gap-2">
                    Click start to begin
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-block"
                    >
                      __
                    </motion.span>
                  </p>
                </motion.div>

                {/* START Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center"
                >
                  <motion.button
                    onClick={() => setHasStarted(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white px-12 py-4 bg-black text-white font-mono text-lg md:text-xl tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
                  >
                    START
                  </motion.button>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-gray-400 font-mono text-xs md:text-sm mt-6"
                >
                  Technical Manager | Full Stack Developer | AI Integration Specialist
                </motion.p>
              </motion.div>

              {/* Decorative Corner Elements */}
              <div className="relative">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-white" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-white" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-white" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-white" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-screen"
          >
            <Experience />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
