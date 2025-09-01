'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Download, Wifi, WifiOff, Bell, BellOff, RefreshCw } from 'lucide-react'
import { usePWAInstall, useOnlineStatus, usePushNotifications, useAppUpdate } from '@/hooks/use-pwa'
import { toast } from 'sonner'

// PWA Install Prompt Component
export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, installPWA } = usePWAInstall()

  const handleInstall = async () => {
    const success = await installPWA()
    if (success) {
      toast.success('App installed successfully! You can now access it from your home screen.')
    } else {
      toast.error('Installation was cancelled or failed.')
    }
  }

  if (isInstalled || !isInstallable) {
    return null
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Download className="h-4 w-4" />
          Install App
        </CardTitle>
        <CardDescription className="text-xs">
          Install GFG MIT-ADT for quick access and offline features
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button onClick={handleInstall} size="sm" className="flex-1">
            Install
          </Button>
          <Button variant="outline" size="sm" onClick={() => {}}>
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Online Status Indicator
export const OnlineStatusIndicator: React.FC = () => {
  const isOnline = useOnlineStatus()

  return (
    <div className="fixed top-20 right-4 z-40">
      <Badge 
        variant={isOnline ? "default" : "destructive"}
        className="flex items-center gap-1"
      >
        {isOnline ? (
          <>
            <Wifi className="h-3 w-3" />
            Online
          </>
        ) : (
          <>
            <WifiOff className="h-3 w-3" />
            Offline
          </>
        )}
      </Badge>
    </div>
  )
}

// Push Notification Settings
export const PushNotificationSettings: React.FC = () => {
  const { 
    isSupported, 
    permission, 
    subscription, 
    requestPermission, 
    subscribeToPush, 
    unsubscribeFromPush 
  } = usePushNotifications()

  const handleToggleNotifications = async () => {
    if (subscription) {
      const success = await unsubscribeFromPush()
      if (success) {
        toast.success('Notifications disabled')
      } else {
        toast.error('Failed to disable notifications')
      }
    } else {
      if (permission !== 'granted') {
        const granted = await requestPermission()
        if (!granted) {
          toast.error('Notification permission denied')
          return
        }
      }
      
      const sub = await subscribeToPush()
      if (sub) {
        toast.success('Notifications enabled')
      } else {
        toast.error('Failed to enable notifications')
      }
    }
  }

  if (!isSupported) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {subscription ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
          Push Notifications
        </CardTitle>
        <CardDescription>
          Get notified about new events and important updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Status: {subscription ? 'Enabled' : 'Disabled'}
            </p>
            <p className="text-xs text-muted-foreground">
              {permission === 'granted' 
                ? 'Permission granted' 
                : permission === 'denied' 
                ? 'Permission denied' 
                : 'Permission not requested'
              }
            </p>
          </div>
          <Button 
            onClick={handleToggleNotifications}
            variant={subscription ? "destructive" : "default"}
            size="sm"
          >
            {subscription ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// App Update Notification
export const AppUpdateNotification: React.FC = () => {
  const { updateAvailable, isUpdating, applyUpdate } = useAppUpdate()

  if (!updateAvailable) {
    return null
  }

  return (
    <Card className="fixed bottom-4 left-4 w-80 z-50 shadow-lg border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm text-blue-900">
          <RefreshCw className="h-4 w-4" />
          Update Available
        </CardTitle>
        <CardDescription className="text-xs text-blue-700">
          A new version of the app is ready to install
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-2">
          <Button 
            onClick={applyUpdate} 
            size="sm" 
            className="flex-1"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                Updating...
              </>
            ) : (
              'Update Now'
            )}
          </Button>
          <Button variant="outline" size="sm">
            Later
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Offline Fallback Component
interface OfflineFallbackProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const OfflineFallback: React.FC<OfflineFallbackProps> = ({ 
  children, 
  fallback 
}) => {
  const isOnline = useOnlineStatus()

  if (!isOnline && fallback) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// PWA Features Card
export const PWAFeaturesCard: React.FC = () => {
  const { isInstallable, isInstalled } = usePWAInstall()
  const { isSupported: swSupported } = usePushNotifications()
  const isOnline = useOnlineStatus()

  const features = [
    {
      name: 'Offline Access',
      description: 'Browse content even without internet',
      available: true,
      active: !isOnline
    },
    {
      name: 'Install as App',
      description: 'Add to home screen for quick access',
      available: isInstallable || isInstalled,
      active: isInstalled
    },
    {
      name: 'Push Notifications',
      description: 'Get notified about new events',
      available: swSupported,
      active: false // Would need to check actual subscription
    },
    {
      name: 'Background Sync',
      description: 'Sync data when connection returns',
      available: true,
      active: true
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Features</CardTitle>
        <CardDescription>
          Progressive Web App capabilities available
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">{feature.name}</p>
                <p className="text-xs text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              <Badge 
                variant={feature.available ? (feature.active ? "default" : "secondary") : "outline"}
              >
                {feature.available 
                  ? (feature.active ? 'Active' : 'Available') 
                  : 'Unavailable'
                }
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
