"use client";

import Footer from "~/components/footer";
import Hero from "~/components/hero";

export function LandingPage({ waitlistPeople }: { waitlistPeople: number }) {
  return (
    <main className="mx-auto max-w-screen-2xl w-full flex-1 flex flex-col relative pt-2 lg:pt-48 bg-[#FFFDF4] min-h-screen" style={{backgroundColor: '#FFFDF4'}}>
      <div className="flex-1 flex items-start justify-center">
        <Hero waitlistPeople={waitlistPeople} />
      </div>
      <Footer />
    </main>
  );
}
