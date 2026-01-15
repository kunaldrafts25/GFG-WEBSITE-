'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
    Calendar, Clock, MapPin, User, Users, Share2,
    ChevronLeft, Trophy, Image as ImageIcon, Play,
    CheckCircle, Loader2, MessageSquare, Star, Send, QrCode, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { toast } from 'sonner'
import { getToken, getCurrentUser, User as AuthUser } from '@/lib/auth'
import Confetti, { SuccessAnimation } from '@/components/confetti'

// --- Interfaces ---
interface Winner { name: string; position: string; prize?: string }
interface Comment { id: string; content: string; createdAt: string; user: { displayName?: string; username: string } }
interface Feedback { id: string; rating: number; comment?: string; user: { displayName?: string; username: string } }

interface EventData {
    id: string; title: string; description: string; category: string
    date: string; time: string; startDate: string; endDate: string
    speakers?: string; prerequisites?: string; posterUrl?: string; location?: string
    registrationCount: number; isPast: boolean
    recapSummary?: string; recapHighlights?: string[]; recapPhotos?: string[]
    recapVideoUrl?: string; winners?: Winner[]; themeColor?: string; isRecapPublished?: boolean
}

// --- Components ---

function Countdown({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime()
            const diff = targetDate.getTime() - now
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000)
                })
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [targetDate])

    return (
        <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/10 backdrop-blur-md rounded-xl p-2 md:p-3 border border-white/10">
                    <div className="text-xl md:text-3xl font-bold text-white mono">{value.toString().padStart(2, '0')}</div>
                    <div className="text-[10px] md:text-xs text-white/70 uppercase tracking-wider">{unit}</div>
                </div>
            ))}
        </div>
    )
}

function StatBadge({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="h-5 w-5" />
            </div>
            <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{label}</p>
                <p className="font-semibold text-foreground">{value}</p>
            </div>
        </div>
    )
}

