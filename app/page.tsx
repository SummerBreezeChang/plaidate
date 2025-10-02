import { WaitlistForm } from "@/components/waitlist-form"
import { FeatureCards } from "@/components/feature-cards"
import { HowItWorks } from "@/components/how-it-works"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full px-6 md:px-12 flex items-center border-b border-none justify-center bg-primary-foreground py-4">
        <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} priority className="w-auto h-16" />
      </header>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24 text-background border-none bg-primary-foreground md:pt-[52px] md:pb-[76px]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Form */}
          <div className="space-y-2">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance leading-tight text-primary">
                Join Plaidate
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg font-sans py-2 pb-4">
                A family-friendly platform for parents of K-5 children to easily organize, promote, and participate in
                virtual and in-person community events. Discover playdates, classes, and activities that help your child
                build social skills and friendships.
              </p>
            </div>

            <WaitlistForm />

            <p className="text-sm text-muted-foreground text-center">We'll be in touch to share updates</p>
          </div>

          {/* Right: Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/design-mode/Screenshot%202025-10-01%20at%208.07.44%E2%80%AFPM.png"
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
      <section className="w-full px-6 md:px-12 bg-primary-foreground py-[106px]">
        <div className="max-w-4xl mx-auto text-center space-y-11">
          <h2 className="tracking-tight text-balance leading-tight text-primary text-3xl font-medium">
            At Plaidate, we believe social skills are the foundation of kids' confidence and emotional growth.
          </h2>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
            Join Plaidate Waitlist
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 px-6 md:px-12 border-t bg-secondary">
        <div className="max-w-7xl mx-auto space-y-9">
          <div className="flex gap-4 text-left flex-row items-start justify-center">
            <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} className="w-auto text-left h-[77px]" />
          </div>
          <p className="max-w-md mx-auto text-primary-foreground text-center text-lg">
            Build lasting connections and friendships within your local parenting community.
          </p>
          <p className="text-xs text-primary-foreground text-center">© 2025 Plaidate. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  )
}
