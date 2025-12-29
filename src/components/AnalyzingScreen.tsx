import { useEffect, useState } from 'react';
import { Loader2, Globe, Sparkles, FileText, Mail, MessageSquare, Megaphone, Video, Image, CheckCircle2 } from 'lucide-react';

interface AnalyzingScreenProps {
  url: string;
  industry: string;
}

interface ProgressStage {
  id: number;
  label: string;
  description: string;
  icon: any;
  duration: number;
  color: string;
}

const STAGES: ProgressStage[] = [
  {
    id: 1,
    label: 'Analyzing Website',
    description: 'Fetching and parsing your website content',
    icon: Globe,
    duration: 15,
    color: 'blue',
  },
  {
    id: 2,
    label: 'Extracting Brand DNA',
    description: 'Identifying brand colors, voice, and personality',
    icon: Sparkles,
    duration: 15,
    color: 'purple',
  },
  {
    id: 3,
    label: 'Creating Strategic Brief',
    description: 'Developing comprehensive marketing strategy',
    icon: FileText,
    duration: 25,
    color: 'indigo',
  },
  {
    id: 4,
    label: 'Writing Social Media',
    description: 'Generating 15 posts across platforms',
    icon: MessageSquare,
    duration: 20,
    color: 'pink',
  },
  {
    id: 5,
    label: 'Crafting Email Sequence',
    description: 'Creating 5-part email campaign',
    icon: Mail,
    duration: 20,
    color: 'green',
  },
  {
    id: 6,
    label: 'Developing Blog Article',
    description: 'Writing 2000+ word SEO-optimized content',
    icon: FileText,
    duration: 25,
    color: 'orange',
  },
  {
    id: 7,
    label: 'Creating Ad Copy',
    description: 'Generating ad variations for multiple platforms',
    icon: Megaphone,
    duration: 20,
    color: 'red',
  },
  {
    id: 8,
    label: 'Scripting Video Content',
    description: 'Developing video scripts and prompts',
    icon: Video,
    duration: 20,
    color: 'violet',
  },
  {
    id: 9,
    label: 'Generating Images',
    description: 'Creating AI-generated campaign visuals',
    icon: Image,
    duration: 30,
    color: 'cyan',
  },
  {
    id: 10,
    label: 'Finalizing Campaign',
    description: 'Organizing deliverables and preparing results',
    icon: CheckCircle2,
    duration: 10,
    color: 'emerald',
  },
];

export function AnalyzingScreen({ url, industry }: AnalyzingScreenProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  useEffect(() => {
    let elapsed = 0;
    let stageIndex = 0;

    const interval = setInterval(() => {
      if (stageIndex >= STAGES.length) {
        clearInterval(interval);
        return;
      }

      const stage = STAGES[stageIndex];
      elapsed += 1;

      if (elapsed >= stage.duration) {
        setCompletedStages(prev => [...prev, stage.id]);
        elapsed = 0;
        stageIndex += 1;
        if (stageIndex < STAGES.length) {
          setCurrentStage(stageIndex);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentStageData = STAGES[currentStage];
  const progress = ((completedStages.length / STAGES.length) * 100);

  const getStageStatus = (stageId: number) => {
    if (completedStages.includes(stageId)) return 'completed';
    if (STAGES[currentStage]?.id === stageId) return 'active';
    return 'pending';
  };

  const colorClasses = {
    blue: 'text-blue-400 bg-blue-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    indigo: 'text-indigo-400 bg-indigo-500/10',
    pink: 'text-pink-400 bg-pink-500/10',
    green: 'text-green-400 bg-green-500/10',
    orange: 'text-orange-400 bg-orange-500/10',
    red: 'text-red-400 bg-red-500/10',
    violet: 'text-violet-400 bg-violet-500/10',
    cyan: 'text-cyan-400 bg-cyan-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-6">
            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
            <span className="text-white font-medium">Generating Campaign</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-4">
            Creating Your Marketing Campaign
          </h1>
          <p className="text-xl text-purple-200">
            {url} • {industry}
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-purple-300">Overall Progress</span>
            <span className="text-sm font-medium text-white">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${colorClasses[currentStageData?.color as keyof typeof colorClasses]}`}>
              {currentStageData && <currentStageData.icon className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-white">
                  {currentStageData?.label}
                </h3>
                <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
              </div>
              <p className="text-purple-200">
                {currentStageData?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {STAGES.map((stage) => {
            const status = getStageStatus(stage.id);
            const StageIcon = stage.icon;

            return (
              <div
                key={stage.id}
                className={`
                  flex items-center gap-4 p-4 rounded-xl transition-all duration-300
                  ${status === 'completed' ? 'border-l-2 border-green-500/40' : ''}
                  ${status === 'active' ? 'border-l-2 border-purple-500/60 scale-[1.01]' : ''}
                  ${status === 'pending' ? 'opacity-50' : ''}
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-all
                  ${status === 'completed' ? 'bg-green-500/20 text-green-400' : ''}
                  ${status === 'active' ? colorClasses[stage.color as keyof typeof colorClasses] : ''}
                  ${status === 'pending' ? 'bg-white/5 text-white/30' : ''}
                `}>
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <StageIcon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-white">{stage.label}</div>
                  <div className="text-sm text-purple-300">{stage.description}</div>
                </div>

                {status === 'active' && (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                )}
                {status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-purple-300">
            This typically takes 2-3 minutes. Please don't close this window.
          </p>
        </div>
      </div>
    </div>
  );
}
