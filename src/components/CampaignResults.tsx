import { FileText, Image, Mail, MessageSquare, Video, Megaphone, Download, RefreshCw, CheckCircle2, Brain, Presentation, TrendingUp, Package, Eye, ArrowRight } from 'lucide-react';
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
}

export function CampaignResults({ url, industry, data, onRetry }: CampaignResultsProps) {
  const [selectedDeliverable, setSelectedDeliverable] = useState<number | null>(null);
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

  const handleDownloadIndividual = async (result: typeof results[0]) => {
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

    const fileInfo = fileTypeMap[result.title];
    if (!fileInfo) {
      console.error('Unknown file type:', result.title);
      return;
    }

    try {
      await downloadDeliverable(data.campaignId, fileInfo.type, fileInfo.filename);
    } catch (error) {
      console.error('Failed to download file:', error);
    }
  };

  const totalDeliverables = results.length;
  const imageCount = Object.values(data?.deliverables.images || {}).filter(Boolean).length;

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Campaign Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 ml-[60px]">
              <span className="px-3 py-1.5 bg-gray-100 rounded-full font-medium">{url}</span>
              <span>•</span>
              <span className="capitalize font-medium">{industry}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all hover:shadow-xl hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download All
            </button>
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl font-medium hover:border-gray-300 hover:bg-gray-50 transition-all hover:shadow-lg"
            >
              <RefreshCw className="w-5 h-5" />
              New Campaign
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Package className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{totalDeliverables}</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm font-medium">Total Deliverables</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Image className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{imageCount}</p>
              </div>
            </div>
            <p className="text-purple-100 text-sm font-medium">Generated Images</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">100%</p>
              </div>
            </div>
            <p className="text-green-100 text-sm font-medium">Campaign Ready</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">Ready</p>
              </div>
            </div>
            <p className="text-orange-100 text-sm font-medium">Status</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Deliverables</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((result, index) => {
            const Icon = result.icon;
            return (
              <div
                key={index}
                onClick={() => setSelectedDeliverable(index)}
                className="group bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-500 p-6 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${result.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">
                    {result.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {result.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {result.description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownloadIndividual(result);
                    }}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDeliverable !== null && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${results[selectedDeliverable].gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const Icon = results[selectedDeliverable].icon;
                      return <Icon className="w-6 h-6 text-white" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{results[selectedDeliverable].title}</h3>
                    <p className="text-gray-300 text-sm">{results[selectedDeliverable].description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDeliverable(null)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center text-white transition-all"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleDownloadIndividual(results[selectedDeliverable])}
                  className="flex items-center gap-2 px-6 py-2.5 bg-white text-gray-900 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <span className="px-4 py-2.5 bg-white/10 text-white rounded-xl text-sm font-medium">
                  {results[selectedDeliverable].badge}
                </span>
              </div>
            </div>

            <div className="p-8 overflow-y-auto flex-1 bg-gray-50">
              {results[selectedDeliverable].isBrandIntelligence && results[selectedDeliverable].brandData?.json ? (
                <BrandIntelligence
                  jsonData={results[selectedDeliverable].brandData!.json}
                  extractedImages={results[selectedDeliverable].brandData!.extractedImages}
                  guidelines={results[selectedDeliverable].brandData!.guidelines}
                />
              ) : results[selectedDeliverable].isVideo && results[selectedDeliverable].videoUrl ? (
                <VideoPlayer
                  videoUrl={results[selectedDeliverable].videoUrl!}
                  thumbnail={results[selectedDeliverable].thumbnail}
                  title={results[selectedDeliverable].title}
                />
              ) : results[selectedDeliverable].isPowerPoint && results[selectedDeliverable].downloadUrl ? (
                <PowerPointDownload
                  downloadUrl={results[selectedDeliverable].downloadUrl!}
                  slideCount={results[selectedDeliverable].slideCount!}
                  title={results[selectedDeliverable].title}
                />
              ) : results[selectedDeliverable].isImageGallery ? (
                <div className="grid grid-cols-1 gap-6">
                  {results[selectedDeliverable].images?.map((image, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg">
                      <div className="aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <h4 className="text-xl font-bold text-gray-900">{image.title}</h4>
                          <span className="px-3 py-1 text-xs font-bold bg-gray-200 text-gray-700 rounded-lg">
                            {image.format}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-gray-500 text-xs font-semibold mb-1">Dimensions</p>
                            <p className="font-bold text-gray-900">{image.dimensions}</p>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-gray-500 text-xs font-semibold mb-1">Use Case</p>
                            <p className="font-bold text-gray-900">{image.useCase}</p>
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <p className="text-blue-600 text-xs font-semibold mb-1">Style</p>
                          <p className="text-sm text-blue-900 font-medium">{image.style}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-8 border-2 border-gray-200">
                  <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed text-sm">
                    {results[selectedDeliverable].content}
                  </pre>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-white flex justify-between items-center">
              <div className="text-sm text-gray-600 font-medium">
                {selectedDeliverable + 1} of {results.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDeliverable(Math.max(0, selectedDeliverable - 1))}
                  disabled={selectedDeliverable === 0}
                  className="px-6 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <button
                  onClick={() => setSelectedDeliverable(Math.min(results.length - 1, selectedDeliverable + 1))}
                  disabled={selectedDeliverable === results.length - 1}
                  className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <RefreshCw className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Start New Campaign?</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Creating a new campaign will clear your current results. Make sure you've downloaded any content you want to keep.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 mb-6">
                <p className="text-sm text-orange-900 font-semibold">
                  This action cannot be undone. All current deliverables will be lost.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmNewCampaign}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all hover:shadow-lg"
                >
                  Start New
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
