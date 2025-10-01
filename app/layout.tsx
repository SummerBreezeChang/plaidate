import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Join Plaidate - Connect with Parents for Playdates",
  description:
    "A family-friendly platform for parents of K–5 children to easily organize, discover, and join playdates — while streamlining communication, payments, and activity planning.",
  generator: "v0.app",
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Join Plaidate",
    description:
      "A family-friendly platform for parents of K–5 children to easily organize, discover, and join playdates — while streamlining communication, payments, and activity planning.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Join Plaidate - Connect with Parents for Playdates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Join Plaidate",
    description:
      "A family-friendly platform for parents of K–5 children to easily organize, discover, and join playdates.",
    images: ["/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
