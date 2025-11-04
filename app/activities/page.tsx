"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, ExternalLink, Plus, Search, Loader2 } from "lucide-react"

type Activity = {
  id: number
  title: string
  description: string
  image: string
  ages: string
  type: string
  cost: string
  rating?: number
  location: string
  mapUrl?: string
  websiteUrl?: string
  placeId?: string
  lat?: number
  lng?: number
}

export default function ActivitiesPage() {
  const [city, setCity] = useState("oakland")
  const [type, setType] = useState("all")
  const [q, setQ] = useState("")
  const [items, setItems] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true)
      setError(null)

      try {
        const category = type === "all" ? "creative" : type
        const response = await fetch(`/api/activities?category=${category}&location=${city}&q=${encodeURIComponent(q)}`)
        const data = await response.json()

        if (data.activities) {
          setItems(data.activities)
        } else {
          setError("No activities found")
          setItems([])
        }
      } catch (err) {
        setError("Failed to load activities")
        setItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [city, type, q])
  // </CHANGE>

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-primary-foreground border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Activities</h1>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
          </div>

          {/* Search input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search activities..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Type</label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="learning">Learning</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">City</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oakland">Oakland</SelectItem>
                  <SelectItem value="berkeley">Berkeley</SelectItem>
                  <SelectItem value="alameda">Alameda</SelectItem>
                  <SelectItem value="san francisco">San Francisco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>
      {/* </CHANGE> */}

      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-secondary-foreground mr-2" />
            <span className="text-muted-foreground">Loading activities...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No activities found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((activity) => (
              <Card key={activity.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  {/* Activity image */}
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={activity.image || "/placeholder.svg?height=96&width=96"}
                      alt={activity.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Activity details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-foreground text-lg leading-tight mb-1">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{activity.location}</span>
                        </p>
                      </div>
                      <Badge variant="secondary" className="flex-shrink-0">
                        {activity.type}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{activity.description}</p>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      {activity.mapUrl && (
                        <Button asChild variant="outline" size="sm" className="text-xs bg-transparent">
                          <a href={activity.mapUrl} target="_blank" rel="noopener noreferrer">
                            <MapPin className="w-3 h-3 mr-1" />
                            Open in Maps
                          </a>
                        </Button>
                      )}
                      <Button
                        asChild
                        size="sm"
                        className="text-xs bg-secondary-foreground hover:bg-secondary-foreground/90"
                      >
                        <Link href={`/app/create?prefill=${encodeURIComponent(activity.title)}`}>
                          <Plus className="w-3 h-3 mr-1" />
                          Use in Plaidate
                        </Link>
                      </Button>
                      {activity.websiteUrl && (
                        <Button asChild variant="ghost" size="sm" className="text-xs">
                          <a href={activity.websiteUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      {/* </CHANGE> */}
    </div>
  )
}
