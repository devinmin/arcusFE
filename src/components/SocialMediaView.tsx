import { Instagram, Facebook, Twitter, Linkedin, Hash, Calendar, Heart, MessageCircle, Share2, TrendingUp } from 'lucide-react';

interface SocialMediaViewProps {
  content: string;
}

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
  timing?: string;
  engagement?: {
    likes: number;
    comments: number;
    shares: number;
  };
}

export function SocialMediaView({ content }: SocialMediaViewProps) {
  const generateDummyEngagement = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('instagram')) {
      return {
        likes: Math.floor(Math.random() * (5000 - 2000) + 2000),
        comments: Math.floor(Math.random() * (350 - 150) + 150),
        shares: Math.floor(Math.random() * (800 - 300) + 300)
      };
    } else if (lower.includes('linkedin')) {
      return {
        likes: Math.floor(Math.random() * (800 - 300) + 300),
        comments: Math.floor(Math.random() * (100 - 40) + 40),
        shares: Math.floor(Math.random() * (200 - 80) + 80)
      };
    } else if (lower.includes('x.com') || lower.includes('twitter')) {
      return {
        likes: Math.floor(Math.random() * (3000 - 1200) + 1200),
        comments: Math.floor(Math.random() * (200 - 80) + 80),
        shares: Math.floor(Math.random() * (600 - 250) + 250)
      };
    } else if (lower.includes('facebook')) {
      return {
        likes: Math.floor(Math.random() * (4000 - 1800) + 1800),
        comments: Math.floor(Math.random() * (300 - 120) + 120),
        shares: Math.floor(Math.random() * (700 - 280) + 280)
      };
    }
    return {
      likes: Math.floor(Math.random() * (2000 - 800) + 800),
      comments: Math.floor(Math.random() * (150 - 60) + 60),
      shares: Math.floor(Math.random() * (400 - 150) + 150)
    };
  };

  const parseSocialMedia = (md: string): SocialPost[] => {
    const posts: SocialPost[] = [];

    // Split by ### headers with numbers (e.g., "### 1. Instagram Post")
    const sections = md.split(/(?=^###\s+\d+\.\s+)/m);

    sections.forEach((section) => {
      const trimmedSection = section.trim();

      // Skip sections that don't start with ### or are empty
      if (!trimmedSection.startsWith('###')) return;

      const lines = trimmedSection.split('\n');
      if (lines.length === 0) return;

      // Extract platform from header (e.g., "### 1. Instagram Post")
      const headerLine = lines[0].trim();
      const headerMatch = headerLine.match(/###\s+\d+\.\s+(.+)/);
      if (!headerMatch) return;

      const headerText = headerMatch[1].trim();
      let platform = '';

      // Match common platform names and rebrand Twitter to X.com
      if (headerText.toLowerCase().includes('instagram')) platform = 'Instagram';
      else if (headerText.toLowerCase().includes('twitter') || headerText.toLowerCase().includes('tweet') || headerText.toLowerCase().includes('x.com')) platform = 'X.com';
      else if (headerText.toLowerCase().includes('facebook')) platform = 'Facebook';
      else if (headerText.toLowerCase().includes('linkedin')) platform = 'LinkedIn';
      else if (headerText.toLowerCase().includes('tiktok')) platform = 'TikTok';
      else {
        // Extract platform name from header text (e.g., "Instagram Post" -> "Instagram")
        const words = headerText.split(/\s+/);
        platform = words[0];
      }

      // Parse structured content fields
      let content = '';
      let hashtags: string[] = [];
      let timing = '';
      let captureContent = false;

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines before we start capturing content
        if (!line && !captureContent) continue;

        // Stop at next section marker
        if (line.startsWith('###')) break;

        // Extract Caption/Copy
        if (line.startsWith('**Caption:**') || line.startsWith('**Copy:**')) {
          captureContent = true;
          const contentAfterLabel = line.replace(/\*\*(Caption|Copy):\*\*/, '').trim();
          if (contentAfterLabel) {
            content += contentAfterLabel;
          }
        }
        // Extract Hashtags
        else if (line.startsWith('**Hashtags:**')) {
          captureContent = false;
          const hashtagText = line.replace('**Hashtags:**', '').trim();
          hashtags = hashtagText.split(/\s+/).filter(tag => tag.startsWith('#'));
        }
        // Extract Suggested Posting Time
        else if (line.startsWith('**Suggested Posting Time:**')) {
          timing = line.replace('**Suggested Posting Time:**', '').trim();
        }
        // Stop capturing content when we hit other structured fields
        else if (line.startsWith('**Image Description:**') ||
                 line.startsWith('**Expected Engagement Hooks:**') ||
                 line.startsWith('**Visual:**')) {
          captureContent = false;
        }
        // Capture content lines
        else if (captureContent && line) {
          content += (content ? '\n' : '') + line;
        }
      }

      if (platform && content) {
        const postData: SocialPost = {
          platform: platform.replace(/[:\-*]/g, '').trim(),
          content: content.trim(),
          hashtags,
          timing: timing || 'Optimal posting time',
          engagement: generateDummyEngagement(platform)
        };
        posts.push(postData);
      }
    });

    return posts;
  };

  const posts = parseSocialMedia(content);

  const getPlatformIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('instagram')) return Instagram;
    if (lower.includes('facebook')) return Facebook;
    if (lower.includes('x.com') || lower.includes('twitter')) return Twitter;
    if (lower.includes('linkedin')) return Linkedin;
    return MessageSquare;
  };

  const getPlatformColor = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('instagram')) return { bg: 'from-pink-500 to-purple-600', icon: 'text-pink-600', border: 'border-pink-200', cardBg: 'bg-pink-50' };
    if (lower.includes('facebook')) return { bg: 'from-blue-500 to-blue-700', icon: 'text-blue-600', border: 'border-blue-200', cardBg: 'bg-blue-50' };
    if (lower.includes('x.com') || lower.includes('twitter')) return { bg: 'from-gray-800 to-black', icon: 'text-gray-800', border: 'border-gray-300', cardBg: 'bg-gray-50' };
    if (lower.includes('linkedin')) return { bg: 'from-blue-600 to-blue-800', icon: 'text-blue-700', border: 'border-blue-300', cardBg: 'bg-blue-50' };
    return { bg: 'from-gray-500 to-gray-700', icon: 'text-gray-600', border: 'border-gray-200', cardBg: 'bg-gray-50' };
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Social Media Campaign</h3>
        <p className="text-base text-gray-700">
          {posts.length} ready-to-publish posts across multiple platforms
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post, idx) => {
          const Icon = getPlatformIcon(post.platform);
          const colors = getPlatformColor(post.platform);

          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className={`bg-gradient-to-r ${colors.bg} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{post.platform}</h4>
                      <p className="text-sm text-white/90">Post #{idx + 1}</p>
                    </div>
                  </div>
                  {post.timing && (
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{post.timing}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-base text-gray-900 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {post.engagement && (
                  <div className={`mb-4 pb-4 border-b ${colors.border}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-gray-500" />
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Expected Engagement</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className={`${colors.cardBg} rounded-lg p-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Heart className={`w-4 h-4 ${colors.icon}`} />
                          <span className="text-xs text-gray-600 font-medium">Likes</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{post.engagement.likes.toLocaleString()}</p>
                      </div>
                      <div className={`${colors.cardBg} rounded-lg p-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          <MessageCircle className={`w-4 h-4 ${colors.icon}`} />
                          <span className="text-xs text-gray-600 font-medium">Comments</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{post.engagement.comments.toLocaleString()}</p>
                      </div>
                      <div className={`${colors.cardBg} rounded-lg p-3`}>
                        <div className="flex items-center gap-2 mb-1">
                          <Share2 className={`w-4 h-4 ${colors.icon}`} />
                          <span className="text-xs text-gray-600 font-medium">Shares</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900">{post.engagement.shares.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}

                {post.hashtags.length > 0 && (
                  <div className="pt-4">
                    <div className="flex items-start gap-2">
                      <Hash className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-1`} />
                      <div className="flex flex-wrap gap-2">
                        {post.hashtags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className={`px-3 py-1 ${colors.cardBg} ${colors.icon} rounded-full text-sm font-medium`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MessageSquare(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
