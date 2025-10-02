"use client"

import { WaitlistForm } from "@/components/waitlist-form"
import { FeatureCards } from "@/components/feature-cards"
import { HowItWorks } from "@/components/how-it-works"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function Home() {
  const heroContent = useScrollAnimation({ threshold: 0.2 })
  const heroImage = useScrollAnimation({ threshold: 0.2 })
  const whyParents = useScrollAnimation({ threshold: 0.2 })
  const howItWorks = useScrollAnimation({ threshold: 0.2 })
  const mission = useScrollAnimation({ threshold: 0.3 })

  return (
    <main className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 flex items-center border-b border-none bg-primary-foreground py-4 justify-center">
        <Image src="/plai-logo.png" alt="Plai Logo" width={80} height={40} priority className="w-auto h-16 mx-0" />
      </header>

      {/* Hero Section */}
      <section className="w-full px-6 md:px-12 md:py-24 text-background border-none bg-primary-foreground md:pt-[52px] md:pb-[76px] leading-4 py-[35px] pt-28 md:pt-[120px]">
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Content */}
          <div
            ref={heroContent.ref}
            className={`space-y-2 order-2 md:order-1 transition-all duration-700 ${
              heroContent.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-2">
              <h1
                id="join-plaidate"
                className="md:text-6xl font-bold tracking-tight text-balance leading-tight text-primary text-4xl"
              >
                Join Plaidate
              </h1>
              <p className="leading-normal font-sans py-2 text-base text-popover-foreground pb-8">
                A platform for parents of K-5 children to easily host, join, and plan activities. Connect with skilled
                parents who create engaging activities that help your child and others build social skills and
                friendships.
              </p>
            </div>

            <div id="waitlist">
              <WaitlistForm />
            </div>

            <p className="text-sm text-muted-foreground text-center md:text-right">
              We'll be in touch to share updates
            </p>
          </div>

          {/* Right: Image */}
          <div
            ref={heroImage.ref}
            className={`relative aspect-[4/3] rounded-2xl overflow-hidden w-full order-1 md:order-2 transition-all duration-700 delay-200 ${
              heroImage.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
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
        <div className="max-w-7xl space-y-12 mx-auto">
          <div
            ref={whyParents.ref}
            className={`text-center space-y-4 transition-all duration-700 ${
              whyParents.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
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
          <div
            ref={howItWorks.ref}
            className={`text-center space-y-4 transition-all duration-700 ${
              howItWorks.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How it works</h2>
            <p className="text-lg text-primary">Getting started is simple and takes just a few minutes</p>
          </div>

          <HowItWorks />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full px-6 md:px-12 bg-primary-foreground py-[106px]">
        <div
          ref={mission.ref}
          className={`max-w-4xl mx-auto text-center space-y-11 transition-all duration-700 ${
            mission.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="tracking-tight text-balance leading-tight text-primary font-medium text-3xl">
            At Plaidate, we believe social skills are the foundation of kids' confidence and emotional growth.
          </h2>
          <Button
            asChild
            className="hover:bg-[#7AC5F8] rounded-full px-8 py-6 text-lg text-primary-foreground bg-secondary-foreground"
          >
            <a href="#join-plaidate">Join Plaidate Waitlist</a>
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
