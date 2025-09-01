import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata(
  'About Us',
  'Learn about GeeksforGeeks Student Chapter at MIT-ADT University. Meet our team, discover our mission, and explore how we foster learning, build community, and drive excellence in technology.',
  '/about',
  ['about', 'team', 'mission', 'student chapter', 'community', 'leadership', 'technical teams']
)

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
