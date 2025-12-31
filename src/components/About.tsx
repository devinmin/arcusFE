import { Linkedin, Sparkles, Target, Users, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AboutProps {
  onClose: () => void;
  onShowComingSoon: () => void;
  onShowContact: () => void;
}

export default function About({ onClose, onShowComingSoon, onShowContact }: AboutProps) {
  const [scrolled, setScrolled] = useState(false);

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
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">Services</button>
              <button onClick={onClose} className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</button>
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
            Building the future of
            <br />
            autonomous marketing
          </h1>
          <p className="text-xl text-gray-600">DC · Los Angeles · Seattle</p>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  Arcus AI was founded on a simple belief: marketing teams deserve tools that work as hard as they do.
                  In an era where AI promises transformation but often delivers complexity, we saw an opportunity to
                  build something different.
                </p>
                <p>
                  Our platform combines autonomous AI agents with human creativity, creating a system where strategic
                  thinking meets execution at scale. From campaign ideation to content creation, from performance
                  analysis to optimization, Arcus AI handles the heavy lifting while keeping humans in control.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mission-Driven</h3>
              <p className="text-gray-600">
                Empowering marketing teams to achieve more through intelligent automation and strategic AI.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Human-Centered</h3>
              <p className="text-gray-600">
                AI that augments human creativity, not replaces it. We believe in the power of collaboration.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation First</h3>
              <p className="text-gray-600">
                Pushing the boundaries of what's possible with autonomous agents and multi-modal AI.
              </p>
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
                <img src="/arcusai.png" alt="Arcus AI" className="h-8 brightness-0 invert" />
              </div>
              <p className="text-gray-400">
                Your autonomous marketing team, powered by AI
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-left">Services</button></li>
                <li><button onClick={onShowComingSoon} className="text-gray-400 hover:text-white transition-colors text-left">Use Cases</button></li>
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
