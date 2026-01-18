'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    BarChart3, Users, Calendar, TrendingUp, Activity, Trophy,
    Loader2, ArrowUp, ArrowDown, Flame
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getCurrentUser, isAdmin, getToken } from '@/lib/auth'
import { toast } from 'sonner'

interface AnalyticsData {
    userGrowth: Array<{ date: string; count: number }>
    eventStats: Array<{
        id: string
        title: string
        date: string
        registrations: number
        attendance: number
        feedbacks: number
    }>
    engagement: {
        totalUsers: number
        activeUsers: number
        totalEvents: number
        totalCheckins: number
        totalPoints: number
        avgPointsPerUser: number
    }
    topPerformers: Array<{
        id: string
        username: string
        displayName: string | null
        avatarUrl: string | null
        points: number
        eventsAttended: number
    }>
}

export default function AdminAnalyticsPage() {
    const router = useRouter()
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [recalculating, setRecalculating] = useState(false)
    const [days, setDays] = useState(30)

    useEffect(() => {
        checkAuthAndFetch()
    }, [days])

    const checkAuthAndFetch = async () => {
        const user = await getCurrentUser()
        if (!user || !isAdmin(user)) {
            router.push('/admin/login')
            return
        }
        fetchAnalytics()
    }

    const fetchAnalytics = async () => {
        const token = getToken()
        if (!token) return

        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/analytics?days=${days}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                setAnalytics(data)
            }
        } catch (error) {
            console.error('Failed to fetch analytics:', error)
            toast.error('Failed to load analytics')
        } finally {
            setLoading(false)
        }
    }

    const recalculatePoints = async () => {
        const token = getToken()
        if (!token) return

        setRecalculating(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/admin/recalculate-points`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (res.ok) {
                const data = await res.json()
                toast.success(data.message)
                fetchAnalytics()
            }
        } catch (error) {
            toast.error('Failed to recalculate points')
        } finally {
            setRecalculating(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!analytics) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Failed to load analytics</p>
            </div>
        )
    }

    const { engagement, userGrowth, eventStats, topPerformers } = analytics

    // Calculate max value for chart scaling
    const maxGrowth = Math.max(...userGrowth.map(d => d.count), 1)
    const maxAttendance = Math.max(...eventStats.map(e => e.registrations), 1)

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <BarChart3 className="h-8 w-8 text-primary" />
                            Analytics Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-1">Track your community growth and engagement</p>
                    </div>
                    <div className="flex gap-2">
                        <select
                            value={days}
                            onChange={(e) => setDays(parseInt(e.target.value))}
                            className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800"
                        >
                            <option value={7}>Last 7 days</option>
                            <option value={30}>Last 30 days</option>
                            <option value={90}>Last 90 days</option>
                            <option value={365}>Last year</option>
                        </select>
                        <Button
                            variant="outline"
                            onClick={recalculatePoints}
                            disabled={recalculating}
                        >
                            {recalculating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Activity className="h-4 w-4 mr-2" />}
                            Recalculate Points
                        </Button>
                    </div>
                </motion.div>

                {/* Engagement Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                    {[
                        { label: 'Total Users', value: engagement.totalUsers, icon: Users, color: 'from-blue-500 to-blue-600' },
                        { label: 'Active Users', value: engagement.activeUsers, icon: Activity, color: 'from-green-500 to-green-600' },
                        { label: 'Total Events', value: engagement.totalEvents, icon: Calendar, color: 'from-purple-500 to-purple-600' },
                        { label: 'Check-ins', value: engagement.totalCheckins, icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
                        { label: 'Total Points', value: engagement.totalPoints, icon: Flame, color: 'from-red-500 to-red-600' },
                        { label: 'Avg Points', value: engagement.avgPointsPerUser, icon: Trophy, color: 'from-yellow-500 to-yellow-600' },
                    ].map((metric, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                        >
                            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center mb-3`}>
                                <metric.icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="text-2xl font-bold">{metric.value.toLocaleString()}</div>
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-6">
                    {/* User Growth Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    User Growth
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {userGrowth.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No data for this period</p>
                                ) : (
                                    <div className="space-y-1">
                                        {userGrowth.slice(-10).map((day, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-xs text-muted-foreground w-20">
                                                    {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                                <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(day.count / maxGrowth) * 100}%` }}
                                                        transition={{ delay: i * 0.05 }}
                                                        className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium w-8 text-right">{day.count}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Event Statistics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    Event Attendance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {eventStats.length === 0 ? (
                                    <p className="text-center text-muted-foreground py-8">No events in this period</p>
                                ) : (
                                    <div className="space-y-3">
                                        {eventStats.slice(0, 6).map((event, i) => (
                                            <div key={event.id} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="font-medium text-sm truncate max-w-[200px]">{event.title}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(event.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="flex gap-4 text-xs">
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" /> {event.registrations} registered
                                                    </span>
                                                    <span className="flex items-center gap-1 text-green-600">
                                                        <ArrowUp className="h-3 w-3" /> {event.attendance} attended
                                                    </span>
                                                </div>
                                                <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary rounded-full"
                                                        style={{ width: `${event.registrations > 0 ? (event.attendance / event.registrations) * 100 : 0}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Top Performers */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-yellow-500" />
                                Top Performers
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                {topPerformers.slice(0, 10).map((user, i) => (
                                    <motion.div
                                        key={user.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-700/50 dark:to-gray-800/50 border border-gray-200/50 dark:border-gray-600/50 text-center"
                                    >
                                        <div className="relative inline-block">
                                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center text-white text-xl font-bold mx-auto">
                                                {(user.displayName || user.username).charAt(0).toUpperCase()}
                                            </div>
                                            <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-yellow-500 text-white text-xs font-bold flex items-center justify-center">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <p className="font-semibold mt-2 truncate">{user.displayName || user.username}</p>
                                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                                        <div className="mt-2 flex items-center justify-center gap-1 text-primary font-bold">
                                            <Flame className="h-4 w-4" />
                                            {user.points} pts
                                        </div>
                                        <p className="text-xs text-muted-foreground">{user.eventsAttended} events</p>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
