import { FileText, Image, Mail, MessageSquare, Video, Megaphone, Download, RefreshCw, CheckCircle2, Brain, Presentation } from 'lucide-react';
import { useState } from 'react';
import { CampaignResult } from '../lib/api';
import { VideoPlayer } from './VideoPlayer';
import { PowerPointDownload } from './PowerPointDownload';
import { BrandIntelligence } from './BrandIntelligence';

interface CampaignResultsProps {
  url: string;
  industry: string;
  data: CampaignResult | null;
  onRetry: () => void;
}

export function CampaignResults({ url, industry, data, onRetry }: CampaignResultsProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const results = [
    {
      icon: Brain,
      title: 'Brand Intelligence',
      description: 'Extracted brand data, colors, fonts, and visual assets',
      preview: 'Complete brand analysis with color palette, typography, voice analysis...',
      color: 'slate',
      badge: 'JSON',
      isBrandIntelligence: true,
      brandData: {
        json: data?.deliverables.brandContext.json || null,
        extractedImages: data?.deliverables.brandContext.extractedImages || [],
        guidelines: data?.deliverables.brandContext.colorsAndFonts || null,
      },
      content: data?.deliverables.brandContext.colorsAndFonts || 'Content not available',
    },
    {
      icon: FileText,
      title: 'Strategic Brief',
      description: 'Comprehensive marketing strategy and campaign overview',
      preview: 'Brand positioning, target audience analysis, key messaging pillars...',
      color: 'blue',
      badge: 'PDF',
      content: data?.deliverables.strategicBrief || 'Content not available',
    },
    {
      icon: MessageSquare,
      title: 'Social Media Posts',
      description: '15 ready-to-publish posts across platforms',
      preview: 'Instagram, Facebook, Twitter, LinkedIn content with hashtags...',
      color: 'purple',
      badge: '15 Posts',
      content: data?.deliverables.socialMedia || 'Content not available',
    },
    {
      icon: Mail,
      title: 'Email Sequence',
      description: '5-part email campaign with subject lines',
      preview: 'Welcome email, value proposition, social proof, offer, follow-up...',
      color: 'green',
      badge: '5 Emails',
      content: data?.deliverables.emailSequence || 'Content not available',
    },
    {
      icon: FileText,
      title: 'Blog Article',
      description: 'SEO-optimized long-form content',
      preview: '2,000+ word article with meta description and keywords...',
      color: 'orange',
      badge: '2,000 words',
      content: data?.deliverables.blogArticle || 'Content not available',
    },
    {
      icon: Megaphone,
      title: 'Ad Copy',
      description: 'Multiple ad variations for different platforms',
      preview: 'Google Ads, Facebook Ads, LinkedIn Ads with CTAs...',
      color: 'red',
      badge: '12 Variations',
      content: data?.deliverables.adCopy || 'Content not available',
    },
    {
      icon: Video,
      title: 'Hero Video',
      description: '30-second promotional video',
      preview: 'Complete video with scenes, voiceover, and music...',
      color: 'indigo',
      badge: data?.deliverables.video.duration ? `${data.deliverables.video.duration}s` : 'Script',
      isVideo: data?.deliverables.video.url ? true : false,
      videoUrl: data?.deliverables.video.url || null,
      thumbnail: data?.deliverables.video.thumbnail || null,
      content: data?.deliverables.videoScript || 'Content not available',
    },
    {
      icon: Image,
      title: 'Generated Images',
      description: 'AI-generated visuals for your campaign',
      preview: 'Hero images, social media graphics, ad creatives...',
      color: 'pink',
      badge: `${Object.values(data?.deliverables.images || {}).filter(Boolean).length} Images`,
      isImageGallery: true,
      images: [
        {
          title: 'Hero Image',
          dimensions: '1920x1080px',
          format: 'PNG',
          style: 'Website/landing page use',
          useCase: 'Homepage, hero sections',
          url: data?.deliverables.images.hero,
        },
        {
          title: 'Social Media Post',
          dimensions: '1080x1080px',
          format: 'PNG',
          style: 'Instagram/Facebook post',
          useCase: 'Feed posts, carousels',
          url: data?.deliverables.images.socialPost,
        },
        {
          title: 'Social Media Story',
          dimensions: '1080x1920px',
          format: 'PNG',
          style: 'Instagram/Facebook story',
          useCase: 'Stories, Reels',
          url: data?.deliverables.images.socialStory,
        },
        {
          title: 'Email Banner',
          dimensions: '600x200px',
          format: 'PNG',
          style: 'Email header',
          useCase: 'Email campaigns',
          url: data?.deliverables.images.emailBanner,
        },
        {
          title: 'Ad Creative',
          dimensions: '1200x628px',
          format: 'PNG',
          style: 'Facebook/LinkedIn ad',
          useCase: 'Paid social advertising',
          url: data?.deliverables.images.adCreative,
        },
        {
          title: 'Blog Featured Image',
          dimensions: '1200x630px',
          format: 'PNG',
          style: 'Blog post header',
          useCase: 'Blog articles, SEO',
          url: data?.deliverables.images.blogFeatured,
        },
      ].filter(img => img.url),
      content: '',
    },
    {
      icon: Presentation,
      title: 'Campaign Deck',
      description: 'Professional PowerPoint presentation',
      preview: 'Complete client-ready deck with all deliverables...',
      color: 'indigo',
      badge: data?.deliverables.campaignDeck.slideCount
        ? `${data.deliverables.campaignDeck.slideCount} Slides`
        : 'N/A',
      isPowerPoint: data?.deliverables.campaignDeck.url ? true : false,
      downloadUrl: data?.deliverables.campaignDeck.url || null,
      slideCount: data?.deliverables.campaignDeck.slideCount || 0,
      content: 'PowerPoint presentation ready for download',
    },
  ];

  const colorClasses = {
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    blue: 'bg-blue-100 text-blue-700 border-blue-200',
    purple: 'bg-purple-100 text-purple-700 border-purple-200',
    green: 'bg-green-100 text-green-700 border-green-200',
    orange: 'bg-orange-100 text-orange-700 border-orange-200',
    red: 'bg-red-100 text-red-700 border-red-200',
    indigo: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    pink: 'bg-pink-100 text-pink-700 border-pink-200',
  };

  const iconColorClasses = {
    slate: 'bg-slate-600',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
  };

  const selectedResult = results[selectedTab];
  const Icon = selectedResult.icon;
  const colorClass = colorClasses[selectedResult.color as keyof typeof colorClasses];
  const iconColorClass = iconColorClasses[selectedResult.color as keyof typeof iconColorClasses];

  const handleConfirmNewCampaign = () => {
    setShowConfirmModal(false);
    onRetry();
  };

  const handleDownloadIndividual = () => {
    console.log('Download individual:', selectedResult.title);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Campaign Ready!</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
              <span className="px-3 py-1 bg-gray-100 rounded-full font-medium">{url}</span>
              <span>•</span>
              <span className="capitalize">{industry}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-lg">
            <Download className="w-5 h-5" />
            Download All
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            Create New Campaign
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="flex">
          <div className="w-80 flex-shrink-0 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900">Deliverables</h3>
            </div>
            <div className="py-2">
              {results.map((result, index) => {
                const TabIcon = result.icon;
                const isActive = selectedTab === index;
                const tabColorClass = iconColorClasses[result.color as keyof typeof iconColorClasses];

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedTab(index)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                      isActive
                        ? 'bg-blue-50 border-l-4 border-blue-600'
                        : 'hover:bg-gray-50 border-l-4 border-transparent'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 ${tabColorClass} rounded-lg flex items-center justify-center`}>
                      <TabIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>
                        {result.title}
                      </p>
                      <p className="text-xs text-gray-500">{result.badge}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 ${iconColorClass} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{selectedResult.title}</h3>
                  <p className="text-sm text-gray-600">{selectedResult.description}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
                  {selectedResult.badge}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleDownloadIndividual}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download {selectedResult.title}
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[600px] overflow-y-auto flex-1">
              {selectedResult.isBrandIntelligence && selectedResult.brandData?.json ? (
                <BrandIntelligence
                  jsonData={selectedResult.brandData.json}
                  extractedImages={selectedResult.brandData.extractedImages}
                  guidelines={selectedResult.brandData.guidelines}
                />
              ) : selectedResult.isVideo && selectedResult.videoUrl ? (
                <VideoPlayer
                  videoUrl={selectedResult.videoUrl}
                  thumbnail={selectedResult.thumbnail}
                  title={selectedResult.title}
                />
              ) : selectedResult.isPowerPoint && selectedResult.downloadUrl ? (
                <PowerPointDownload
                  downloadUrl={selectedResult.downloadUrl}
                  slideCount={selectedResult.slideCount}
                  title={selectedResult.title}
                />
              ) : selectedResult.isImageGallery ? (
                <div className="grid grid-cols-1 gap-6">
                  {selectedResult.images?.map((image, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                      <div className="aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{image.title}</h4>
                          <span className="px-2 py-1 text-xs font-medium bg-gray-200 text-gray-700 rounded">
                            {image.format}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs">Dimensions</p>
                            <p className="font-medium text-gray-900">{image.dimensions}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs">Use Case</p>
                            <p className="font-medium text-gray-900">{image.useCase}</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-500 text-xs">Style</p>
                          <p className="text-sm text-gray-700">{image.style}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed">
                    {selectedResult.content}
                  </pre>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedTab + 1} of {results.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTab(Math.max(0, selectedTab - 1))}
                  disabled={selectedTab === 0}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedTab(Math.min(results.length - 1, selectedTab + 1))}
                  disabled={selectedTab === results.length - 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Start New Campaign?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Creating a new campaign will clear your current results. Make sure you've downloaded any content you want to keep before proceeding.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-orange-800 font-medium">
                  This action cannot be undone. All current deliverables and brand intelligence will be lost.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmNewCampaign}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all hover:shadow-lg"
                >
                  Yes, Start New Campaign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
