import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-stone-950/90 backdrop-blur-md border-b border-white/10 relative z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img src="/logo.jpeg" alt="Kalchakra Logo" className="h-10 w-10 rounded-full object-cover" />
                    <div className="text-xl md:text-2xl font-light tracking-widest text-white">
                        KALCHAKRA
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 text-sm font-medium text-stone-300">
                    <a href="#" className="hover:text-white transition-colors">VISION</a>
                    <a href="#about" className="hover:text-white transition-colors">FOCUS</a>
                    <a href="#audience" className="hover:text-white transition-colors">AUDIENCE</a>
                    <a href="https://forms.gle/YtSfvV8UV8HaJDma9" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                        Join Waitlist
                    </a>
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-stone-950 border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4 px-6 py-6 text-stone-300">
                            <a href="#" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">VISION</a>
                            <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">FOCUS</a>
                            <a href="#audience" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors">AUDIENCE</a>
                            <a href="https://forms.gle/YtSfvV8UV8HaJDma9" target="_blank" rel="noopener noreferrer" className="inline-block text-center px-4 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                                Join Waitlist
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
