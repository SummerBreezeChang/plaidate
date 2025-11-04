import { type NextRequest, NextResponse } from "next/server"

const STATIC_ACTIVITIES = {
  oakland: {
    creative: [
      {
        id: 1,
        title: "Oakland Museum of California",
        description: "Art, history, and natural sciences museum with interactive exhibits for kids",
        image: "/oakland-museum-of-california-building-exterior.jpg",
        ages: "All Ages",
        type: "Indoor",
        cost: "Paid",
        rating: 4.6,
        location: "Oakland, CA",
        mapUrl: "https://www.google.com/maps/place/Oakland+Museum+of+California",
        websiteUrl: "https://museumca.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQQ",
      },
      {
        id: 2,
        title: "Children's Fairyland",
        description: "Storybook theme park with puppet shows and gentle rides",
        image: "/children-fairyland-oakland-colorful-playground.jpg",
        ages: "Ages 1-8",
        type: "Outdoor",
        cost: "Paid",
        rating: 4.7,
        location: "Oakland, CA",
        mapUrl: "https://www.google.com/maps/place/Children's+Fairyland",
        websiteUrl: "https://fairyland.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ1",
      },
    ],
    outdoor: [
      {
        id: 3,
        title: "Lake Merritt",
        description: "Urban lake with playground, gardens, and walking paths",
        image: "/lake-merritt-oakland-california-scenic-view.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.6,
        location: "Oakland, CA",
        mapUrl: "https://www.google.com/maps/place/Lake+Merritt",
        websiteUrl: "https://www.oaklandca.gov/topics/lake-merritt",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQU",
      },
      {
        id: 4,
        title: "Redwood Regional Park",
        description: "Beautiful redwood forest with hiking trails and picnic areas",
        image: "/redwood-regional-park-oakland-tall-trees-hiking-tr.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.8,
        location: "Oakland, CA",
        mapUrl: "https://www.google.com/maps/place/Redwood+Regional+Park",
        websiteUrl: "https://www.ebparks.org/parks/redwood",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ2",
      },
    ],
    learning: [
      {
        id: 5,
        title: "Chabot Space & Science Center",
        description: "Space and science museum with planetarium and observatory",
        image: "/chabot-space-center-planetarium-oakland.jpg",
        ages: "Ages 5+",
        type: "Indoor",
        cost: "Paid",
        rating: 4.5,
        location: "Oakland, CA",
        mapUrl: "https://www.google.com/maps/place/Chabot+Space+%26+Science+Center",
        websiteUrl: "https://chabotspace.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQS",
      },
      {
        id: 6,
        title: "Oakland Public Library - Main Branch",
        description: "Modern library with extensive children's section and programs",
        image: "/oakland-public-library-main-branch-children-sectio.jpg",
        ages: "All Ages",
        type: "Indoor",
        cost: "Free",
        rating: 4.4,
        location: "Oakland, CA",
        mapUrl: "https://www.google.com/maps/place/Oakland+Public+Library",
        websiteUrl: "https://oaklandlibrary.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ3",
      },
    ],
  },
  berkeley: {
    creative: [
      {
        id: 7,
        title: "Lawrence Hall of Science",
        description: "Hands-on science center with planetarium and outdoor discovery area",
        image: "/berkeley-lawrence-hall-of-science-building.jpg",
        ages: "Ages 3-12",
        type: "Indoor",
        cost: "Paid",
        rating: 4.7,
        location: "Berkeley, CA",
        mapUrl: "https://www.google.com/maps/place/Lawrence+Hall+of+Science",
        websiteUrl: "https://lawrencehallofscience.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQR",
      },
      {
        id: 8,
        title: "UC Berkeley Art Museum",
        description: "Contemporary art museum with family programs",
        image: "/uc-berkeley-art-museum-modern-building.jpg",
        ages: "Ages 5+",
        type: "Indoor",
        cost: "Paid",
        rating: 4.5,
        location: "Berkeley, CA",
        mapUrl: "https://www.google.com/maps/place/Berkeley+Art+Museum",
        websiteUrl: "https://bampfa.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ4",
      },
    ],
    outdoor: [
      {
        id: 9,
        title: "Tilden Regional Park",
        description: "Large park with playground, farm, carousel, and hiking trails",
        image: "/tilden-park-berkeley-steam-train-children.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.8,
        location: "Berkeley, CA",
        mapUrl: "https://www.google.com/maps/place/Tilden+Regional+Park",
        websiteUrl: "https://www.ebparks.org/parks/tilden",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQT",
      },
      {
        id: 10,
        title: "Berkeley Marina",
        description: "Waterfront park with adventure playground and kite flying",
        image: "/berkeley-marina-waterfront-kites-flying.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.6,
        location: "Berkeley, CA",
        mapUrl: "https://www.google.com/maps/place/Berkeley+Marina",
        websiteUrl: "https://www.cityofberkeley.info/marina/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ5",
      },
    ],
    learning: [
      {
        id: 11,
        title: "Berkeley Natural History Museums",
        description: "Collection of natural history museums on UC Berkeley campus",
        image: "/berkeley-natural-history-museum-dinosaur-exhibit.jpg",
        ages: "Ages 4+",
        type: "Indoor",
        cost: "Free",
        rating: 4.6,
        location: "Berkeley, CA",
        mapUrl: "https://www.google.com/maps/place/UC+Berkeley+Natural+History+Museums",
        websiteUrl: "https://bnhm.berkeley.edu/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ6",
      },
    ],
  },
  alameda: {
    creative: [
      {
        id: 12,
        title: "USS Hornet Museum",
        description: "Historic aircraft carrier with interactive exhibits",
        image: "/uss-hornet-aircraft-carrier-alameda.jpg",
        ages: "Ages 6+",
        type: "Indoor",
        cost: "Paid",
        rating: 4.7,
        location: "Alameda, CA",
        mapUrl: "https://www.google.com/maps/place/USS+Hornet+Museum",
        websiteUrl: "https://www.uss-hornet.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQZ",
      },
      {
        id: 13,
        title: "Pacific Pinball Museum",
        description: "Interactive pinball museum with vintage and modern machines",
        image: "/pacific-pinball-museum-alameda-vintage-machines.jpg",
        ages: "Ages 5+",
        type: "Indoor",
        cost: "Paid",
        rating: 4.8,
        location: "Alameda, CA",
        mapUrl: "https://www.google.com/maps/place/Pacific+Pinball+Museum",
        websiteUrl: "https://www.pacificpinball.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ7",
      },
    ],
    outdoor: [
      {
        id: 14,
        title: "Crown Memorial State Beach",
        description: "Sandy beach with playground and picnic areas",
        image: "/crown-memorial-beach-alameda-sandy-shore.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.5,
        location: "Alameda, CA",
        mapUrl: "https://www.google.com/maps/place/Crown+Memorial+State+Beach",
        websiteUrl: "https://www.ebparks.org/parks/crown_beach",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ8",
      },
    ],
    learning: [
      {
        id: 15,
        title: "Alameda Museum",
        description: "Local history museum with exhibits about Alameda's past",
        image: "/alameda-museum-historic-building.jpg",
        ages: "Ages 8+",
        type: "Indoor",
        cost: "Free",
        rating: 4.3,
        location: "Alameda, CA",
        mapUrl: "https://www.google.com/maps/place/Alameda+Museum",
        websiteUrl: "https://alamedamuseum.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQ9",
      },
    ],
  },
  "san francisco": {
    creative: [
      {
        id: 16,
        title: "Children's Creativity Museum",
        description: "Interactive art and technology museum for kids",
        image: "/childrens-creativity-museum-san-francisco.jpg",
        ages: "Ages 2-12",
        type: "Indoor",
        cost: "Paid",
        rating: 4.4,
        location: "San Francisco, CA",
        mapUrl: "https://www.google.com/maps/place/Children's+Creativity+Museum",
        websiteUrl: "https://creativity.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQW",
      },
      {
        id: 17,
        title: "Exploratorium",
        description: "Hands-on science museum with hundreds of interactive exhibits",
        image: "/exploratorium-san-francisco-interactive-exhibits.jpg",
        ages: "All Ages",
        type: "Indoor",
        cost: "Paid",
        rating: 4.7,
        location: "San Francisco, CA",
        mapUrl: "https://www.google.com/maps/place/Exploratorium",
        websiteUrl: "https://www.exploratorium.edu/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQ10",
      },
    ],
    outdoor: [
      {
        id: 18,
        title: "Golden Gate Park",
        description: "Expansive park with playgrounds, gardens, and museums",
        image: "/golden-gate-park-san-francisco-playground.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.7,
        location: "San Francisco, CA",
        mapUrl: "https://www.google.com/maps/place/Golden+Gate+Park",
        websiteUrl: "https://sfrecpark.org/destination/golden-gate-park/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQQX",
      },
      {
        id: 19,
        title: "Crissy Field",
        description: "Waterfront park with beach, playground, and Golden Gate Bridge views",
        image: "/crissy-field-san-francisco-golden-gate-view.jpg",
        ages: "All Ages",
        type: "Outdoor",
        cost: "Free",
        rating: 4.8,
        location: "San Francisco, CA",
        mapUrl: "https://www.google.com/maps/place/Crissy+Field",
        websiteUrl: "https://www.parksconservancy.org/parks/crissy-field",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQ11",
      },
    ],
    learning: [
      {
        id: 20,
        title: "California Academy of Sciences",
        description: "Natural history museum with aquarium, planetarium, and rainforest",
        image: "/california-academy-of-sciences-building.jpg",
        ages: "All Ages",
        type: "Indoor",
        cost: "Paid",
        rating: 4.6,
        location: "San Francisco, CA",
        mapUrl: "https://www.google.com/maps/place/California+Academy+of+Sciences",
        websiteUrl: "https://www.calacademy.org/",
        placeId: "ChIJVVVVVVV6hYARQQQQQQQQQ12",
      },
    ],
  },
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl?.searchParams
    const categoryParam = searchParams?.get("category") || searchParams?.get("type") || "creative"
    const category = (categoryParam === "all" ? "creative" : categoryParam) as "creative" | "outdoor" | "learning"
    const location = (searchParams?.get("location") || searchParams?.get("city") || "oakland").toLowerCase()
    const searchQuery = searchParams?.get("q") || ""

    console.log("[v0] API Route - Category:", category, "Location:", location, "Search:", searchQuery)

    const locationData = STATIC_ACTIVITIES[location as keyof typeof STATIC_ACTIVITIES]

    if (!locationData) {
      console.log("[v0] API Route - Location not found, using Oakland as default")
      const activities = STATIC_ACTIVITIES.oakland[category] || STATIC_ACTIVITIES.oakland.creative
      return NextResponse.json({
        activities,
        status: "OK",
        message: "Curated local activities for families (default location)",
      })
    }

    let activities = locationData[category] || locationData.creative

    if (searchQuery) {
      activities = activities.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    console.log("[v0] API Route - Returning", activities.length, "activities")

    return NextResponse.json({
      activities,
      status: "OK",
      message: `Curated ${category} activities in ${location}`,
    })
  } catch (error) {
    console.error("[v0] API Route Error:", error)
    return NextResponse.json(
      {
        activities: STATIC_ACTIVITIES.oakland.creative,
        status: "ERROR",
        message: "Error fetching activities, showing default data",
      },
      { status: 500 },
    )
  }
}
