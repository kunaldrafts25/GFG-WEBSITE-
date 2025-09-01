import { Metadata } from 'next'

// Base metadata for the website
export const baseMetadata: Metadata = {
  title: {
    default: 'GeeksforGeeks Student Chapter MIT-ADT',
    template: '%s | GeeksforGeeks Student Chapter MIT-ADT'
  },
  description: 'Official GeeksforGeeks Student Chapter at MIT-ADT University. Join our community of passionate developers, participate in coding contests, workshops, and build amazing projects together.',
  keywords: [
    'geeksforgeeks',
    'student chapter',
    'mit-adt',
    'programming',
    'coding',
    'technology',
    'computer science',
    'software development',
    'competitive programming',
    'hackathons',
    'workshops',
    'tech events'
  ],
  authors: [{ name: 'GeeksforGeeks Student Chapter MIT-ADT' }],
  creator: 'GeeksforGeeks Student Chapter MIT-ADT',
  publisher: 'GeeksforGeeks Student Chapter MIT-ADT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gfgmitadt.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gfgmitadt.in',
    title: 'GeeksforGeeks Student Chapter MIT-ADT',
    description: 'Official GeeksforGeeks Student Chapter at MIT-ADT University. Join our community of passionate developers.',
    siteName: 'GeeksforGeeks Student Chapter MIT-ADT',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GeeksforGeeks Student Chapter MIT-ADT',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GeeksforGeeks Student Chapter MIT-ADT',
    description: 'Official GeeksforGeeks Student Chapter at MIT-ADT University. Join our community of passionate developers.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

// Organization structured data for SEO
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GeeksforGeeks Student Chapter MIT-ADT',
  alternateName: 'GFG MIT-ADT',
  url: 'https://gfgmitadt.in',
  logo: 'https://gfgmitadt.in/logo.png',
  description: 'Official GeeksforGeeks Student Chapter at MIT-ADT University. Join our community of passionate developers.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    addressCountry: 'India',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'General',
    email: 'gfg@mitadt.ac.in',
  },
  sameAs: [
    'https://www.linkedin.com/company/gfg-mit-adt',
    'https://www.instagram.com/gfg_mitadt',
    'https://github.com/gfg-mitadt',
  ],
  foundingDate: '2020',
  memberOf: {
    '@type': 'Organization',
    name: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org',
  },
  parentOrganization: {
    '@type': 'EducationalOrganization',
    name: 'MIT Academy of Engineering',
    url: 'https://mitadt.ac.in',
  },
}

// Utility function to generate page-specific metadata
export function generatePageMetadata(
  title: string,
  description: string,
  path: string,
  keywords: string[] = []
): Metadata {
  const url = `https://gfgmitadt.in${path}`
  
  return {
    title,
    description,
    keywords: [...baseMetadata.keywords as string[], ...keywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}
