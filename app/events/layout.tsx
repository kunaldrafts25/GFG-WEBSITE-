import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata(
  'Events',
  'Discover upcoming technical events, workshops, and competitions organized by GeeksforGeeks Student Chapter at MIT-ADT University. Join us for coding contests, hackathons, and skill development sessions.',
  '/events',
  ['events', 'workshops', 'competitions', 'technical events', 'coding contests', 'hackathons', 'programming competitions']
)

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
