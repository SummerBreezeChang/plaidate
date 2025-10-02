import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BlogCard } from "@/components/blog-card"

const blogPosts = [
  {
    id: 1,
    title: "5 Ways to Build Lasting Friendships Through Playdates",
    excerpt:
      "Discover how structured playdates can help your child develop meaningful friendships that last beyond elementary school.",
    image: "/children-playing-together-at-park.jpg",
    category: "Parenting Tips",
    date: "March 15, 2025",
    readTime: "5 min read",
    slug: "build-lasting-friendships-playdates",
  },
  {
    id: 2,
    title: "The Importance of Social Skills in Early Childhood",
    excerpt:
      "Learn why developing social skills during K-5 years is crucial for your child's emotional intelligence and future success.",
    image: "/children-learning-social-skills-together.jpg",
    category: "Child Development",
    date: "March 12, 2025",
    readTime: "7 min read",
    slug: "importance-social-skills-early-childhood",
  },
  {
    id: 3,
    title: "How to Plan the Perfect Educational Playdate",
    excerpt:
      "Tips and tricks for organizing playdates that are both fun and educational, helping children learn while they play.",
    image: "/children-doing-educational-activities.jpg",
    category: "Activity Ideas",
    date: "March 8, 2025",
    readTime: "6 min read",
    slug: "plan-perfect-educational-playdate",
  },
  {
    id: 4,
    title: "Connecting with Other Parents in Your Community",
    excerpt:
      "Building a strong parent network can make parenting easier and more enjoyable. Here's how to get started.",
    image: "/parents-talking-at-community-event.jpg",
    category: "Community",
    date: "March 5, 2025",
    readTime: "4 min read",
    slug: "connecting-parents-community",
  },
  {
    id: 5,
    title: "Creative Indoor Activities for Rainy Day Playdates",
    excerpt:
      "Don't let bad weather stop the fun! Explore creative indoor activities that keep kids engaged and active.",
    image: "/children-doing-indoor-crafts-activities.jpg",
    category: "Activity Ideas",
    date: "March 1, 2025",
    readTime: "5 min read",
    slug: "creative-indoor-activities-rainy-day",
  },
  {
    id: 6,
    title: "Understanding Your Child's Social Development Milestones",
    excerpt: "A comprehensive guide to social development milestones from kindergarten through fifth grade.",
    image: "/child-development-milestones-chart.jpg",
    category: "Child Development",
    date: "February 28, 2025",
    readTime: "8 min read",
    slug: "child-social-development-milestones",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 flex items-center border-b border-none bg-primary-foreground py-4 justify-center">
        <Link href="/">
          <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} priority className="w-auto h-16 mx-0" />
        </Link>
      </header>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 bg-primary-foreground pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance leading-tight text-primary">
            Plaidate Blog
          </h1>
          <p className="text-lg md:text-xl text-popover-foreground max-w-3xl mx-auto leading-relaxed">
            Tips, insights, and stories about building meaningful connections and helping your children thrive through
            social play.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 md:px-12 bg-primary-foreground py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance leading-tight text-primary">
            Ready to start building connections?
          </h2>
          <p className="text-lg text-popover-foreground leading-relaxed">
            Join our waitlist and be the first to know when Plaidate launches in your community.
          </p>
          <Button
            asChild
            className="hover:bg-[#7AC5F8] rounded-full px-8 py-6 text-lg text-primary-foreground bg-secondary-foreground"
          >
            <Link href="/#waitlist">Join the Waitlist</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t bg-secondary">
        <div className="max-w-7xl mx-auto space-y-9">
          <div className="flex gap-4 text-left flex-row items-start justify-end">
            <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} className="w-auto text-left h-8" />
          </div>
          <p className="max-w-md text-primary-foreground text-left leading-normal text-base">
            Build lasting connections and friendships within your local parenting community.
          </p>
          <p className="text-xs text-primary-foreground text-left">© 2025 Plaidate. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}
