"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 backdrop-blur-md border-b border-border/50 py-4 bg-primary-foreground">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/plai-logo.png" alt="Plai Logo" width={100} height={50} priority className="w-auto h-10" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/explore"
            className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/activities"
            className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
          >
            Activities
          </Link>
          <Link
            href="/resources"
            className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
          >
            Resources
          </Link>
          <Button
            asChild
            size="sm"
            className="rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground"
          >
            <Link href="/waitlist">Join Waitlist</Link>
          </Button>
        </nav>
        <button
          className="md:hidden p-2 hover:bg-secondary/10 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-foreground" /> : <Menu className="w-6 h-6 text-foreground" />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary-foreground border-b border-border/50 shadow-lg">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              href="/explore"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors py-2 px-3 hover:bg-secondary/10 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/activities"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors py-2 px-3 hover:bg-secondary/10 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Activities
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors py-2 px-3 hover:bg-secondary/10 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground w-full"
            >
              <Link href="/waitlist" onClick={() => setMobileMenuOpen(false)}>
                Join Waitlist
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
