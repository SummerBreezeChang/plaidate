"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Palette, Trees, GraduationCap, MapPin, Clock, Search, Sparkles } from "lucide-react"
import { useState } from "react"

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("creative")
  const [showHostModal, setShowHostModal] = useState(false)

  const activities = {
    creative: [
      {
        id: 1,
        title: "DIY Slime Lab",
        category: "Creative",
        ages: "5-7",
        location: "Oakland Hills",
        type: "Indoor",
        cost: "Free",
        icon: Palette,
      },
      {
        id: 2,
        title: "Watercolor Painting",
        category: "Creative",
        ages: "6-9",
        location: "Berkeley East",
        type: "Indoor",
        cost: "$5",
        icon: Palette,
      },
      {
        id: 3,
        title: "Clay Sculpting",
        category: "Creative",
        ages: "7-10",
        location: "Alameda",
        type: "Indoor",
        cost: "$10",
        icon: Palette,
      },
    ],
    outdoor: [
      {
        id: 4,
        title: "Nature Scavenger Hunt",
        category: "Outdoor",
        ages: "4-8",
        location: "Tilden Park",
        type: "Outdoor",
        cost: "Free",
        icon: Trees,
      },
      {
        id: 5,
        title: "Mini Soccer Camp",
        category: "Outdoor",
        ages: "4-7",
        location: "Oakland North",
        type: "Outdoor",
        cost: "Free",
        icon: Trees,
      },
      {
        id: 6,
        title: "Bike Riding Adventure",
        category: "Outdoor",
        ages: "6-10",
        location: "Lake Merritt",
        type: "Outdoor",
        cost: "Free",
        icon: Trees,
      },
    ],
    learning: [
      {
        id: 7,
        title: "Science Experiments",
        category: "Learning",
        ages: "6-9",
        location: "Berkeley West",
        type: "Indoor",
        cost: "$8",
        icon: GraduationCap,
      },
      {
        id: 8,
        title: "Coding for Kids",
        category: "Learning",
        ages: "8-12",
        location: "Emeryville",
        type: "Indoor",
        cost: "$15",
        icon: GraduationCap,
      },
      {
        id: 9,
        title: "Math Games",
        category: "Learning",
        ages: "5-8",
        location: "Piedmont",
        type: "Indoor",
        cost: "Free",
        icon: GraduationCap,
      },
    ],
  }

  const playdates = [
    {
      id: 1,
      host: "Lena – Art Teacher Mom",
      activity: "Watercolor Playdate",
      location: "Berkeley (East)",
      ages: "6-8",
      cost: "$5",
      time: "Sat 10 AM",
      avatar: "/friendly-mom-art-teacher.jpg",
    },
    {
      id: 2,
      host: "Marco – Soccer Coach Dad",
      activity: "Mini Soccer Camp",
      location: "Oakland North",
      ages: "4-7",
      cost: "Free",
      time: "Sun 9 AM",
      avatar: "/friendly-dad-soccer-coach.jpg",
    },
    {
      id: 3,
      host: "Sarah – Science Educator",
      activity: "Science Experiments",
      location: "Berkeley West",
      ages: "6-9",
      cost: "$8",
      time: "Sat 2 PM",
      avatar: "/friendly-mom-science-teacher.jpg",
    },
  ]

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 backdrop-blur-md border-b border-border/50 py-4 bg-primary-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/plai-logo.png" alt="Plai Logo" width={100} height={50} priority className="w-auto h-10" />
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/explore"
              className="text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Explore
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
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 pt-28 pb-16 px-6 md:px-12 bg-primary-foreground">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Section 1: Discover Activities */}
          <section id="discover" className="space-y-8">
            <div className="text-center space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Discover Activities</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find creative, outdoor, or learning activities for your family.
              </p>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Age" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-5">Ages 3-5</SelectItem>
                  <SelectItem value="5-7">Ages 5-7</SelectItem>
                  <SelectItem value="7-10">Ages 7-10</SelectItem>
                  <SelectItem value="10+">Ages 10+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oakland">Oakland</SelectItem>
                  <SelectItem value="berkeley">Berkeley</SelectItem>
                  <SelectItem value="alameda">Alameda</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search activities..." className="pl-10" />
              </div>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 border-b border-border">
              {["creative", "outdoor", "learning"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-foreground text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Activity Cards Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities[activeTab as keyof typeof activities].map((activity) => (
                <Card key={activity.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-full bg-muted">
                      <activity.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-foreground">{activity.title}</h3>
                      <p className="text-sm text-muted-foreground">{activity.category} Playdate</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Ages {activity.ages}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {activity.type}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {activity.cost}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>

                  <Button className="w-full rounded-full bg-transparent" variant="outline">
                    Request to Join
                  </Button>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="ghost" className="text-foreground hover:text-foreground/70">
                View More Activities →
              </Button>
            </div>
          </section>

          {/* Section 2: Join a Playdate */}
          <section id="join" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Join a Playdate</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Small, trusted playdates led by local parents.
              </p>
            </div>

            {/* Playdate Cards Carousel */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playdates.map((playdate) => (
                <Card key={playdate.id} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted overflow-hidden">
                      <Image
                        src={playdate.avatar || "/placeholder.svg"}
                        alt={playdate.host}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{playdate.host}</h3>
                      <p className="text-sm text-muted-foreground">{playdate.activity}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{playdate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{playdate.time}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">Ages {playdate.ages}</Badge>
                      <Badge variant="secondary">{playdate.cost}</Badge>
                    </div>
                  </div>

                  <Button className="w-full rounded-full">Request to Join</Button>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="ghost" className="text-foreground hover:text-foreground/70">
                See More Playdates →
              </Button>
            </div>
          </section>

          {/* Section 3: Host Your Own */}
          <section id="host" className="space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Host Your Own Playdate</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Share your skill or hobby with nearby families.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="rounded-full px-8 bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground"
                onClick={() => setShowHostModal(true)}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Create a Playdate
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              All listings are reviewed for safety before going live.
            </p>
          </section>
        </div>
      </div>

      {/* Host Modal */}
      {showHostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-lg mx-4 p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">Create Your Playdate</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowHostModal(false)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Activity Name</label>
                <Input placeholder="e.g., Watercolor Painting" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Category</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Age Group</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5">Ages 3-5</SelectItem>
                    <SelectItem value="5-7">Ages 5-7</SelectItem>
                    <SelectItem value="7-10">Ages 7-10</SelectItem>
                    <SelectItem value="10+">Ages 10+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Location (general area)</label>
                <Input placeholder="e.g., Berkeley East" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Date & Time</label>
                <Input type="datetime-local" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Cost</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select cost" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="5">$5</SelectItem>
                    <SelectItem value="10">$10</SelectItem>
                    <SelectItem value="15">$15</SelectItem>
                    <SelectItem value="20">$20</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Description</label>
                <textarea
                  className="w-full min-h-24 px-3 py-2 rounded-md border border-input bg-background text-sm"
                  placeholder="Describe your playdate activity..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Privacy Level</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="waitlist">Waitlist Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full rounded-full" size="lg">
                Submit for Review
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-border bg-secondary">
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
                href="/explore"
                className="text-sm hover:text-foreground/70 transition-colors text-primary-foreground"
              >
                Explore
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
          <div className="mt-8 pt-8 border-t border-border border-none">
            <p className="text-xs text-primary-foreground">© 2025 Plaidate. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
