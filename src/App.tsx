

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import LaunchTeaser from './pages/LaunchTeaser';

import Ticker from './components/Ticker';

const LandingPage = () => (
  <>
    <div className="sticky top-0 z-50">
      <Navbar />
    </div>
    <div className="">
      <Ticker />
      <Hero />
      <About />
      <Footer />
    </div>
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-stone-900 min-h-screen text-stone-100 font-sans selection:bg-blue-500/30 selection:text-blue-100">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/launch" element={<LaunchTeaser />} />
        </Routes>
      </div>
    </Router>
  )
}


export default App;
