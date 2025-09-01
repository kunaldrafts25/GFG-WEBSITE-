import { generatePageMetadata } from "@/lib/metadata"

export const metadata = generatePageMetadata(
  'Learning Resources',
  'Access comprehensive learning resources, tutorials, and study materials curated by GeeksforGeeks Student Chapter at MIT-ADT University. Enhance your programming skills with our structured learning paths.',
  '/learning',
  ['learning', 'resources', 'tutorials', 'programming', 'study materials', 'skill development', 'coding practice']
)

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
