import type React from "react"
import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { headers } from "next/headers"
import "./globals.css"
import { Work_Sans, Space_Grotesk as V0_Font_Space_Grotesk, JetBrains_Mono as V0_Font_JetBrains_Mono, Rubik as V0_Font_Rubik } from 'next/font/google'

// Initialize fonts
const _spaceGrotesk = V0_Font_Space_Grotesk({ subsets: ['latin'], weight: ["300","400","500","600","700"], variable: '--v0-font-space-grotesk' })
const _jetBrainsMono = V0_Font_JetBrains_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800"], variable: '--v0-font-jetbrains-mono' })
const _rubik = V0_Font_Rubik({ subsets: ['latin'], weight: ["300","400","500","600","700","800","900"], variable: '--v0-font-rubik' })
const _v0_fontVariables = `${_spaceGrotesk.variable} ${_jetBrainsMono.variable} ${_rubik.variable}`

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-work-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = headers().get("x-invoke-path") || ""
  const inApp = path.startsWith("/app")
  
  return (
    <html lang="en">
      <body className={`font-sans ${workSans.variable} ${_v0_fontVariables}`}>
        {!inApp && (
          <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/design-mode/PlaidateLogo.png"
                  alt="Plai"
                  width={80}
                  height={40}
                  className="h-8 w-auto"
                  priority
                />
              </Link>
              <nav className="flex items-center gap-4"></nav>
            </div>
          </header>
        )}
        <main className="min-h-screen">
          <Suspense fallback={null}>{children}</Suspense>
        </main>
      </body>
    </html>
  )
}
