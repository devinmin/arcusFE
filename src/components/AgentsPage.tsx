import { Bot, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface AgentsPageProps {
  section?: string | null;
  onNavigateHome: () => void;
  onShowComingSoon: () => void;
  onShowAbout: () => void;
  onShowContact: () => void;
  onNavigateToProduct: (category: string) => void;
  onShowTryArcus: () => void;
  onShowWhyArcus?: () => void;
  onShowFAQ?: () => void;
}

const agentsData = [
  {
    id: 'marketing',
    title: 'Marketing Agents',
    description: 'Strategic marketing powered by AI. Handle everything from campaign strategy to execution, delivering results faster than traditional agencies.',
    agents: ['Strategy Agent', 'Content Marketing Agent', 'Social Media Agent', 'Email Marketing Agent']
  },
  {
    id: 'creative',
    title: 'Creative Agents',
    description: 'Stunning creative work at scale. Combine artistic vision with data-driven insights to produce compelling visuals and copy that converts.',
    agents: ['Creative Director Agent', 'Copywriting Agent', 'Design Agent', 'Video Production Agent']
  },
  {
    id: 'media',
    title: 'Media Agents',
    description: 'Intelligent media buying and optimization. Maximize your ad spend with real-time optimization and cross-platform campaign management.',
    agents: ['Media Planning Agent', 'Programmatic Agent', 'Performance Marketing Agent', 'Analytics Agent']
  },
  {
    id: 'development',
    title: 'Development Agents',
    description: 'Build and deploy at unprecedented speed. Handle full-stack development, from landing pages to complex web applications.',
    agents: ['Frontend Agent', 'Backend Agent', 'Landing Page Agent', 'DevOps Agent']
  },
  {
    id: 'spatial',
    title: 'Spatial Computing Agents',
    description: 'The future of immersive experiences. Create AR/VR experiences and spatial computing applications for next-generation platforms.',
    agents: ['3D Environment Agent', 'AR Experience Agent', 'VR Agent', 'Spatial UX Agent']
  },
  {
    id: 'uiux',
    title: 'UI/UX Agents',
    description: 'Design that delights and converts. Create beautiful, intuitive interfaces backed by research and testing.',
    agents: ['UX Research Agent', 'UI Design Agent', 'Interaction Design Agent', 'CRO Agent']
  }
];

export default function AgentsPage({
  section,
  onNavigateHome,
  onShowComingSoon,
  onShowAbout,
  onShowContact,
  onNavigateToProduct,
  onShowTryArcus,
  onShowWhyArcus,
  onShowFAQ
}: AgentsPageProps) {

  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [section]);

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        onLogoClick={onNavigateHome}
        onShowProduct={onNavigateToProduct}
        onHowItWorksClick={onNavigateHome}
        onShowWhyArcus={onShowWhyArcus}
        onShowAbout={onShowAbout}
        onShowCodeModal={onShowTryArcus}
      />

      <section className="pt-32 pb-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-full mb-6">
            <Bot className="w-4 h-4" />
            <span className="text-sm font-medium">60+ Specialized AI Agents</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Meet Your AI Marketing Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every agent is specialized, trained by industry veterans, and ready to transform your marketing operations.
          </p>
        </div>
      </section>

      {agentsData.map((category, index) => (
        <section
          key={category.id}
          id={category.id}
          className={`py-20 px-6 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {category.title}
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {category.agents.map((agent, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {agent}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-24 px-6 bg-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Work with These Agents?
          </h2>
          <p className="text-xl text-slate-100 mb-10">
            See how Arcus can transform your marketing operations
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
              onClick={onShowTryArcus}
              className="px-8 py-4 bg-transparent text-white rounded-full font-medium border-2 border-white/30 hover:bg-white/10 transition-all"
            >
              Try Arcus
            </button>
          </div>
        </div>
      </section>

      <Footer
        onLogoClick={onNavigateHome}
        onShowProduct={onNavigateToProduct}
        onShowWhyArcus={onShowWhyArcus}
        onShowAbout={onShowAbout}
        onShowComingSoon={onShowComingSoon}
        onShowContact={onShowContact}
        onShowFAQ={onShowFAQ}
      />
    </div>
  );
}
