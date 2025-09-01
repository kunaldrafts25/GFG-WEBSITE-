"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <nav
      id="main-navigation"
      aria-label="Main navigation"
      className="fixed top-6 left-1/2 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-[160rem] -translate-x-1/2 mx-auto px-6 md:px-10 py-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-[2.4rem] shadow-lg hover:shadow-xl transition-shadow duration-500 z-50"
    >
      <div className="flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            aria-label="GeeksforGeeks Student Chapter - Home"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/GFG%20LOGO-PgT4Ea0lSd8pq4MapL0fLjAkZvB3G6.png"
              alt="GeeksforGeeks Student Chapter"
              width={200}
              height={50}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-800 dark:text-gray-200">
          <Link
            href="/events"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
          >
            Events
          </Link>
          <Link
            href="/about"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
          >
            About
          </Link>
          <Link
            href="/learning"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
          >
            Learning
          </Link>
          <Link
            href="/forge"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
          >
             GeekForge
          </Link>
        </div>

        {/* Right - POTD and Theme Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <a
              href="https://www.geeksforgeeks.org/problem-of-the-day"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 hover:underline hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-gray-900 hover:rounded-full px-3 py-1 flex items-center space-x-2 transition-all duration-200 focus:outline-none"
              aria-label="GeeksforGeeks Problem of the Day (opens in new tab)"
            >
              <span>GFG POTD</span>
              <FaArrowRight aria-hidden="true" />
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="rounded-full w-8 h-8"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Hamburger Menu */}
          <button
            className="md:hidden text-gray-800 dark:text-gray-200 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
          >
            <div className="w-6 h-6 flex flex-col justify-around">
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden transition-all duration-300`}
        role="menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex flex-col space-y-4 mt-4 text-gray-800 dark:text-gray-200">
          <Link
            href="/events"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
            role="menuitem"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>
          <Link
            href="/about"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
            role="menuitem"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/learning"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
            role="menuitem"
            onClick={() => setIsMenuOpen(false)}
          >
            Learning
          </Link>
          <Link
            href="/forge"
            className="hover:bg-gray-200 dark:hover:bg-gray-700 hover:rounded-full px-3 py-1 transition-all duration-200 focus:outline-none"
            role="menuitem"
            onClick={() => setIsMenuOpen(false)}
          >
            The Forge
          </Link>
          <a
            href="https://www.geeksforgeeks.org/problem-of-the-day"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-400 hover:underline hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-gray-900 hover:rounded-full px-3 py-1 flex items-center space-x-2 transition-all duration-200 focus:outline-none"
            role="menuitem"
            aria-label="GeeksforGeeks Problem of the Day (opens in new tab)"
          >
            <span>GFG POTD</span>
            <FaArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </nav>
  )
}

