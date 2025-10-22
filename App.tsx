import React, { useState, useEffect, useMemo } from 'react';
import { AWARD_DATA, AWARD_LEVELS } from './constants';
import type { AwardLevel } from './types';
import Header from './components/Header';
import AwardProgress from './components/AwardProgress';
import RequirementSection from './components/RequirementSection';
import AwardStatusCharts from './components/AwardStatusCharts';

const App: React.FC = () => {
  const [completionStatus, setCompletionStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    try {
      const savedStatus = localStorage.getItem('shrmAwardTrackerStatus');
      if (savedStatus) {
        setCompletionStatus(JSON.parse(savedStatus));
      }
    } catch (error) {
      console.error("Failed to load state from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('shrmAwardTrackerStatus', JSON.stringify(completionStatus));
    } catch (error)      {
      console.error("Failed to save state to localStorage:", error);
    }
  }, [completionStatus]);

  const handleToggleRequirement = (id: string) => {
    setCompletionStatus(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const {
    completedPrerequisites,
    allPrerequisites,
    completedActivities,
    totalActivities,
    categoryProgress,
    currentAwardLevel
  } = useMemo(() => {
    let completedPrereqs = 0;
    let totalPrereqs = 0;
    let completedActs = 0;
    let totalActs = 0;
    const catProgress: { name: string; completed: number; total: number }[] = [];

    const activitySection = AWARD_DATA.find(section => !section.isPrerequisite);

    AWARD_DATA.forEach(section => {
      if (section.isPrerequisite) {
        section.categories.forEach(category => {
          category.requirements.forEach(req => {
            totalPrereqs++;
            if (completionStatus[req.id]) {
              completedPrereqs++;
            }
          });
        });
      }
    });

    if (activitySection) {
        activitySection.categories.forEach(category => {
            let completedInCategory = 0;
            const totalInCategory = category.requirements.length;
            totalActs += totalInCategory;

            category.requirements.forEach(req => {
                if (completionStatus[req.id]) {
                    completedInCategory++;
                }
            });
            
            let shortName = category.title;
            if (category.title === 'Chapter Programming & Career Development') shortName = 'Programming';
            if (category.title === 'Community-Based Activities') shortName = 'Community';
            if (category.title === 'SHRM Affiliate Support') shortName = 'Affiliate Support';

            catProgress.push({
                name: shortName,
                completed: completedInCategory,
                total: totalInCategory,
            });
        });
    }

    completedActs = catProgress.reduce((sum, cat) => sum + cat.completed, 0);

    let awardLvl: AwardLevel | null = null;
    if (completedPrereqs === totalPrereqs) {
      for (let i = AWARD_LEVELS.length - 1; i >= 0; i--) {
        if (completedActs >= AWARD_LEVELS[i].minActivities) {
          awardLvl = AWARD_LEVELS[i];
          break;
        }
      }
    }

    return {
      completedPrerequisites: completedPrereqs,
      allPrerequisites: totalPrereqs,
      completedActivities: completedActs,
      totalActivities: totalActs,
      categoryProgress: catProgress,
      currentAwardLevel: awardLvl
    };
  }, [completionStatus]);

  const arePrerequisitesMet = completedPrerequisites === allPrerequisites;

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <AwardProgress
          completedPrerequisites={completedPrerequisites}
          totalPrerequisites={allPrerequisites}
          completedActivities={completedActivities}
          currentAwardLevel={currentAwardLevel}
        />
        
        <AwardStatusCharts 
          categoryProgress={categoryProgress}
          completedActivities={completedActivities}
          totalActivities={totalActivities}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {AWARD_DATA.map((section, index) => (
            <RequirementSection
              key={section.title}
              section={section}
              completionStatus={completionStatus}
              onToggleRequirement={handleToggleRequirement}
              isPrerequisitesMetForActivities={arePrerequisitesMet}
              className={index < 2 ? 'lg:col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-4' : 'lg:col-span-3'}
            />
          ))}
        </div>
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        <p>Built for the WGU SHRM Virtual Student Chapter.</p>
        <p>Based on the official SHRM Student Chapter Merit Award criteria.</p>
      </footer>
    </div>
  );
};

export default App;