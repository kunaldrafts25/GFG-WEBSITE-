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
import { ArrowLeft, Save, Loader2, Plus, Trash2, Upload, Trophy, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

interface Winner {
    name: string
    position: string
    prize: string
}

export default function RecapEditorPage() {
    const params = useParams()
    const router = useRouter()
    const eventId = params.id as string

    const [isLoading, setIsLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [eventTitle, setEventTitle] = useState('')
    const [form, setForm] = useState({
        recapSummary: '',
        recapHighlights: [''],
        recapVideoUrl: '',
        themeColor: '#2F8D46',
        isRecapPublished: false,
    })
    const [recapPhotos, setRecapPhotos] = useState<string[]>([])
    const [recapPhotosByDay, setRecapPhotosByDay] = useState<Record<number, string[]>>({ 1: [] })
    const [photoDays, setPhotoDays] = useState<number[]>([1])
    const [activePhotoDay, setActivePhotoDay] = useState(0)
    const [winners, setWinners] = useState<Winner[]>([])
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        const init = async () => {
            const user = await getCurrentUser()
            if (!user || !isAdmin(user)) {
                router.push('/login')
                return
            }

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}`)
                if (!res.ok) throw new Error('Event not found')
                const event = await res.json()

                setEventTitle(event.title)
                setForm({
                    recapSummary: event.recapSummary || '',
                    recapHighlights: event.recapHighlights?.length ? event.recapHighlights : [''],
                    recapVideoUrl: event.recapVideoUrl || '',
                    themeColor: event.themeColor || '#2F8D46',
                    isRecapPublished: event.isRecapPublished || false,
                })
                setRecapPhotos(event.recapPhotos || [])
                setWinners(event.winners || [])
            } catch {
                toast.error('Failed to load event')
                router.push('/admin/events')
                return
            }

            setIsLoading(false)
        }

        init()
    }, [eventId, router])

    const handleHighlightChange = (index: number, value: string) => {
        const updated = [...form.recapHighlights]
        updated[index] = value
        setForm({ ...form, recapHighlights: updated })
    }

    const addHighlight = () => {
        setForm({ ...form, recapHighlights: [...form.recapHighlights, ''] })
    }

    const removeHighlight = (index: number) => {
        const updated = form.recapHighlights.filter((_, i) => i !== index)
        setForm({ ...form, recapHighlights: updated.length ? updated : [''] })
    }

    const addWinner = () => {
        setWinners([...winners, { name: '', position: '', prize: '' }])
    }

    const updateWinner = (index: number, field: keyof Winner, value: string) => {
        const updated = [...winners]
        updated[index][field] = value
        setWinners(updated)
    }

    const removeWinner = (index: number) => {
        setWinners(winners.filter((_, i) => i !== index))
    }

    // Day-based photo management
    const addPhotoDay = () => {
        const nextDay = photoDays.length > 0 ? Math.max(...photoDays) + 1 : 1
        setPhotoDays([...photoDays, nextDay])
        setRecapPhotosByDay({ ...recapPhotosByDay, [nextDay]: [] })
        setActivePhotoDay(photoDays.length)
    }

    const removePhotoDay = (index: number) => {
        const dayToRemove = photoDays[index]
        const newDays = photoDays.filter((_, i) => i !== index)
        const newPhotosByDay = { ...recapPhotosByDay }
        delete newPhotosByDay[dayToRemove]
        setPhotoDays(newDays)
        setRecapPhotosByDay(newPhotosByDay)
        if (activePhotoDay >= newDays.length) {
            setActivePhotoDay(Math.max(0, newDays.length - 1))
        }
    }

    const removePhotoFromDay = (day: number, photoIndex: number) => {
        setRecapPhotosByDay({
            ...recapPhotosByDay,
            [day]: recapPhotosByDay[day].filter((_, i) => i !== photoIndex)
        })
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>, day?: number) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploading(true)
        const uploadedUrls: string[] = []

        for (const file of Array.from(files)) {
            const formData = new FormData()
            formData.append('poster', file)

            try {
                const token = getToken()
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/upload`, {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: formData
                })

                if (res.ok) {
                    const data = await res.json()
                    uploadedUrls.push(data.url)
                }
            } catch {
                toast.error(`Failed to upload ${file.name}`)
            }
        }

        if (uploadedUrls.length > 0) {
            if (day !== undefined) {
                // Add to specific day
                setRecapPhotosByDay({
                    ...recapPhotosByDay,
                    [day]: [...(recapPhotosByDay[day] || []), ...uploadedUrls]
                })
            } else {
                // Legacy support - add to flat list
                setRecapPhotos([...recapPhotos, ...uploadedUrls])
            }
            toast.success(`Uploaded ${uploadedUrls.length} photo${uploadedUrls.length > 1 ? 's' : ''}!`)
        }
        setUploading(false)
    }

    const removePhoto = (index: number) => {
        setRecapPhotos(recapPhotos.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)

        const token = getToken()

        // Flatten day-based photos for storage while including structure
        const allPhotos = Object.values(recapPhotosByDay).flat()

        const payload = {
            recapSummary: form.recapSummary,
            recapHighlights: form.recapHighlights.filter(h => h.trim()),
            recapPhotos: allPhotos.length > 0 ? allPhotos : recapPhotos, // Use day-based if available
            recapPhotosByDay, // Store the structured data
            recapVideoUrl: form.recapVideoUrl,
            winners: winners.filter(w => w.name.trim()),
            themeColor: form.themeColor,
            isRecapPublished: form.isRecapPublished,
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events/${eventId}/recap`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            })

            if (res.ok) {
                toast.success('Recap saved!')
                router.push('/admin/events')
            } else {
                toast.error('Failed to save recap')
            }
        } catch {
            toast.error('Error saving recap')
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
                    <div>
                        <h1 className="text-2xl font-bold">Event Recap</h1>
                        <p className="text-muted-foreground">{eventTitle}</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle>What Happened</CardTitle>
                            <CardDescription>Summarize the event</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={form.recapSummary}
                                onChange={(e) => setForm({ ...form, recapSummary: e.target.value })}
                                placeholder="The event was a great success with over 100 participants..."
                                rows={4}
                            />
                        </CardContent>
                    </Card>

                    {/* Highlights */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Highlights</CardTitle>
                            <CardDescription>Add bullet points</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {form.recapHighlights.map((highlight, i) => (
                                <div key={i} className="flex gap-2">
                                    <Input
                                        value={highlight}
                                        onChange={(e) => handleHighlightChange(i, e.target.value)}
                                        placeholder="A key highlight..."
                                    />
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeHighlight(i)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addHighlight}>
                                <Plus className="h-4 w-4 mr-2" /> Add Highlight
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Winners */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5" /> Winners / Awards
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {winners.map((winner, i) => (
                                <div key={i} className="flex gap-2 items-end">
                                    <div className="flex-1 space-y-1">
                                        <Label>Position</Label>
                                        <Input value={winner.position} onChange={(e) => updateWinner(i, 'position', e.target.value)} placeholder="1st Place" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Label>Name</Label>
                                        <Input value={winner.name} onChange={(e) => updateWinner(i, 'name', e.target.value)} placeholder="John Doe" />
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <Label>Prize</Label>
                                        <Input value={winner.prize} onChange={(e) => updateWinner(i, 'prize', e.target.value)} placeholder="₹5000" />
                                    </div>
                                    <Button type="button" variant="ghost" size="icon" onClick={() => removeWinner(i)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addWinner}>
                                <Plus className="h-4 w-4 mr-2" /> Add Winner
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Photos with Day Tabs */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ImageIcon className="h-5 w-5" /> Event Photos
                            </CardTitle>
                            <CardDescription>Organize photos by day for multi-day events</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Day tabs */}
                            <div className="flex flex-wrap gap-2 border-b pb-4">
                                {photoDays.map((day, idx) => (
                                    <div key={idx} className="flex items-center gap-1">
                                        <Button
                                            type="button"
                                            variant={activePhotoDay === idx ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setActivePhotoDay(idx)}
                                        >
                                            Day {day}
                                        </Button>
                                        {photoDays.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0"
                                                onClick={() => removePhotoDay(idx)}
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={addPhotoDay}>
                                    <Plus className="h-4 w-4 mr-1" /> Add Day
                                </Button>
                            </div>

                            {/* Photos for active day */}
                            <div className="grid grid-cols-3 gap-4">
                                {(recapPhotosByDay[photoDays[activePhotoDay]] || []).map((photo, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                                        <img src={photo} alt="" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removePhotoFromDay(photoDays[activePhotoDay], i)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <Label className="text-sm text-muted-foreground mb-2 block">Upload photos for Day {photoDays[activePhotoDay]}</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handlePhotoUpload(e, photoDays[activePhotoDay])}
                                    disabled={uploading}
                                    className="cursor-pointer"
                                />
                                {uploading && <p className="text-sm text-muted-foreground mt-2">Uploading...</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Video */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Video URL</CardTitle>
                            <CardDescription>YouTube link</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Input
                                value={form.recapVideoUrl}
                                onChange={(e) => setForm({ ...form, recapVideoUrl: e.target.value })}
                                placeholder="https://youtube.com/watch?v=..."
                            />
                        </CardContent>
                    </Card>

                    {/* Publish Toggle */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Publish Recap</h4>
                                    <p className="text-sm text-muted-foreground">Make recap visible to public</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={form.isRecapPublished}
                                        onChange={(e) => setForm({ ...form, isRecapPublished: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition-colors"></div>
                                    <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5"></div>
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={submitting} className="flex-1">
                            {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                            Save Recap
                        </Button>
                        <Button type="button" variant="outline" onClick={() => router.push('/admin/events')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
