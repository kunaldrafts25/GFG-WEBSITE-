import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The GFG Open Source Forge | GeeksforGeeks Student Chapter MIT-ADT',
  description: 'Transform your personal projects into community powerhouses. Join The GFG Open Source Forge - a structured program to develop, collaborate, and showcase innovative open-source projects.',
  keywords: [
    'open source',
    'forge',
    'collaboration',
    'projects',
    'community',
    'development',
    'programming',
    'geeksforgeeks',
    'mit-adt',
    'student chapter'
  ],
  openGraph: {
    title: 'The GFG Open Source Forge',
    description: 'From Personal Project to Community Powerhouse. Let\'s build together.',
    type: 'website',
    url: '/forge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The GFG Open Source Forge',
    description: 'From Personal Project to Community Powerhouse. Let\'s build together.',
  }
}

export default function ForgeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
