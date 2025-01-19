'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, User, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

export default function EventsPage() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)
  const [currentUpcomingEventIndex, setCurrentUpcomingEventIndex] = useState(0)

  const toggleEvent = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId)
  }

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date())
  const pastEvents = events.filter(event => new Date(event.date) < new Date())

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

  const EventCard = ({ event, isPast = false }) => (
    <Card className="w-full overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-8 bg-white border border-gray-200 rounded-lg hover:border-green-700">
      <CardHeader className="bg-green-700 text-white p-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-semibold">{event.title}</span>
          <Badge variant={isPast ? "secondary" : "default"}>{event.category}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-muted-foreground text-lg">{event.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-green-800">
                <Calendar className="mr-2 h-4 w-4" />
                <time dateTime={event.date}>{event.date}</time>
              </div>
              <div className="flex items-center text-sm text-green-800">
                <Clock className="mr-2 h-4 w-4" />
                <span>{event.time} ({event.duration})</span>
              </div>
            </div>
            <div className="space-y-2">
              {event.location && (
                <div className="flex items-center text-sm text-green-800">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.speaker && (
                <div className="flex items-center text-sm text-green-800">
                  <User className="mr-2 h-4 w-4" />
                  <span>{event.speaker}</span>
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
                {!isPast && (
                  <Button className="w-full bg-green-700 text-white hover:bg-green-800">Register Now</Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
  

  return (
    <main className="container py-12 mt-20 px-6 mx-auto ">
      {/* Upcoming Events Section */}
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
  
      {/* Past Events Section */}
      <section>
        <h2 className="text-3xl font-semibold mb-8 text-green-600">Past Events</h2>
        {pastEvents.map(event => (
          <EventCard key={event.id} event={event} isPast={true} />
        ))}
      </section>
    </main>
  );
}

const events = [
  {
    id: "1",
    title: "Hackathon 2024",
    category: "Competition",
    description: "24-hour coding challenge with amazing prizes. Join us for an exciting hackathon where you can showcase your skills, learn from peers, and win exciting prizes.",
    date: "2024-06-15",
    time: "9:00 AM",
    duration: "24 hours",
    location: "Main Campus",
    speaker: "Various Industry Experts",
    prerequisites: "Basic programming knowledge",
  },
  {
    id: "2",
    title: "Web Development Workshop",
    category: "Workshop",
    description: "Learn modern web development with React and Next.js. This hands-on workshop will cover everything from basics to advanced concepts in modern web development.",
    date: "2024-06-20",
    time: "2:00 PM",
    duration: "3 hours",
    location: "Online",
    speaker: "Jane Doe, Senior Frontend Developer",
    prerequisites: "HTML, CSS, and JavaScript basics",
  },
  {
    id: "3",
    title: "Coding Competition",
    category: "Competition",
    description: "Test your problem-solving skills in this intensive coding competition. Face challenging problems and compete with fellow programmers.",
    date: "2024-06-25",
    time: "10:00 AM",
    duration: "4 hours",
    location: "Tech Hub",
    prerequisites: "Data Structures and Algorithms",
  },
  {
    id: "4",
    title: "Tech Talk: AI/ML",
    category: "Seminar",
    description: "Introduction to Machine Learning concepts and their practical applications in today's world.",
    date: "2023-07-01",
    time: "6:00 PM",
    duration: "1.5 hours",
    location: "Online",
    speaker: "Dr. John Smith, AI Researcher",
    prerequisites: "Basic understanding of mathematics and programming",
  },
  {
    id: "5",
    title: "Open Source Contribution Workshop",
    category: "Workshop",
    description: "Learn how to contribute to open source projects and make your first pull request.",
    date: "2023-07-10",
    time: "3:00 PM",
    duration: "2 hours",
    location: "Online",
    speaker: "Sarah Johnson, Open Source Advocate",
    prerequisites: "Git basics",
  },
  {
    id: "6",
    title: "Mobile App Development Bootcamp",
    category: "Bootcamp",
    description: "Intensive 3-day bootcamp on building mobile apps using React Native.",
    date: "2023-07-15",
    time: "9:00 AM",
    duration: "3 days",
    location: "Innovation Center",
    speaker: "Alex Chen, Mobile App Developer",
    prerequisites: "JavaScript and React knowledge",
  }
]

