import { useState, useEffect } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface ContactUsProps {
  onClose: () => void;
  onShowComingSoon: () => void;
  onShowAbout: () => void;
  onShowProduct: (product: string) => void;
  onShowCodeModal: () => void;
}

export default function ContactUs({ onClose, onShowComingSoon, onShowAbout, onShowProduct, onShowCodeModal }: ContactUsProps) {
  const [scrolled, setScrolled] = useState(false);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/contact-inquiry`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setIsSubmitted(true);
      setFullName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit inquiry');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <button onClick={onShowAbout} className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
              <button
                onClick={onShowCodeModal}
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

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">

          {isSubmitted ? (
            <div className="max-w-2xl mx-auto bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-green-100 rounded-full">
                  <CheckCircle className="w-16 h-16 text-green-600" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Thank You!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your message has been received. We'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Get in Touch
                </h1>
                <p className="text-xl text-gray-600">
                  Have a question or want to learn more? We'd love to hear from you.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={6}
                        placeholder="Tell us what you'd like to discuss..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-slate-700 text-white rounded-full hover:bg-slate-800 transition-all hover:shadow-lg hover:scale-105 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>

                <div className="bg-gray-50 px-8 md:px-12 py-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center">
                    You can also reach us directly at{' '}
                    <a href="mailto:contact@usearcus.ai" className="text-slate-700 hover:text-slate-900 font-semibold">
                      contact@usearcus.ai
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

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
                <li><button onClick={onShowAbout} className="text-gray-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={onShowComingSoon} className="text-gray-400 hover:text-white transition-colors text-left">Blog</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
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
