import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json()
    
    // Get the admin secret key from environment variables
    const adminSecretKey = process.env.ADMIN_SECRET_KEY
    
    if (!adminSecretKey) {
      console.error('ADMIN_SECRET_KEY not configured in environment variables')
      return NextResponse.json(
        { message: 'Server configuration error' },
        { status: 500 }
      )
    }
    
    // Verify the provided key against the environment variable
    if (key !== adminSecretKey) {
      // Log failed authentication attempt (in production, consider rate limiting)
      const forwardedFor = request.headers.get('x-forwarded-for')
      const realIp = request.headers.get('x-real-ip')
      const clientIp = forwardedFor || realIp || 'unknown'
      console.warn('Failed admin authentication attempt from:', clientIp)
      return NextResponse.json(
        { message: 'Invalid admin credentials' },
        { status: 401 }
      )
    }
    
    // Successful authentication
    return NextResponse.json(
      { message: 'Authentication successful', authenticated: true },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('Admin verification error:', error)
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 400 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  )
}
