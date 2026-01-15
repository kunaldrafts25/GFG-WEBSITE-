'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Calendar, ChevronLeft, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface UserProfile {
    id: string
    username: string
    displayName: string
    bio: string
    college: string
    branch: string
    year: string
    createdAt: string
    eventRegistrations: Array<{
        event: { id: string; title: string; category: string; startDate: string }
    }>
    _count: { eventRegistrations: number; eventFeedbacks: number }
}

export default function ProfilePage() {
    const params = useParams()
    const userId = params.id as string
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/${userId}/profile`)
                if (res.ok) {
                    const data = await res.json()
                    setProfile(data)
                }
            } catch {
                console.error('Failed to fetch profile')
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [userId])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
                <p className="text-muted-foreground">User not found</p>
                <Link href="/events"><Button><ChevronLeft className="mr-2 h-4 w-4" />Back</Button></Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="max-w-3xl mx-auto px-4">
                <Link href="/events" className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
                    <ChevronLeft className="h-4 w-4" /> Back to Events
                </Link>

                {/* Profile Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-start gap-6">
                                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                                    {(profile.displayName || profile.username).charAt(0).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <h1 className="text-2xl font-bold">{profile.displayName || profile.username}</h1>
                                    <p className="text-muted-foreground">@{profile.username}</p>
                                    {profile.bio && <p className="mt-2">{profile.bio}</p>}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {profile.college && <Badge variant="secondary">{profile.college}</Badge>}
                                        {profile.branch && <Badge variant="outline">{profile.branch}</Badge>}
                                        {profile.year && <Badge variant="outline">{profile.year}</Badge>}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-bold text-primary">{profile._count.eventRegistrations}</div>
                            <p className="text-sm text-muted-foreground">Events Attended</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-bold text-primary">{profile._count.eventFeedbacks}</div>
                            <p className="text-sm text-muted-foreground">Feedbacks Given</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Events Attended */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" /> Events Attended
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {profile.eventRegistrations.length === 0 ? (
                            <p className="text-muted-foreground text-center py-4">No events yet</p>
                        ) : (
                            <div className="space-y-3">
                                {profile.eventRegistrations.map((reg, i) => (
                                    <Link
                                        key={i}
                                        href={`/events/${reg.event.id}`}
                                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                    >
                                        <div>
                                            <div className="font-medium">{reg.event.title}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(reg.event.startDate).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <Badge>{reg.event.category}</Badge>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
