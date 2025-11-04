import type React from "react"
import Link from "next/link"
import { Suspense } from "react"
import { Home, SearchIcon, PlusCircle, CalendarDays, User } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[420px] min-h-screen bg-white">
      {/* keep content clear of the fixed bottom bar */}
      <main className="pb-[88px]">
        <Suspense fallback={<div className="p-4">Loading...</div>}>{children}</Suspense>
      </main>

      {/* bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-[420px] grid grid-cols-5">
          <Link href="/app" className="py-3 text-center">
            <Home className="mx-auto h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <Link href="/app/search" className="py-3 text-center">
            <SearchIcon className="mx-auto h-6 w-6" />
            <span className="sr-only">Search</span>
          </Link>
          <Link href="/app/create" className="py-3 text-center">
            <PlusCircle className="mx-auto h-6 w-6" />
            <span className="sr-only">Create</span>
          </Link>
          <Link href="/app/calendar" className="py-3 text-center">
            <CalendarDays className="mx-auto h-6 w-6" />
            <span className="sr-only">Calendar</span>
          </Link>
          <Link href="/app/profile" className="py-3 text-center">
            <User className="mx-auto h-6 w-6" />
            <span className="sr-only">Profile</span>
          </Link>
        </div>
        {/* iOS safe-area padding */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </nav>
    </div>
  )
}
