'use client'

import Link from 'next/link'
import React, { useEffect,useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa'
import { Event } from '@/types'
import { ApiErrorBoundary } from '@/components/api-error-boundary'
import { LazyLandingScroll, LandingScrollSkeleton, LazyComponent } from '@/components/lazy-loading'
import { usePerformanceMonitoring, useRenderTime } from '@/hooks/use-performance'



const MembersIcon = () => (
  <svg className="text-gfgsc-green w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const EventsIcon = () => (
  <svg className="text-gfgsc-green w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" />
  </svg>
)

const ContestsIcon = () => (
  <svg className="text-gfgsc-green w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
)

const LearnIcon = () => (
  <svg className="text-gfgsc-green w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
  </svg>
)

const BuildIcon = () => (
  <svg className="text-gfgsc-green w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
  </svg>
)

const ConnectIcon = () => (
  <svg className="text-gfgsc-green w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
)

const Icon = () => (
  <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          role="img"
          viewBox="0 0 24 24"
          className="text-gfgsc-green w-8 h-8 sm:w-10 sm:h-10"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.13-.353h7.418a4.26 4.26 0 0 1-.368 1.008zm-11.99-.654a3.793 3.793 0 0 1-2.134 2.078 4.51 4.51 0 0 1-3.117.016 3.7 3.7 0 0 1-1.104-.695 2.652 2.652 0 0 1-.564-.745 4.221 4.221 0 0 1-.368-1.006H9.59c-.038.12-.08.238-.13.352zm14.501-1.758a3.849 3.849 0 0 0-.082-.475l-9.634-.008a3.932 3.932 0 0 1 1.143-2.348c.363-.35.79-.625 1.26-.809a3.97 3.97 0 0 1 4.484.957l1.521-1.49a5.7 5.7 0 0 0-1.922-1.357 6.283 6.283 0 0 0-2.544-.49 6.35 6.35 0 0 0-2.405.457 6.007 6.007 0 0 0-1.963 1.276 6.142 6.142 0 0 0-1.325 1.94 5.862 5.862 0 0 0-.466 1.864h-.063a5.857 5.857 0 0 0-.467-1.865 6.13 6.13 0 0 0-1.325-1.939A6 6 0 0 0 8.21 6.34a6.698 6.698 0 0 0-4.949.031A5.708 5.708 0 0 0 1.34 7.73l1.52 1.49a4.166 4.166 0 0 1 4.484-.958c.47.184.898.46 1.26.81.368.36.66.792.859 1.268.146.344.242.708.285 1.08l-9.635.008A4.714 4.714 0 0 0 0 12.457a6.493 6.493 0 0 0 .345 2.127 4.927 4.927 0 0 0 1.08 1.783c.528.56 1.17 1 1.88 1.293a6.454 6.454 0 0 0 2.504.457c.824.005 1.64-.15 2.404-.457a5.986 5.986 0 0 0 1.964-1.277 6.116 6.116 0 0 0 1.686-3.076h.273a6.13 6.13 0 0 0 1.686 3.077 5.99 5.99 0 0 0 1.964 1.276 6.345 6.345 0 0 0 2.405.457 6.45 6.45 0 0 0 2.502-.457 5.42 5.42 0 0 0 1.882-1.293 4.928 4.928 0 0 0 1.08-1.783A6.52 6.52 0 0 0 24 12.457a4.757 4.757 0 0 0-.039-.554z"></path>
        </svg>
)

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, staggerChildren: 0.2 } },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
}

