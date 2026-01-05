import { FileText, Image, Mail, MessageSquare, Video, Megaphone, Download, RefreshCw, Brain, Presentation } from 'lucide-react';
import { useState } from 'react';
import { CampaignResult, downloadAllCampaign, downloadDeliverable } from '../lib/api';
import { VideoPlayer } from './VideoPlayer';
import { PowerPointDownload } from './PowerPointDownload';
import { BrandIntelligence } from './BrandIntelligence';

interface CampaignResultsProps {
  url: string;
  industry: string;
  data: CampaignResult | null;
  onRetry: () => void;
  onSignOut?: () => void;
}

export function CampaignResults({ url, industry, data, onRetry, onSignOut }: CampaignResultsProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const results = [
    {
      icon: Brain,
      title: 'Brand Intelligence',
      description: 'Extracted brand data, colors, fonts, and visual assets',
      preview: 'Complete brand analysis with color palette, typography, voice analysis...',
      color: 'slate',
      gradient: 'from-slate-500 to-slate-600',
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
      gradient: 'from-blue-500 to-blue-600',
      badge: 'PDF',
      content: data?.deliverables.strategicBrief || 'Content not available',
    },
    {
      icon: MessageSquare,
      title: 'Social Media Posts',
      description: '15 ready-to-publish posts across platforms',
      preview: 'Instagram, Facebook, Twitter, LinkedIn content with hashtags...',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600',
      badge: '15 Posts',
      content: data?.deliverables.socialMedia || 'Content not available',
    },
    {
      icon: Mail,
      title: 'Email Sequence',
      description: '5-part email campaign with subject lines',
      preview: 'Welcome email, value proposition, social proof, offer, follow-up...',
      color: 'green',
      gradient: 'from-green-500 to-green-600',
      badge: '5 Emails',
      content: data?.deliverables.emailSequence || 'Content not available',
    },
    {
      icon: FileText,
      title: 'Blog Article',
      description: 'SEO-optimized long-form content',
      preview: '2,000+ word article with meta description and keywords...',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600',
      badge: '2,000 words',
      content: data?.deliverables.blogArticle || 'Content not available',
    },
    {
      icon: Megaphone,
      title: 'Ad Copy',
      description: 'Multiple ad variations for different platforms',
      preview: 'Google Ads, Facebook Ads, LinkedIn Ads with CTAs...',
      color: 'red',
      gradient: 'from-red-500 to-red-600',
      badge: '12 Variations',
      content: data?.deliverables.adCopy || 'Content not available',
    },
    {
      icon: Video,
      title: 'Hero Video',
      description: '30-second promotional video',
      preview: 'Complete video with scenes, voiceover, and music...',
      color: 'indigo',
      gradient: 'from-indigo-500 to-indigo-600',
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
      gradient: 'from-pink-500 to-pink-600',
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
      color: 'cyan',
      gradient: 'from-cyan-500 to-cyan-600',
      badge: data?.deliverables.campaignDeck.slideCount
        ? `${data.deliverables.campaignDeck.slideCount} Slides`
        : 'N/A',
      isPowerPoint: data?.deliverables.campaignDeck.url ? true : false,
      downloadUrl: data?.deliverables.campaignDeck.url || null,
      slideCount: data?.deliverables.campaignDeck.slideCount || 0,
      content: 'PowerPoint presentation ready for download',
    },
  ];

  const selectedResult = results[selectedTab];

  const handleConfirmNewCampaign = () => {
    setShowConfirmModal(false);
    onRetry();
  };

  const handleDownloadAll = async () => {
    if (!data?.campaignId) return;
    try {
      await downloadAllCampaign(data.campaignId);
    } catch (error) {
      console.error('Failed to download all files:', error);
    }
  };

  const handleDownloadIndividual = async () => {
    if (!data?.campaignId) return;

    const fileTypeMap: Record<string, { type: string; filename: string }> = {
      'Brand Intelligence': { type: 'brand-intelligence', filename: 'brand_intelligence.md' },
      'Strategic Brief': { type: 'strategic-brief', filename: 'strategic_brief.md' },
      'Social Media Posts': { type: 'social-media', filename: 'social_media.md' },
      'Email Sequence': { type: 'email-sequence', filename: 'email_sequence.md' },
      'Blog Article': { type: 'blog-article', filename: 'blog_article.md' },
      'Ad Copy': { type: 'ad-copy', filename: 'ad_copy.md' },
      'Hero Video': { type: 'video-script', filename: 'video_script.md' },
      'Campaign Deck': { type: 'campaign-deck', filename: 'campaign_deck.md' },
    };

    const fileInfo = fileTypeMap[selectedResult.title];
    if (!fileInfo) {
      console.error('Unknown file type:', selectedResult.title);
      return;
    }

    try {
      await downloadDeliverable(data.campaignId, fileInfo.type, fileInfo.filename);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/arcusai.png" alt="Arcus AI" className="h-8" />
              <div className="h-6 w-px bg-gray-300"></div>
              <span className="text-sm font-medium text-gray-600">Arcus Campaign Generator</span>
            </div>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 text-sm">Deliverables</h3>
          <p className="text-xs text-gray-500 mt-1">{results.length} items</p>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {results.map((result, index) => {
            const TabIcon = result.icon;
            const isActive = selectedTab === index;

            return (
              <button
                key={index}
                onClick={() => setSelectedTab(index)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-all rounded-lg ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 ${isActive ? 'bg-blue-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>
                    {result.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={handleDownloadAll}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download All
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white border-b border-gray-200 p-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Campaign Dashboard</h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
              <span className="font-medium">{url}</span>
              <span>•</span>
              <span className="capitalize">{industry}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-8">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedResult.title}</h2>
                <p className="text-sm text-gray-600">{selectedResult.description}</p>
              </div>
              <button
                onClick={handleDownloadIndividual}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>

            <div>
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
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">{image.title}</h4>
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                            {image.format}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Dimensions</p>
                            <p className="font-medium text-gray-900">{image.dimensions}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 text-xs mb-1">Use Case</p>
                            <p className="font-medium text-gray-900">{image.useCase}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-gray-700 text-sm font-mono">
                    {selectedResult.content}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Start New Campaign?</h3>
              <p className="text-sm text-gray-600">
                Creating a new campaign will clear your current results. Make sure you've downloaded any content you want to keep.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-900">
                This action cannot be undone. All current deliverables will be lost.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmNewCampaign}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
              >
                Start New
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
