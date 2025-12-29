import { Sparkles, Globe, Lightbulb, Target, Zap, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AnalyzingScreenProps {
  url: string;
  industry: string;
}

const analysisSteps = [
  { icon: Globe, label: 'Analyzing website', duration: 2000 },
  { icon: Target, label: 'Identifying target audience', duration: 2500 },
  { icon: Lightbulb, label: 'Generating strategic insights', duration: 3000 },
  { icon: Zap, label: 'Creating content strategy', duration: 2500 },
  { icon: Sparkles, label: 'Finalizing campaign', duration: 2000 },
];

export function AnalyzingScreen({ url, industry }: AnalyzingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (currentStep < analysisSteps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }, analysisSteps[currentStep].duration);

      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-blue-600 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-3">Analyzing Your Brand</h1>
          <p className="text-lg text-gray-600 mb-2">
            Creating a comprehensive marketing strategy for your business
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Globe className="w-4 h-4" />
            <span className="font-medium">{url}</span>
            <span>•</span>
            <span className="capitalize">{industry}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <div className="space-y-4">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index;
              const isPending = index > currentStep;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                    isCompleted
                      ? 'bg-green-50 border border-green-200'
                      : isCurrent
                      ? 'bg-blue-50 border border-blue-200'
                      : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isCompleted
                        ? 'bg-green-500'
                        : isCurrent
                        ? 'bg-blue-500 animate-pulse'
                        : 'bg-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className={`w-5 h-5 text-white ${isCurrent ? 'animate-bounce' : ''}`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <p
                      className={`font-medium transition-colors duration-500 ${
                        isCompleted
                          ? 'text-green-700'
                          : isCurrent
                          ? 'text-blue-700'
                          : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>

                  {isCurrent && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-semibold text-gray-900">
                {completedSteps.length} / {analysisSteps.length}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${(completedSteps.length / analysisSteps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This may take a few moments. We're working on creating the perfect campaign for you.
          </p>
        </div>
      </div>
    </div>
  );
}
