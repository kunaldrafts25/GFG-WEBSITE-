'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { getCurrentUser, isAdmin, getToken } from '@/lib/auth'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function EditEventPage() {
    const params = useParams()
    const router = useRouter()
    const eventId = params.id as string

    const [isLoading, setIsLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        category: 'Technical',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        speakers: '',
        prerequisites: '',
        location: '',
        posterUrl: '',
        themeColor: '#2F8D46',
        registrationCount: 0,
        whatsappLink: '',
    })

    useEffect(() => {
        const init = async () => {
            const user = await getCurrentUser()
            if (!user || !isAdmin(user)) {
                router.push('/login')
                return
            }

            // Fetch event data
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`)
                if (!res.ok) throw new Error('Event not found')
                const event = await res.json()

                setForm({
                    title: event.title || '',
                    description: event.description || '',
                    category: event.category || 'Technical',
                    startDate: event.startDate?.split('T')[0] || '',
                    endDate: event.endDate?.split('T')[0] || '',
                    startTime: event.startTime || '',
                    endTime: event.endTime || '',
                    speakers: event.speakers || '',
                    prerequisites: event.prerequisites || '',
                    location: event.location || '',
                    posterUrl: event.posterUrl || '',
                    themeColor: event.themeColor || '#2F8D46',
                    registrationCount: event.registrationCount || 0,
                    whatsappLink: event.whatsappLink || '',
                })
            } catch {
                toast.error('Failed to load event')
                router.push('/admin/events')
                return
            }

            setIsLoading(false)
        }

        init()
    }, [eventId, router])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        const token = getToken()
        const payload = {
            title: form.title,
            description: form.description,
            category: form.category,
            date: `${form.startDate} to ${form.endDate}`,
            time: `${form.startTime} - ${form.endTime}`,
            speakers: form.speakers,
            prerequisites: form.prerequisites,
            location: form.location,
            posterUrl: form.posterUrl,
            themeColor: form.themeColor,
            registrationCount: parseInt(String(form.registrationCount)) || 0,
            whatsappLink: form.whatsappLink || null,
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            })

            if (res.ok) {
                toast.success('Event updated!')
                router.push('/admin/events')
            } else {
                toast.error('Failed to update event')
            }
        } catch {
            toast.error('Error updating event')
        } finally {
            setSubmitting(false)
        }
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/admin/events">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Event</h1>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Event Details</CardTitle>
                        <CardDescription>Update the event information</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input id="title" name="title" value={form.title} onChange={handleChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea id="description" name="description" value={form.description} onChange={handleChange} required rows={4} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={form.category}
                                        onChange={handleChange}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    >
                                        <option value="Technical">Technical</option>
                                        <option value="Workshop">Workshop</option>
                                        <option value="Hackathon">Hackathon</option>
                                        <option value="Seminar">Seminar</option>
                                        <option value="Contest">Contest</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="themeColor">Theme Color</Label>
                                    <Input id="themeColor" name="themeColor" type="color" value={form.themeColor} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date *</Label>
                                    <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate">End Date *</Label>
                                    <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="startTime">Start Time</Label>
                                    <Input id="startTime" name="startTime" type="time" value={form.startTime} onChange={handleChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endTime">End Time</Label>
                                    <Input id="endTime" name="endTime" type="time" value={form.endTime} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" value={form.location} onChange={handleChange} placeholder="Room 302, Block A" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="speakers">Speakers</Label>
                                <Input id="speakers" name="speakers" value={form.speakers} onChange={handleChange} placeholder="Speaker names" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="prerequisites">Prerequisites</Label>
                                <Input id="prerequisites" name="prerequisites" value={form.prerequisites} onChange={handleChange} placeholder="What attendees should know" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="registrationCount">Registration Count (Manual Override)</Label>
                                <Input
                                    id="registrationCount"
                                    name="registrationCount"
                                    type="number"
                                    min="0"
                                    value={form.registrationCount}
                                    onChange={handleChange}
                                    placeholder="0"
                                />
                                <p className="text-xs text-muted-foreground">Override the displayed registration count. Actual registrations are not affected.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="whatsappLink">WhatsApp Community Link (optional)</Label>
                                <Input
                                    id="whatsappLink"
                                    name="whatsappLink"
                                    type="url"
                                    value={form.whatsappLink}
                                    onChange={handleChange}
                                    placeholder="https://chat.whatsapp.com/..."
                                />
                                <p className="text-xs text-muted-foreground">Link to event-specific WhatsApp group or community</p>
                            </div>

                            <div className="flex gap-4">
                                <Button type="submit" disabled={submitting} className="flex-1">
                                    {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                    Save Changes
                                </Button>
                                <Button type="button" variant="outline" onClick={() => router.push('/admin/events')}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