const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.3 },
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  // Performance monitoring
  usePerformanceMonitoring(true)
  useRenderTime('HomePage')

  useEffect(() => {
    window.onload = () => window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`)
        const data = await res.json()
        setEvents(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Failed to fetch events:", err)
        setEvents([])
      }
    }

    fetchEvents()
  }, [])

  const pastEvents = events.filter(event => {
    const end = event.date?.split(" to ")[1] || event.date
    return new Date(end) < new Date()
  })


  return (
    <>
      <motion.div
        className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-bl from-gray-50 via-green-50 to-green-100 dark:from-gray-900 dark:via-green-900 dark:to-green-800"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <motion.div
          className="flex flex-col items-start ml-4 sm:ml-10 md:ml-20 space-y-4 sm:space-y-6"
          variants={containerVariants}
        >
          {/* Icon and Subtitle */}
          <motion.div className="flex items-center space-x-2" variants={childVariants}>
            
          
            {[
              {
                icon: <Icon />,
                text: "Student Chapter MIT ADT",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {item.icon}
                <span className="hero-text text-xs sm:text-md md:text-lg font-semibold text-gfgsc-green">
                  {item.text}
                </span>
              </motion.div>
            ))}
            </motion.div>

          {/* New Heading */}
          <motion.h1
            className="hero-text text-xl sm:text-2xl md:text-4xl lg:text-6xl font-semibold md:font-bold text-gray-800 dark:text-gray-100 leading-tight"
            variants={childVariants}
          >
            Where Code Meets <span className="text-gfgsc-green">Community</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="hero-text sm:text-sm md:text-lg text-gray-600 dark:text-gray-300 py-2 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px]"
            variants={childVariants}
          >
            Join MIT ADT's premier coding community. Learn, grow, and build together with fellow tech
            enthusiasts guided by GeeksforGeeks.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="hero-text flex flex-wrap gap-2 sm:gap-4"
            variants={childVariants}
          >
            <motion.a
              href="https://forms.gle/fC9j6S43YqGQmBsj8"
              target="_blank"
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gfgsc-green text-white rounded-lg font-semibold shadow-lg hover:bg-opacity-95 transform hover:scale-105 transition-all text-sm sm:text-base no-underline"
              whileHover={buttonHover}
            >
              Join Chapter
            </motion.a>
            
            <motion.a
              href="/learning"
              target="_blank"
              className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gfgsc-green text-gfgsc-green rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900 transform hover:scale-105 transition-all text-sm sm:text-base"
              whileHover={buttonHover}
            >
              Learn More
            </motion.a>
            
          </motion.div>

          {/* Info Section */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-8 pt-4">
            {[
              {
                icon: <MembersIcon />,
                text: "40+ Members",
              },
              {
                icon: <EventsIcon />,
                text: "5+ Events",
              },
              {
                icon: <ContestsIcon />,
                text: "Regular Contests",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                {item.icon}
                <span className="hero-text text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side (Animated Gradients) */}
        <div className="relative flex flex-col justify-center items-center w-full md:w-1/2">
          <div 
            className="absolute -top-20 -left-30 sm:-top-30 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-200 dark:bg-green-700 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-gradientBefore">
          </div>
          <div 
            className="absolute -top-40 -left-30 sm:-top-60  w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-green-400 dark:bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-gradientAfter">
          </div>
        </div>
      </motion.div>
      
      {/*second Section*/}
      <LazyComponent fallback={<LandingScrollSkeleton />}>
        <LazyLandingScroll />
      </LazyComponent>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mt-16 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            style={{ opacity: 1, transform: 'none' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h2
              className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4 md:mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Where Knowledge Meets
              <span className="text-gfgsc-green"> Opportunity</span>
            </motion.h2>
            <motion.div
              className="w-20 md:w-32 h-1 md:h-1.5 bg-gfgsc-green mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              animate={{ width: '13%' }}
              transition={{ duration: 1, delay: 0.6 }}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              The GeeksforGeeks Student Chapter provides structured opportunities
              for individuals to enhance their skills across various domains,
              fostering professional growth and preparing them for successful
              careers by joining top multinational companies.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Grid section with cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Learn card */}
          <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-lg hover:scale-105 hover:border-green-200 dark:hover:border-green-700">
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 dark:bg-green-900 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <LearnIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Learn</h3>
            <p className="text-gray-600 dark:text-gray-300">Hone your competitive programming skills through contests and solution discussions.</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gfgsc-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-sm"></div>
          </div>

          {/* Build card */}
          <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-lg hover:scale-105 hover:border-green-200 dark:hover:border-green-700">
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 dark:bg-green-900 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <BuildIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Build</h3>
            <p className="text-gray-600 dark:text-gray-300">Work on real-world projects and enhance your development skills.</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gfgsc-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-sm"></div>
          </div>

          {/* Connect card */}
          <div className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 overflow-hidden hover:shadow-lg hover:scale-105 hover:border-green-200 dark:hover:border-green-700">
            <div className="flex items-center justify-center w-12 h-12 bg-green-50 dark:bg-green-900 rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300">
              <ConnectIcon />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Connect</h3>
            <p className="text-gray-600 dark:text-gray-300">Join a community of passionate student developers</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gfgsc-green transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-sm"></div>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:py-10 w-full flex justify-center px-0 sm:px-6 lg:px-18">
          <div className="flex flex-col lg:flex-row w-full sm:gap-12 rounded-xl border border-gray-100 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 overflow-hidden">
            <div className="flex-1 p-8 lg:p-12 flex items-center">
              <div className="max-w-xl space-y-8">
                <div className="space-y-4">
                  <div className="text-sm uppercase tracking-widest text-gfgsc-green font-medium">
                    The diversity of our club
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                    <span className="inline-block">Discover Your </span>
                    <div className="relative inline-block">
                      <span className="inline-block">
                        <span className="text-gfgsc-green ml-2">Tech Path</span>
                      </span>
                      <div className="absolute -bottom-1 left-0 h-1 bg-green-200 dark:bg-green-700 w-full ml-2"></div>
                    </div>
                  </h2>
                </div>
                <div className="prose prose-lg text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed">
                    Join a vibrant community where innovation meets learning. Dive into multiple domains, collaborate with peers, and shape your technical journey with hands-on experience.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="inline-flex items-center py-3 px-6 text-lg font-medium text-gfgsc-green transition-all duration-300 group border-2 border-gfgsc-green rounded-full cursor-pointer hover:bg-green-600 hover:text-white dark:hover:text-gray-900 hover:scale-105">
                    Explore Domains
                    <FaArrowRight
                      className="ml-2 text-xl transform group-hover:translate-x-2 transition-all duration-300 ease-in-out"
                      size="1em"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
              <div className="grid gap-6 h-full">
                <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-100 dark:hover:bg-blue-800">
                  <div className="flex items-center gap-4 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-2xl text-blue-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z"></path>
                      <path d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z"></path>
                    </svg>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Competitive Programming</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">DSA</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">DP</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Problem Solving</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Algorithms</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-green-100 dark:hover:bg-green-800">
                  <div className="flex items-center gap-4 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      role="img"
                      viewBox="0 0 24 24"
                      className="text-2xl text-green-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M22.1987 18.498l-9.7699 5.5022v-4.2855l6.0872-3.3338 3.6826 2.117zm.6683-.6026V6.3884l-3.5752 2.0544v7.396zm-21.0657.6026l9.7699 5.5022v-4.2855L5.484 16.3809l-3.6826 2.117zm-.6683-.6026V6.3884l3.5751 2.0544v7.396zm.4183-12.2515l10.0199-5.644v4.1434L5.152 7.6586l-.0489.028zm20.8975 0l-10.02-5.644v4.1434l6.4192 3.5154.0489.028 3.5518-2.0427zm-10.8775 13.096l-6.0056-3.2873V8.9384l6.0054 3.4525v6.349zm.8575 0l6.0053-3.2873V8.9384l-6.0053 3.4525zM5.9724 8.1845l6.0287-3.3015L18.03 8.1845l-6.0288 3.4665z"></path>
                    </svg>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Web Development</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Frontend</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Backend</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Full Stack</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">DevOps</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-purple-100 dark:hover:bg-purple-800">
                  <div className="flex items-center gap-4 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      role="img"
                      viewBox="0 0 24 24"
                      className="text-2xl text-purple-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"></path>
                    </svg>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Data Analytics</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Statistics</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">SQL</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Tableau</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Data Visualization</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-900 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-orange-100 dark:hover:bg-orange-800">
                  <div className="flex items-center gap-4 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-2xl text-orange-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.168 3.564z"></path>
                    </svg>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Machine Learning</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Deep Learning</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Neural Networks</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">TensorFlow</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">NLP</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-pink-50 dark:bg-pink-900 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-pink-100 dark:hover:bg-pink-800">
                  <div className="flex items-center gap-4 mb-3 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      className="text-2xl text-pink-500"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.097-7.509c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h.098c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-.098z"></path>
                    </svg>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Design</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">UI/UX</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Graphic Design</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Figma</span>
                    <span className="px-3 py-1 text-sm rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300">Prototyping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      



      {/* Testimonials Section */}
      <section className="py-16">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
      Want to Learn More?
    </h2>
    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
      Explore tutorials, coding challenges, and interview prep at GeeksforGeeks.
    </p>
    <a
      href="https://www.geeksforgeeks.org"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-gfgsc-green text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-800 transition"
    >
      Visit GeeksforGeeks
    </a>
  </div>
</section>
    </>
  )
}

