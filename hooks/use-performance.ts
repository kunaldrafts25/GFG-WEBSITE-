'use client'

import { useEffect, useCallback } from 'react'

// Performance metrics interface
interface PerformanceMetrics {
  fcp?: number // First Contentful Paint
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  ttfb?: number // Time to First Byte
}

// Web Vitals thresholds
const THRESHOLDS = {
  fcp: { good: 1800, poor: 3000 },
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  ttfb: { good: 800, poor: 1800 },
}

// Performance monitoring hook
export const usePerformanceMonitoring = (enabled: boolean = true) => {
  const reportMetric = useCallback((metric: PerformanceMetrics) => {
    if (!enabled || process.env.NODE_ENV !== 'production') {
      console.log('Performance metric:', metric)
      return
    }

    // In production, you would send this to your analytics service
    // Example: analytics.track('web_vitals', metric)
  }, [enabled])

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Measure First Contentful Paint
    const measureFCP = () => {
      const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0]
      if (fcpEntry) {
        reportMetric({ fcp: fcpEntry.startTime })
      }
    }

    // Measure Largest Contentful Paint
    const measureLCP = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          reportMetric({ lcp: lastEntry.startTime })
        })
        observer.observe({ entryTypes: ['largest-contentful-paint'] })
      }
    }

    // Measure First Input Delay
    const measureFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            reportMetric({ fid: entry.processingStart - entry.startTime })
          })
        })
        observer.observe({ entryTypes: ['first-input'] })
      }
    }

    // Measure Cumulative Layout Shift
    const measureCLS = () => {
      if ('PerformanceObserver' in window) {
        let clsValue = 0
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          reportMetric({ cls: clsValue })
        })
        observer.observe({ entryTypes: ['layout-shift'] })
      }
    }

    // Measure Time to First Byte
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
        reportMetric({ ttfb })
      }
    }

    // Initialize measurements
    measureFCP()
    measureLCP()
    measureFID()
    measureCLS()
    measureTTFB()

    // Cleanup function
    return () => {
      // Disconnect observers if needed
    }
  }, [enabled, reportMetric])
}

// Hook for measuring component render time
export const useRenderTime = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`)
      }
    }
  })
}

// Hook for measuring API call performance
export const useApiPerformance = () => {
  const measureApiCall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const startTime = performance.now()
    
    try {
      const result = await apiCall()
      const endTime = performance.now()
      const duration = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`API call to ${endpoint}: ${duration.toFixed(2)}ms`)
      }
      
      // In production, report to analytics
      // analytics.track('api_performance', { endpoint, duration })
      
      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      console.error(`API call to ${endpoint} failed after ${duration.toFixed(2)}ms:`, error)
      throw error
    }
  }, [])

  return { measureApiCall }
}

// Hook for memory usage monitoring
export const useMemoryMonitoring = (interval: number = 30000) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('memory' in performance)) return

    const checkMemory = () => {
      const memory = (performance as any).memory
      if (memory) {
        const memoryInfo = {
          usedJSHeapSize: memory.usedJSHeapSize,
          totalJSHeapSize: memory.totalJSHeapSize,
          jsHeapSizeLimit: memory.jsHeapSizeLimit,
        }
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Memory usage:', memoryInfo)
        }
        
        // Alert if memory usage is high
        const usagePercentage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        if (usagePercentage > 80) {
          console.warn(`High memory usage: ${usagePercentage.toFixed(2)}%`)
        }
      }
    }

    const intervalId = setInterval(checkMemory, interval)
    
    return () => clearInterval(intervalId)
  }, [interval])
}

// Utility function to get performance score
export const getPerformanceScore = (metrics: PerformanceMetrics): number => {
  let score = 0
  let count = 0

  Object.entries(metrics).forEach(([key, value]) => {
    if (value !== undefined && key in THRESHOLDS) {
      const threshold = THRESHOLDS[key as keyof typeof THRESHOLDS]
      if (value <= threshold.good) {
        score += 100
      } else if (value <= threshold.poor) {
        score += 50
      } else {
        score += 0
      }
      count++
    }
  })

  return count > 0 ? Math.round(score / count) : 0
}
