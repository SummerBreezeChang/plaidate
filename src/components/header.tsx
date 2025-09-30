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
                "px-4 sticky top-0 z-50 h-[100px] bg-[#F9F9F9] flex items-center scale-[1.05] md:scale-[1.1] origin-top",
                scrolled &&
                    "md:backdrop-blur-none backdrop-blur-sm",
            )}
        >
            <div className="mx-auto w-full max-w-screen-2xl flex flex-row gap-2 justify-between items-center px-4">
                <Link href="/" aria-label="Plaidate home" className="flex items-center">
                    <Logo />
                </Link>
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm px-2 md:px-3 py-2">
                    <Link href="#waitlist">
                        <span className="hidden sm:inline">Join Plaidate Waitlist</span>
                        <span className="sm:hidden">Join Waitlist</span>
                    </Link>
                </Button>
            </div>
        </header>
    );
}
