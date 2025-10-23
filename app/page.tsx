import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Headphones, Hammer, ChefHat, Cpu, Package } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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

      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 md:px-12 bg-gradient-to-b from-muted/30 to-background bg-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 bg-[#7AC5F8]/10 rounded-full">
                <span className="text-sm font-medium text-[#7AC5F8]">Curated for Modern Parents</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                Resources that actually help
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Stop endless scrolling. We've done the research for you—discover books, podcasts, activities, and tools
                that make parenting easier and more meaningful.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground"
                >
                  <Link href="/resources">Join Waitlist</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/hero-image.png"
                  alt="Parents and children engaging together"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border border-border rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold text-foreground">200+</div>
                <div className="text-sm text-muted-foreground">Curated Resources</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-background border border-border rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold text-foreground">6</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32 bg-primary-foreground">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">Explore by category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every resource is hand-picked and verified for quality
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Parenting Books",
                count: "20 books",
                image: "/stack-of-parenting-books-on-wooden-table.jpg",
                color: "from-[#7AC5F8]/20 to-[#7AC5F8]/5",
                icon: BookOpen,
              },
              {
                title: "Podcasts",
                count: "15 shows",
                image: "/podcast-microphone-and-headphones-setup.jpg",
                color: "from-[#F4D03F]/20 to-[#F4D03F]/5",
                icon: Headphones,
              },
              {
                title: "STEM Activities",
                count: "15 kits",
                image: "/colorful-science-experiment-kit-for-kids.jpg",
                color: "from-[#C39BD3]/20 to-[#C39BD3]/5",
                icon: Cpu,
              },
              {
                title: "Cooking Tools",
                count: "15 products",
                image: "/kids-cooking-utensils-and-apron.jpg",
                color: "from-[#52BE80]/20 to-[#52BE80]/5",
                icon: ChefHat,
              },
              {
                title: "Building Activities",
                count: "15 sets",
                image: "/colorful-building-blocks-and-construction-toys.jpg",
                color: "from-[#EC7063]/20 to-[#EC7063]/5",
                icon: Hammer,
              },
              {
                title: "Subscription Boxes",
                count: "12 boxes",
                image: "/subscription-box-with-crafts-and-activities.jpg",
                color: "from-[#5DADE2]/20 to-[#5DADE2]/5",
                icon: Package,
              },
            ].map((category, index) => (
              <Link key={index} href="/resources">
                <Card className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 cursor-pointer bg-chart-5">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} z-10`} />
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <category.icon className="w-6 h-6 text-foreground" />
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-20 md:py-32 bg-chart-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground text-balance">
              "Finally, a place where I don't have to second-guess every parenting decision"
            </h2>
            <p className="text-lg text-muted-foreground">
              Join hundreds of parents who trust our curated recommendations
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 bg-secondary-foreground hover:bg-secondary-foreground/90 text-primary-foreground"
          >
            <Link href="/waitlist">Get Early Access to Plaidate</Link>
          </Button>
        </div>
      </section>

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
