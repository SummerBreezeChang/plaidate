"use client";

import { cn } from "~/lib/utils";
import { useScroll } from "~/hooks/use-scroll";
import { Logo } from "./svgs";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
	const scrolled = useScroll();

    return (
        <header
            className={cn(
                "px-4 sticky top-0 z-50 h-[100px] bg-[#F9F9F9] flex items-center",
                scrolled &&
                    "md:backdrop-blur-none backdrop-blur-sm",
            )}
        >
            <div className="mx-auto w-full max-w-screen-2xl flex flex-row gap-2 justify-between items-center pr-2 lg:pr-4">
                <Link href="/" aria-label="Plaidate home" className="flex items-center">
                    <Logo />
                </Link>
                <Button asChild className="bg-[#2E4F21] text-[#FFFDF4] hover:bg-[#27451c]">
                    <Link href="#waitlist">Join Plaidate Waitlist</Link>
                </Button>
            </div>
        </header>
    );
}
