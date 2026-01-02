import { Linkedin, Sparkles, Target, Users, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AboutProps {
  onClose: () => void;
  onShowComingSoon: () => void;
  onShowContact: () => void;
  onShowProduct: (product: string) => void;
}

export default function About({ onClose, onShowComingSoon, onShowContact, onShowProduct }: AboutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={onClose}>
                <img src="/arcusai.png" alt="Arcus AI" className="h-8" />
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div
                className="relative"
                onMouseEnter={() => setShowProductDropdown(true)}
                onMouseLeave={() => setShowProductDropdown(false)}
              >
                <button className="text-gray-600 hover:text-gray-900 transition-colors py-2">
                  Product
                </button>
                {showProductDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-56">
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
                    </div>
                  </div>
                )}
              </div>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</button>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-white text-slate-700 border-2 border-slate-700 rounded-full hover:bg-slate-50 transition-all hover:shadow-lg hover:scale-105"
              >
                Try Arcus
              </button>
              <a
                href="https://calendar.app.google/bL5Cn6kkYy98fpc46"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 inline-block"
              >
                Book a Call
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            We built an AI so that you can handle your marketing
            <br />
            with just the top 20% of your staff
          </h1>
          <p className="text-xl text-gray-600">DC · Los Angeles · Seattle</p>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Who Are We?</h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  Marketers, AI engineers, and product developers with 40+ years combined experience across OMD, Publicis, WPP, and brands like Sofi. We've been CMOs, built products for Fortune 500s and startups, and worked across CPG, fintech, entertainment, and gaming.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Team collaboration"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Frustrated marketer"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why did we build this?</h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold">First, hiring was a nightmare.</span> Finding great marketers takes 3-6 months. Training them takes another 6. And when they leave, you start over.
                </p>
                <p className="text-lg leading-relaxed">
                  <span className="font-semibold">Second, AI worked—but it was scattered.</span> We'd use one tool for copy, another for creative, 8 other tools for research, scheduling, and reporting. Every campaign required duct-taping 10 platforms together.
                </p>
                <p className="text-lg leading-relaxed">
                  So we built one system that does all of it. And we figured out how to download our brains into the AIs so it could think and produce based on knowledge of what actually works and what doesn't.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">What Problem Do We Want to Solve?</h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p className="text-lg leading-relaxed">
                  Good marketers are expensive and hard to scale. You can't clone your best strategist. You can't afford 5 of them.
                </p>
                <p className="text-lg leading-relaxed">
                  We wanted to create a system where one great marketer—augmented by AI—can output what used to require an entire team.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Strategic planning"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Now you have two options:</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200">
                <div className="text-6xl mb-4">😓</div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Keep searching for great talent, hoping they stay, and paying $80K-$150K per head
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-700">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-lg text-gray-900 leading-relaxed font-medium">
                  Let AI handle 90% of work while your best people focus on the 10% that actually moves the needle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full mx-auto overflow-hidden">
                <img
                  src="/1754614138091.png"
                  alt="Jordan Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Jordan Chen</h3>
                <p className="text-gray-600">Co-Founder / CEO</p>
              </div>
              <p className="text-gray-700 text-sm">
                Former Head of AI at a Fortune 500 marketing agency. PhD in Machine Learning from Stanford.
              </p>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full mx-auto overflow-hidden">
                <img
                  src="/1751890423851.png"
                  alt="Alex Rivera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Alex Rivera</h3>
                <p className="text-gray-600">Co-Founder / CTO</p>
              </div>
              <p className="text-gray-700 text-sm">
                Led engineering at two successful AI startups. Expert in multi-agent systems and NLP.
              </p>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5 mx-auto" />
              </button>
            </div>

            <div className="text-center space-y-4">
              <div className="w-32 h-32 rounded-full mx-auto overflow-hidden">
                <img
                  src="/1703046610447.jpeg"
                  alt="Maya Patel"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Maya Patel</h3>
                <p className="text-gray-600">Co-Founder / CPO</p>
              </div>
              <p className="text-gray-700 text-sm">
                8 years building marketing automation platforms at scale. Product visionary.
              </p>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Linkedin className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <Mail className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join us in building the future</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented people who want to make an impact.
          </p>
          <a
            href="mailto:opportunities@userarcus.ai"
            className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors"
          >
            Reach Out
          </a>
        </div>
      </div>

      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 mb-8">
            <div>
              <div className="mb-4">
                <button onClick={onClose} className="cursor-pointer">
                  <img src="/arcusai.png" alt="Arcus AI" className="h-8 brightness-0 invert" />
                </button>
              </div>
              <p className="text-gray-400">
                Your autonomous marketing team, powered by AI
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={() => onShowProduct('marketing')} className="text-gray-400 hover:text-white transition-colors text-left">Marketing</button></li>
                <li><button onClick={() => onShowProduct('creative')} className="text-gray-400 hover:text-white transition-colors text-left">Creative</button></li>
                <li><button onClick={() => onShowProduct('media')} className="text-gray-400 hover:text-white transition-colors text-left">Media</button></li>
                <li><button onClick={() => onShowProduct('development')} className="text-gray-400 hover:text-white transition-colors text-left">Development</button></li>
                <li><button onClick={() => onShowProduct('spatial')} className="text-gray-400 hover:text-white transition-colors text-left">Spatial Computing</button></li>
                <li><button onClick={() => onShowProduct('uiux')} className="text-gray-400 hover:text-white transition-colors text-left">UI/UX</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={onShowComingSoon} className="text-gray-400 hover:text-white transition-colors text-left">Blog</button></li>
                <li><button onClick={onShowContact} className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Arcus AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
