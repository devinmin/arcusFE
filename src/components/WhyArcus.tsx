import { Sparkles, Target, Users, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface WhyArcusProps {
  onClose: () => void;
  onShowComingSoon: () => void;
  onShowContact: () => void;
  onShowProduct: (product: string) => void;
  onShowCodeModal: () => void;
  onShowFAQ: () => void;
}

export default function WhyArcus({ onClose, onShowComingSoon, onShowContact, onShowProduct, onShowCodeModal, onShowFAQ }: WhyArcusProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        onLogoClick={onClose}
        onShowProduct={onShowProduct}
        onHowItWorksClick={onClose}
        onShowWhyArcus={() => {}}
        onShowAbout={onClose}
        onShowCodeModal={onShowCodeModal}
      />

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

      <Footer
        onLogoClick={onClose}
        onShowProduct={onShowProduct}
        onShowWhyArcus={() => {}}
        onShowAbout={onClose}
        onShowComingSoon={onShowComingSoon}
        onShowContact={onShowContact}
        onShowFAQ={onShowFAQ}
      />
    </div>
  );
}
