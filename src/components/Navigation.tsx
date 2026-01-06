import { useState, useEffect } from 'react';

interface NavigationProps {
  onLogoClick: () => void;
  onShowProduct: (product: string) => void;
  onHowItWorksClick: () => void;
  onShowWhyArcus: () => void;
  onShowAbout: () => void;
  onShowCodeModal: () => void;
}

export default function Navigation({
  onLogoClick,
  onShowProduct,
  onHowItWorksClick,
  onShowWhyArcus,
  onShowAbout,
  onShowCodeModal
}: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <button onClick={onLogoClick}>
              <img src="/arcusai.png" alt="Arcus AI" className="h-8" />
            </button>
          </div>
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <div
              className="relative"
              onMouseEnter={() => setShowProductDropdown(true)}
              onMouseLeave={() => setShowProductDropdown(false)}
            >
              <button className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                Agents
              </button>
              {showProductDropdown && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <button onClick={() => { onShowProduct('marketing'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Marketing
                    </button>
                    <button onClick={() => { onShowProduct('creative'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Creative
                    </button>
                    <button onClick={() => { onShowProduct('media'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Media
                    </button>
                    <button onClick={() => { onShowProduct('development'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Development
                    </button>
                    <button onClick={() => { onShowProduct('spatial'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Spatial Computing
                    </button>
                    <button onClick={() => { onShowProduct('uiux'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      UI/UX
                    </button>
                    <div className="border-t border-gray-100 my-2"></div>
                    <button onClick={() => { onShowProduct('analytics'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-between gap-2">
                      <span>Analytics</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">Coming Soon</span>
                    </button>
                    <button onClick={() => { onShowProduct('projectadmin'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors flex items-center justify-between gap-2">
                      <span>Project/Admin</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">Coming Soon</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={onShowWhyArcus} className="text-gray-600 hover:text-gray-900 transition-colors">Why Arcus</button>
            <button onClick={onShowAbout} className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
          </div>
          <div className="hidden md:flex items-center space-x-4 flex-1 justify-end">
            <a
              href="https://calendar.app.google/bL5Cn6kkYy98fpc46"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 inline-block"
            >
              Book a Call
            </a>
            <button
              onClick={onShowCodeModal}
              className="px-6 py-2.5 bg-white text-slate-700 border-2 border-slate-700 rounded-full hover:bg-slate-50 transition-all hover:shadow-lg hover:scale-105"
            >
              Try Arcus
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
