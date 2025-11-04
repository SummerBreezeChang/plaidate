"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, Shield, Users, Heart } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState("Oakland")
  const [selectedCategory, setSelectedCategory] = useState("Creative")

  return (
    <main className="min-h-screen bg-background">
      <section className="pt-16 pb-12 px-6 md:px-12 bg-muted/30">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#1B4229] mb-8">Find, Join, or Host</h1>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 bg-background">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Discover Activities</h2>

            {/* Location and Category Filters */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-muted-foreground">Location</label>
                <div className="flex flex-wrap gap-2">
                  {["San Francisco", "Berkeley", "Oakland", "Alameda"].map((location) => (
                    <Button
                      key={location}
                      variant={selectedLocation === location ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLocation(location)}
                      className={selectedLocation === location ? "bg-[#5DADE2] hover:bg-[#5DADE2]/90" : ""}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 flex-1">
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <div className="flex flex-wrap gap-2">
                  {["Creative", "Outdoor", "Learning"].map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? "bg-[#5DADE2] hover:bg-[#5DADE2]/90" : ""}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-end">
                <Link href="/explore" className="text-sm font-medium text-[#5DADE2] hover:underline">
                  View All →
                </Link>
              </div>
            </div>
          </div>

          {/* Activity Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Museum of Children's Art (MOCHA)",
                description:
                  "Mecca for hands-on culture & arts activities for all ages, with educational exhibits & programs.",
                image: "/modern-art-museum-interior.jpg",
                indoor: true,
                paid: true,
                address: "1221 Broadway Lt, #48, Oakland, CA 94612, USA",
                website: "#",
              },
              {
                title: "The Floating Art Museum",
                description: "2817 Blanding Ave, Alameda, CA 94501, USA",
                image: "/floating-art-museum-waterfront.jpg",
                indoor: false,
                paid: true,
                address: "2817 Blanding Ave, Alameda, CA 94501, USA",
                website: "#",
              },
              {
                title: "Color Me Mine",
                description:
                  "Paint-your-own ceramics chain, with a studio available for walk-ins, workshops & parties.",
                image: "/colorful-ceramics-painting-studio.jpg",
                indoor: true,
                paid: true,
                address: "2205 S Shore Center, Alameda, CA 94501, USA",
                website: "#",
              },
              {
                title: "The Museum of Art and Digital Entertainment - (The MADE)",
                description: "921 Washington St, Oakland, CA 94607, USA",
                image: "/digital-entertainment-museum-arcade.jpg",
                indoor: true,
                paid: true,
                address: "921 Washington St, Oakland, CA 94607, USA",
                website: "#",
              },
              {
                title: "Oakland Museum of California",
                description:
                  "Artifacts & interactive displays in a modern building focusing on state art, history & science.",
                image: "/california-museum-building-exterior.jpg",
                indoor: true,
                paid: false,
                address: "1000 Oak St, Oakland, CA 94607, USA",
                website: "#",
              },
              {
                title: "Children's Creativity Museum",
                description:
                  "A place for kids to explore art & technology by making music videos, animating short films & more.",
                image: "/kids-creativity-museum-interactive.jpg",
                indoor: true,
                paid: true,
                address: "221 4th St, San Francisco, CA 94103, USA",
                website: "#",
              },
            ].map((activity, index) => (
              <Card key={index} className="overflow-hidden bg-[#E3F2FD] border-none">
                <div className="relative aspect-video">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{activity.description}</p>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-[#E8F5E9] text-[#2E7D32] border-none">
                      {activity.indoor ? "Indoor" : "Outdoor"}
                    </Badge>
                    <Badge variant="secondary" className="bg-[#E3F2FD] text-[#1976D2] border-none">
                      {activity.paid ? "Paid" : "Free"}
                    </Badge>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-1">{activity.address}</span>
                  </div>

                  <Link
                    href={activity.website}
                    className="flex items-center gap-1 text-sm text-[#5DADE2] hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Website
                  </Link>

                  <Button className="w-full bg-white hover:bg-gray-50 text-foreground border border-gray-200">
                    Host a Plaidate
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Join a Plaidate</h2>
              <p className="text-muted-foreground">
                Connect with verified local parents hosting small, trusted playdates
              </p>
            </div>
            <Link href="/explore" className="text-sm font-medium text-[#5DADE2] hover:underline">
              See All →
            </Link>
          </div>

          {/* Host Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Lena - Art Teacher Mom",
                title: "Watercolor Playdate",
                avatar: "/woman-art-teacher.jpg",
                location: "Berkeley (East)",
                date: "Sat, Oct 25",
                time: "10:00 AM",
                ages: "Ages 6-8",
                price: "$5",
              },
              {
                name: "Marco - Soccer Coach Dad",
                title: "Mini Soccer Camp",
                avatar: "/man-soccer-coach.jpg",
                location: "Oakland North",
                date: "Sun, Oct 26",
                time: "9:00 AM",
                ages: "Ages 4-7",
                price: "Free",
              },
              {
                name: "Sarah - Science Educator",
                title: "Science Experiments",
                avatar: "/woman-science-teacher.jpg",
                location: "Berkeley West",
                date: "Sat, Nov 1",
                time: "2:00 PM",
                ages: "Ages 5-9",
                price: "$2",
              },
            ].map((host, index) => (
              <Card key={index} className="overflow-hidden bg-[#E8F5E9] border-none">
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={host.avatar || "/placeholder.svg"} alt={host.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground">{host.name}</h3>
                      <p className="text-sm text-muted-foreground">{host.title}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{host.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium">{host.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span>{host.time}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-white/50">
                      {host.ages}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/50">
                      {host.price}
                    </Badge>
                  </div>

                  <Button className="w-full bg-white hover:bg-gray-50 text-foreground border border-gray-200">
                    Request to Join
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-16 bg-background">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Host Your Own Plaidate</h2>
            <p className="text-muted-foreground">
              Share your passion, skill, or hobby with nearby families and build community
            </p>
          </div>

          <Card className="overflow-hidden bg-[#F4D03F] border-none">
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-[#1B4229]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1B4229]">Safe & Verified</h3>
                  <p className="text-sm text-[#1B4229]/80">All hosts are background checked</p>
                </div>

                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#1B4229]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1B4229]">Build Community</h3>
                  <p className="text-sm text-[#1B4229]/80">Connect with local families</p>
                </div>

                <div className="text-center space-y-2">
                  <div className="flex justify-center mb-3">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-[#1B4229]" />
                    </div>
                  </div>
                  <h3 className="font-bold text-[#1B4229]">Share Your Passion</h3>
                  <p className="text-sm text-[#1B4229]/80">Teach what you love</p>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="bg-[#5DADE2] hover:bg-[#5DADE2]/90 text-white rounded-full px-8">
                  Host Your Plaidate
                </Button>
                <p className="text-xs text-[#1B4229]/70 mt-4">All listings are reviewed for safety before going live</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className="w-full py-12 px-6 md:px-12 bg-[#5DADE2]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4">
              <Image
                src="/images/design-mode/PlaidateLogo.png"
                alt="Plai Logo"
                width={80}
                height={40}
                className="w-auto h-8"
              />
              <p className="text-sm max-w-md text-white">Curated resources and community for intentional parenting</p>
            </div>
            <nav className="flex flex-col md:flex-row gap-6">
              <Link href="/" className="text-sm text-white hover:text-white/80 transition-colors">
                Home
              </Link>
              <Link href="/explore" className="text-sm text-white hover:text-white/80 transition-colors">
                Explore
              </Link>
              <Link href="/resources" className="text-sm text-white hover:text-white/80 transition-colors">
                Resources
              </Link>
              <Link href="/waitlist" className="text-sm text-white hover:text-white/80 transition-colors">
                Waitlist
              </Link>
            </nav>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-xs text-white">© 2025 Plaidate. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
