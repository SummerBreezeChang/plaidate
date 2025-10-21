import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-primary-foreground">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <Image src="/plai-logo.png" alt="Plai Logo" width={120} height={60} className="mx-auto" />
        <h1 className="text-4xl md:text-6xl font-bold text-primary">Welcome to Plaidate</h1>
        <p className="text-lg text-muted-foreground">
          We're building something special for parents like you. Join our waitlist to be first in line when we launch!
        </p>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/waitlist">Join Waitlist</Link>
        </Button>
      </div>
    </main>
  )
}
