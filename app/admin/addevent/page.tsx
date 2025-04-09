'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select } from '@/components/ui/select'
import { toast } from 'sonner'

export default function AddEventPage() {
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
    registrationLink: '',
    posterUrl: '',
    apiKey: '',
  })

  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    if (form.apiKey !== 'Madhur@73') {
      toast.error('❌ Invalid admin key')
      setSubmitting(false)
      return
    }

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
      apiKey: form.apiKey,
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success('🎉 Event created successfully!')
        setForm({
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
          apiKey: '',
        })
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

  return (
    <div className="max-w-2xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8 text-green-600">Add New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" value={form.title} onChange={handleChange} required />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={form.description} onChange={handleChange} required />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Technical">Technical</option>
            <option value="Non-Technical">Non-Technical</option>
          </select>
        </div>

        {/* Date Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" name="startDate" type="date" value={form.startDate} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" name="endDate" type="date" value={form.endDate} onChange={handleChange} required />
          </div>
        </div>

        {/* Time Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input id="startTime" name="startTime" type="time" value={form.startTime} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input id="endTime" name="endTime" type="time" value={form.endTime} onChange={handleChange} required />
          </div>
        </div>

        {/* Speakers */}
        <div>
          <Label htmlFor="speakers">Speakers</Label>
          <Input id="speakers" name="speakers" value={form.speakers} onChange={handleChange} />
        </div>

        {/* Prerequisites */}
        <div>
          <Label htmlFor="prerequisites">Prerequisites</Label>
          <Input id="prerequisites" name="prerequisites" value={form.prerequisites} onChange={handleChange} />
        </div>

        {/* Poster Link */}
        <div>
          <Label htmlFor="posterUrl">Event Poster URL</Label>
          <Input id="posterUrl" name="posterUrl" type="url" value={form.posterUrl} onChange={handleChange} />
        </div>

        {/* Registration Form */}
        <div>
          <Label htmlFor="registrationLink">Google Form Link</Label>
          <Input id="registrationLink" name="registrationLink" type="url" value={form.registrationLink} onChange={handleChange} />
        </div>

        {/* Admin Key */}
        <div>
          <Label htmlFor="apiKey">Admin API Key</Label>
          <Input id="apiKey" name="apiKey" type="password" value={form.apiKey} onChange={handleChange} required />
        </div>

        <Button
          type="submit"
          className="w-full bg-green-700 text-white hover:bg-green-800"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Create Event'}
        </Button>
      </form>
    </div>
  )
}
