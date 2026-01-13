import { Instagram, Facebook, Twitter, Linkedin, Hash, Calendar } from 'lucide-react';

interface SocialMediaViewProps {
  content: string;
}

interface SocialPost {
  platform: string;
  content: string;
  hashtags: string[];
  timing?: string;
}

export function SocialMediaView({ content }: SocialMediaViewProps) {
  const parseSocialMedia = (md: string): SocialPost[] => {
    const posts: SocialPost[] = [];
    const sections = md.split(/(?=##\s+Post\s+\d+|##\s+\d+\.)/);

    sections.forEach(section => {
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length === 0) return;

      let platform = '';
      let content = '';
      let hashtags: string[] = [];
      let timing = '';

      lines.forEach(line => {
        if (line.includes('Platform:')) {
          platform = line.split('Platform:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('Timing:')) {
          timing = line.split('Timing:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('Hashtags:')) {
          const hashtagText = line.split('Hashtags:')[1].trim();
          hashtags = hashtagText.match(/#\w+/g) || [];
        } else if (!line.startsWith('#') && !line.includes('Platform:') && !line.includes('Timing:') && !line.includes('Hashtags:') && line.trim()) {
          if (!line.startsWith('**')) {
            content += line.trim() + ' ';
          }
        }
      });

      if (platform && content) {
        posts.push({
          platform: platform.replace(/[:\-*]/g, '').trim(),
          content: content.trim(),
          hashtags,
          timing
        });
      }
    });

    return posts;
  };

  const posts = parseSocialMedia(content);

  const getPlatformIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('instagram')) return Instagram;
    if (lower.includes('facebook')) return Facebook;
    if (lower.includes('twitter') || lower.includes('x.com')) return Twitter;
    if (lower.includes('linkedin')) return Linkedin;
    return MessageSquare;
  };

  const getPlatformColor = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('instagram')) return { bg: 'from-pink-500 to-purple-600', icon: 'text-pink-600', border: 'border-pink-200', cardBg: 'bg-pink-50' };
    if (lower.includes('facebook')) return { bg: 'from-blue-500 to-blue-700', icon: 'text-blue-600', border: 'border-blue-200', cardBg: 'bg-blue-50' };
    if (lower.includes('twitter') || lower.includes('x.com')) return { bg: 'from-sky-400 to-sky-600', icon: 'text-sky-600', border: 'border-sky-200', cardBg: 'bg-sky-50' };
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

                {post.hashtags.length > 0 && (
                  <div className={`pt-4 border-t ${colors.border}`}>
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
