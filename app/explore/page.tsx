"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Trees,
  GraduationCap,
  MapPin,
  Clock,
  Calendar,
  Search,
  Shield,
  Users,
  Heart,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { useState, useEffect } from "react"

interface Activity {
  id: number
  title: string
  description: string
  image: string
  ages: string
  type: string
  cost: string
  rating?: number
  location: string
  placeId?: string
  websiteUrl?: string | null
  mapUrl?: string
}

const LOCATION_COORDS = {
  "san-francisco": { lat: 37.7749, lng: -122.4194, name: "San Francisco" },
  berkeley: { lat: 37.8715, lng: -122.273, name: "Berkeley" },
  oakland: { lat: 37.8044, lng: -122.2712, name: "Oakland" },
  alameda: { lat: 37.7652, lng: -122.2416, name: "Alameda" },
}

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("creative")
  const [selectedLocation, setSelectedLocation] = useState<keyof typeof LOCATION_COORDS>("oakland")
  const [showHostModal, setShowHostModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchActivities = async (search?: string) => {
    setLoading(true)
    setError(null)

    try {
      const coords = LOCATION_COORDS[selectedLocation]
      const searchParam = search ? `&search=${encodeURIComponent(search)}` : ""
      const response = await fetch(
        `/api/activities?category=${activeTab}&location=${coords.lat},${coords.lng}&radius=8000${searchParam}`,
      )
      const data = await response.json()

      if (data.error) {
        setError(data.message || data.error)
        setActivities(data.activities || getStaticActivities(activeTab))
      } else {
        setActivities(data.activities || [])
        if (data.status === "STATIC_DATA" && data.message) {
          console.log("[v0]", data.message)
        }
      }
    } catch (err) {
      console.error("[v0] Error fetching activities:", err)
      setError("Using curated local activities")
      setActivities(getStaticActivities(activeTab))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [activeTab, selectedLocation])

  const getStaticActivities = (category: string): Activity[] => {
    const museums = [
      {
        id: 1,
        title: "Oakland Museum of California",
        description: "Art, history, and natural science museum",
        image: "/oakland-museum.jpg",
        ages: "All Ages",
        type: "Indoor",
        cost: "$16",
        rating: 4.6,
        location: "1000 Oak St, Oakland, CA",
        placeId: "ChIJVVVVVYx3hYARGpkL8KqqCAQ",
        websiteUrl: "https://www.oaklandmuseum.org/",
        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJVVVVVYx3hYARGpkL8KqqCAQ",
      },
      {
        id: 2,
        title: "Lawrence Hall of Science",
        description: "Interactive science center with hands-on exhibits",
        image: "/lawrence-hall-of-science.jpg",
        ages: "All Ages",
        type: "Indoor",
        cost: "$15",
        rating: 4.7,
        location: "1 Centennial Dr, Berkeley, CA",
        placeId: "ChIJrU3KAHJ9hYARs8HI7Y8L8KQ",
        websiteUrl: "https://www.lawrencehallofscience.org/",
        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJrU3KAHJ9hYARs8HI7Y8L8KQ",
      },
      {
        id: 3,
        title: "Chabot Space & Science Center",
        description: "Planetarium and space exploration exhibits",
        image: "/chabot-space-center.jpg",
        ages: "5+",
        type: "Indoor",
        cost: "$20",
        rating: 4.5,
        location: "10000 Skyline Blvd, Oakland, CA",
        placeId: "ChIJN1t_tDeuRYARYXpoq7ScCGM",
        websiteUrl: "https://www.chabotspace.org/",
        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJN1t_tDeuRYARYXpoq7ScCGM",
      },
    ]

    const parks = [
      {
        id: 4,
        title: "Tilden Regional Park",
        description: "Nature trails, playground, and steam train",
        image: "/tilden-park.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.8,
        location: "Berkeley Hills, CA",
        placeId: "ChIJVVVVVVV9hYARGpkL8KqqCAQ",
        websiteUrl: "https://www.tildensp.org/",
        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJVVVVVVV9hYARGpkL8KqqCAQ",
      },
      {
        id: 5,
        title: "Lake Merritt",
        description: "Urban lake with playground and gardens",
        image: "/lake-merritt.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.6,
        location: "Oakland, CA",
        placeId: "ChIJVVVVVYx3hYARGpkL8KqqCAQ",
        websiteUrl: "https://www.lakemerritt.com/",
        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJVVVVVYx3hYARGpkL8KqqCAQ",
      },
      {
        id: 6,
        title: "Redwood Regional Park",
        description: "Hiking trails through redwood forest",
        image: "/redwood-park.jpg",
        ages: "5+",
        type: "Outdoor",
        cost: "Free",
        rating: 4.7,
        location: "Oakland Hills, CA",
        placeId: "ChIJVVVVVYx3hYARGpkL8KqqCAQ",
        websiteUrl: "https://www.redwoodrangers.org/",
        mapUrl: "https://www.google.com/maps/place/?q=place_id:ChIJVVVVVYx3hYARGpkL8KqqCAQ",
      },
    ]

    if (category === "learning") return museums
    if (category === "outdoor") return parks
    return museums.slice(0, 3)
  }

  const playdates = [
    {
      id: 1,
      host: "Lena – Art Teacher Mom",
      activity: "Watercolor Playdate",
      location: "Berkeley (East)",
      ages: "6-8",
      cost: "$5",
      date: "Sat, Oct 25",
      time: "10:00 AM",
      avatar: "/friendly-mom-art-teacher.jpg",
    },
    {
      id: 2,
      host: "Marco – Soccer Coach Dad",
      activity: "Mini Soccer Camp",
      location: "Oakland North",
      ages: "4-7",
      cost: "Free",
      date: "Sun, Oct 26",
      time: "9:00 AM",
      avatar: "/friendly-dad-soccer-coach.jpg",
    },
    {
      id: 3,
      host: "Sarah – Science Educator",
      activity: "Science Experiments",
      location: "Berkeley West",
      ages: "6-9",
      cost: "$8",
      date: "Sat, Nov 1",
      time: "2:00 PM",
      avatar: "/friendly-mom-science-teacher.jpg",
    },
  ]

  const getCategoryIcon = (category: string) => {
    if (category === "outdoor") return Trees
    if (category === "learning") return GraduationCap
    return Palette
  }

  const handleSearch = () => {
    fetchActivities(searchQuery)
    setShowSearchModal(false)
  }

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

      {/* Hero Section - Added engaging hero with clear value prop */}
      <section className="relative pt-32 px-6 md:px-12 bg-gradient-to-b from-secondary/30 to-primary-foreground overflow-hidden pb-9 my-0">
        <div className="max-w-7xl mx-auto text-center space-y-6 relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-fade-in-up my-10">
            Find, Join, or Host
            <br />
          </h1>
        </div>

        <div className="absolute top-20 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-foreground/10 rounded-full blur-3xl" />
      </section>

      {/* Main Content */}
      <div className="flex-1 pb-16 px-6 md:px-12 bg-primary-foreground">
        <div className="max-w-7xl mx-auto space-y-24">
          {/* Section 1: Discover Activities - Enhanced with better spacing and animations */}
          <section id="discover" className="scroll-mt-24 space-y-4">
            <div className="space-y-4 text-left">
              <h2 className="text-4xl md:text-5xl lg:text-4xl font-bold tracking-tight text-foreground">
                Discover Activities
              </h2>
            </div>

            <Card className="p-6 bg-secondary/5 border-border/50 border-none py-2 px-0 rounded-none">
              <div className="flex flex-col md:flex-row gap-6 border-none">
                {/* Location Tabs - Now first */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <div className="flex gap-2 flex-wrap">
                    {(Object.keys(LOCATION_COORDS) as Array<keyof typeof LOCATION_COORDS>).map((location) => (
                      <button
                        key={location}
                        onClick={() => setSelectedLocation(location)}
                        className={`px-6 text-sm font-medium capitalize rounded-full transition-all py-2 ${
                          selectedLocation === location
                            ? "bg-secondary-foreground text-primary-foreground shadow-md scale-105"
                            : "bg-secondary/20 text-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {LOCATION_COORDS[location].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Tabs - Now second, side by side on desktop */}
                <div className="flex-1">
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <div className="flex gap-2 flex-wrap">
                    {["creative", "outdoor", "learning"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 text-sm font-medium capitalize rounded-full transition-all py-2 ${
                          activeTab === tab
                            ? "bg-secondary-foreground text-primary-foreground shadow-md scale-105"
                            : "bg-secondary/20 text-foreground hover:bg-secondary/30"
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-secondary-foreground hover:bg-secondary/10 rounded-full px-4 text-sm"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-secondary-foreground" />
                <span className="ml-3 text-muted-foreground">Loading activities...</span>
              </div>
            ) : error ? (
              <div className="text-center py-4 px-6 bg-secondary/10 rounded-lg border border-border/50">
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            ) : null}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
              {activities.map((activity, index) => {
                const IconComponent = getCategoryIcon(activeTab)
                return (
                  <Card
                    key={activity.id}
                    className="p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 border-border/50 group relative flex flex-col bg-secondary"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-muted mb-4">
                      <Image
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground group-hover:text-secondary-foreground transition-colors">
                          {activity.title}
                        </h3>
                        <p className="text-sm text-card-foreground">{activity.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                        {activity.ages}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {activity.type}
                      </Badge>
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                        {activity.cost}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-4 h-4 text-secondary-foreground" />
                      {activity.mapUrl ? (
                        <a
                          href={activity.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-card-foreground hover:text-secondary-foreground hover:underline transition-colors"
                        >
                          {activity.location}
                        </a>
                      ) : (
                        <span className="text-card-foreground">{activity.location}</span>
                      )}
                    </div>

                    {activity.websiteUrl && (
                      <div className="mb-4">
                        <a
                          href={activity.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-secondary-foreground hover:text-secondary-foreground/80 hover:underline transition-colors flex items-center gap-1"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          Visit Website
                        </a>
                      </div>
                    )}

                    <Button className="rounded-full bg-secondary-foreground text-secondary hover:bg-secondary-foreground/90 border-none group-hover:shadow-md transition-all w-full text-center mt-auto">
                      Host a Plaidate
                    </Button>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Section 2: Join a Playdate - Enhanced with better visual hierarchy */}
          <section id="join" className="scroll-mt-24 space-y-4">
            <div className="text-left space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-4xl">Join a Plaidate</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Connect with verified local parents hosting small, trusted playdates
              </p>
            </div>

            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground hover:text-secondary-foreground hover:bg-secondary/10 rounded-full px-4 text-sm"
              >
                See All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {/* Playdate Cards - Enhanced with better styling and animations */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {playdates.map((playdate, index) => (
                <Card
                  key={playdate.id}
                  className="p-6 space-y-4 hover:shadow-xl hover:scale-105 transition-all duration-300 bg-popover border-border/50 group relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full bg-muted overflow-hidden ring-2 ring-secondary-foreground/20 group-hover:ring-secondary-foreground/40 transition-all">
                      <Image
                        src={playdate.avatar || "/placeholder.svg"}
                        alt={playdate.host}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground group-hover:text-secondary-foreground transition-colors">
                        {playdate.host}
                      </h3>
                      <p className="text-sm text-muted-foreground">{playdate.activity}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-secondary-foreground" />
                      <span>{playdate.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-secondary-foreground" />
                      <span className="font-medium text-foreground">{playdate.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-secondary-foreground" />
                      <span>{playdate.time}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                        Ages {playdate.ages}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        {playdate.cost}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full rounded-full group-hover:shadow-md transition-all text-center">
                    Request to Join
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Section 3: Host Your Own - Enhanced with more compelling CTA */}
          <section id="host" className="space-y-8 scroll-mt-24">
            <div className="text-left space-y-4">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-4xl">Host Your Own Plaidate</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Share your passion, skill, or hobby with nearby families and build community
              </p>
            </div>

            <Card className="p-8 md:p-12 bg-gradient-to-br from-secondary/10 to-secondary-foreground/5 border-border/50 border-none md:py-6">
              <div className="max-w-3xl space-y-2 mx-auto">
                <div className="grid md:grid-cols-3 gap-6 px-0 mb-20">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-secondary-foreground/10 flex items-center justify-center mx-auto">
                      <Shield className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Safe & Verified</h3>
                    <p className="text-sm text-muted-foreground">All hosts are background checked</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-secondary-foreground/10 flex items-center justify-center mx-auto">
                      <Users className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Build Community</h3>
                    <p className="text-sm text-muted-foreground">Connect with local families</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-secondary-foreground/10 flex items-center justify-center mx-auto">
                      <Heart className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground">Share Your Passion</h3>
                    <p className="text-sm text-muted-foreground">Teach what you love</p>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    size="lg"
                    className="rounded-full px-10 py-6 text-lg bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                    onClick={() => setShowHostModal(true)}
                  >
                    Host Your Plaidate
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 inline mr-1" />
                  All listings are reviewed for safety before going live
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Search Activities</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSearchModal(false)}>
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for activities, museums, parks..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleSearch}
                  className="flex-1 rounded-full bg-secondary-foreground hover:bg-secondary-foreground/90 text-center"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setShowSearchModal(false)
                  }}
                  variant="outline"
                  className="rounded-full text-center"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

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

              <Button className="w-full rounded-full text-center" size="lg">
                Submit for Review
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t border-border bg-secondary-foreground">
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
