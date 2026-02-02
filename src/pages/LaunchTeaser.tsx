import { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

const LaunchTeaser = () => {
    const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const launchDate = new Date('2026-02-02T00:00:00');

        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = launchDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, []);

    // Animation variants for staggered text
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const child: Variants = {
        hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", damping: 12, stiffness: 100 }
        },
    } as const;

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative overflow-hidden selection:bg-blue-500/50">

            {/* Abstract Background - Enhanced */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            </div>

            <div className="z-10 text-center px-4 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, letterSpacing: "1em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h2 className="text-sm md:text-xl font-medium uppercase text-blue-400 mb-8 tracking-[0.5em]">
                        Kaalchakra Presents
                    </h2>
                </motion.div>

                {/* Staggered Headline Animation */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="mb-10"
                >
                    <div className="overflow-hidden">
                        <motion.h1
                            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tight leading-none bg-gradient-to-b from-white to-stone-500 bg-clip-text text-transparent"
                            variants={child}
                        >
                            SOMETHING
                        </motion.h1>
                    </div>
                    <div className="overflow-hidden">
                        <motion.h1
                            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tight leading-none bg-gradient-to-b from-stone-200 to-stone-600 bg-clip-text text-transparent"
                            variants={child}
                        >
                            BIG IS COMING
                        </motion.h1>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="text-lg md:text-2xl font-light text-stone-400 mb-20 max-w-2xl mx-auto leading-relaxed border-t border-b border-white/5 py-6"
                >
                    Our First E-Newspaper. Credible. In-depth. Unbiased.
                    <br />
                    <span className="text-blue-400 font-normal mt-2 block">Launching February 02, 2026</span>
                </motion.p>

                {/* Countdown - Glassmorphism */}
                <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-20">
                    {[
                        { label: 'Days', value: timeLeft.days },
                        { label: 'Hours', value: timeLeft.hours },
                        { label: 'Minutes', value: timeLeft.minutes },
                        { label: 'Seconds', value: timeLeft.seconds }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.8 + (i * 0.1), type: "spring" }}
                            className="text-center bg-white/5 backdrop-blur-sm border border-white/10 p-4 md:p-6 rounded-2xl min-w-[100px] md:min-w-[140px]"
                        >
                            <div className="text-3xl md:text-6xl font-light font-mono mb-2 text-white">
                                {String(item.value).padStart(2, '0')}
                            </div>
                            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-bold">
                                {item.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.a
                    href="/"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center space-x-2 px-8 py-3 bg-transparent border border-white/30 text-white font-medium tracking-wide rounded-full transition-all duration-300 group"
                >
                    <span>Back to Home</span>
                    <span className="group-hover:-translate-x-1 duration-300">←</span>
                </motion.a>
            </div>
        </div>
    );
};

export default LaunchTeaser;
