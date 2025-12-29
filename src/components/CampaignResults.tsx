import { FileText, Image, Mail, MessageSquare, Video, Megaphone, Download, RefreshCw, ChevronRight, CheckCircle2 } from 'lucide-react';

interface CampaignResultsProps {
  url: string;
  industry: string;
  onRetry: () => void;
}

export function CampaignResults({ url, industry, onRetry }: CampaignResultsProps) {
  const results = [
    {
      icon: FileText,
      title: 'Strategic Brief',
      description: 'Comprehensive marketing strategy and campaign overview',
      preview: 'Brand positioning, target audience analysis, key messaging pillars...',
      color: 'blue',
      badge: 'PDF',
    },
    {
      icon: MessageSquare,
      title: 'Social Media Posts',
      description: '15 ready-to-publish posts across platforms',
      preview: 'Instagram, Facebook, Twitter, LinkedIn content with hashtags...',
      color: 'purple',
      badge: '15 Posts',
    },
    {
      icon: Mail,
      title: 'Email Sequence',
      description: '5-part email campaign with subject lines',
      preview: 'Welcome email, value proposition, social proof, offer, follow-up...',
      color: 'green',
      badge: '5 Emails',
    },
    {
      icon: FileText,
      title: 'Blog Article',
      description: 'SEO-optimized long-form content',
      preview: '2,000+ word article with meta description and keywords...',
      color: 'orange',
      badge: '2,000 words',
    },
    {
      icon: Megaphone,
      title: 'Ad Copy',
      description: 'Multiple ad variations for different platforms',
      preview: 'Google Ads, Facebook Ads, LinkedIn Ads with CTAs...',
      color: 'red',
      badge: '12 Variations',
    },
    {
      icon: Video,
      title: 'Video Scripts',
      description: 'Scripts for promotional videos',
      preview: '30-second pitch, 60-second explainer, testimonial prompts...',
      color: 'indigo',
      badge: '3 Scripts',
    },
    {
      icon: Image,
      title: 'Generated Images',
      description: 'AI-generated visuals for your campaign',
      preview: 'Hero images, social media graphics, ad creatives...',
      color: 'pink',
      badge: '8 Images',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
  };

  const iconColorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Campaign Ready!</h1>
            <p className="text-gray-600 mt-1">
              Your complete marketing campaign has been generated
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
          <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">{url}</span>
          <span>•</span>
          <span className="capitalize">{industry}</span>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-xl">
            <Download className="w-5 h-5" />
            Download All Files
          </button>
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Create New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {results.map((result, index) => {
          const Icon = result.icon;
          const colorClass = colorClasses[result.color as keyof typeof colorClasses];
          const iconColorClass = iconColorClasses[result.color as keyof typeof iconColorClasses];

          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 ${iconColorClass} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{result.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                      {result.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{result.description}</p>
                  <p className="text-sm text-gray-500 italic line-clamp-1">{result.preview}</p>
                </div>

                <ChevronRight className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Next Steps</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>• Review all generated content and customize as needed</li>
              <li>• Download your campaign files and share with your team</li>
              <li>• Schedule posts and launch your campaigns</li>
              <li>• Monitor performance and iterate based on results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
