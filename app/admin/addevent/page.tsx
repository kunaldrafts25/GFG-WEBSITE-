'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { getCurrentUser, isAdmin, getToken } from '@/lib/auth'
import { ArrowLeft, Calendar } from 'lucide-react'

interface EventFormData {
  title: string
  description: string
  category: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  speakers: string
  prerequisites: string
  registrationLink: string
  posterUrl: string
  imageUrls: string
  maxParticipants: string
}

export default function AddEventPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [form, setForm] = useState<EventFormData>({
    title: '',
    description: '',
    category: 'Technical',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    speakers: '',
    prerequisites: '',
    registrationLink: '',
    posterUrl: '',
    imageUrls: '',
    maxParticipants: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = await getCurrentUser()

      if (!currentUser || !isAdmin(currentUser)) {
        router.push('/admin/login')
        return
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router])

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
      registrationLink: form.registrationLink,
      posterUrl: form.posterUrl,
      imageUrls: form.imageUrls ? form.imageUrls.split(',').map(url => url.trim()).filter(Boolean) : [],
      maxParticipants: form.maxParticipants ? parseInt(form.maxParticipants) : null,
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success('🎉 Event created successfully!')
        router.push('/admin/events')
      } else {
        const err = await res.json()
        toast.error(`❌ ${err.message || 'Failed to create event'}`)
      }
    } catch (err) {
      toast.error('⚠️ Server error. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8 pt-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Add New Event</h1>
            <p className="text-muted-foreground">Create a new event for the chapter</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Event Details
            </CardTitle>
            <CardDescription>
              Fill in the event information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Event title"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the event..."
                  rows={4}
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-background"
                  required
                >
                  <option value="Technical">Technical</option>
                  <option value="Non-Technical">Non-Technical</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Seminar">Seminar</option>
                </select>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Time Range */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={form.startTime}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={form.endTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Speakers */}
              <div className="space-y-2">
                <Label htmlFor="speakers">Speakers</Label>
                <Input
                  id="speakers"
                  name="speakers"
                  value={form.speakers}
                  onChange={handleChange}
                  placeholder="Speaker names (comma separated)"
                />
              </div>

              {/* Prerequisites */}
              <div className="space-y-2">
                <Label htmlFor="prerequisites">Prerequisites</Label>
                <Input
                  id="prerequisites"
                  name="prerequisites"
                  value={form.prerequisites}
                  onChange={handleChange}
                  placeholder="Any prerequisites for attendees"
                />
              </div>

              {/* Poster Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="posterFile">Event Poster Image</Label>
                <div className="flex flex-col gap-2">
                  <Input
                    id="posterFile"
                    name="posterFile"
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return

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
                          setForm(prev => ({ ...prev, posterUrl: data.url }))
                          toast.success('Poster uploaded!')
                        } else {
                          toast.error('Failed to upload image')
                        }
                      } catch (error) {
                        toast.error('Upload error')
                      }
                    }}
                    className="cursor-pointer"
                  />
                  {form.posterUrl && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <span>✓ Poster uploaded</span>
                      <a href={form.posterUrl} target="_blank" className="underline">View</a>
                    </div>
                  )}
                </div>
              </div>

              {/* Max Participants */}
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants (optional)</Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  value={form.maxParticipants}
                  onChange={handleChange}
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
              </div>

              {/* Registration Link - Legacy/External */}
              <div className="space-y-2">
                <Label htmlFor="registrationLink">External Registration Link (optional)</Label>
                <Input
                  id="registrationLink"
                  name="registrationLink"
                  type="url"
                  value={form.registrationLink}
                  onChange={handleChange}
                  placeholder="https://forms.google.com/... (optional, in-app registration is default)"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? 'Creating...' : 'Create Event'}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link href="/admin/dashboard">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div >
  )
}
