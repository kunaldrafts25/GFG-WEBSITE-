'use client'

import { useState } from "react"
import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaWhatsapp, FaDiscord } from "react-icons/fa"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function Footer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log('Form submitted:', { name, email, message })
    toast.success("Message Sent!", {
      description: "Thank you for your message. We'll get back to you soon.",
    })
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">GeeksforGeeks Student Chapter</h2>
            <p className="mb-4 text-muted-foreground">Empowering students with technical knowledge and practical skills.</p>
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 mb-6">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/learning" className="text-muted-foreground hover:text-primary transition-colors">Learning</Link></li>
            </ul>
            <h3 className="text-lg font-semibold text-foreground mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/gfg_mitadt" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-3xl text-muted-foreground hover:text-primary transition-all" />
              </a>
              <a href="http://www.linkedin.com/in/gfgmitadt" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-3xl text-muted-foreground hover:text-primary transition-all" />
              </a>
              <a href="https://chat.whatsapp.com/HkHoCm9Rfv6Cxgt4MOtm5K" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <FaWhatsapp className="text-3xl text-muted-foreground hover:text-primary transition-all" />
              </a>
              <a href="https://discord.gg/JCyKBXsh" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                <FaDiscord className="text-3xl text-muted-foreground hover:text-primary transition-all" />
              </a>
              <a href="https://github.com/GeeksforGeeks-MITADT" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub className="text-3xl text-muted-foreground hover:text-primary transition-all" />
              </a>
            </div>
            <p className="text-muted-foreground">MIT-ADT University, Pune</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1 text-foreground">Name</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-foreground">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1 text-foreground">Message</label>
                <Textarea
                  id="message"
                  placeholder="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full min-h-[100px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} GeeksforGeeks Student Chapter MIT-ADT. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

