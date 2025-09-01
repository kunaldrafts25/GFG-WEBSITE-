'use client'

import React, { forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useAriaExpanded, useScreenReader } from '@/hooks/use-accessibility'

// Skip Links Component
export const SkipLinks = () => (
  <div className="sr-only focus-within:not-sr-only">
    <a
      href="#main-content"
      className="absolute top-0 left-0 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-br-md focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to main content
    </a>
    <a
      href="#main-navigation"
      className="absolute top-0 left-32 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-br-md focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Skip to navigation
    </a>
  </div>
)

// Accessible Button with enhanced keyboard support
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  loadingText?: string
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ children, loading, loadingText, disabled, onClick, ...props }, ref) => {
    const { announce } = useScreenReader()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return
      
      onClick?.(e)
      
      // Announce action to screen readers
      if (typeof children === 'string') {
        announce(`${children} activated`)
      }
    }

    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-busy={loading}
        aria-describedby={loading ? 'loading-description' : undefined}
        {...props}
      >
        {loading ? (
          <>
            <span className="sr-only">{loadingText || 'Loading'}</span>
            <span aria-hidden="true">...</span>
          </>
        ) : (
          children
        )}
      </Button>
    )
  }
)

AccessibleButton.displayName = 'AccessibleButton'

// Accessible Card with proper heading structure
interface AccessibleCardProps {
  children: React.ReactNode
  title?: string
  description?: string
  headingLevel?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  role?: string
}

export const AccessibleCard: React.FC<AccessibleCardProps> = ({
  children,
  title,
  description,
  headingLevel = 2,
  className,
  role = 'article'
}) => {
  const HeadingTag = `h${headingLevel}` as keyof JSX.IntrinsicElements

  return (
    <Card className={className} role={role}>
      {title && (
        <HeadingTag className="text-lg font-semibold mb-2">
          {title}
        </HeadingTag>
      )}
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </Card>
  )
}

// Accessible Expandable Section
interface AccessibleExpandableProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export const AccessibleExpandable: React.FC<AccessibleExpandableProps> = ({
  title,
  children,
  defaultExpanded = false,
  className
}) => {
  const { isExpanded, toggle, ariaProps } = useAriaExpanded(defaultExpanded)
  const { announce } = useScreenReader()

  const handleToggle = () => {
    toggle()
    announce(isExpanded ? `${title} collapsed` : `${title} expanded`)
  }

  const contentId = React.useId()

  return (
    <div className={className}>
      <button
        onClick={handleToggle}
        aria-controls={contentId}
        {...ariaProps}
        className="w-full text-left p-4 bg-muted hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring rounded-t-md"
      >
        <div className="flex items-center justify-between">
          <span className="font-medium">{title}</span>
          <span aria-hidden="true">
            {isExpanded ? '−' : '+'}
          </span>
        </div>
      </button>
      <div
        id={contentId}
        hidden={!isExpanded}
        className="p-4 border border-t-0 rounded-b-md"
      >
        {children}
      </div>
    </div>
  )
}

// Accessible Image with proper alt text
interface AccessibleImageProps {
  src: string
  alt: string
  decorative?: boolean
  className?: string
  width?: number
  height?: number
}

export const AccessibleImage: React.FC<AccessibleImageProps> = ({
  src,
  alt,
  decorative = false,
  className,
  width,
  height
}) => {
  return (
    <img
      src={src}
      alt={decorative ? '' : alt}
      aria-hidden={decorative}
      className={className}
      width={width}
      height={height}
      loading="lazy"
    />
  )
}

// Accessible Navigation Menu
interface AccessibleNavProps {
  items: Array<{
    href: string
    label: string
    current?: boolean
  }>
  ariaLabel?: string
}

export const AccessibleNav: React.FC<AccessibleNavProps> = ({
  items,
  ariaLabel = 'Main navigation'
}) => {
  return (
    <nav aria-label={ariaLabel} id="main-navigation">
      <ul className="flex space-x-4" role="menubar">
        {items.map((item, index) => (
          <li key={item.href} role="none">
            <a
              href={item.href}
              role="menuitem"
              aria-current={item.current ? 'page' : undefined}
              className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring ${
                item.current
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Accessible Form Field
interface AccessibleFieldProps {
  label: string
  children: React.ReactNode
  error?: string
  description?: string
  required?: boolean
}

export const AccessibleField: React.FC<AccessibleFieldProps> = ({
  label,
  children,
  error,
  description,
  required
}) => {
  const fieldId = React.useId()
  const errorId = React.useId()
  const descriptionId = React.useId()

  return (
    <div className="space-y-2">
      <label
        htmlFor={fieldId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
        {required && <span aria-label="required" className="text-destructive ml-1">*</span>}
      </label>
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      <div>
        {React.cloneElement(children as React.ReactElement, {
          id: fieldId,
          'aria-describedby': [
            description ? descriptionId : '',
            error ? errorId : ''
          ].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? 'true' : undefined,
          'aria-required': required
        })}
      </div>
      
      {error && (
        <p id={errorId} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

// Screen Reader Only Text
export const ScreenReaderOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="sr-only">{children}</span>
)
