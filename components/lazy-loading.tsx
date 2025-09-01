'use client'

import React, { Suspense, lazy } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// Loading skeletons for different components
export const EventCardSkeleton = () => (
  <Card className="w-full">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
    </CardContent>
  </Card>
)

export const MemberCardSkeleton = () => (
  <Card className="text-center">
    <CardContent className="p-6">
      <Skeleton className="w-48 h-48 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-32 mx-auto mb-2" />
      <Skeleton className="h-4 w-24 mx-auto mb-4" />
      <Skeleton className="h-16 w-full mb-4" />
      <div className="flex justify-center gap-4">
        <Skeleton className="h-8 w-8 rounded" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </CardContent>
  </Card>
)

export const LandingScrollSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center space-y-4">
      <Skeleton className="h-12 w-64 mx-auto" />
      <Skeleton className="h-6 w-48 mx-auto" />
      <Skeleton className="h-10 w-32 mx-auto" />
    </div>
  </div>
)

// Lazy loaded components
export const LazyLandingScroll = lazy(() => import('./landing-scroll'))
export const LazyMemberCard = lazy(() => import('./member-card').then(module => ({ default: module.MemberCard })))

// Higher-order component for lazy loading with error boundary
interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  errorFallback?: React.ReactNode
}

export const LazyComponent: React.FC<LazyComponentProps> = ({ 
  children, 
  fallback = <div>Loading...</div>,
  errorFallback = <div>Failed to load component</div>
}) => (
  <Suspense fallback={fallback}>
    <ErrorBoundary fallback={errorFallback}>
      {children}
    </ErrorBoundary>
  </Suspense>
)

// Simple error boundary for lazy components
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy component error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false)

  React.useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, options])

  return isIntersecting
}

// Lazy image component with intersection observer
interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false
}) => {
  const ref = React.useRef<HTMLDivElement>(null)
  const isIntersecting = useIntersectionObserver(ref)
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div ref={ref} className={className}>
      {(isIntersecting || priority) && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      )}
      {!isLoaded && (
        <Skeleton 
          className="absolute inset-0" 
          style={{ width: width || '100%', height: height || '100%' }}
        />
      )}
    </div>
  )
}
