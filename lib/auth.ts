// Auth utilities for GFG Website
// Standalone auth - uses gfg-backend directly

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'

export interface User {
    id: string
    email: string
    username: string
    displayName: string | null
    avatarUrl: string | null
    role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
    createdAt?: string
}

export interface AuthResponse {
    user: User
    token: string
    message?: string
}

// Token management (stored in localStorage)
export function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('gfg_auth_token')
}

export function setToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('gfg_auth_token', token)
    }
}

export function removeToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('gfg_auth_token')
        localStorage.removeItem('gfg_user')
    }
}

export function getStoredUser(): User | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('gfg_user')
    return stored ? JSON.parse(stored) : null
}

export function setStoredUser(user: User): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('gfg_user', JSON.stringify(user))
    }
}

// Auth API calls
export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Login failed')
    }

    const data: AuthResponse = await response.json()
    setToken(data.token)
    setStoredUser(data.user)
    return data
}

export async function register(
    email: string,
    username: string,
    password: string,
    displayName?: string,
    phone?: string,
    college?: string,
    branch?: string,
    year?: string
): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password, displayName, phone, college, branch, year }),
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Registration failed')
    }

    const data: AuthResponse = await response.json()
    setToken(data.token)
    setStoredUser(data.user)
    return data
}

export async function getCurrentUser(): Promise<User | null> {
    const token = getToken()
    if (!token) return null

    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })

        if (!response.ok) {
            removeToken()
            return null
        }

        const data = await response.json()
        setStoredUser(data.user)
        return data.user
    } catch (error) {
        removeToken()
        return null
    }
}

export function logout(): void {
    removeToken()
    if (typeof window !== 'undefined') {
        window.location.href = '/admin/login'
    }
}

// Check if user is admin
export function isAdmin(user: User | null): boolean {
    if (!user) return false
    return ['ADMIN', 'SUPER_ADMIN'].includes(user.role)
}

// Check if user is super admin
export function isSuperAdmin(user: User | null): boolean {
    if (!user) return false
    return user.role === 'SUPER_ADMIN'
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
    return !!getToken()
}

// Fetch with auth header
export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const token = getToken()

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
    })
}
