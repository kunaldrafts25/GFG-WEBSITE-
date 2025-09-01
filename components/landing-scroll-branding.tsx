'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './landing-scroll.css'

const LandingScrollBranding: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement | null>(null)
  const marqueeItemsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    const marqueeItems = marqueeItemsRef.current

    const threshold = 10

    const handleScroll = (event: WheelEvent) => {
      if (!marquee || !marqueeItems) return

      if (event.deltaY > threshold) {
        gsap.to(marquee, {
          x: '-100%',
          duration: 10,
          repeat: -1,
          ease: 'none',
        })

        gsap.to(marqueeItems.querySelectorAll('span'), {
          rotate: 360,
          duration: 1,
          ease: 'power1.inOut',
        })
      } else if (event.deltaY < -threshold) {
        gsap.to(marquee, {
          x: '100%',
          duration: 10,
          repeat: -1,
          ease: 'none',
        })
      }
    }

    window.addEventListener('wheel', handleScroll)
    return () => window.removeEventListener('wheel', handleScroll)
  }, [])

  return (
    <div className="bg-gray-100 dark:bg-gray-800 overflow-hidden">
      <section className="landing-scroll-branding">
        <div className="scroll Developers alt" ref={marqueeRef}>
          <div ref={marqueeItemsRef}>
            <span>Designers </span> <span className="filled">Developers </span>
            <span>Programmers </span> <span>Creators </span>
            <span>Enthusiasts </span> <span>Designers </span>
            <span className="filled">Developers </span> <span>Programmers </span>
            <span>Creators </span> <span>Enthusiasts </span>
          </div>
          <div>
            <span>Designers </span> <span className="filled">Developers </span>
            <span>Programmers </span> <span>Creators </span>
            <span>Enthusiasts </span> <span>Designers </span>
            <span className="filled">Developers </span> <span>Programmers </span>
            <span>Creators </span> <span>Enthusiasts </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingScrollBranding
