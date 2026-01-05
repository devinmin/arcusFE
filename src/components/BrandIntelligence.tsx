import { Palette, Type, MessageCircle, Target, Eye, Lightbulb, Users, TrendingUp, Award, CheckCircle, XCircle, Sparkles, BookOpen } from 'lucide-react';

interface BrandIntelligenceProps {
  jsonData: string;
  extractedImages: string[];
  guidelines: string | null;
}

interface ColorInfo {
  name: string;
  hex: string;
  type: 'primary' | 'secondary';
}

interface Section {
  title: string;
  content: string[];
  subsections?: { [key: string]: string[] };
}

export function BrandIntelligence({ jsonData, extractedImages, guidelines }: BrandIntelligenceProps) {
  let brandData;
  try {
    brandData = JSON.parse(jsonData);
  } catch (e) {
    return <div className="text-white">Invalid brand data</div>;
  }

  const parseMarkdownGuidelines = (md: string | null): { [key: string]: Section } => {
    if (!md) return {};

    const sections: { [key: string]: Section } = {};
    const lines = md.split('\n');
    let currentSection = '';
    let currentSubsection = '';

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        currentSection = line.replace('## ', '').replace(/^\d+\.\s*/, '').trim();
        sections[currentSection] = { title: currentSection, content: [], subsections: {} };
        currentSubsection = '';
      } else if (line.startsWith('### ') && currentSection) {
        currentSubsection = line.replace('### ', '').trim();
        if (!sections[currentSection].subsections) {
          sections[currentSection].subsections = {};
        }
        sections[currentSection].subsections![currentSubsection] = [];
      } else if (line.startsWith('- ') && currentSection) {
        const content = line.replace('- ', '').trim();
        if (currentSubsection && sections[currentSection].subsections) {
          sections[currentSection].subsections![currentSubsection].push(content);
        } else {
          sections[currentSection].content.push(content);
        }
      } else if (line.trim() && !line.startsWith('#') && currentSection && !currentSubsection) {
        sections[currentSection].content.push(line.trim());
      }
    });

    return sections;
  };

  const extractColors = (md: string | null): ColorInfo[] => {
    if (!md) return [];
    const colors: ColorInfo[] = [];
    const colorRegex = /(Primary|Secondary|Navy Blue|White|Light Gray|Orange Accent|Dark Gray|Medium Gray):\s*(#[A-Fa-f0-9]{6}|#[A-Fa-f0-9]{3})/g;
    let match;

    while ((match = colorRegex.exec(md)) !== null) {
      const name = match[1];
      const hex = match[2];
      const type = name.toLowerCase().includes('primary') || name.toLowerCase().includes('navy') ? 'primary' : 'secondary';
      colors.push({ name, hex, type });
    }

    return colors;
  };

  const extractTypography = (md: string | null): { [key: string]: string } => {
    if (!md) return {};
    const typography: { [key: string]: string } = {};
    const lines = md.split('\n');
    let inTypographySection = false;

    lines.forEach(line => {
      if (line.includes('### Typography')) {
        inTypographySection = true;
      } else if (line.startsWith('###') && inTypographySection) {
        inTypographySection = false;
      } else if (inTypographySection && line.startsWith('- ')) {
        const parts = line.replace('- ', '').split(':');
        if (parts.length >= 2) {
          typography[parts[0].trim()] = parts[1].trim();
        }
      }
    });

    return typography;
  };

  const sections = parseMarkdownGuidelines(guidelines);
  const extractedColors = extractColors(guidelines);
  const typography = extractTypography(guidelines);

  const SectionCard = ({ icon: Icon, title, children, gradient = "from-cyan-500/10 to-blue-500/10" }: {
    icon: any;
    title: string;
    children: React.ReactNode;
    gradient?: string;
  }) => (
    <div className={`bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-xl`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-white/10 rounded-lg">
          <Icon className="w-6 h-6 text-cyan-300" />
        </div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      {extractedColors.length > 0 && (
        <SectionCard icon={Palette} title="Brand Color Palette" gradient="from-purple-500/10 to-pink-500/10">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-cyan-300 mb-3">Primary Colors</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {extractedColors.filter(c => c.type === 'primary').map((color, idx) => (
                  <div key={idx} className="group">
                    <div
                      className="w-full h-24 rounded-xl shadow-lg transition-transform group-hover:scale-105 border-2 border-white/20"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="mt-2 text-center">
                      <div className="text-sm font-medium text-white">{color.name}</div>
                      <div className="text-xs font-mono text-cyan-200">{color.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {extractedColors.filter(c => c.type === 'secondary').length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">Secondary Colors</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {extractedColors.filter(c => c.type === 'secondary').map((color, idx) => (
                    <div key={idx} className="group">
                      <div
                        className="w-full h-20 rounded-xl shadow-lg transition-transform group-hover:scale-105 border-2 border-white/20"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="mt-2 text-center">
                        <div className="text-xs font-medium text-white">{color.name}</div>
                        <div className="text-xs font-mono text-cyan-200">{color.hex}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {Object.keys(typography).length > 0 && (
        <SectionCard icon={Type} title="Typography System" gradient="from-blue-500/10 to-cyan-500/10">
          <div className="space-y-3">
            {Object.entries(typography).map(([key, value], idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-cyan-300">{key}</div>
                  <div className="text-white mt-1">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {sections['VOICE & MESSAGING ANALYSIS'] && (
        <SectionCard icon={MessageCircle} title="Voice & Messaging" gradient="from-green-500/10 to-emerald-500/10">
          <div className="space-y-4">
            {sections['VOICE & MESSAGING ANALYSIS'].subsections?.['Tone of Voice'] && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">Tone of Voice</h4>
                <div className="flex flex-wrap gap-2">
                  {sections['VOICE & MESSAGING ANALYSIS'].subsections['Tone of Voice'].map((tone, idx) => (
                    <span key={idx} className="px-4 py-2 bg-emerald-500/20 text-emerald-200 rounded-full text-sm font-medium border border-emerald-400/30">
                      {tone}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sections['VOICE & MESSAGING ANALYSIS'].subsections?.['Key Phrases & Language Patterns'] && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">Key Phrases</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sections['VOICE & MESSAGING ANALYSIS'].subsections['Key Phrases & Language Patterns']
                    .filter(phrase => phrase.startsWith('"'))
                    .map((phrase, idx) => (
                      <div key={idx} className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="text-white text-sm">{phrase}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {sections['VOICE & MESSAGING ANALYSIS'].subsections?.['Emotional Triggers'] && (
              <div>
                <h4 className="text-sm font-semibold text-cyan-300 mb-3">Emotional Triggers</h4>
                <div className="flex flex-wrap gap-2">
                  {sections['VOICE & MESSAGING ANALYSIS'].subsections['Emotional Triggers'].map((trigger, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-green-500/20 text-green-200 rounded-lg text-sm border border-green-400/20">
                      {trigger}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {sections['TARGET AUDIENCE ANALYSIS'] && (
        <SectionCard icon={Users} title="Target Audience" gradient="from-orange-500/10 to-red-500/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections['TARGET AUDIENCE ANALYSIS'].subsections?.['Primary Persona Demographics'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-orange-300 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Demographics
                </h4>
                <ul className="space-y-2">
                  {sections['TARGET AUDIENCE ANALYSIS'].subsections['Primary Persona Demographics'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections['TARGET AUDIENCE ANALYSIS'].subsections?.['Psychographics'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-orange-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Psychographics
                </h4>
                <ul className="space-y-2">
                  {sections['TARGET AUDIENCE ANALYSIS'].subsections['Psychographics'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections['TARGET AUDIENCE ANALYSIS'].subsections?.['Motivations'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 md:col-span-2">
                <h4 className="text-sm font-semibold text-orange-300 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Motivations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sections['TARGET AUDIENCE ANALYSIS'].subsections['Motivations'].map((motivation, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-orange-500/20 text-orange-200 rounded-full text-sm border border-orange-400/30">
                      {motivation}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {sections['VISUAL ASSET ANALYSIS'] && (
        <SectionCard icon={Eye} title="Visual Identity" gradient="from-indigo-500/10 to-purple-500/10">
          <div className="space-y-4">
            {sections['VISUAL ASSET ANALYSIS'].subsections?.['Image Style Guidelines'] && (
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-3">Image Style Guidelines</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {sections['VISUAL ASSET ANALYSIS'].subsections['Image Style Guidelines'].map((guideline, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-cyan-200 p-2 rounded-lg hover:bg-white/5">
                      <CheckCircle className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span>{guideline}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sections['VISUAL ASSET ANALYSIS'].subsections?.['Visual Patterns'] && (
              <div>
                <h4 className="text-sm font-semibold text-purple-300 mb-3">Visual Patterns</h4>
                <div className="flex flex-wrap gap-2">
                  {sections['VISUAL ASSET ANALYSIS'].subsections['Visual Patterns'].map((pattern, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-purple-500/20 text-purple-200 rounded-lg text-sm border border-purple-400/30">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {sections['BRAND ESSENCE SUMMARY'] && (
        <SectionCard icon={Award} title="Brand Essence" gradient="from-yellow-500/10 to-orange-500/10">
          <div className="space-y-4">
            {sections['BRAND ESSENCE SUMMARY'].subsections?.['Brand Archetype'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-yellow-300 mb-2">Brand Archetype</h4>
                <div className="space-y-1">
                  {sections['BRAND ESSENCE SUMMARY'].subsections['Brand Archetype'].map((item, idx) => (
                    <div key={idx} className="text-sm text-cyan-200">{item}</div>
                  ))}
                </div>
              </div>
            )}

            {sections['BRAND ESSENCE SUMMARY'].subsections?.['Brand Promise'] && (
              <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-400/30">
                <h4 className="text-sm font-semibold text-yellow-300 mb-2">Brand Promise</h4>
                <div className="text-base text-white font-medium italic">
                  {sections['BRAND ESSENCE SUMMARY'].subsections['Brand Promise'][0]}
                </div>
              </div>
            )}

            {sections['BRAND ESSENCE SUMMARY'].subsections?.['Brand Personality'] && (
              <div>
                <h4 className="text-sm font-semibold text-yellow-300 mb-3">Brand Personality</h4>
                <div className="flex flex-wrap gap-2">
                  {sections['BRAND ESSENCE SUMMARY'].subsections['Brand Personality'].map((trait, idx) => (
                    <span key={idx} className="px-4 py-2 bg-yellow-500/20 text-yellow-200 rounded-full text-sm font-medium border border-yellow-400/30">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {sections['COMPETITIVE & MARKET CONTEXT'] && (
        <SectionCard icon={TrendingUp} title="Market Positioning" gradient="from-teal-500/10 to-cyan-500/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections['COMPETITIVE & MARKET CONTEXT'].subsections?.['Industry Positioning'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-teal-300 mb-3">Industry Positioning</h4>
                <ul className="space-y-2">
                  {sections['COMPETITIVE & MARKET CONTEXT'].subsections['Industry Positioning'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <span className="text-teal-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections['COMPETITIVE & MARKET CONTEXT'].subsections?.['Competitive Advantages'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-teal-300 mb-3">Competitive Advantages</h4>
                <ul className="space-y-2">
                  {sections['COMPETITIVE & MARKET CONTEXT'].subsections['Competitive Advantages'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {sections['STRATEGIC RECOMMENDATIONS'] && (
        <SectionCard icon={Lightbulb} title="Strategic Recommendations" gradient="from-pink-500/10 to-rose-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sections['STRATEGIC RECOMMENDATIONS'].subsections?.['Content Strategy'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-pink-300 mb-3">Content Strategy</h4>
                <ul className="space-y-2">
                  {sections['STRATEGIC RECOMMENDATIONS'].subsections['Content Strategy'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <span className="text-pink-400 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections['STRATEGIC RECOMMENDATIONS'].subsections?.['Visual Strategy'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-pink-300 mb-3">Visual Strategy</h4>
                <ul className="space-y-2">
                  {sections['STRATEGIC RECOMMENDATIONS'].subsections['Visual Strategy'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <span className="text-pink-400 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections['STRATEGIC RECOMMENDATIONS'].subsections?.['Messaging Strategy'] && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-sm font-semibold text-pink-300 mb-3">Messaging Strategy</h4>
                <ul className="space-y-2">
                  {sections['STRATEGIC RECOMMENDATIONS'].subsections['Messaging Strategy'].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <span className="text-pink-400 mt-1">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {sections['BRAND GUIDELINES FOR CAMPAIGN'] && (
        <SectionCard icon={BookOpen} title="Campaign Guidelines" gradient="from-violet-500/10 to-purple-500/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections['BRAND GUIDELINES FOR CAMPAIGN'].subsections?.["DO's"] && (
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-400/30">
                <h4 className="text-sm font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  DO&apos;s
                </h4>
                <ul className="space-y-2">
                  {sections['BRAND GUIDELINES FOR CAMPAIGN'].subsections["DO's"].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections['BRAND GUIDELINES FOR CAMPAIGN'].subsections?.["DON'Ts"] && (
              <div className="p-4 bg-red-500/5 rounded-xl border border-red-400/30">
                <h4 className="text-sm font-semibold text-red-300 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  DON&apos;Ts
                </h4>
                <ul className="space-y-2">
                  {sections['BRAND GUIDELINES FOR CAMPAIGN'].subsections["DON'Ts"].map((item, idx) => (
                    <li key={idx} className="text-sm text-cyan-200 flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SectionCard>
      )}

      {extractedImages.length > 0 && (
        <SectionCard icon={Eye} title="Brand Visual Assets" gradient="from-slate-500/10 to-gray-500/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {extractedImages.map((url, idx) => (
              <div key={idx} className="group relative">
                <img
                  src={url}
                  alt={`Brand asset ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-xl border border-white/20 transition-transform group-hover:scale-105 shadow-lg"
                />
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
}
