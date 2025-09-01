'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react'

interface ApiErrorBoundaryProps {
  children: React.ReactNode
  onRetry?: () => void
}

interface ApiErrorFallbackProps {
  error: Error
  onRetry?: () => void
}

// API-specific error fallback component
const ApiErrorFallback: React.FC<ApiErrorFallbackProps> = ({ error, onRetry }) => {
  const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
  const isServerError = error.message.includes('500') || error.message.includes('server')
  
  const getErrorIcon = () => {
    if (isNetworkError) return <WifiOff className="h-6 w-6 text-orange-600 dark:text-orange-400" />
    if (isServerError) return <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
    return <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
  }

  const getErrorTitle = () => {
    if (isNetworkError) return "Connection Error"
    if (isServerError) return "Server Error"
    return "Data Loading Error"
  }

  const getErrorDescription = () => {
    if (isNetworkError) return "Unable to connect to the server. Please check your internet connection."
    if (isServerError) return "The server is experiencing issues. Please try again later."
    return "Failed to load data. This might be a temporary issue."
  }

  return (
    <div className="flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            {getErrorIcon()}
          </div>
          <CardTitle className="text-lg">{getErrorTitle()}</CardTitle>
          <CardDescription>{getErrorDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {onRetry && (
            <Button onClick={onRetry} className="w-full" variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          )}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 rounded-md bg-gray-50 dark:bg-gray-900 p-3">
              <summary className="cursor-pointer text-sm font-medium">Error Details</summary>
              <pre className="mt-2 text-xs text-gray-600 dark:text-gray-400 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// API Error Boundary for handling API-related errors
export class ApiErrorBoundary extends React.Component<
  ApiErrorBoundaryProps,
  { hasError: boolean; error?: Error }
> {
  constructor(props: ApiErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log API errors specifically
    console.error('API Error Boundary caught an error:', error, errorInfo)
    
    // In production, you might want to log to an error reporting service
    // with API-specific context
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined })
    if (this.props.onRetry) {
      this.props.onRetry()
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return <ApiErrorFallback error={this.state.error} onRetry={this.resetError} />
    }

    return this.props.children
  }
}

// Hook for handling API errors in functional components
export const useApiErrorHandler = () => {
  const handleApiError = (error: Error) => {
    console.error('API Error:', error)
    
    // You could implement different handling based on error type
    if (error.message.includes('401')) {
      // Handle authentication errors
      console.warn('Authentication error - user might need to log in again')
    } else if (error.message.includes('403')) {
      // Handle authorization errors
      console.warn('Authorization error - user lacks permissions')
    } else if (error.message.includes('404')) {
      // Handle not found errors
      console.warn('Resource not found')
    } else if (error.message.includes('500')) {
      // Handle server errors
      console.error('Server error - backend issue')
    }
    
    return error
  }

  return { handleApiError }
}
