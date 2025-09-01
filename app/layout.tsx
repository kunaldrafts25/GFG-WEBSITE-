import "./globals.css"
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ErrorBoundary, PageErrorFallback } from "@/components/error-boundary"
import { PWAInstallPrompt, AppUpdateNotification } from "@/components/pwa-components"
import { baseMetadata, organizationStructuredData } from "@/lib/metadata"

const inter = Inter({ subsets: ["latin"] })

export const metadata = baseMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00895e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="GFG MIT-ADT" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#00895e" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        <ErrorBoundary fallback={PageErrorFallback}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>
              <Navbar />
            </ErrorBoundary>
            <main id="main-content" className="flex-grow" tabIndex={-1}>
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </main>
            <ErrorBoundary>
              <Footer />
            </ErrorBoundary>
          </ThemeProvider>

          {/* PWA Components */}
          <PWAInstallPrompt />
          <AppUpdateNotification />
        </ErrorBoundary>
      </body>
    </html>
  )
}