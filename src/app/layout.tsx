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
	icons: {
		icon: [
			{ url: '/icon.svg', type: 'image/svg+xml' },
			{ url: '/favicon.ico', sizes: 'any' }
		],
		apple: '/icon.svg',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${workSans.variable} h-full bg-[#FFFDF4]`} style={{backgroundColor: '#FFFDF4'}} suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/icon.svg" />
            </head>
            <body
                className={`${workSans.variable} ${geistMono.variable} antialiased flex flex-col h-full bg-[#FFFDF4]`}
                style={{backgroundColor: '#FFFDF4'}}
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
