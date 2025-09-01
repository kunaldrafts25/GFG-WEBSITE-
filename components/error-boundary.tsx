'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'
import { ErrorBoundaryState, ErrorInfo } from '@/types'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{error: Error; resetError: () => void}>
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

// Default error fallback component
export const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <div className="min-h-[400px] flex items-center justify-center p-4">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <CardTitle className="text-xl">Something went wrong</CardTitle>
        <CardDescription>
          We encountered an unexpected error. Please try again or contact support if the problem persists.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {process.env.NODE_ENV === 'development' && (
          <details className="rounded-md bg-gray-50 dark:bg-gray-900 p-3">
            <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
            <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button onClick={resetError} className="flex-1" variant="default">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Page-level error fallback for critical errors
export const PageErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetError }) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-background">
    <Card className="w-full max-w-lg">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
          <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
        </div>
        <CardTitle className="text-2xl">Page Error</CardTitle>
        <CardDescription>
          This page encountered an error and couldn't load properly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {process.env.NODE_ENV === 'development' && (
          <details className="rounded-md bg-gray-50 dark:bg-gray-900 p-4">
            <summary className="cursor-pointer text-sm font-medium">Technical Details</summary>
            <pre className="mt-3 text-xs text-gray-600 dark:text-gray-400 overflow-auto max-h-40">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button onClick={resetError} className="flex-1" size="lg">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reload Page
          </Button>
          <Button asChild variant="outline" className="flex-1" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Main Error Boundary Class Component
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo)
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      const boundaryName = this.constructor?.name ?? 'ErrorBoundary'
      this.props.onError(error, {
        componentStack: errorInfo.componentStack ?? '',
        errorBoundary: boundaryName,
      })
    }

    // In production, you might want to log to an error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const Fallback = this.props.fallback || DefaultErrorFallback
      return <Fallback error={this.state.error} resetError={this.resetError} />
    }

    return this.props.children
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error caught by error handler:', error, errorInfo)
    
    // In production, log to error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo })
    
    // You could also trigger a toast notification here
    // toast.error('An unexpected error occurred. Please try again.')
  }
}
