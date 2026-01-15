'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
    id: number
    x: number
    color: string
    delay: number
    rotation: number
    size: number
}

const COLORS = ['#2F8D46', '#22c55e', '#16a34a', '#fbbf24', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899']

export default function Confetti({ trigger, duration = 3000 }: { trigger: boolean; duration?: number }) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (trigger) {
            // Create confetti pieces
            const newPieces: ConfettiPiece[] = []
            for (let i = 0; i < 50; i++) {
                newPieces.push({
                    id: i,
                    x: Math.random() * 100,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    delay: Math.random() * 0.5,
                    rotation: Math.random() * 360,
                    size: 8 + Math.random() * 8
                })
            }
            setPieces(newPieces)
            setShow(true)

            // Hide after duration
            const timer = setTimeout(() => {
                setShow(false)
                setPieces([])
            }, duration)

            return () => clearTimeout(timer)
        }
    }, [trigger, duration])

    return (
        <AnimatePresence>
            {show && (
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                    {pieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            initial={{
                                x: `${piece.x}vw`,
                                y: -20,
                                rotate: 0,
                                opacity: 1
                            }}
                            animate={{
                                y: '110vh',
                                rotate: piece.rotation + 720,
                                opacity: [1, 1, 1, 0]
                            }}
                            transition={{
                                duration: 2.5 + Math.random(),
                                delay: piece.delay,
                                ease: 'easeOut'
                            }}
                            style={{
                                position: 'absolute',
                                width: piece.size,
                                height: piece.size,
                                backgroundColor: piece.color,
                                borderRadius: Math.random() > 0.5 ? '50%' : '2px'
                            }}
                        />
                    ))}
                </div>
            )}
        </AnimatePresence>
    )
}

// Success checkmark animation
export function SuccessAnimation({ show }: { show: boolean }) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        transition={{ duration: 0.5, times: [0, 0.7, 1] }}
                        className="h-32 w-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl"
                    >
                        <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            className="h-16 w-16 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                        >
                            <motion.path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </motion.svg>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
