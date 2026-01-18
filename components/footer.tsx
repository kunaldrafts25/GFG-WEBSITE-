'use client'

import Link from "next/link"
import { FaInstagram, FaLinkedin, FaGithub, FaWhatsapp, FaDiscord } from "react-icons/fa"
import { ArrowRight, MapPin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-zinc-50 dark:from-background dark:to-zinc-950 border-t">
      <div className="container mx-auto px-6 py-10">
        {/* Main Footer Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* Brand Section */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">
              GeeksforGeeks Student Chapter
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed text-sm max-w-md">
              A campus community empowering students with technical knowledge, practical skills, and opportunities to grow together.
            </p>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <a href="https://www.instagram.com/gfg_mitadt" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group" aria-label="Instagram">
                <FaInstagram className="text-base group-hover:scale-110 transition-transform" />
              </a>
              <a href="http://www.linkedin.com/in/gfgmitadt" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group" aria-label="LinkedIn">
                <FaLinkedin className="text-base group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://chat.whatsapp.com/HkHoCm9Rfv6Cxgt4MOtm5K" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group" aria-label="WhatsApp">
                <FaWhatsapp className="text-base group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://discord.gg/JCyKBXsh" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group" aria-label="Discord">
                <FaDiscord className="text-base group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/GeeksforGeeks-MITADT" target="_blank" rel="noopener noreferrer"
                className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 group" aria-label="GitHub">
                <FaGithub className="text-base group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> MIT-ADT University, Pune
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5" /> gfg.mitadt@gmail.com
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Explore</h3>
              <ul className="space-y-2">
                {[
                  { href: "/", label: "Home" },
                  { href: "/events", label: "Events" },
                  { href: "/about", label: "About Us" },
                  { href: "/learning", label: "Resources" },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Get Involved</h3>
              <ul className="space-y-2">
                {[
                  { href: "/join", label: "Join Us" },
                  { href: "/forge", label: "GeekForge" },
                  { href: "/dashboard", label: "Dashboard" },
                  { href: "/login", label: "Sign In" },
                ].map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 group">
                      <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} GeeksforGeeks Student Chapter, MIT-ADT University. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
