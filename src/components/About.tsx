import { ArrowLeft, Linkedin } from 'lucide-react';

interface AboutProps {
  onClose: () => void;
}

export default function About({ onClose }: AboutProps) {
  return (
    <div className="min-h-screen bg-white">
      <button
        onClick={onClose}
        className="fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-900 rounded-lg transition-colors shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Building the future of
            <br />
            autonomous marketing
          </h1>
          <p className="text-xl text-gray-600">San Francisco · California</p>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
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
            <p>
              Today, we're helping marketing teams move faster, think bigger, and achieve more than they thought
              possible. Not through more tools, but through better intelligence.
            </p>
          </div>
        </div>
      </div>

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Jordan Chen</h3>
                  <p className="text-gray-600">Co-Founder / CEO</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700">
                Former Head of AI at a Fortune 500 marketing agency, Jordan brings a decade of experience
                in martech innovation. Holds a PhD in Machine Learning from Stanford.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Alex Rivera</h3>
                  <p className="text-gray-600">Co-Founder / CTO</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700">
                Previously led engineering at two successful AI startups. Alex's expertise in multi-agent
                systems and natural language processing powers Arcus AI's autonomous capabilities.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Maya Patel</h3>
                  <p className="text-gray-600">Head of Product</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700">
                Maya spent 8 years building marketing automation platforms at scale. She ensures
                Arcus AI remains intuitive while pushing the boundaries of what's possible.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Sam Okafor</h3>
                  <p className="text-gray-600">Lead AI Engineer</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-700">
                Sam's work in autonomous systems and multi-modal AI drives the intelligence
                behind our agent ecosystem. Previously researched AI at MIT CSAIL.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Trusted By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
            <div className="text-center text-2xl font-bold text-gray-600">ACME Corp</div>
            <div className="text-center text-2xl font-bold text-gray-600">TechFlow</div>
            <div className="text-center text-2xl font-bold text-gray-600">GrowthLabs</div>
            <div className="text-center text-2xl font-bold text-gray-600">Innovate</div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Join us in building the future</h2>
          <p className="text-xl text-gray-600 mb-8">
            We're always looking for talented people who want to make an impact.
          </p>
          <button className="px-8 py-3 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
}
