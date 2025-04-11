'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, User, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([])
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [currentUpcomingEventIndex, setCurrentUpcomingEventIndex] = useState(0)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`)
        const data = await res.json()
        setEvents(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Failed to fetch events:", err)
      }
    }
  
    fetchEvents()
  }, [])

  const toggleEvent = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  const parseDate = (dateStr: string) => {
    const [start, end] = dateStr.split(" to ");
    return {
      startDate: new Date(start.trim()),
      endDate: new Date((end || start).trim())
    }
  }
  
  const upcomingEvents = events
    .filter(event => parseDate(event.date).endDate >= new Date())
    .sort((a, b) => parseDate(a.date).startDate.getTime() - parseDate(b.date).startDate.getTime());
  
  const pastEvents = events
    .filter(event => parseDate(event.date).endDate < new Date())
    .sort((a, b) => parseDate(b.date).endDate.getTime() - parseDate(a.date).endDate.getTime());
  

  const nextUpcomingEvent = () => {
    setCurrentUpcomingEventIndex((prevIndex) =>
      (prevIndex + 1) % upcomingEvents.length
    )
  }

  const prevUpcomingEvent = () => {
    setCurrentUpcomingEventIndex((prevIndex) =>
      (prevIndex - 1 + upcomingEvents.length) % upcomingEvents.length
    )
  }

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <Card className="w-full overflow-hidden transition-shadow duration-300 mb-8 border border-gray-200 rounded-xl hover:shadow-xl hover:border-green-700 bg-white">
      {event.posterUrl && (
        <img
          src={event.posterUrl}
          alt={event.title}
          className="w-full h-[500px] object-cover object-top border-b border-gray-200"
        />
      )}
      <CardHeader className="bg-green-700 text-white p-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{event.title}</span>
          <Badge variant={isPast ? "secondary" : "default"}>{event.category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <p className="text-muted-foreground text-lg">{event.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm text-green-800">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <time>{event.date}</time>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <span>{event.time}</span>
            </div>
          </div>
          <div className="space-y-2 text-sm text-green-800">
            {event.speakers && (
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                <span>{event.speakers}</span>
              </div>
            )}
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => toggleEvent(event.id)}
          className="w-full mt-4 border-green-700 text-green-700 hover:bg-green-100"
        >
          {expandedEvent === event.id ? (
            <>
              Less Info <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              More Info <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>

        <AnimatePresence>
          {expandedEvent === event.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 mt-4"
            >
              <div className="rounded-lg bg-green-50 p-4">
                <h3 className="font-semibold mb-2 text-green-700">Event Details</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                  <li>Registration deadline: 2 days before event</li>
                  <li>Prerequisites: {event.prerequisites || 'None'}</li>
                  <li>Certificate will be provided</li>
                  <li>Limited seats available</li>
                </ul>
              </div>
              {!isPast && event.registrationLink ? (
  <a
    href={event.registrationLink}
    target="_blank"
    rel="noopener noreferrer"
    className="block"
  >
    <Button className="w-full bg-green-700 text-white hover:bg-green-800 text-lg font-bold">
      Register Now
    </Button>
  </a>
) : (
  <Button
    disabled
    className="w-full bg-gray-300 text-gray-700 cursor-not-allowed text-lg font-semibold"
  >
    Registrations Closed
  </Button>
)}

            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )

  return (
    <main className="container py-12 mt-20 px-6 mx-auto">
      {/* Upcoming Events */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-green-600">Upcoming Events</h2>
        {upcomingEvents.length > 0 ? (
          <div className="relative">
            <EventCard event={upcomingEvents[currentUpcomingEventIndex]} />
            {upcomingEvents.length > 1 && (
              <div className="absolute top-1/2 -mt-4 w-full flex justify-between">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevUpcomingEvent}
                  className="rounded-full border-green-500 hover:bg-green-100"
                >
                  <ChevronLeft className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextUpcomingEvent}
                  className="rounded-full border-green-500 hover:bg-green-100"
                >
                  <ChevronRight className="h-4 w-4 text-green-500" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
        )}
      </section>

      {/* Past Events */}
      {/* Past Events */}
<section>
  <h2 className="text-3xl font-semibold mb-8 text-green-600">Past Events</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {pastEvents.map(event => (
      <EventCard key={event.id} event={event} isPast={true} />
    ))}
  </div>
</section>

    </main>
  )
}
