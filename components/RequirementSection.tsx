
import React from 'react';
import type { AwardSection } from '../types';
import RequirementItem from './RequirementItem';

interface RequirementSectionProps {
  section: AwardSection;
  completionStatus: { [key: string]: boolean };
  onToggleRequirement: (id: string) => void;
  isPrerequisitesMetForActivities: boolean;
  className?: string;
}

const RequirementSection: React.FC<RequirementSectionProps> = ({
  section,
  completionStatus,
  onToggleRequirement,
  isPrerequisitesMetForActivities,
  className = '',
}) => {
  const isSectionDisabled = !section.isPrerequisite && !isPrerequisitesMetForActivities;

  return (
    <div className={`lg:col-span-3 ${isSectionDisabled ? 'opacity-60' : ''}`}>
      <div className="mb-4">
        <h3 className="text-xl font-bold text-slate-800">{section.title}</h3>
        <p className="text-slate-500">{section.description}</p>
      </div>

      <div className={!section.isPrerequisite ? 'grid md:grid-cols-2 lg:grid-cols-4 gap-4' : className}>
        {section.categories.map(category => (
          <div key={category.title} className={!section.isPrerequisite ? 'bg-white p-4 rounded-lg shadow border border-slate-200' : ''}>
              {!section.isPrerequisite && <h4 className="font-semibold mb-3 text-blue-800">{category.title}</h4>}
              <div className="space-y-3">
              {category.requirements.map(req => (
                  <RequirementItem
                  key={req.id}
                  requirement={req}
                  isChecked={!!completionStatus[req.id]}
                  onToggle={() => onToggleRequirement(req.id)}
                  isDisabled={isSectionDisabled}
                  />
              ))}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequirementSection;
