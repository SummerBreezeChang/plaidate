"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ResourceCard } from "@/components/resource-card"
import { Button } from "@/components/ui/button"
import { BookOpen, Headphones, Activity, Heart, Brain, Package, FileText, Book } from "lucide-react"

const categories = [
  { id: "all", name: "All Categories", icon: null },
  { id: "parenting-books", name: "Parenting Books", icon: BookOpen },
  { id: "kids-books", name: "Kids Books", icon: Book },
  { id: "podcasts", name: "Podcasts", icon: Headphones },
  { id: "physical-activities", name: "Physical Activities", icon: Activity },
  { id: "relationship-building", name: "Relationship Building", icon: Heart },
  { id: "emotional-growth", name: "Emotional Growth", icon: Brain },
  { id: "subscription-boxes", name: "Subscription Boxes", icon: Package },
  { id: "magazines", name: "Magazines", icon: FileText },
]

const ageRanges = ["All Ages", "Ages 5-6", "Ages 7-8", "Ages 9-10"]

const resources = [
  {
    id: 1,
    title: "The Whole-Brain Child",
    description: "Revolutionary strategies to nurture your child's developing mind",
    image: "/family-reading-book-together-by-fireplace.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "#",
  },
  {
    id: 2,
    title: "How to Talk So Kids Will Listen",
    description: "Time-tested communication strategies that strengthen parent-child relationships",
    image: "/parent-and-child-talking-outdoors.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "#",
  },
  {
    id: 3,
    title: "The Growth Mindset Coach",
    description: "Help your child develop resilience and a love of learning",
    image: "/colorful-journal-pages-with-doodles.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "#",
  },
  {
    id: 4,
    title: "Positive Discipline",
    description: "Effective strategies for raising responsible, respectful children",
    image: "/parent-guiding-child-with-patience.jpg",
    category: "parenting-books",
    type: "Book",
    ageRange: "Ages 5-10",
    link: "#",
  },
  {
    id: 5,
    title: "Good Inside Podcast",
    description: "Dr. Becky Kennedy shares practical parenting strategies",
    image: "/podcast-microphone-setup.png",
    category: "podcasts",
    type: "Podcast",
    ageRange: "All Ages",
    link: "#",
  },
  {
    id: 6,
    title: "Outdoor Adventure Kit",
    description: "Everything you need for nature exploration and outdoor play",
    image: "/kids-exploring-nature-with-magnifying-glass.jpg",
    category: "physical-activities",
    type: "Activity",
    ageRange: "Ages 7-8",
    link: "#",
  },
  {
    id: 7,
    title: "KiwiCo Subscription",
    description: "Monthly STEM projects delivered to your door",
    image: "/kids-doing-science-experiment.jpg",
    category: "subscription-boxes",
    type: "Subscription",
    ageRange: "Ages 5-10",
    link: "#",
  },
  {
    id: 8,
    title: "Highlights Magazine",
    description: "Classic children's magazine with puzzles and stories",
    image: "/colorful-children-magazine-pages.jpg",
    category: "magazines",
    type: "Magazine",
    ageRange: "Ages 5-10",
    link: "#",
  },
]

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedAge, setSelectedAge] = useState("All Ages")

  const filteredResources = resources.filter((resource) => {
    const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory
    const ageMatch = selectedAge === "All Ages" || resource.ageRange === selectedAge
    return categoryMatch && ageMatch
  })

  const currentCategoryName = categories.find((cat) => cat.id === selectedCategory)?.name || "All Categories"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 border-b bg-primary-foreground py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} priority className="w-auto h-16 mx-0" />
          </Link>
        </div>
      </header>

      <div className="pt-28 md:pt-32">
        {/* Age Filter Bar */}
        <div className="bg-muted/30 border-b border-border px-6 md:px-12 py-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-primary">Filter by age:</span>
              {ageRanges.map((age) => (
                <Button
                  key={age}
                  variant={selectedAge === age ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedAge(age)}
                  className={
                    selectedAge === age
                      ? "rounded-full bg-secondary text-primary-foreground hover:bg-secondary/90"
                      : "rounded-full"
                  }
                >
                  {age}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0">
              <div className="sticky top-32">
                <h2 className="text-lg font-bold text-primary mb-4">Categories</h2>
                <nav className="space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                          selectedCategory === category.id
                            ? "bg-secondary text-primary-foreground font-medium"
                            : "text-primary hover:bg-muted/50"
                        }`}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span>{category.name}</span>
                      </button>
                    )
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1">
              {/* Results Header */}
              <div className="mb-8">
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold text-primary">{filteredResources.length}</span> resources found for{" "}
                  <span className="font-semibold">{selectedAge.toLowerCase()}</span> in{" "}
                  <span className="font-semibold">{currentCategoryName.toLowerCase()}</span>
                </p>

                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-primary">Explore All Resources</h1>
                  <p className="text-lg text-popover-foreground">
                    {currentCategoryName} • {filteredResources.length} resources to grow together
                  </p>
                </div>
              </div>

              {/* Resource Grid */}
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No resources found for the selected filters.</p>
                  <Button
                    onClick={() => {
                      setSelectedCategory("all")
                      setSelectedAge("All Ages")
                    }}
                    className="mt-4"
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
