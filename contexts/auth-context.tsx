'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, getStoredUser, getCurrentUser, logout as authLogout, isAdmin as checkIsAdmin } from '@/lib/auth'

interface AuthContextType {
    user: User | null
    isLoading: boolean
    isAuthenticated: boolean
    isAdmin: boolean
    refreshUser: () => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const refreshUser = async () => {
        try {
            const currentUser = await getCurrentUser()
            setUser(currentUser)
        } catch (error) {
            setUser(null)
        }
    }

    useEffect(() => {
        // First check localStorage for cached user
        const storedUser = getStoredUser()
        if (storedUser) {
            setUser(storedUser)
        }

        // Then verify with server
        refreshUser().finally(() => setIsLoading(false))
    }, [])

    const logout = () => {
        authLogout()
        setUser(null)
    }

    const value: AuthContextType = {
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: checkIsAdmin(user),
        refreshUser,
        logout,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    // Return default values if outside provider (for SSR)
    if (context === undefined) {
        return {
            user: null,
            isLoading: true,
            isAuthenticated: false,
            isAdmin: false,
            refreshUser: async () => { },
            logout: () => { },
        }
    }
    return context
}
