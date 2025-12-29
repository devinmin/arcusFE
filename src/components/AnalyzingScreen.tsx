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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 px-6 py-3 mb-6">
            <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            <span className="text-gray-900 font-medium">Generating Campaign</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Creating Your Marketing Campaign
          </h1>
          <p className="text-xl text-gray-600">
            {url} • {industry}
          </p>
        </div>

        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Overall Progress</span>
            <span className="text-sm font-medium text-gray-900">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3">
              {currentStageData && <currentStageData.icon className="w-7 h-7 text-blue-500" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {currentStageData?.label}
                </h3>
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              </div>
              <p className="text-gray-600">
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
                  flex items-center gap-4 p-4 transition-all duration-300
                  ${status === 'completed' ? 'border-l-2 border-green-500' : ''}
                  ${status === 'active' ? 'border-l-2 border-blue-500' : ''}
                  ${status === 'pending' ? 'opacity-40' : ''}
                `}
              >
                <div className={`
                  p-2 transition-all
                  ${status === 'completed' ? 'text-green-500' : ''}
                  ${status === 'active' ? 'text-blue-500' : ''}
                  ${status === 'pending' ? 'text-gray-400' : ''}
                `}>
                  {status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <StageIcon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-gray-900">{stage.label}</div>
                  <div className="text-sm text-gray-600">{stage.description}</div>
                </div>

                {status === 'active' && (
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                )}
                {status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            This typically takes 2-3 minutes. Please don't close this window.
          </p>
        </div>
      </div>
    </div>
  );
}
