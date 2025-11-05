"use client"

import { useState } from "react"
import { WaitlistForm } from "@/components/waitlist-form"
import { FeatureCards } from "@/components/feature-cards"
import { HowItWorks } from "@/components/how-it-works"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 backdrop-blur-md border-b border-gray-200/50 py-4 bg-primary-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/plai-logo.png" alt="Plai Logo" width={100} height={50} priority className="w-auto h-10" />
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            <Link
              href="/resources"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Resources
            </Link>
            <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/waitlist">Join Waitlist</Link>
            </Button>
          </nav>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-foreground/70 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200/50 pt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/resources"
                className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resources
              </Link>
              <Button
                asChild
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              >
                <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>
                  Join Waitlist
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 md:py-24 text-background border-none bg-primary-foreground md:pt-[52px] md:pb-[76px] leading-4 py-[35px] pt-28 md:pt-[120px]">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Content (shows second on mobile, first on desktop) */}
          <div className="space-y-2 order-2 md:order-1">
            <div className="space-y-2">
              <h1
                id="join-plaidate"
                className="md:text-6xl font-bold tracking-tight text-balance leading-tight text-4xl text-foreground"
              >
                Join Plai
              </h1>
              <p className="leading-normal font-sans py-2 text-base text-popover-foreground pb-8">
                A platform for parents of K-5 children to easily host, join, and plan activities. Connect with skilled parents who create engaging activities that help your child build social skills and friendships.
              </p>
            </div>

            <div id="waitlist">
              <WaitlistForm />
            </div>

            <p className="text-sm text-muted-foreground text-center md:text-right">
              We'll be in touch to share updates. No spams.
            </p>
          </div>

          {/* Right: Image (shows first on mobile, second on desktop) */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden w-full order-1 md:order-2">
            <Image
              src="/hero-image.png"
              alt="Children playing together outdoors"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Why Parents Love Section */}
      <section className="w-full px-6 md:px-12 py-16 bg-sidebar">
        <div className="max-w-7xl space-y-12 mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Why parents love Plai</h2>
            <p className="text-lg text-foreground">
              One-stop place to chat, plan, and attend — instead of messy text threads or multiple apps.
            </p>
          </div>

          <FeatureCards />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-6 md:px-12 py-16 bg-card">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How it works</h2>
            <p className="text-lg text-primary">Getting started is simple and takes just a few minutes</p>
          </div>

          <HowItWorks />
        </div>
      </section>

      <section className="w-full px-6 md:px-12 bg-primary-foreground py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Mission Statement & Join Waitlist */}
          <div className="flex flex-col justify-center space-y-8 text-center md:text-left">
            <h2 className="tracking-tight text-balance leading-tight font-medium text-2xl md:text-3xl text-foreground">
              At Plai, we believe social skills are the foundation of kids' confidence and emotional growth.
            </h2>
            <div>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6 text-lg text-primary-foreground"
              >
                <a href="#join-plaidate">Join the Waitlist</a>
              </Button>
            </div>
          </div>

          {/* Right: Resources Section */}
          <div className="flex flex-col justify-center space-y-8 text-center md:text-left border-t md:border-t-0 md:border-l border-primary/20 pt-12 md:pt-0 md:pl-16">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground">While You Wait, Explore Resources</h3>
              <p className="text-base text-popover-foreground leading-relaxed">
                Discover curated parenting books, podcasts, activities, and tools to help you build stronger connections
                with your child today.
              </p>
            </div>
            <div>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Link href="/resources">Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-gray-200 bg-primary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <Image src="/plai-logo.png" alt="Plai Logo" width={100} height={50} className="w-auto h-8" />
              <p className="text-sm max-w-md text-background">
                Curated resources and community for intentional parenting
              </p>
            </div>
            <nav className="flex flex-col md:flex-row gap-6 text-primary-foreground">
              <Link href="/" className="text-sm hover:text-foreground/70 transition-colors text-primary-foreground">
                Home
              </Link>
              <Link
                href="/resources"
                className="text-sm hover:text-foreground/70 transition-colors text-primary-foreground"
              >
                Resources
              </Link>
              <Link
                href="/waitlist"
                className="text-sm hover:text-foreground/70 transition-colors border-primary-foreground border-none text-primary-foreground"
              >
                Waitlist
              </Link>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 border-none">
            <p className="text-xs text-primary-foreground">© 2025 Plai. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
