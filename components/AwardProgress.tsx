import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import type { AwardLevel } from '../types';
import { AWARD_LEVELS } from '../constants';

interface AwardProgressProps {
  completedPrerequisites: number;
  totalPrerequisites: number;
  completedActivities: number;
  currentAwardLevel: AwardLevel | null;
}

const RibbonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
    </svg>
);

const MedalIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="6"/>
    <path d="M15.48 13.9a6.5 6.5 0 0 0-6.96 0"/>
    <path d="M8 16v4l4-2 4 2v-4"/>
  </svg>
);

const TrophyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.87 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.13 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
        <circle cx="12" cy="13" r="3"></circle>
    </svg>
);

const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin h-4 w-4 text-slate-600 ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const AwardProgress: React.FC<AwardProgressProps> = ({
  completedPrerequisites,
  totalPrerequisites,
  completedActivities,
  currentAwardLevel,
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const prerequisiteProgress = totalPrerequisites > 0 ? (completedPrerequisites / totalPrerequisites) * 100 : 0;
  const activityProgress = (completedActivities / 12) * 100;
  const arePrerequisitesMet = completedPrerequisites === totalPrerequisites;

  const handleShare = async () => {
    if (!printRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        useCORS: true,
        backgroundColor: '#ffffff',
        // Temporarily remove the button from the capture
        onclone: (document) => {
            const button = document.getElementById('snapshot-button');
            if (button) button.style.display = 'none';
        }
      });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'wgu-shrm-award-progress.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div ref={printRef} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-slate-700">Current Progress</h2>
        <button
          id="snapshot-button"
          onClick={handleShare}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm font-semibold text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 disabled:opacity-50 disabled:cursor-wait transition-colors"
          aria-label="Generate snapshot of progress"
        >
          {isGenerating ? (
            <>
              <SpinnerIcon />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <CameraIcon />
              <span>Snapshot</span>
            </>
          )}
        </button>
      </div>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-600">Prerequisites Completion</span>
            <span className="text-sm font-semibold text-slate-600">{completedPrerequisites} / {totalPrerequisites}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${prerequisiteProgress}%` }}></div>
          </div>
        </div>
        
        <div className={!arePrerequisitesMet ? 'opacity-50' : ''}>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-slate-600">Merit Award Activities</span>
            <span className="text-sm font-semibold text-slate-600">{completedActivities} / 12</span>
          </div>
          <div className="relative w-full bg-slate-200 rounded-full h-5">
            {/* Tiered Background */}
            <div className="absolute w-full h-full flex rounded-full overflow-hidden" aria-hidden="true">
                {AWARD_LEVELS.map((level) => {
                    const segmentBgClasses: { [key: string]: string } = {
                        "Honorable Mention": "bg-green-200",
                        "Merit Award": "bg-blue-200",
                        "Superior Merit Award": "bg-purple-200",
                    };
                    const widthPercentage = (((level.maxActivities || 12) - level.minActivities + 1) / 12) * 100;
                    return (
                        <div key={`${level.name}-bg`} className={`h-full ${segmentBgClasses[level.name]}`} style={{ width: `${widthPercentage}%` }} />
                    );
                })}
            </div>
            
            {/* Progress Fill */}
            <div
                className="absolute h-full bg-yellow-400 rounded-full border-r-2 border-yellow-300 shadow-inner transition-all duration-500 z-10"
                style={{ width: `${activityProgress}%` }}
            />
            
            {/* Threshold Markers */}
            <div className="absolute w-full h-full pointer-events-none z-20" aria-hidden="true">
                {AWARD_LEVELS.map(level => {
                    const thresholdPosition = (level.minActivities / 12) * 100;
                    if (thresholdPosition === 0) return null;

                    return (
                        <div
                            key={`${level.name}-threshold`}
                            className="absolute top-0 h-full border-l border-dashed border-slate-600/60"
                            style={{ left: `${thresholdPosition}%` }}
                            title={`${level.name} starts at ${level.minActivities} activities`}
                        />
                    );
                })}
            </div>

            {/* Tier Icons */}
            <div className="absolute w-full h-full z-20" aria-hidden="true">
                {AWARD_LEVELS.map(level => {
                    const iconPosition = ((level.maxActivities || 12) / 12) * 100;
                    let Icon: React.FC<{className?: string}>;
                    let iconColor = '';
                    
                    switch(level.name) {
                        case 'Honorable Mention': Icon = RibbonIcon; iconColor = 'text-green-700'; break;
                        case 'Merit Award': Icon = MedalIcon; iconColor = 'text-blue-700'; break;
                        default: Icon = TrophyIcon; iconColor = 'text-purple-700';
                    }
                    
                    return (
                        <div
                            key={`${level.name}-icon`}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center"
                            style={{ left: `${iconPosition}%` }}
                        >
                            <Icon className={`h-5 w-5 ${iconColor} drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]`} />
                        </div>
                    );
                })}
            </div>
          </div>
           <div className="flex justify-between mt-1 text-xs text-slate-500">
            {AWARD_LEVELS.map(level => (
                <span key={level.name} style={{width: `${((level.maxActivities || 12) - level.minActivities + 1) / 12 * 100}%`}} className="text-center">{level.name}</span>
            ))}
           </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
            {arePrerequisitesMet ? (
                 currentAwardLevel ? (
                    <div className={`flex items-center justify-center p-3 rounded-lg ${currentAwardLevel.className}`}>
                        <TrophyIcon className="mr-3 h-6 w-6"/>
                        <p className="font-semibold text-center">
                            Congratulations! You've achieved the <span className="font-bold">{currentAwardLevel.name}</span>!
                        </p>
                    </div>
                 ) : (
                    <p className="text-center text-slate-600 font-medium">
                        Prerequisites met! Complete at least 4 activities to earn your first award.
                    </p>
                 )
            ) : (
                <p className="text-center text-amber-700 bg-amber-100 p-3 rounded-lg font-medium">
                    Complete all prerequisites to become eligible for Merit Awards.
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AwardProgress;