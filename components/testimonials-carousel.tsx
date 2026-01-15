'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
    id: string
    content: string
    user: { displayName?: string; username: string; college?: string }
}

export function TestimonialsCarousel() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/testimonials`)
                if (res.ok) {
                    const data = await res.json()
                    setTestimonials(data)
                }
            } catch (error) {
                console.error('Failed to fetch testimonials')
            }
        }
        fetchTestimonials()
    }, [])

    useEffect(() => {
        if (testimonials.length <= 1) return
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % testimonials.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [testimonials.length])

    if (testimonials.length === 0) return null

    const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)
    const next = () => setCurrent(c => (c + 1) % testimonials.length)

    return (
        <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-gray-100">
                    What Members Say
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
                    Hear from our community
                </p>

                <div className="relative max-w-3xl mx-auto">
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg z-10 hover:scale-110 transition"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                            >
                                <Quote className="h-10 w-10 text-green-500 mb-4 opacity-50" />
                                <p className="text-xl text-gray-700 dark:text-gray-200 mb-6 italic">
                                    "{testimonials[current].content}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                                        {(testimonials[current].user.displayName || testimonials[current].user.username).charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">
                                            {testimonials[current].user.displayName || testimonials[current].user.username}
                                        </p>
                                        {testimonials[current].user.college && (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {testimonials[current].user.college}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg z-10 hover:scale-110 transition"
                    >
                        <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-6">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 w-2 rounded-full transition-all ${i === current ? 'bg-green-500 w-6' : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
