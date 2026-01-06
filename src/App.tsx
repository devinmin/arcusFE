import { ArrowRight, Sparkles, Target, TrendingUp, Users, Zap, CheckCircle2, BarChart3, X, Globe, Briefcase, Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, Campaign } from './lib/supabase';
import { generateCampaign, CampaignResult } from './lib/api';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { CampaignResults } from './components/CampaignResults';
import ComingSoon from './components/ComingSoon';
import About from './components/About';
import ContactUs from './components/ContactUs';
import ProductPage from './components/ProductPage';

type CampaignStatus = 'idle' | 'analyzing' | 'complete';
type ProductCategory = 'marketing' | 'creative' | 'media' | 'development' | 'spatial' | 'uiux' | null;

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentCampaign, setCurrentCampaign] = useState<Campaign | null>(null);
  const [campaignUrl, setCampaignUrl] = useState('');
  const [campaignIndustry, setCampaignIndustry] = useState('');
  const [campaignBrief, setCampaignBrief] = useState('Create a comprehensive marketing campaign');
  const [campaignError, setCampaignError] = useState('');
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>('idle');
  const [campaignData, setCampaignData] = useState<CampaignResult | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductCategory>(null);
  const [showProductDropdown, setShowProductDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!showAbout && !showComingSoon && !showContact) {
      window.scrollTo(0, 0);
    }
  }, [showAbout, showComingSoon, showContact]);

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setCodeError('');

    try {
      // Check for hardcoded access code
      if (codeInput === 'STRINGtheory') {
        // Create a mock campaign object for the MVP
        const mockCampaign: Campaign = {
          id: 'mock-campaign-id',
          name: 'Arcus Campaign Generator',
          access_code: 'STRINGtheory',
          description: 'AI-powered marketing campaign generator',
          active_campaigns_count: 0,
          content_generated_count: 0,
          roi_percentage: 0,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setCurrentCampaign(mockCampaign);
        setShowCodeModal(false);
        setCodeInput('');
      } else {
        setCodeError('Invalid code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setCodeError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCampaignError('');

    if (!campaignUrl || !campaignIndustry || !campaignBrief) {
      setCampaignError('Please fill in all fields');
      return;
    }

    try {
      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(campaignUrl)) {
        setCampaignError('Please enter a valid URL');
        return;
      }

      setCampaignStatus('analyzing');

      // Call the real backend API
      const result = await generateCampaign(
        campaignUrl,
        campaignIndustry,
        campaignBrief
      );

      if (result.success) {
        setCampaignData(result);
        setCampaignStatus('complete');
      } else {
        throw new Error(result.error || 'Campaign generation failed');
      }
    } catch (error: any) {
      console.error('Error starting campaign:', error);
      setCampaignError(error.message || 'An error occurred. Please try again.');
      setCampaignStatus('idle');
    }
  };

  const handleRetryCampaign = () => {
    setCampaignStatus('idle');
    setCampaignUrl('');
    setCampaignIndustry('');
    setCampaignBrief('Create a comprehensive marketing campaign');
    setCampaignError('');
    setCampaignData(null);
  };

  if (showComingSoon) {
    return <ComingSoon onBack={() => setShowComingSoon(false)} />;
  }

  if (showAbout) {
    return <About
      onClose={() => setShowAbout(false)}
      onShowComingSoon={() => {
        setShowAbout(false);
        setShowComingSoon(true);
      }}
      onShowContact={() => {
        setShowAbout(false);
        setShowContact(true);
      }}
      onShowProduct={(product) => {
        setShowAbout(false);
        setCurrentProduct(product);
      }}
      onShowCodeModal={() => {
        setShowAbout(false);
        setShowCodeModal(true);
      }}
    />;
  }

  if (showContact) {
    return <ContactUs
      onClose={() => setShowContact(false)}
      onShowComingSoon={() => {
        setShowContact(false);
        setShowComingSoon(true);
      }}
      onShowAbout={() => {
        setShowContact(false);
        setShowAbout(true);
      }}
      onShowProduct={(product) => {
        setShowContact(false);
        setCurrentProduct(product);
      }}
      onShowCodeModal={() => {
        setShowContact(false);
        setShowCodeModal(true);
      }}
    />;
  }

  if (currentProduct) {
    return <ProductPage
      category={currentProduct}
      onNavigateHome={() => {
        setCurrentProduct(null);
        window.scrollTo(0, 0);
      }}
      onShowComingSoon={() => {
        setCurrentProduct(null);
        setShowComingSoon(true);
      }}
      onShowAbout={() => {
        setCurrentProduct(null);
        setShowAbout(true);
      }}
      onShowContact={() => {
        setCurrentProduct(null);
        setShowContact(true);
      }}
      onNavigateToProduct={(category) => {
        setCurrentProduct(category as ProductCategory);
        window.scrollTo(0, 0);
      }}
      onShowTryArcus={() => {
        setCurrentProduct(null);
        setShowCodeModal(true);
      }}
    />;
  }

  if (currentCampaign) {
    const isEmpty = currentCampaign.active_campaigns_count === 0 &&
                    currentCampaign.content_generated_count === 0 &&
                    currentCampaign.roi_percentage === 0;

    return (
      <div className="min-h-screen bg-slate-50">
        {campaignStatus !== 'complete' && (
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src="/arcusai.png" alt="Arcus AI" className="h-8" />
                  <div className="h-6 w-px bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-600">{currentCampaign.name}</span>
                </div>
                <button
                  onClick={() => setCurrentCampaign(null)}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
        )}

        {campaignStatus === 'analyzing' ? (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <AnalyzingScreen url={campaignUrl} industry={campaignIndustry} />
          </div>
        ) : campaignStatus === 'complete' ? (
          <CampaignResults
            url={campaignUrl}
            industry={campaignIndustry}
            data={campaignData}
            onRetry={handleRetryCampaign}
            onSignOut={() => setCurrentCampaign(null)}
          />
        ) : (
          <div className="max-w-7xl mx-auto px-6 py-12">
            {isEmpty ? (
            <div className="flex flex-col items-center justify-center min-h-[70vh]">
              <div className="w-full max-w-2xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3">Start Your Marketing Campaign</h1>
                  <p className="text-lg text-gray-600">
                    Tell us about your business and let AI create a comprehensive marketing strategy
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <form onSubmit={handleCampaignSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="url" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        Website URL
                      </label>
                      <input
                        type="text"
                        id="url"
                        value={campaignUrl}
                        onChange={(e) => {
                          setCampaignUrl(e.target.value);
                          setCampaignError('');
                        }}
                        placeholder="https://example.com"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900"
                      />
                      <p className="text-xs text-gray-500 mt-2">Enter your business website URL</p>
                    </div>

                    <div>
                      <label htmlFor="industry" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        Industry
                      </label>
                      <select
                        id="industry"
                        value={campaignIndustry}
                        onChange={(e) => {
                          setCampaignIndustry(e.target.value);
                          setCampaignError('');
                        }}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900 bg-white"
                      >
                        <option value="">Select your industry</option>
                        <option value="technology">Technology & Software</option>
                        <option value="ecommerce">E-commerce & Retail</option>
                        <option value="healthcare">Healthcare & Medical</option>
                        <option value="finance">Finance & Banking</option>
                        <option value="education">Education & E-learning</option>
                        <option value="realestate">Real Estate</option>
                        <option value="food">Food & Beverage</option>
                        <option value="travel">Travel & Hospitality</option>
                        <option value="fashion">Fashion & Beauty</option>
                        <option value="entertainment">Entertainment & Media</option>
                        <option value="automotive">Automotive</option>
                        <option value="saas">SaaS & B2B Services</option>
                        <option value="other">Other</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2">Select the industry that best describes your business</p>
                    </div>

                    <div>
                      <label htmlFor="brief" className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        Campaign Brief
                      </label>
                      <textarea
                        id="brief"
                        value={campaignBrief}
                        onChange={(e) => {
                          setCampaignBrief(e.target.value);
                          setCampaignError('');
                        }}
                        placeholder="Create a comprehensive marketing campaign"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900 resize-none"
                      />
                      <p className="text-xs text-gray-500 mt-2">Describe what type of campaign you need (e.g., "Need campaign for summer event sales" or "Need campaign for Superbowl Sunday")</p>
                    </div>

                    {campaignError && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-700">{campaignError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-xl flex items-center justify-center space-x-2 group"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Launch Marketing Campaign</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-500 text-center">
                      Our AI will analyze your website, understand your business, and create a complete marketing strategy tailored to your industry
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{currentCampaign.name}</h1>
                <p className="text-lg text-gray-600">{currentCampaign.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Active Campaigns</h3>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{currentCampaign.active_campaigns_count}</div>
                  <p className="text-sm text-gray-600">Running across all channels</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Content Generated</h3>
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{currentCampaign.content_generated_count}</div>
                  <p className="text-sm text-gray-600">Posts, emails, and ads</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">ROI Increase</h3>
                    <BarChart3 className="w-5 h-5 text-slate-700" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">+{currentCampaign.roi_percentage}%</div>
                  <p className="text-sm text-gray-600">Compared to last quarter</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {[
                    { action: 'New blog post published', channel: 'Blog', time: '5 minutes ago', status: 'success' },
                    { action: 'Email campaign sent', channel: 'Email', time: '1 hour ago', status: 'success' },
                    { action: 'Social media posts scheduled', channel: 'Social', time: '2 hours ago', status: 'success' },
                    { action: 'Ad campaign optimized', channel: 'Paid Ads', time: '3 hours ago', status: 'success' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.channel}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">AI Agents Status</h2>
                  <div className="space-y-3">
                    {[
                      { name: 'Content Creator', status: 'Active' },
                      { name: 'Strategy Planner', status: 'Active' },
                      { name: 'Campaign Manager', status: 'Active' },
                      { name: 'Analytics Agent', status: 'Active' },
                    ].map((agent, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{agent.name}</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                          {agent.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      Create new campaign
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      Generate content
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      View analytics
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                      Manage agents
                    </button>
                  </div>
                </div>
              </div>
            </>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Code Entry Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={() => {
                setShowCodeModal(false);
                setCodeError('');
                setCodeInput('');
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">Enter Access Code</h2>
            <p className="text-gray-600 mb-6">Internal users only</p>

            <form onSubmit={handleCodeSubmit}>
              <input
                type="text"
                value={codeInput}
                onChange={(e) => {
                  setCodeInput(e.target.value);
                  setCodeError('');
                }}
                placeholder="Enter code"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-slate-700 focus:outline-none transition-colors mb-4"
                autoFocus
              />

              {codeError && (
                <p className="text-red-600 text-sm mb-4">{codeError}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Verifying...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center cursor-pointer">
              <img src="/arcusai.png" alt="Arcus AI" className="h-8" />
            </button>
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
                    <button onClick={() => { setCurrentProduct('marketing'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Marketing
                    </button>
                    <button onClick={() => { setCurrentProduct('creative'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Creative
                    </button>
                    <button onClick={() => { setCurrentProduct('media'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Media
                    </button>
                    <button onClick={() => { setCurrentProduct('development'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Development
                    </button>
                    <button onClick={() => { setCurrentProduct('spatial'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      Spatial Computing
                    </button>
                    <button onClick={() => { setCurrentProduct('uiux'); setShowProductDropdown(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-colors">
                      UI/UX
                    </button>
                    </div>
                  </div>
                )}
              </div>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How it Works</a>
              <button onClick={() => setShowAbout(true)} className="text-gray-600 hover:text-gray-900 transition-colors">About</button>
              <button
                onClick={() => setShowCodeModal(true)}
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-slate-50">

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Your AI Marketing Team is Here</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Cut non-working marketing cost by
              <span className="block text-slate-700">
                85%
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Launch campaigns in <s>weeks</s> hours. Augment your team with a senior marketer & AI that provides strategy, brand intuition, and creative                 direction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="https://calendar.app.google/bL5Cn6kkYy98fpc46"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-slate-700 text-white rounded-full font-medium hover:bg-slate-800 transition-all hover:shadow-xl hover:scale-105 flex items-center space-x-2"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                onClick={() => setShowCodeModal(true)}
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium border-2 border-gray-200 hover:border-slate-600 transition-all hover:shadow-lg"
              >
                Try Arcus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Comparison Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Arcus? No burn on overhead
            </h2>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-8 items-center max-w-6xl mx-auto">
            {/* Traditional Agency Card */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-md">
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Traditional Agency</p>
                <p className="text-5xl font-bold text-gray-700 mb-1">$940,000</p>
                <p className="text-sm text-gray-500 font-medium">in fees</p>
                <p className="text-xs text-gray-400 mt-2">For $2MM Campaign Budget<br/>6 month campaign</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Account Management</span>
                  <span className="font-semibold text-gray-700">$40,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Project Management</span>
                  <span className="font-semibold text-gray-700">$60,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Media Servicing (12%)</span>
                  <span className="font-semibold text-gray-700">$240,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                  <span className="text-gray-600">Creative (340 assets)</span>
                  <span className="font-semibold text-gray-700">$480,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-gray-600">Junior employees learning</span>
                  <span className="font-semibold text-gray-500">Bullsh*t</span>
                </div>
              </div>
            </div>

            {/* VS Badge */}
            <div className="hidden md:flex items-center justify-center">
              <div className="bg-slate-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                VS
              </div>
            </div>

            {/* Mobile VS Badge */}
            <div className="md:hidden flex items-center justify-center -my-4">
              <div className="bg-slate-700 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                VS
              </div>
            </div>

            {/* Arcus Card */}
            <div className="bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-slate-600 rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="text-center mb-6">
                <p className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-2">arcus</p>
                <p className="text-5xl font-bold text-white mb-1">$138,000</p>
                <p className="text-sm text-slate-300 font-medium">in fees</p>
                <p className="text-xs text-slate-400 mt-2">For $2MM Campaign Budget<br/>6 month campaign</p>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-600">
                  <span className="text-slate-200">Account Management</span>
                  <span className="font-semibold text-emerald-400">$0</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-600">
                  <span className="text-slate-200">Project Management</span>
                  <span className="font-semibold text-emerald-400">$0</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-600">
                  <span className="text-slate-200">Media Servicing (6%)</span>
                  <span className="font-semibold text-white">$120,000</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-600">
                  <span className="text-slate-200">Creative (340 assets)</span>
                  <span className="font-semibold text-white">$18,000</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-slate-200">Work only with Senior Talent</span>
                  <span className="font-semibold text-emerald-400">Priceless ($0)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Save over <span className="font-bold text-slate-700">$800,000</span> in overhead costs while getting senior-level expertise and faster execution.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to transform your marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-300" style={{ top: '3rem' }} />

            {[
              {
                step: '01',
                title: 'Connect Your Brand',
                description: 'Tell us about your business, goals, and target audience in a 30 minute conversation'
              },
              {
                step: '02',
                title: 'We Build Your Strategy',
                description: 'Arcus conducts market analysis and builds a marketing plan (with your feedback) in less than 48 hours.'
              },
              {
                step: '03',
                title: 'Get Results',
                description: 'AI executes on every facet of the campaign from content generation, social media management, CRM, media buying, reporting, and more.'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-slate-700 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Showcase Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-20">
            <div className="order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/7598024/pexels-photo-7598024.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Marketing Strategy"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-4xl font-bold text-gray-900 mb-6">We downloaded Top Marketers’ Brains into the AI</h3>
              <p className="text-lg text-gray-600 mb-4">
                Our AI agents are trained by marketers who have delivered campaigns that doubled and tripled revenues for brands across multiple industries.
              </p>
              <p className="text-lg text-gray-600">
                We value experiments that proves results.
              </p>
            </div>
          </div>

      
        </div>
      </section>

      {/* Marketing Channels Showcase */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Every Channel. One Platform.</h2>
            <p className="text-xl text-gray-600">Dominate across all marketing channels with AI that never sleeps</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="relative group overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Social Media"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Social Media</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Email Marketing"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Email Campaigns</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Content Marketing"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Blog Content</h4>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-2xl aspect-square">
              <img
                src="https://images.pexels.com/photos/572056/pexels-photo-572056.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Digital Ads"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/60 flex items-end p-6">
                <h4 className="text-white font-bold text-xl">Paid Ads</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Comprehensive marketing,
              <span className="block text-slate-700">all in one spot</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete marketing effort powered by AI agents, each specialized and trained in their domain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Strategic Planning',
                description: 'AI agents analyze your market, competitors, and audience to create winning strategies',
                color: 'slate'
              },
              {
                icon: TrendingUp,
                title: 'Content Creation',
                description: 'Generate engaging content across all channels - from social posts to blog articles',
                color: 'blue'
              },
              {
                icon: BarChart3,
                title: 'Campaign Management',
                description: 'Launch, optimize, and scale campaigns automatically across multiple platforms',
                color: 'indigo'
              },
              {
                icon: Users,
                title: 'Audience Insights',
                description: 'Deep analysis of your audience behavior to inform every marketing decision',
                color: 'slate'
              },
              {
                icon: Zap,
                title: 'Real-time Optimization',
                description: 'Continuously improve performance based on data and market conditions',
                color: 'blue'
              },
              {
                icon: Sparkles,
                title: 'Brand Consistency',
                description: 'Maintain your unique voice and style across all marketing touchpoints',
                color: 'indigo'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-white rounded-2xl border border-gray-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Authority Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Built by people who've owned the outcome
            </h2>
          </div>

          <div className="mb-12">
            <p className="text-center text-lg text-gray-700 mb-8">Arcus is created by:</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Agency Founders */}
              <div className="bg-slate-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <p className="text-center text-gray-900 font-medium leading-relaxed">
                  Former agency leaders who ran client P&Ls
                </p>
              </div>

              {/* AI Builders */}
              <div className="bg-slate-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <p className="text-center text-gray-900 font-medium leading-relaxed">
                  AI builders who shipped production agent systems
                </p>
              </div>

              {/* Product Operators */}
              <div className="bg-slate-50 rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <p className="text-center text-gray-900 font-medium leading-relaxed">
                  Product operators across multiple industries
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900 mb-2">Not theory. Not decks.</p>
            <p className="text-xl font-semibold text-gray-900 mb-6">Just tools that work.</p>
            <button
              onClick={() => setShowAbout(true)}
              className="text-slate-700 hover:text-slate-900 font-medium inline-flex items-center gap-2 transition-colors"
            >
              Learn more <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-slate-700 relative overflow-hidden">

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Transform Your Marketing?
          </h2>
          <p className="text-xl text-slate-100 mb-10">
            Join the future of effortless marketing with Arcus AI
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="https://calendar.app.google/bL5Cn6kkYy98fpc46"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white text-slate-700 rounded-full font-medium hover:shadow-2xl transition-all hover:scale-105 flex items-center space-x-2"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setShowCodeModal(true)}
              className="px-8 py-4 bg-transparent text-white rounded-full font-medium border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              Try Arcus
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 mb-8">
            <div>
              <div className="mb-4">
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
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
                <li><button onClick={() => setCurrentProduct('marketing')} className="text-gray-400 hover:text-white transition-colors text-left">Marketing</button></li>
                <li><button onClick={() => setCurrentProduct('creative')} className="text-gray-400 hover:text-white transition-colors text-left">Creative</button></li>
                <li><button onClick={() => setCurrentProduct('media')} className="text-gray-400 hover:text-white transition-colors text-left">Media</button></li>
                <li><button onClick={() => setCurrentProduct('development')} className="text-gray-400 hover:text-white transition-colors text-left">Development</button></li>
                <li><button onClick={() => setCurrentProduct('spatial')} className="text-gray-400 hover:text-white transition-colors text-left">Spatial Computing</button></li>
                <li><button onClick={() => setCurrentProduct('uiux')} className="text-gray-400 hover:text-white transition-colors text-left">UI/UX</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setShowAbout(true)} className="text-gray-400 hover:text-white transition-colors text-left">About</button></li>
                <li><button onClick={() => setShowComingSoon(true)} className="text-gray-400 hover:text-white transition-colors text-left">Blog</button></li>
                <li><button onClick={() => setShowContact(true)} className="text-gray-400 hover:text-white transition-colors text-left">Contact</button></li>
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

export default App;
