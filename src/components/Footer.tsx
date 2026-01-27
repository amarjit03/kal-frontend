

const Footer = () => {
    return (
        <footer className="bg-stone-950 border-t border-white/10 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-60 text-sm font-light">
                <p>&copy; {new Date().getFullYear()} Kalchakra. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                    <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
