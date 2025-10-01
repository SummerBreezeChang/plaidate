import type { Metadata } from "next";
import { Geist_Mono, Work_Sans } from "next/font/google";
import { Toaster } from "sonner";

import "./globals.css";
import Header from "~/components/header";
import { ThemeProvider } from "~/providers/theme-provider";

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const workSans = Work_Sans({
    variable: "--font-work-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Plaidate — Join the Waitlist",
	description:
		"Be among the first to experience the future of AI-powered productivity. Join the Plaidate waitlist to get notified when we launch.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${workSans.variable} h-full`} suppressHydrationWarning>
            <body
                className={`${workSans.variable} ${geistMono.variable} antialiased flex flex-col h-full bg-[#FFFDF4]`}
            >
				<ThemeProvider>
					<Header />
					<Toaster />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
