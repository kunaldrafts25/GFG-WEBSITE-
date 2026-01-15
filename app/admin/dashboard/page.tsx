'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { getCurrentUser, isAdmin, logout, User } from '@/lib/auth'
import {
    Calendar,
    Plus,
    Users,
    LogOut,
    LayoutDashboard,
    TrendingUp,
    Clock
} from 'lucide-react'

interface GfgEvent {
    id: string
    title: string
    description: string
    category: string
    date: string
    time: string | null
}

export default function AdminDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [events, setEvents] = useState<GfgEvent[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await getCurrentUser()

            if (!currentUser || !isAdmin(currentUser)) {
                router.push('/admin/login')
                return
            }

            setUser(currentUser)

            // Fetch events
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`)
                const data = await res.json()
                setEvents(Array.isArray(data) ? data : [])
            } catch (error) {
                console.error('Failed to fetch events:', error)
            }

            setIsLoading(false)
        }

        checkAuth()
    }, [router])

    const handleLogout = () => {
        logout()
        router.push('/admin/login')
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background p-8 pt-24">
                <div className="max-w-7xl mx-auto space-y-8">
                    <Skeleton className="h-12 w-64" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                        <Skeleton className="h-32" />
                    </div>
                </div>
            </div>
        )
    }

    const upcomingEvents = events.filter(event => {
        const endDate = event.date?.split(' to ')[1] || event.date
        return new Date(endDate) >= new Date()
    })

    const pastEvents = events.filter(event => {
        const endDate = event.date?.split(' to ')[1] || event.date
        return new Date(endDate) < new Date()
    })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-20">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <LayoutDashboard className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                            <p className="text-sm text-muted-foreground">
                                Welcome, {user?.displayName || user?.username}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                            {user?.role}
                        </span>
                        <Button variant="outline" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Events
                            </CardTitle>
                            <Calendar className="h-5 w-5 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{events.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                All time events created
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Upcoming Events
                            </CardTitle>
                            <Clock className="h-5 w-5 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">{upcomingEvents.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Events scheduled
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Past Events
                            </CardTitle>
                            <TrendingUp className="h-5 w-5 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">{pastEvents.length}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Events completed
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common admin tasks</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-wrap gap-4">
                            <Button asChild>
                                <Link href="/admin/addevent">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add New Event
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/admin/events">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    Manage Events
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/events" target="_blank">
                                    <Users className="h-4 w-4 mr-2" />
                                    View Public Events Page
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Recent Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Events</CardTitle>
                            <CardDescription>Latest events created</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {events.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    No events yet. Create your first event!
                                </p>
                            ) : (
                                <div className="space-y-4">
                                    {events.slice(0, 5).map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                        >
                                            <div>
                                                <h3 className="font-medium">{event.title}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {event.date} • {event.category}
                                                </p>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/admin/events/${event.id}`}>
                                                    Edit
                                                </Link>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </main>
        </div>
    )
}
