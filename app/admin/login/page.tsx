'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Admin login redirects to main login page
// Role-based redirect happens after login
export default function AdminLoginRedirect() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/login')
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
    )
}
