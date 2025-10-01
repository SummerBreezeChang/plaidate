"use client";

import Footer from "~/components/footer";
import Hero from "~/components/hero";

export function LandingPage({ waitlistPeople }: { waitlistPeople: number }) {
  return (
    <main className="mx-auto max-w-screen-2xl w-full flex-1 flex flex-col relative pt-8 sm:pt-16 md:pt-24 lg:pt-32 bg-[#FFFDF4] min-h-screen">
      <div className="flex-1 flex items-start justify-center">
        <Hero waitlistPeople={waitlistPeople} />
      </div>
      <Footer />
    </main>
  );
}
