import { Palette, Type, MessageCircle, Target } from 'lucide-react';

interface BrandIntelligenceProps {
  jsonData: string;
  extractedImages: string[];
  guidelines: string | null;
}

export function BrandIntelligence({ jsonData, extractedImages, guidelines }: BrandIntelligenceProps) {
  let brandData;
  try {
    brandData = JSON.parse(jsonData);
  } catch (e) {
    return <div className="text-white">Invalid brand data</div>;
  }

  return (
    <div className="space-y-8">
      {brandData.colors && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Palette className="w-5 h-5" />
            Color Palette
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {brandData.colors.primary && (
              <div className="p-4 rounded-lg border border-white/10">
                <div
                  className="w-full h-20 rounded mb-2"
                  style={{ backgroundColor: brandData.colors.primary }}
                />
                <div className="text-sm text-cyan-200">Primary</div>
                <div className="font-mono text-white text-sm">{brandData.colors.primary}</div>
              </div>
            )}
            {brandData.colors.secondary && (
              <div className="p-4 rounded-lg border border-white/10">
                <div
                  className="w-full h-20 rounded mb-2"
                  style={{ backgroundColor: brandData.colors.secondary }}
                />
                <div className="text-sm text-cyan-200">Secondary</div>
                <div className="font-mono text-white text-sm">{brandData.colors.secondary}</div>
              </div>
            )}
            {brandData.colors.accent && (
              <div className="p-4 rounded-lg border border-white/10">
                <div
                  className="w-full h-20 rounded mb-2"
                  style={{ backgroundColor: brandData.colors.accent }}
                />
                <div className="text-sm text-cyan-200">Accent</div>
                <div className="font-mono text-white text-sm">{brandData.colors.accent}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {brandData.typography && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Type className="w-5 h-5" />
            Typography
          </h3>
          <div className="space-y-3">
            {brandData.typography.primaryFont && (
              <div className="p-4 rounded-lg border border-white/10">
                <div className="text-sm text-cyan-200 mb-1">Primary Font</div>
                <div className="text-white font-medium">{brandData.typography.primaryFont}</div>
              </div>
            )}
            {brandData.typography.headingFont && (
              <div className="p-4 rounded-lg border border-white/10">
                <div className="text-sm text-cyan-200 mb-1">Heading Font</div>
                <div className="text-white font-medium">{brandData.typography.headingFont}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {brandData.voiceTone && Array.isArray(brandData.voiceTone) && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <MessageCircle className="w-5 h-5" />
            Brand Voice
          </h3>
          <div className="flex flex-wrap gap-2">
            {brandData.voiceTone.map((tone: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-cyan-500/20 text-cyan-200 rounded-full text-sm"
              >
                {tone}
              </span>
            ))}
          </div>
        </div>
      )}

      {brandData.targetAudience && (
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
            <Target className="w-5 h-5" />
            Target Audience
          </h3>
          <p className="text-cyan-200">{brandData.targetAudience}</p>
        </div>
      )}

      {extractedImages.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Extracted Website Images
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {extractedImages.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Extracted ${idx + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {guidelines && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Brand Guidelines
          </h3>
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap text-cyan-200 text-sm bg-black/20 p-4 rounded-lg overflow-x-auto">{guidelines}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
