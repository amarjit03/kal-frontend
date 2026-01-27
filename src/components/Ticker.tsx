
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Ticker = () => {
    return (
        <div className="relative z-50 overflow-hidden py-3 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-b border-white/10 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <div className="flex items-center">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                >
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center">
                            <span className="mx-8 text-sm md:text-base font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white uppercase drop-shadow-sm">
                                🚀 Something Big Is Coming — Our First E-Newspaper Launches Feb 02, 2026!
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-50"></span>
                            <span className="mx-8 text-sm md:text-base font-light tracking-widest text-blue-200/80 uppercase">
                                Trustworthy Reporting • Citizen Journalism • Youth Focused
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 opacity-50"></span>
                        </div>
                    ))}
                </motion.div>

                {/* Absolute positioned Action Button on the right (desktop) */}
                <div className="absolute right-0 top-0 bottom-0 px-6 flex items-center bg-gradient-to-l from-indigo-950 via-indigo-950/90 to-transparent">
                    <Link to="/launch" className="group flex items-center space-x-2 text-xs font-bold uppercase border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 backdrop-blur-sm">
                        <span>View Launch</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Ticker;
