import { WaitlistForm } from "@/components/waitlist-form"
import { FeatureCards } from "@/components/feature-cards"
import { HowItWorks } from "@/components/how-it-works"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full px-6 md:px-12 flex items-center justify-between border-b border-none bg-background py-3">
        <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} priority className="w-auto h-[88px]" />
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6">
          Join Plaidate Waitlist
        </Button>
      </header>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 text-background border-none bg-primary-foreground">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <div className="space-y-4">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight text-primary font-mono">
                Join Plaidate
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-sans">
                A family-friendly platform for parents of K-5 children to easily organize, promote, and participate in
                virtual and in-person community events. Discover playdates, classes, and activities that help your child
                build social skills and friendships.
              </p>
            </div>

            <WaitlistForm />

            <p className="text-sm text-muted-foreground">We'll be in touch to share updates</p>
          </div>

          {/* Right: Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
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
      <section className="w-full px-6 md:px-12 py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">Why parents love Plaidate</h2>
            <p className="text-lg text-primary">
              One-stop place to chat, plan, and attend — instead of messy text threads or multiple apps.
            </p>
          </div>

          <FeatureCards />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full px-6 md:px-12 py-16 bg-popover">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How it works</h2>
            <p className="text-lg text-muted-foreground">Getting started is simple and takes just a few minutes</p>
          </div>

          <HowItWorks />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full px-6 md:px-12 py-20 bg-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl tracking-tight text-balance leading-tight md:text-4xl font-semibold font-mono text-primary">
            At Plaidate, we believe social skills are the foundation of kids' confidence and emotional growth.
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
            Join Plaidate Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t bg-secondary">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex gap-4 text-left flex-row items-start justify-start">
            <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} className="w-auto h-24 text-left" />
          </div>
          <p className="max-w-md text-primary-foreground text-2xl">
            Build lasting connections and friendships within your local parenting community.
          </p>
          <p className="text-xs text-primary-foreground">© 2025 Plaidate. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}
