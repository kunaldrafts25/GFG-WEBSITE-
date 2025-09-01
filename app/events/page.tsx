"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Clock, User, ChevronDown, ChevronUp, Trophy, Target, Users, Code, AlertCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Event, EventCardProps } from "@/types"

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null)

  const [fetchError, setFetchError] = useState<Error | null>(null)

  const fetchEvents = async () => {
    try {
      setFetchError(null)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/events`)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch events`)
      }
      const data = await res.json()
      setEvents(Array.isArray(data) ? data : [])
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to fetch events')
      console.error("Failed to fetch events:", error)
      setFetchError(error)
      setEvents([])
    }
  }

  useEffect(() => {
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
  



  const EventCard = ({ event, isPast = false }: EventCardProps) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group h-full"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 border border-border rounded-xl hover:shadow-xl hover:border-primary/50 bg-card/95 backdrop-blur-sm hover:bg-card">
        {event.posterUrl && (
          <div className="relative overflow-hidden h-80 ">
            <img
              src={event.posterUrl}
              alt={event.title}
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Badge
                variant={isPast ? "secondary" : "default"}
                className={`${isPast ? 'bg-muted/90' : 'bg-primary/90'} backdrop-blur-sm text-primary-foreground border-0 px-2 py-1 text-xs font-medium`}
              >
                {event.category}
              </Badge>
            </div>
          </div>
        )}

        <div className="relative">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <h3 className="relative text-xl font-bold text-card-foreground">
              {event.title}
            </h3>
          </div>

          <CardContent className="p-6 space-y-4 bg-card/95 text-card-foreground">

            <p className="text-muted-foreground text-base leading-relaxed">{event.description}</p>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Includes:</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 mt-0.5 text-primary" />
                  <span><span className="text-primary">Date:</span> {event.date}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 text-primary" />
                  <span><span className="text-primary">Time:</span> {event.time}</span>
                </li>
                {event.speakers && (
                  <li className="flex items-start gap-2">
                    <User className="w-4 h-4 mt-0.5 text-primary" />
                    <span><span className="text-primary">Speaker:</span> {event.speakers}</span>
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Certificate will be provided</span>
                </li>
              </ul>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleEvent(event.id)}
              className="w-full mt-4 border-primary/50 text-primary hover:bg-primary/10 backdrop-blur-sm transition-all duration-300 font-medium"
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
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="space-y-4 mt-4"
                >
                  <div className="rounded-lg bg-muted/80 backdrop-blur-sm p-4 border border-border">
                    <h4 className="font-semibold mb-3 text-primary">Event Details</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Registration deadline: 2 days before event</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Prerequisites: {event.prerequisites || 'None'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Limited seats available</span>
                      </li>
                    </ul>
                  </div>

                  {!isPast && event.registrationLink ? (
                    <motion.a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        Register Now
                      </Button>
                    </motion.a>
                  ) : (
                    <Button
                      disabled
                      className="w-full bg-muted/50 text-muted-foreground cursor-not-allowed font-semibold py-2 rounded-lg backdrop-blur-sm"
                    >
                      {isPast ? 'Event Completed' : 'Registrations Closed'}
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )

  // Handle fetch errors
  if (fetchError) {
    return (
      <main className="container py-12 mt-20 px-6 mx-auto">
        <div className="flex items-center justify-center p-8">
          <Card className="w-full max-w-md">
            <CardContent className="text-center p-6">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Error loading events</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Failed to load events. Please try again.
              </p>
              <Button onClick={fetchEvents} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-12 mt-20 px-6 mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold">Events</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Discover upcoming technical events, workshops, and competitions organized by GeeksforGeeks Student Chapter at MIT-ADT University.
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Why Attend Our Events?</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {eventBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <benefit.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="mb-8 text-2xl font-bold">Event Statistics</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {eventStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">Our Events</h2>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {upcomingEvents.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No upcoming events at the moment. Check back soon!</p>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="past">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {pastEvents.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <EventCard event={event} isPast={true} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">No past events to display.</p>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

const eventBenefits = [
  {
    title: "Skill Development",
    description: "Enhance your technical skills through hands-on workshops and coding competitions.",
    icon: Code,
  },
  {
    title: "Networking",
    description: "Connect with like-minded peers, industry professionals, and potential mentors.",
    icon: Users,
  },
  {
    title: "Recognition",
    description: "Gain recognition for your achievements and build your professional portfolio.",
    icon: Trophy,
  },
  {
    title: "Career Growth",
    description: "Access career opportunities, internships, and industry insights.",
    icon: Target,
  },
]

const eventStats = [
  {
    value: "25+",
    label: "Events Organized",
  },
  {
    value: "500+",
    label: "Participants",
  },
  {
    value: "50+",
    label: "Workshops Conducted",
  },
  {
    value: "100%",
    label: "Satisfaction Rate",
  },
]


