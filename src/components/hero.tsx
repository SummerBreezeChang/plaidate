"use client";

import { useMemo, useState } from "react";

import Countdown from "./countdown";
import { Logo } from "./svgs";
import Form from "./form";

export default function Hero({ waitlistPeople }: { waitlistPeople: number }) {
  const year = 2026;
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 -mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:items-start justify-center">
        <div className="flex flex-col items-start justify-start gap-4 mb-6 order-2 lg:order-1">
          <div className="flex items-center gap-4 rounded-full border border-border px-4 py-1 relative">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6D636] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F6D636]" />
            </span>
            <p className="uppercase text-sm font-medium">
              available in early {year}
            </p>
          </div>
          <h2 className="text-[40px] md:text-[60px] lg:text-[80px] leading-[0.95] font-bold text-foreground">
            {isSuccess ? "You're on the waitlist" : "Join Plaidate"}
          </h2>
          <p className="text-base text-foreground text-left max-w-xl">
            {isSuccess
              ? "You've successfully secured your spot.We'll hit you up the moment it's your turn to dive in"
              : "A family-friendly platform for parents of K–5 children to easily organize, discover, and join playdates — while streamlining communication, payments, and activity planning."}
          </p>
          <div id="waitlist" className="w-full max-w-xl mt-10 scroll-mt-16">
            <Form onSuccessChange={setIsSuccess} />
            <Countdown className="mt-3" period={new Date(Date.now() + 32 * 24 * 60 * 60 * 1000)} />
          </div>
        </div>
        <div className="w-full block lg:block order-1 lg:order-2">
          <div className="flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[400px] md:max-w-[500px] lg:w-[500px] h-auto scale-[1.1] md:scale-[1.2] lg:scale-[1.4] lg:origin-top-right">
              <img src="/avatars/HeroImage.png" alt="Children playing outdoors" className="w-full h-auto rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
