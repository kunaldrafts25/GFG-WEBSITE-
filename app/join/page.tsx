'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { register } from '@/lib/auth'
import { Eye, EyeOff, UserPlus } from 'lucide-react'

export default function JoinPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        displayName: '',
        phone: '',
        college: '',
        branch: '',
        year: '',
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (formData.password.length < 6) {
            toast.error('Password must be at least 6 characters')
            return
        }

        setIsLoading(true)

        try {
            await register(
                formData.email,
                formData.username,
                formData.password,
                formData.displayName,
                formData.phone,
                formData.college,
                formData.branch,
                formData.year
            )
            toast.success('🎉 Welcome to GFG Student Chapter!')
            toast.info('You can now access exclusive resources and events.')
            router.push('/events')
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Registration failed'
            toast.error(message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-green-50 to-green-100 dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 p-4 pt-24 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg"
            >
                <Card className="border-2 shadow-xl">
                    <CardHeader className="space-y-1 text-center pb-4">
                        <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                            <UserPlus className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Join GFG Chapter</CardTitle>
                        <CardDescription>
                            Become a member of MIT ADT's coding community
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {/* Row 1: Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email">Email *</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder=""
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Row 2: Username & Full Name */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username *</Label>
                                    <Input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder=""
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="displayName">Full Name *</Label>
                                    <Input
                                        id="displayName"
                                        name="displayName"
                                        type="text"
                                        placeholder=""
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Row 3: Phone & Year */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="9876543210"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="year">Year *</Label>
                                    <select
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        <option value="">Select Year</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                        <option value="Alumni">Alumni</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row 4: College & Branch */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <Label htmlFor="college">College *</Label>
                                    <Input
                                        id="college"
                                        name="college"
                                        type="text"
                                        placeholder="MIT ADT University"
                                        value={formData.college}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="branch">Branch *</Label>
                                    <Input
                                        id="branch"
                                        name="branch"
                                        type="text"
                                        placeholder="Computer Science"
                                        value={formData.branch}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            {/* Row 5: Password */}
                            <div className="space-y-2">
                                <Label htmlFor="password">Password *</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Row 6: Confirm Password */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    disabled={isLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-3 pt-2">
                            <Button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Joining...' : 'Join Chapter'}
                            </Button>
                            <p className="text-sm text-center text-muted-foreground">
                                Already a member?{' '}
                                <Link href="/login" className="text-primary hover:underline font-medium">
                                    Sign in
                                </Link>
                            </p>
                            <p className="text-xs text-center text-muted-foreground">
                                <Link href="/" className="hover:underline">
                                    ← Back to Home
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}
