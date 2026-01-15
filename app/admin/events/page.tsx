'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { getCurrentUser, isAdmin, getToken } from '@/lib/auth'
import { toast } from 'sonner'
import {
    Search,
    Plus,
    Edit,
    Trash2,
    ArrowLeft,
    Calendar,
    Clock,
    Users,
    FileText,
    Download
} from 'lucide-react'

interface GfgEvent {
    id: string
    title: string
    description: string
    category: string
    date: string
    time: string | null
    speakers: string | null
}

export default function ManageEventsPage() {
    const router = useRouter()
    const [events, setEvents] = useState<GfgEvent[]>([])
    const [filteredEvents, setFilteredEvents] = useState<GfgEvent[]>([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const currentUser = await getCurrentUser()

            if (!currentUser || !isAdmin(currentUser)) {
                router.push('/admin/login')
                return
            }

            // Fetch events
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`)
                const data = await res.json()
                const eventsList = Array.isArray(data) ? data : []
                setEvents(eventsList)
                setFilteredEvents(eventsList)
            } catch (error) {
                console.error('Failed to fetch events:', error)
                toast.error('Failed to load events')
            }

            setIsLoading(false)
        }

        checkAuth()
    }, [router])

    useEffect(() => {
        if (search) {
            const filtered = events.filter(event =>
                event.title.toLowerCase().includes(search.toLowerCase()) ||
                event.description?.toLowerCase().includes(search.toLowerCase()) ||
                event.category?.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredEvents(filtered)
        } else {
            setFilteredEvents(events)
        }
    }, [search, events])

    const handleDelete = async (eventId: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return

        setDeletingId(eventId)
        const token = getToken()

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })

            if (res.ok) {
                setEvents(events.filter(e => e.id !== eventId))
                toast.success('Event deleted successfully')
            } else {
                toast.error('Failed to delete event')
            }
        } catch (error) {
            toast.error('Failed to delete event')
        } finally {
            setDeletingId(null)
        }
    }

    const handleExport = async (eventId: string) => {
        const token = getToken()
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/export-csv`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (res.ok) {
                const blob = await res.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `event-${eventId}-attendees.csv`
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
                toast.success('CSV exported!')
            } else {
                toast.error('Failed to export CSV')
            }
        } catch {
            toast.error('Export failed')
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-7xl mx-auto space-y-8">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-10 w-full max-w-md" />
                    <div className="space-y-4">
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                        <Skeleton className="h-24" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 pt-24">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div>
                            <h1 className="text-2xl font-bold">Manage Events</h1>
                            <p className="text-muted-foreground">View, edit, and delete events</p>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href="/admin/addevent">
                            <Plus className="h-4 w-4 mr-2" />
                            Add New Event
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search events..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Events List */}
                {filteredEvents.length === 0 ? (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-medium mb-2">No events found</h3>
                            <p className="text-muted-foreground mb-4">
                                {search ? 'Try a different search term' : 'Create your first event to get started'}
                            </p>
                            {!search && (
                                <Button asChild>
                                    <Link href="/admin/addevent">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Event
                                    </Link>
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid gap-4"
                    >
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div className="flex-1 space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-semibold">{event.title}</h3>
                                                    <Badge variant={event.category === 'Technical' ? 'default' : 'secondary'}>
                                                        {event.category}
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground line-clamp-2">
                                                    {event.description}
                                                </p>
                                                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-4 w-4" />
                                                        {event.date}
                                                    </span>
                                                    {event.time && (
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="h-4 w-4" />
                                                            {event.time}
                                                        </span>
                                                    )}
                                                    {event.speakers && (
                                                        <span className="flex items-center gap-1">
                                                            <Users className="h-4 w-4" />
                                                            {event.speakers}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/events/${event.id}`}>
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/events/${event.id}/edit`}>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/admin/events/${event.id}/recap`}>
                                                        <FileText className="h-4 w-4 mr-2" />
                                                        Recap
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleExport(event.id)}
                                                    title="Export Attendees"
                                                >
                                                    <Download className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(event.id)}
                                                    disabled={deletingId === event.id}
                                                >
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    {deletingId === event.id ? 'Deleting...' : 'Delete'}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Summary */}
                <p className="text-sm text-muted-foreground text-center">
                    Showing {filteredEvents.length} of {events.length} events
                </p>
            </div>
        </div>
    )
}
