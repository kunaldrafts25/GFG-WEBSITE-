// Shared Framer Motion animation variants
// Consolidates repeated animation patterns used across pages

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
}

export const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 1, 
      staggerChildren: 0.2 
    } 
  }
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export const buttonHover = {
  scale: 1.05,
  transition: { duration: 0.3 }
}

export const cardHover = {
  y: -5,
  transition: { duration: 0.3 }
}

// Animation delays helper
export const getStaggerDelay = (index: number, baseDelay: number = 0.1) => ({
  transition: { duration: 0.8, delay: index * baseDelay }
})
