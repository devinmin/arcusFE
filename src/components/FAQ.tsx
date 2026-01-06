import { ChevronDown, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FAQProps {
  onClose: () => void;
  onShowComingSoon: () => void;
  onShowContact: () => void;
  onShowProduct: (product: string) => void;
  onShowCodeModal: () => void;
  onShowWhyArcus: () => void;
}

export default function FAQ({ onClose, onShowComingSoon, onShowContact, onShowProduct, onShowCodeModal, onShowWhyArcus }: FAQProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "What is Arcus?",
      answer: "Arcus is an autonomous AI marketing team that handles strategy, content creation, campaign management, and optimization across all marketing channels. Think of it as having a team of marketing experts that work together 24/7, powered by advanced AI."
    },
    {
      question: "How is Arcus different from other AI marketing tools?",
      answer: "Unlike single-purpose AI tools, Arcus is a complete multi-agent system where specialized AI agents collaborate like a real team. It understands your brand deeply, maintains consistency across all channels, and adapts in real-time based on performance. You get one unified platform instead of juggling 10 different tools."
    },
    {
      question: "Do I need technical skills to use Arcus?",
      answer: "No. Arcus is designed for marketers, not engineers. You interact with it naturally—describe what you want, and the AI team handles the execution. No coding or technical setup required."
    },
    {
      question: "How long does it take to get started?",
      answer: "Most teams are up and running within 24-48 hours. We help you onboard, train the AI on your brand, and launch your first campaigns quickly."
    },
    {
      question: "What channels does Arcus support?",
      answer: "Arcus works across all major marketing channels including social media, email campaigns, SEO/GEO, paid advertising, content marketing, and even development. It's a truly omnichannel solution."
    },
    {
      question: "How does pricing work?",
      answer: "We offer flexible pricing based on your needs and scale. Book a call with our team to discuss your specific requirements and get a custom quote. We'll make sure you get the best value for your investment."
    },
    {
      question: "Can Arcus integrate with my existing tools?",
      answer: "Yes. Arcus integrates with popular platforms like Google Analytics, CRM systems, social media platforms, and more. We'll work with you to ensure smooth integration with your current tech stack."
    },
    {
      question: "How much control do I have over what Arcus creates?",
      answer: "You have complete control. You can review and approve content before it goes live, provide feedback for the AI to learn from, and adjust strategies at any time. Arcus amplifies your team—it doesn't replace your judgment."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use enterprise-grade security, encryption, and comply with all major data protection regulations including GDPR and CCPA. Your data is yours and we never share it with third parties."
    },
    {
      question: "What kind of results can I expect?",
      answer: "Results vary by industry and goals, but our clients typically see 3-5x improvement in content output, 40-60% reduction in campaign setup time, and significant improvements in ROI through continuous optimization. We'll work with you to set clear KPIs and track progress."
    },
    {
      question: "Do you offer training and support?",
      answer: "Yes. Every client gets dedicated onboarding, training for your team, and ongoing support. We're here to ensure you get the most value from Arcus."
    },
    {
      question: "Can I try Arcus before committing?",
      answer: "Yes! Click 'Try Arcus' to get started with a demo campaign, or book a call to discuss a pilot program tailored to your needs."
    }
  ];

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
              <button onClick={onShowWhyArcus} className="text-gray-600 hover:text-gray-900 transition-colors">Why Arcus</button>
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
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about Arcus. Can't find what you're looking for? Contact us.
          </p>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                      openFAQ === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <Mail className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're here to help. Reach out to our team and we'll get back to you shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onShowContact}
              className="inline-block px-8 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
            >
              Contact Us
            </button>
            <a
              href="https://calendar.app.google/bL5Cn6kkYy98fpc46"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-white text-slate-700 border-2 border-slate-700 rounded-full font-medium transition-all hover:shadow-lg hover:scale-105"
            >
              Book a Call
            </a>
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
                <li><button onClick={onShowWhyArcus} className="text-gray-400 hover:text-white transition-colors text-left">Why Arcus</button></li>
                <li><button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={onShowComingSoon} className="text-gray-400 hover:text-white transition-colors text-left">Blog</button></li>
                <li><button onClick={onShowContact} className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors text-left">FAQ</button></li>
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