export default function EventDetailPage() {
    const params = useParams()
    const router = useRouter()
    const eventId = params.id as string

    // --- State ---
    const [event, setEvent] = useState<EventData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)
    const [isRegistered, setIsRegistered] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [showConfetti, setShowConfetti] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
    const [avgRating, setAvgRating] = useState(0)
    const [myRating, setMyRating] = useState(0)
    const [myFeedback, setMyFeedback] = useState('')
    const [showQR, setShowQR] = useState(false)
    const [communityPhotos, setCommunityPhotos] = useState<Array<{ photoUrl: string; caption?: string; user: { displayName?: string; username: string } }>>([])
    const [activeTab, setActiveTab] = useState('overview')

    // --- Fetching ---
    const fetchComments = useCallback(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/comments`)
        if (res.ok) setComments(await res.json())
    }, [eventId])

    const fetchFeedback = useCallback(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/feedback`)
        if (res.ok) {
            const data = await res.json()
            setFeedbacks(data.feedbacks)
            setAvgRating(data.avgRating)
        }
    }, [eventId])

    const fetchPhotos = useCallback(async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/photos`)
        if (res.ok) setCommunityPhotos(await res.json())
    }, [eventId])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`)
                if (!res.ok) throw new Error('Event not found')
                const data = await res.json()
                setEvent(data)

                const user = await getCurrentUser()
                setCurrentUser(user)

                if (user) {
                    const token = getToken()
                    const regRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/registration-status`, { headers: { 'Authorization': `Bearer ${token}` } })
                    if (regRes.ok) setIsRegistered((await regRes.json()).isRegistered)
                }

                fetchComments()
                fetchFeedback()
                fetchPhotos()
            } catch {
                setError('Failed to load event')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [eventId, fetchComments, fetchFeedback, fetchPhotos])

    // --- Handlers ---
    const handleRegister = async () => {
        if (!currentUser) { toast.info('Please sign in'); router.push('/login'); return }
        setRegistering(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/register`, {
                method: isRegistered ? 'DELETE' : 'POST',
                headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' }
            })
            if (res.ok) {
                const wasRegistered = isRegistered
                setIsRegistered(!isRegistered)

                if (!wasRegistered) {
                    // Trigger celebration animations
                    setShowConfetti(true)
                    setShowSuccess(true)
                    setTimeout(() => setShowSuccess(false), 1500)
                    setTimeout(() => setShowConfetti(false), 3000)
                }

                toast.success(wasRegistered ? 'Unregistered' : '🎉 You\'re registered!')
            } else {
                toast.error((await res.json()).message)
            }
        } catch { toast.error('Failed') }
        finally { setRegistering(false) }
    }

    const handleShare = () => {
        if (navigator.share) navigator.share({ title: event?.title, url: window.location.href })
        else { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!') }
    }

    const submitComment = async () => {
        if (!currentUser) { toast.info('Sign in to comment'); router.push('/login'); return }
        if (!newComment.trim()) { toast.error('Please write a comment'); return }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/comments`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment })
            })
            if (res.ok) {
                setNewComment('');
                fetchComments();
                toast.success('Comment added!')
            } else {
                const data = await res.json()
                toast.error(data.message || 'Failed to add comment')
            }
        } catch (err) {
            console.error('Comment error:', err)
            toast.error('Failed to add comment')
        }
    }

    const submitFeedback = async () => {
        if (!currentUser) { toast.info('Sign in to rate'); router.push('/login'); return }
        if (myRating < 1) { toast.error('Select a rating first'); return }
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/feedback`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: myRating, comment: myFeedback })
            })
            if (res.ok) {
                setMyRating(0);
                setMyFeedback('');
                fetchFeedback();
                toast.success('Thanks for your feedback!')
            } else {
                const data = await res.json()
                toast.error(data.message || 'Failed to submit feedback')
            }
        } catch (err) {
            console.error('Feedback error:', err)
            toast.error('Failed to submit feedback')
        }
    }

    // --- Render ---
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
    if (error || !event) return <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-zinc-50 dark:bg-zinc-950"><p className="text-muted-foreground">{error || 'Not found'}</p><Button onClick={() => router.push('/events')}>Back to Events</Button></div>

    const themeColor = event.themeColor || '#2F8D46'
    const hasRecap = event.isRecapPublished && (event.recapSummary || event.recapHighlights?.length)
    const eventStart = new Date(event.startDate)
    const isUpcoming = eventStart > new Date()

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-20">
            {/* Celebration Animations */}
            <Confetti trigger={showConfetti} />
            <SuccessAnimation show={showSuccess} />

            {/* Immersive Hero Section */}
            <div className="relative w-full h-[60vh] min-h-[500px]">
                {/* Background Image/Gradient */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: event.posterUrl ? `url(${event.posterUrl})` : undefined,
                        backgroundColor: themeColor
                    }}
                >
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent" />
                </div>

                {/* Content Container */}
                <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-12">

                    <Link href="/events" className="absolute top-8 left-4 md:left-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40">
                        <ChevronLeft className="h-4 w-4" /> Back to Events
                    </Link>

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {/* Meta Badges */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <Badge className="bg-primary/20 hover:bg-primary/30 text-primary-foreground border-primary/50 backdrop-blur-md px-3 py-1.5 text-sm">
                                {event.category}
                            </Badge>
                            {event.isPast && <Badge variant="secondary" className="backdrop-blur-md bg-white/10 text-white border-white/20">Event Concluded</Badge>}
                            {avgRating > 0 && <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 bg-yellow-400/10 backdrop-blur-md"><Star className="w-3.5 h-3.5 mr-1.5 fill-yellow-400" />{avgRating} Rating</Badge>}
                            {isRegistered && <Badge className="bg-green-500/80 text-white backdrop-blur-md"><CheckCircle className="w-3.5 h-3.5 mr-1.5" />Attending</Badge>}
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl drop-shadow-sm">
                            {event.title}
                        </h1>

                        {/* Main Action Bar */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                            {/* Countdown or Date */}
                            {isUpcoming ? (
                                <Countdown targetDate={eventStart} />
                            ) : (
                                <div className="flex items-center gap-4 text-white/90 bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                    <Calendar className="h-8 w-8 text-primary" />
                                    <div>
                                        <p className="text-sm font-medium opacity-70">Event Date</p>
                                        <p className="text-xl font-bold">{event.date}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
                                {!event.isPast && (
                                    <Button
                                        size="lg"
                                        className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-semibold"
                                        onClick={handleRegister}
                                        disabled={registering}
                                        style={{ backgroundColor: isRegistered ? '#16a34a' : themeColor }}
                                    >
                                        {registering ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : isRegistered ? <CheckCircle className="mr-2 h-5 w-5" /> : <ArrowRight className="mr-2 h-5 w-5" />}
                                        {isRegistered ? 'Waitlist / Unregister' : 'Secure Your Spot'}
                                    </Button>
                                )}
                                <div className="flex gap-2">
                                    <Button variant="secondary" size="lg" className="h-14 w-14 rounded-xl" onClick={handleShare} title="Share"><Share2 className="h-5 w-5" /></Button>
                                    <Button variant="secondary" size="lg" className="h-14 w-14 rounded-xl" onClick={() => setShowQR(!showQR)} title="QR Code"><QrCode className="h-5 w-5" /></Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar (Meta Info) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* QR Code Popup Card */}
                        <AnimatePresence>
                            {showQR && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                    <Card className="border-primary/20 overflow-hidden shadow-lg">
                                        <CardContent className="pt-6 flex flex-col items-center bg-gradient-to-b from-primary/5 to-transparent">
                                            <div className="bg-white p-2 rounded-lg"><QRCodeSVG value={typeof window !== 'undefined' ? window.location.href : ''} size={150} /></div>
                                            <p className="text-sm text-muted-foreground mt-4 font-medium">Scan to share this event</p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Event Details Card */}
                        <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-zinc-900">
                            <CardHeader className="bg-zinc-50 dark:bg-zinc-800/50 pb-4 border-b">
                                <CardTitle className="text-lg">Event Details</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-4">
                                <StatBadge icon={Calendar} label="Date" value={event.date} />
                                {event.time && <StatBadge icon={Clock} label="Time" value={event.time} />}
                                {event.location && <StatBadge icon={MapPin} label="Location" value={event.location} />}
                                <StatBadge icon={Users} label="Registrations" value={event.registrationCount + " People"} />
                            </CardContent>
                        </Card>

                        {/* Speakers Card */}
                        {event.speakers && (
                            <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-zinc-900">
                                <CardHeader className="bg-zinc-50 dark:bg-zinc-800/50 pb-4 border-b">
                                    <CardTitle className="text-lg">Speakers</CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                                            <AvatarFallback className="bg-primary/5 text-primary"><User /></AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-lg">{event.speakers}</p>
                                            <p className="text-xs text-muted-foreground">Guest Speaker</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Main Column (Tabs & Content) */}
                    <div className="lg:col-span-8">
                        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="w-full justify-start p-1 h-auto bg-white dark:bg-zinc-900 border rounded-xl mb-6 overflow-x-auto">
                                <TabsTrigger value="overview" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2.5">Overview</TabsTrigger>
                                <TabsTrigger value="discussion" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2.5">Discussion <span className="ml-2 text-xs bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded-full">{comments.length}</span></TabsTrigger>
                                {(event.recapPhotos?.length || communityPhotos.length > 0) && <TabsTrigger value="gallery" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2.5">Photos</TabsTrigger>}
                                {event.isPast && <TabsTrigger value="feedback" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2.5">Reviews</TabsTrigger>}
                                {hasRecap && <TabsTrigger value="recap" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-lg px-4 py-2.5">Recap</TabsTrigger>}
                            </TabsList>

                            <div className="min-h-[400px]">
                                <TabsContent value="overview" className="space-y-6 animate-in fade-in-50 duration-300">
                                    <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
                                        <CardContent className="pt-8 px-8 prose dark:prose-invert max-w-none">
                                            <h3 className="text-2xl font-bold mb-4">About this Event</h3>
                                            <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">{event.description}</p>
                                            {event.prerequisites && (
                                                <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-4 rounded-r-lg mt-8">
                                                    <h4 className="text-amber-700 dark:text-amber-500 font-bold m-0 mb-1">Prerequisites</h4>
                                                    <p className="m-0 text-sm text-amber-800 dark:text-amber-400">{event.prerequisites}</p>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="discussion" className="space-y-6 animate-in fade-in-50 duration-300">
                                    <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
                                        <CardHeader><CardTitle>Discussion Board</CardTitle><CardDescription>Join the conversation with other attendees</CardDescription></CardHeader>
                                        <CardContent>
                                            <div className="flex gap-4 mb-8">
                                                <Avatar><AvatarImage src={currentUser?.avatarUrl ?? undefined} /><AvatarFallback>ME</AvatarFallback></Avatar>
                                                <div className="flex-1 space-y-3">
                                                    <Textarea
                                                        placeholder="Ask a question or share your thoughts..."
                                                        className="min-h-[100px] resize-none bg-zinc-50 dark:bg-zinc-950/50"
                                                        value={newComment} onChange={e => setNewComment(e.target.value)}
                                                    />
                                                    <div className="flex justify-end">
                                                        <Button onClick={submitComment}><Send className="w-4 h-4 mr-2" /> Post Comment</Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                {comments.map(c => (
                                                    <div key={c.id} className="flex gap-4 group">
                                                        <Avatar className="mt-1"><AvatarImage src={undefined} /><AvatarFallback>{c.user.username.substring(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                                                        <div className="flex-1 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl rounded-tl-none">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <Link href={`/profile/${c.user.username}`} className="font-semibold hover:text-primary transition-colors">{c.user.displayName || c.user.username}</Link>
                                                                <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
                                                            </div>
                                                            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">{c.content}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {comments.length === 0 && <div className="text-center py-12 text-muted-foreground bg-zinc-50 dark:bg-zinc-950/30 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">No comments yet. Start the discussion!</div>}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="gallery" className="animate-in fade-in-50 duration-300">
                                    <div className="columns-2 md:columns-3 gap-4 space-y-4">
                                        {[...(event.recapPhotos || []), ...communityPhotos.map(p => p.photoUrl)].map((photo, i) => (
                                            <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in shadow-sm hover:shadow-xl transition-all duration-300" onClick={() => setSelectedImage(photo)}>
                                                <img src={photo} alt="" className="w-full h-auto transform group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="feedback" className="animate-in fade-in-50 duration-300">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <Card className="h-fit border-none shadow-sm bg-white dark:bg-zinc-900 sticky top-4">
                                            <CardHeader><CardTitle>Leave a Review</CardTitle><CardDescription>How was your experience?</CardDescription></CardHeader>
                                            <CardContent className="space-y-6">
                                                <div className="flex justify-center gap-2 py-4">
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <button key={n} onClick={() => setMyRating(n)} className="hover:scale-110 transition-transform">
                                                            <Star className={`h-10 w-10 ${n <= myRating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-200 dark:text-zinc-700'}`} />
                                                        </button>
                                                    ))}
                                                </div>
                                                <Textarea placeholder="Share your experience (optional)..." value={myFeedback} onChange={e => setMyFeedback(e.target.value)} className="min-h-[120px]" />
                                                <Button onClick={submitFeedback} className="w-full" size="lg">Submit Review</Button>
                                            </CardContent>
                                        </Card>

                                        <div className="space-y-4">
                                            <h3 className="text-xl font-semibold mb-6">Recent Reviews</h3>
                                            {feedbacks.map(f => (
                                                <Card key={f.id} className="border-none shadow-sm bg-white dark:bg-zinc-900">
                                                    <CardContent className="pt-6">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <div className="flex items-center gap-2">
                                                                <Avatar className="h-8 w-8"><AvatarFallback>{f.user.username.substring(0, 2).toUpperCase()}</AvatarFallback></Avatar>
                                                                <span className="font-semibold">{f.user.displayName || f.user.username}</span>
                                                            </div>
                                                            <div className="flex bg-yellow-400/10 px-2 py-1 rounded-md border border-yellow-400/20">{[1, 2, 3, 4, 5].map(n => <Star key={n} className={`h-3 w-3 ${n <= f.rating ? 'text-yellow-400 fill-yellow-400' : 'text-zinc-200 dark:text-zinc-700'}`} />)}</div>
                                                        </div>
                                                        {f.comment && <p className="text-zinc-600 dark:text-zinc-400">{f.comment}</p>}
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                {/* Reuse Recap content structure but styled */}
                                <TabsContent value="recap" className="space-y-6">
                                    {/* ... Recap implementation similar to original but with improved Cards ... */}
                                    {hasRecap && (
                                        <div className="space-y-6">
                                            {event.recapVideoUrl && (
                                                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
                                                    <iframe src={event.recapVideoUrl.replace('watch?v=', 'embed/')} className="w-full h-full" allowFullScreen />
                                                </div>
                                            )}
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
                                                    <CardHeader><CardTitle>Highlights</CardTitle></CardHeader>
                                                    <CardContent>
                                                        <ul className="space-y-3">
                                                            {event.recapHighlights?.map((h, i) => (
                                                                <li key={i} className="flex gap-3 items-start">
                                                                    <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5"><CheckCircle className="h-3.5 w-3.5" /></div>
                                                                    <span>{h}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </CardContent>
                                                </Card>
                                                <Card className="border-none shadow-sm bg-white dark:bg-zinc-900">
                                                    <CardHeader><CardTitle>Winners</CardTitle></CardHeader>
                                                    <CardContent>
                                                        <div className="space-y-4">
                                                            {(event.winners as Winner[])?.map((w, i) => (
                                                                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800">
                                                                    <div className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}</div>
                                                                    <div>
                                                                        <p className="font-bold">{w.name}</p>
                                                                        <p className="text-xs text-muted-foreground">{w.position}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Lightbox Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                        <button className="absolute top-4 right-4 text-white/50 hover:text-white"><ChevronLeft className="h-8 w-8 rotate-180" /></button>
                        <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={selectedImage} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
