'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export function GradientBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gradient1Ref = useRef<HTMLDivElement>(null)
  const gradient2Ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const container = containerRef.current
    const gradient1 = gradient1Ref.current
    const gradient2 = gradient2Ref.current

    if (!container || !gradient1 || !gradient2) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const deltaX1 = (x - centerX) * 0.05
      const deltaY1 = (y - centerY) * 0.05
      const deltaX2 = (x - centerX) * 0.02
      const deltaY2 = (y - centerY) * 0.02

      gradient1.style.transform = `translate(${deltaX1}px, ${deltaY1}px)`
      gradient2.style.transform = `translate(${deltaX2}px, ${deltaY2}px)`
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="gradient-bg">
      <div
        ref={gradient1Ref}
        className={`gradient gradient-1 ${
          theme === 'dark' ? 'bg-green-800/20' : 'bg-green-200/20'
        }`}
      />
      <div
        ref={gradient2Ref}
        className={`gradient gradient-2 ${
          theme === 'dark' ? 'bg-green-700/15' : 'bg-green-300/15'
        }`}
      />
    </div>
  )
}

