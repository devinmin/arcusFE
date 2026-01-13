import { Megaphone, Target, MousePointer, TrendingUp } from 'lucide-react';

interface AdCopyViewProps {
  content: string;
}

interface Ad {
  platform: string;
  headline: string;
  body: string;
  cta: string;
  format?: string;
  targeting?: string;
}

export function AdCopyView({ content }: AdCopyViewProps) {
  const parseAds = (md: string): Ad[] => {
    const ads: Ad[] = [];
    const sections = md.split(/(?=##\s+\d+\.|##\s+Ad\s+\d+|##\s+[A-Za-z]+\s+Ad)/);

    sections.forEach(section => {
      const lines = section.split('\n').filter(line => line.trim());
      if (lines.length === 0) return;

      let platform = '';
      let headline = '';
      let body = '';
      let cta = '';
      let format = '';
      let targeting = '';

      lines.forEach(line => {
        if (line.startsWith('## ') && !headline) {
          const match = line.match(/##\s+(.+?)(?:\s+Ad)?(?:\s+\d+)?$/i);
          if (match) platform = match[1].trim();
        } else if (line.includes('Platform:')) {
          platform = line.split('Platform:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('Headline:')) {
          headline = line.split('Headline:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('Body:')) {
          body = line.split('Body:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('CTA:')) {
          cta = line.split('CTA:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('Format:')) {
          format = line.split('Format:')[1].trim().replace(/[*_]/g, '');
        } else if (line.includes('Targeting:')) {
          targeting = line.split('Targeting:')[1].trim().replace(/[*_]/g, '');
        } else if (!line.startsWith('#') && !line.includes(':') && line.trim() && !headline) {
          headline = line.trim().replace(/[*_]/g, '');
        } else if (!line.startsWith('#') && !line.includes(':') && line.trim() && headline && !body) {
          body += line.trim() + ' ';
        }
      });

      if (platform && (headline || body)) {
        ads.push({
          platform,
          headline: headline || body.substring(0, 50) + '...',
          body: body.trim(),
          cta: cta || 'Learn More',
          format,
          targeting
        });
      }
    });

    return ads;
  };

  const ads = parseAds(content);

  const getPlatformColor = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('google')) return {
      bg: 'from-red-500 to-yellow-500',
      light: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-600',
      badge: 'bg-red-100 text-red-700'
    };
    if (lower.includes('facebook') || lower.includes('meta')) return {
      bg: 'from-blue-500 to-blue-700',
      light: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-600',
      badge: 'bg-blue-100 text-blue-700'
    };
    if (lower.includes('linkedin')) return {
      bg: 'from-blue-600 to-blue-800',
      light: 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-700',
      badge: 'bg-blue-100 text-blue-800'
    };
    if (lower.includes('twitter') || lower.includes('x')) return {
      bg: 'from-sky-400 to-sky-600',
      light: 'bg-sky-50',
      border: 'border-sky-200',
      text: 'text-sky-600',
      badge: 'bg-sky-100 text-sky-700'
    };
    if (lower.includes('instagram')) return {
      bg: 'from-pink-500 to-purple-600',
      light: 'bg-pink-50',
      border: 'border-pink-200',
      text: 'text-pink-600',
      badge: 'bg-pink-100 text-pink-700'
    };
    return {
      bg: 'from-gray-500 to-gray-700',
      light: 'bg-gray-50',
      border: 'border-gray-200',
      text: 'text-gray-600',
      badge: 'bg-gray-100 text-gray-700'
    };
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 via-orange-50 to-yellow-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <Megaphone className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-bold text-gray-900">Ad Campaign Creative</h3>
        </div>
        <p className="text-base text-gray-700">
          {ads.length} ad variations optimized for different platforms and audiences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ads.map((ad, idx) => {
          const colors = getPlatformColor(ad.platform);

          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className={`bg-gradient-to-r ${colors.bg} px-6 py-4`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white rounded-lg">
                      <Megaphone className={`w-5 h-5 ${colors.text}`} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{ad.platform}</h4>
                      {ad.format && (
                        <p className="text-sm text-white/90">{ad.format}</p>
                      )}
                    </div>
                  </div>
                  <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-semibold`}>
                    Ad #{idx + 1}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Headline</span>
                  </div>
                  <h5 className="text-xl font-bold text-gray-900 leading-tight">
                    {ad.headline}
                  </h5>
                </div>

                {ad.body && (
                  <div className={`${colors.light} ${colors.border} border rounded-lg p-4`}>
                    <p className="text-base text-gray-900 leading-relaxed">
                      {ad.body}
                    </p>
                  </div>
                )}

                {ad.targeting && (
                  <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <Target className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Target Audience</p>
                      <p className="text-sm text-gray-700">{ad.targeting}</p>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <button className={`w-full bg-gradient-to-r ${colors.bg} text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow`}>
                    <MousePointer className="w-5 h-5" />
                    <span>{ad.cta}</span>
                  </button>
                </div>
              </div>

              <div className={`${colors.light} px-6 py-3 border-t ${colors.border} flex items-center justify-between`}>
                <span className="text-sm text-gray-600">Ready to launch</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${colors.text}`} />
                  <span className={`text-sm font-medium ${colors.text}`}>Optimized</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
