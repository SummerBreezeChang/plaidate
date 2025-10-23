import { type NextRequest, NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_MAPS_API_KEY

const STATIC_ACTIVITIES = {
  creative: [
    {
      id: 1,
      title: "Oakland Museum of California",
      description: "Art, history, and natural sciences museum with interactive exhibits for kids",
      image: "/oakland-museum.jpg",
      ages: "All Ages",
      type: "Indoor",
      cost: "Paid",
      rating: 4.6,
      location: "1000 Oak St, Oakland, CA",
      mapUrl: "https://www.google.com/maps/place/Oakland+Museum+of+California",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQQ",
    },
    {
      id: 2,
      title: "Lawrence Hall of Science",
      description: "Hands-on science center with planetarium and outdoor discovery area",
      image: "/lawrence-hall-of-science.jpg",
      ages: "Ages 3-12",
      type: "Indoor",
      cost: "Paid",
      rating: 4.7,
      location: "1 Centennial Dr, Berkeley, CA",
      mapUrl: "https://www.google.com/maps/place/Lawrence+Hall+of+Science",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQR",
    },
    {
      id: 3,
      title: "Chabot Space & Science Center",
      description: "Space and science museum with planetarium and observatory",
      image: "/chabot-space-center.jpg",
      ages: "Ages 5+",
      type: "Indoor",
      cost: "Paid",
      rating: 4.5,
      location: "10000 Skyline Blvd, Oakland, CA",
      mapUrl: "https://www.google.com/maps/place/Chabot+Space+%26+Science+Center",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQS",
    },
  ],
  outdoor: [
    {
      id: 4,
      title: "Tilden Regional Park",
      description: "Large park with playground, farm, carousel, and hiking trails",
      image: "/tilden-park.jpg",
      ages: "All Ages",
      type: "Outdoor",
      cost: "Free",
      rating: 4.8,
      location: "Berkeley, CA",
      mapUrl: "https://www.google.com/maps/place/Tilden+Regional+Park",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQT",
    },
    {
      id: 5,
      title: "Lake Merritt",
      description: "Urban lake with playground, gardens, and walking paths",
      image: "/lake-merritt.jpg",
      ages: "All Ages",
      type: "Outdoor",
      cost: "Free",
      rating: 4.6,
      location: "Oakland, CA",
      mapUrl: "https://www.google.com/maps/place/Lake+Merritt",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQU",
    },
    {
      id: 6,
      title: "Redwood Regional Park",
      description: "Beautiful redwood forest with trails and picnic areas",
      image: "/redwood-park.jpg",
      ages: "All Ages",
      type: "Outdoor",
      cost: "Free",
      rating: 4.7,
      location: "Oakland, CA",
      mapUrl: "https://www.google.com/maps/place/Redwood+Regional+Park",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQV",
    },
  ],
  learning: [
    {
      id: 1,
      title: "Oakland Museum of California",
      description: "Art, history, and natural sciences museum with interactive exhibits for kids",
      image: "/oakland-museum.jpg",
      ages: "All Ages",
      type: "Indoor",
      cost: "Paid",
      rating: 4.6,
      location: "1000 Oak St, Oakland, CA",
      mapUrl: "https://www.google.com/maps/place/Oakland+Museum+of+California",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQQ",
    },
    {
      id: 2,
      title: "Lawrence Hall of Science",
      description: "Hands-on science center with planetarium and outdoor discovery area",
      image: "/lawrence-hall-of-science.jpg",
      ages: "Ages 3-12",
      type: "Indoor",
      cost: "Paid",
      rating: 4.7,
      location: "1 Centennial Dr, Berkeley, CA",
      mapUrl: "https://www.google.com/maps/place/Lawrence+Hall+of+Science",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQR",
    },
    {
      id: 3,
      title: "Chabot Space & Science Center",
      description: "Space and science museum with planetarium and observatory",
      image: "/chabot-space-center.jpg",
      ages: "Ages 5+",
      type: "Indoor",
      cost: "Paid",
      rating: 4.5,
      location: "10000 Skyline Blvd, Oakland, CA",
      mapUrl: "https://www.google.com/maps/place/Chabot+Space+%26+Science+Center",
      placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQS",
    },
  ],
}

export async function GET(request: NextRequest) {
  if (!GOOGLE_PLACES_API_KEY) {
    console.log("[v0] Google Maps API key not configured, using static data")
    const category = request.nextUrl.searchParams.get("category") || "creative"
    const activities = STATIC_ACTIVITIES[category as keyof typeof STATIC_ACTIVITIES] || STATIC_ACTIVITIES.creative
    return NextResponse.json({ activities, status: "STATIC_DATA", message: "Using curated local activities" })
  }

  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get("category") || "museum"

  try {
    const categoryMap: Record<string, string> = {
      creative: "art museums and creative activities for kids in Oakland CA",
      outdoor: "parks and playgrounds for kids in Oakland CA",
      learning: "science museums and educational activities for kids in Oakland CA",
      museum: "museums for kids in Oakland CA",
      all: "family activities for kids in Oakland CA",
    }

    const query = categoryMap[category] || categoryMap.all

    const url = "https://places.googleapis.com/v1/places:searchText"

    console.log("[v0] Fetching from Google Places API (New):", query)

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        // Request all fields we need including website and photos
        "X-Goog-FieldMask":
          "places.id,places.displayName,places.formattedAddress,places.rating,places.types,places.websiteUri,places.googleMapsUri,places.photos,places.editorialSummary,places.priceLevel",
      },
      body: JSON.stringify({
        textQuery: query,
        maxResultCount: 10,
        locationBias: {
          circle: {
            center: {
              latitude: 37.8044,
              longitude: -122.2712,
            },
            radius: 15000.0, // 15km radius around Oakland
          },
        },
      }),
    })

    const data = await response.json()

    console.log("[v0] Google Places API response:", data.places ? `${data.places.length} places found` : "No places")

    if (!response.ok || !data.places) {
      console.error("[v0] Google Places API error:", response.status, data.error?.message || "Unknown error")
      if (response.status === 403 || data.error?.status === "PERMISSION_DENIED") {
        console.log("[v0] API Key issue detected. Please check:")
        console.log(
          "[v0] 1. Enable 'Places API (New)' at: https://console.cloud.google.com/apis/library/places-backend.googleapis.com",
        )
        console.log("[v0] 2. Remove HTTP referrer restrictions from your API key")
        console.log("[v0] 3. Enable billing on your Google Cloud project")
      }

      // Return static data as fallback
      const staticCategory = category === "outdoor" ? "outdoor" : category === "learning" ? "learning" : "creative"
      const activities = STATIC_ACTIVITIES[staticCategory] || STATIC_ACTIVITIES.creative
      return NextResponse.json({
        activities,
        status: "STATIC_DATA",
        message: "Using curated local activities. Check server logs for API details.",
        error: data.error?.message,
      })
    }

    console.log("[v0] Successfully fetched", data.places.length, "places from Google")

    const activities = data.places.slice(0, 6).map((place: any, index: number) => {
      // Get photo URL from new API format
      const photoName = place.photos?.[0]?.name
      const photoUrl = photoName
        ? `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=600&key=${GOOGLE_PLACES_API_KEY}`
        : `/placeholder.svg?height=200&width=300&query=${encodeURIComponent(place.displayName?.text || "activity")}`

      // Determine activity type from place types
      let activityType = "Indoor"
      if (place.types?.some((t: string) => ["park", "playground", "hiking_area", "campground"].includes(t))) {
        activityType = "Outdoor"
      }

      // Determine cost from price level
      const cost = place.priceLevel === "PRICE_LEVEL_FREE" || activityType === "Outdoor" ? "Free" : "Paid"

      return {
        id: index + 1,
        title: place.displayName?.text || "Activity",
        description:
          place.editorialSummary?.text || place.formattedAddress || "Great place for kids and families to explore",
        image: photoUrl,
        ages: "All Ages",
        type: activityType,
        cost,
        rating: place.rating || 4.5,
        location: place.formattedAddress || "Oakland, CA",
        mapUrl:
          place.googleMapsUri ||
          `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.displayName?.text || "")}`,
        websiteUrl: place.websiteUri || null,
        placeId: place.id,
      }
    })

    return NextResponse.json({ activities, status: "OK" })
  } catch (error) {
    console.error("[v0] Error fetching activities:", error)
    const category = searchParams.get("category") || "creative"
    const staticCategory = category === "outdoor" ? "outdoor" : category === "learning" ? "learning" : "creative"
    const activities = STATIC_ACTIVITIES[staticCategory] || STATIC_ACTIVITIES.creative
    return NextResponse.json({ activities, status: "STATIC_DATA", message: "Using curated local activities" })
  }
}
