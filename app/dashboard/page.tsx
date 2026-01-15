'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { getToken, removeToken } from '@/lib/auth'
import {
    User, Calendar, MessageSquare, Camera, Star, Award, Settings, LogOut,
    Loader2, ChevronRight, Edit2, Save, X, Shield, Clock
} from 'lucide-react'

interface DashboardData {
    user: {
        id: string
        email: string
        username: string
        displayName: string | null
        avatarUrl: string | null
        bio: string | null
        phone: string | null
        college: string | null
        branch: string | null
        year: string | null
        role: string
        createdAt: string
    }
    stats: {
        eventsAttended: number
        feedbackGiven: number
        photosShared: number
        commentsPosted: number
        checkIns: number
    }
    badges: Array<{ id: string; name: string; icon: string; description: string }>
    eventsAttended: Array<{ id: string; title: string; category: string; startDate: string; posterUrl?: string; themeColor?: string }>
    testimonials: Array<{ id: string; content: string; isApproved: boolean; isFeatured: boolean; createdAt: string }>
}

export default function DashboardPage() {
    const router = useRouter()
    const [data, setData] = useState<DashboardData | null>(null)
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [saving, setSaving] = useState(false)
    const [editForm, setEditForm] = useState({
        displayName: '',
        bio: '',
        phone: '',
        college: '',
        branch: '',
        year: ''
    })

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = getToken()
            if (!token) {
                router.push('/login')
                return
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/auth/me/dashboard`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                if (!res.ok) {
                    removeToken()
                    router.push('/login')
                    return
                }

                const dashboardData = await res.json()
                setData(dashboardData)
                setEditForm({
                    displayName: dashboardData.user.displayName || '',
                    bio: dashboardData.user.bio || '',
                    phone: dashboardData.user.phone || '',
                    college: dashboardData.user.college || '',
                    branch: dashboardData.user.branch || '',
                    year: dashboardData.user.year || ''
                })
            } catch {
                toast.error('Failed to load dashboard')
            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()
    }, [router])

    const handleSaveProfile = async () => {
        setSaving(true)
        const token = getToken()

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/users/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            })

            if (res.ok) {
                const updated = await res.json()
                setData(prev => prev ? { ...prev, user: { ...prev.user, ...updated } } : null)
                setEditing(false)
                toast.success('Profile updated!')
            } else {
                toast.error('Failed to update profile')
            }
        } catch {
            toast.error('Error updating profile')
        } finally {
            setSaving(false)
        }
    }

    const handleLogout = () => {
        removeToken()
        router.push('/')
        toast.success('Logged out successfully')
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-24">
                <p className="text-muted-foreground">Please log in to view your dashboard</p>
                <Button onClick={() => router.push('/login')}>Login</Button>
            </div>
        )
    }

    const { user, stats, badges, eventsAttended, testimonials } = data
    const memberSince = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-gray-100 dark:from-gray-900 dark:via-green-900/10 dark:to-gray-800 pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 space-y-8">

                {/* Profile Header with Glassmorphism */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="relative overflow-hidden rounded-2xl">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary via-green-500 to-emerald-600" />
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_50%)]" />

                        {/* Glassy content container */}
                        <div className="relative p-6 sm:p-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="h-28 w-28 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-5xl font-bold text-white shadow-2xl">
                                        {(user.displayName || user.username).charAt(0).toUpperCase()}
                                    </div>
                                    {user.role !== 'USER' && (
                                        <div className="absolute -bottom-2 -right-2 px-2 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur text-xs font-medium flex items-center gap-1 shadow-lg">
                                            <Shield className="h-3 w-3 text-primary" />
                                            {user.role.replace('_', ' ')}
                                        </div>
                                    )}
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center sm:text-left">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                                        {user.displayName || user.username}
                                    </h1>
                                    <p className="text-white/70 text-lg">@{user.username}</p>
                                    {user.bio && (
                                        <p className="mt-2 text-white/80 max-w-md">{user.bio}</p>
                                    )}

                                    {/* Info chips */}
                                    <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                                        {user.college && (
                                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm border border-white/20">
                                                {user.college}
                                            </span>
                                        )}
                                        {user.branch && (
                                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm border border-white/20">
                                                {user.branch}
                                            </span>
                                        )}
                                        {user.year && (
                                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm border border-white/20">
                                                {user.year}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-white/60 text-sm mt-3 flex items-center gap-1 justify-center sm:justify-start">
                                        <Clock className="h-4 w-4" /> Member since {memberSince}
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => setEditing(true)}
                                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white"
                                    >
                                        <Edit2 className="h-4 w-4 mr-1" /> Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleLogout}
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white"
                                    >
                                        <LogOut className="h-4 w-4 mr-1" /> Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Cards with Glassmorphism */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4"
                >
                    {[
                        { label: 'Events', value: stats.eventsAttended, icon: Calendar, color: 'from-blue-400 to-blue-600' },
                        { label: 'Reviews', value: stats.feedbackGiven, icon: Star, color: 'from-yellow-400 to-orange-500' },
                        { label: 'Photos', value: stats.photosShared, icon: Camera, color: 'from-purple-400 to-purple-600' },
                        { label: 'Comments', value: stats.commentsPosted, icon: MessageSquare, color: 'from-green-400 to-green-600' },
                        { label: 'Check-ins', value: stats.checkIns, icon: User, color: 'from-orange-400 to-red-500' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="relative overflow-hidden rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all text-center p-6 group"
                        >
                            <div className={`mx-auto mb-3 h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-6 w-6 text-white" />
                            </div>
                            <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">{stat.value}</div>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Badges Section with Glassmorphism */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                <Award className="h-5 w-5 text-primary" /> Your Badges
                            </h3>
                            <p className="text-sm text-muted-foreground">Achievements you&apos;ve earned</p>
                        </div>
                        <div className="p-6">
                            {badges.length === 0 ? (
                                <p className="text-center text-muted-foreground py-4">
                                    No badges yet. Attend events and participate to earn badges!
                                </p>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {badges.map((badge) => (
                                        <motion.div
                                            key={badge.id}
                                            whileHover={{ scale: 1.05 }}
                                            className="relative p-4 rounded-xl bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-700/80 dark:to-gray-700/40 backdrop-blur border border-white/50 dark:border-gray-600/50 text-center shadow-md hover:shadow-lg transition-all cursor-default group"
                                            title={badge.description}
                                        >
                                            <div className="text-4xl mb-2 group-hover:animate-bounce">{badge.icon}</div>
                                            <div className="font-semibold text-sm">{badge.name}</div>
                                            <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Events Attended with Glassmorphism */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                            <h3 className="flex items-center gap-2 text-xl font-bold">
                                <Calendar className="h-5 w-5 text-primary" /> Events Attended
                            </h3>
                        </div>
                        <div className="p-6">
                            {eventsAttended.length === 0 ? (
                                <div className="text-center py-6">
                                    <p className="text-muted-foreground mb-4">You haven&apos;t attended any events yet</p>
                                    <Button onClick={() => router.push('/events')} className="bg-gradient-to-r from-primary to-green-500 hover:opacity-90">Browse Events</Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {eventsAttended.slice(0, 5).map((event) => (
                                        <Link
                                            key={event.id}
                                            href={`/events/${event.id}`}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all group shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                                                    style={{ backgroundColor: event.themeColor || '#2F8D46' }}
                                                >
                                                    {event.title.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-semibold group-hover:text-primary transition-colors">{event.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">{event.category}</Badge>
                                                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            </div>
                                        </Link>
                                    ))}
                                    {eventsAttended.length > 5 && (
                                        <p className="text-center text-sm text-muted-foreground pt-2">
                                            +{eventsAttended.length - 5} more events
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Testimonials */}
                {testimonials.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Testimonials</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {testimonials.map((t) => (
                                        <div key={t.id} className="p-3 rounded-lg border">
                                            <p className="text-sm">{t.content}</p>
                                            <div className="flex gap-2 mt-2">
                                                <Badge variant={t.isApproved ? 'secondary' : 'outline'}>
                                                    {t.isApproved ? '✓ Approved' : 'Pending'}
                                                </Badge>
                                                {t.isFeatured && <Badge className="bg-yellow-500">⭐ Featured</Badge>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}

                {/* Edit Profile Modal */}
                <AnimatePresence>
                    {editing && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            onClick={() => setEditing(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-background rounded-xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-y-auto"
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-xl font-bold">Edit Profile</h2>
                                        <Button variant="ghost" size="icon" onClick={() => setEditing(false)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label>Display Name</Label>
                                            <Input
                                                value={editForm.displayName}
                                                onChange={(e) => setEditForm({ ...editForm, displayName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label>Bio</Label>
                                            <Textarea
                                                value={editForm.bio}
                                                onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                                placeholder="Tell us about yourself..."
                                                rows={3}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Phone</Label>
                                                <Input
                                                    value={editForm.phone}
                                                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <Label>Year</Label>
                                                <select
                                                    value={editForm.year}
                                                    onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                                >
                                                    <option value="">Select Year</option>
                                                    <option value="1st Year">1st Year</option>
                                                    <option value="2nd Year">2nd Year</option>
                                                    <option value="3rd Year">3rd Year</option>
                                                    <option value="4th Year">4th Year</option>
                                                    <option value="Alumni">Alumni</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label>College</Label>
                                            <Input
                                                value={editForm.college}
                                                onChange={(e) => setEditForm({ ...editForm, college: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <Label>Branch</Label>
                                            <Input
                                                value={editForm.branch}
                                                onChange={(e) => setEditForm({ ...editForm, branch: e.target.value })}
                                            />
                                        </div>
                                        <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
                                            {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
