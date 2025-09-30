"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface CountdownProps {
	period: Date | string | number; // End date for countdown
	className?: string;
	label?: string; // Optional label text, defaults to "LEFT UNTIL FULL RELEASE"
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export default function Countdown({
	period,
	className = "",
	label = "Beta test starts",
}: CountdownProps) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft>({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const prefersReducedMotion = useReducedMotion();

	const targetDate = useMemo(() => new Date(period).getTime(), [period]);

	const calculateTimeLeft = useCallback(() => {
		const now = new Date().getTime();
		const difference = targetDate - now;

		if (difference <= 0) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
			return;
		}

		setTimeLeft({
			days: Math.floor(difference / (1000 * 60 * 60 * 24)),
			hours: Math.floor(
				(difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
			),
			minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
			seconds: Math.floor((difference % (1000 * 60)) / 1000),
		});
	}, [targetDate]);

	useEffect(() => {
		calculateTimeLeft();

		intervalRef.current = setInterval(calculateTimeLeft, 1000);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
	}, [calculateTimeLeft]);

	const formatNumber = useCallback((num: number) => {
		return num.toString().padStart(2, "0");
	}, []);

	const containerVariants = useMemo(
		() => ({
			hidden: { opacity: 0 },
			visible: {
				opacity: 1,
				transition: {
					when: "beforeChildren",
					staggerChildren: prefersReducedMotion ? 0 : 0.1,
				},
			},
		}),
		[prefersReducedMotion],
	);

	const itemVariants = useMemo(
		() => ({
			hidden: prefersReducedMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
			visible: {
				y: 0,
				opacity: 1,
				transition: {
					type: prefersReducedMotion ? "tween" : "spring",
					stiffness: 300,
					damping: 24,
				},
			},
		}),
		[prefersReducedMotion],
	);

	const ariaLabel = useMemo(
		() => `Countdown: ${timeLeft.days} days remaining`,
		[timeLeft.days],
	);

    return (
        <motion.div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-background/70 text-xs uppercase tracking-wider ${className}`}
            aria-label={ariaLabel}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            layout="position"
        >
            <span>{timeLeft.days} days</span>
            <span className="text-muted-foreground">{label}</span>
        </motion.div>
    );
}
