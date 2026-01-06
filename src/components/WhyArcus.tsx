import { Sparkles, Target, Users, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface WhyArcusProps {
  onClose: () => void;
  onShowComingSoon: () => void;
  onShowContact: () => void;
  onShowProduct: (product: string) => void;
  onShowCodeModal: () => void;
  onShowFAQ: () => void;
}

export default function WhyArcus({ onClose, onShowComingSoon, onShowContact, onShowProduct, onShowCodeModal, onShowFAQ }: WhyArcusProps) {
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
              <button className="text-gray-600 hover:text-gray-900 transition-colors">Why Arcus</button>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
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

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Why Choose Arcus?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The marketing world is changing. AI is not the future—it's now. And the question isn't whether to use AI, but how to use it right.
          </p>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The Problem with Current AI Tools</h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Most companies are using AI wrong. They're treating it like a bunch of separate tools—one for writing, one for images, another for analytics, etc.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  The result? Fragmented workflows. Inconsistent quality. Hours spent stitching everything together. And the AI still doesn't understand your brand.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Fragmented tools"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="rounded-2xl overflow-hidden shadow-2xl order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Unified platform"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">The Arcus Difference</h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Arcus isn't just another AI tool. It's an autonomous marketing team that works together like real people.
                </p>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">One platform. Everything connected.</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">AI agents that understand your brand deeply.</p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-lg text-gray-700">Real collaboration between specialized AI experts.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">What Makes Arcus Special</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Truly Autonomous</h3>
              <p className="text-gray-700 leading-relaxed">
                Not just automation. Our AI agents make decisions, collaborate, and adapt—just like a real team would.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Brand Intelligence</h3>
              <p className="text-gray-700 leading-relaxed">
                We've built a system that learns your brand voice, values, and strategy—then applies it consistently everywhere.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Agent System</h3>
              <p className="text-gray-700 leading-relaxed">
                Specialized AI agents work together—strategists, copywriters, designers—each an expert in their field.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Adaptation</h3>
              <p className="text-gray-700 leading-relaxed">
                Continuously monitors performance and adjusts strategies based on what's working—24/7.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Scale</h3>
              <p className="text-gray-700 leading-relaxed">
                Built to handle everything from startup growth to Fortune 500 campaigns across all channels.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Human in the Loop</h3>
              <p className="text-gray-700 leading-relaxed">
                You stay in control. Review, approve, or provide feedback. The AI learns from every interaction.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-gradient-to-br from-slate-700 to-gray-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">The Bottom Line</h2>
          <p className="text-xl mb-8 leading-relaxed">
            You can keep juggling 10 different AI tools and hoping your team can make them work together. Or you can get a complete autonomous marketing team that actually understands your business and executes like experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendar.app.google/bL5Cn6kkYy98fpc46"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-slate-700 rounded-full hover:bg-gray-100 transition-all hover:shadow-lg hover:scale-105 inline-block font-semibold"
            >
              Book a Call
            </a>
            <button
              onClick={onShowCodeModal}
              className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full hover:bg-white/10 transition-all hover:shadow-lg hover:scale-105 font-semibold"
            >
              Try Arcus
            </button>
          </div>
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
                <li><button className="text-gray-400 hover:text-white transition-colors text-left">Why Arcus</button></li>
                <li><button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={onShowComingSoon} className="text-gray-400 hover:text-white transition-colors text-left">Blog</button></li>
                <li><button onClick={onShowContact} className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
                <li><button onClick={onShowFAQ} className="text-gray-400 hover:text-white transition-colors text-left">FAQ</button></li>
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
