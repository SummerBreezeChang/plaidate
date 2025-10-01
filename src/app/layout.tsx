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
			{ url: '/favicon.ico', type: 'image/x-icon', sizes: 'any' },
			{ url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
			{ url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
			{ url: '/icon.svg', type: 'image/svg+xml' }
		],
		apple: [
			{ url: '/favicon-32x32.png', type: 'image/png' }
		],
		shortcut: '/favicon.ico'
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${workSans.variable} h-full`} suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
				<link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
				<link rel="icon" href="/icon.svg" type="image/svg+xml" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="shortcut icon" href="/favicon.ico" />
			</head>
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
