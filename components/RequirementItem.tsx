
import React from 'react';
import type { Requirement } from '../types';

interface RequirementItemProps {
  requirement: Requirement;
  isChecked: boolean;
  onToggle: () => void;
  isDisabled: boolean;
}

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const RequirementItem: React.FC<RequirementItemProps> = ({ requirement, isChecked, onToggle, isDisabled }) => {
  const { title, description } = requirement;

  const handleToggle = () => {
    if (!isDisabled) {
      onToggle();
    }
  };
  
  return (
    <div
      onClick={handleToggle}
      className={`
        p-4 rounded-lg border-2 flex items-start space-x-4 transition-all duration-200
        ${isDisabled ? 'cursor-not-allowed bg-slate-100 border-slate-200' : 'cursor-pointer'}
        ${isChecked 
            ? 'bg-emerald-50 border-emerald-400' 
            : 'bg-white hover:border-blue-400 hover:bg-blue-50 border-slate-200'}
      `}
    >
      <div className={`
        flex-shrink-0 w-6 h-6 rounded-md border-2 mt-1 flex items-center justify-center
        ${isChecked ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'}
        ${isDisabled && !isChecked ? 'bg-slate-200' : ''}
      `}>
        {isChecked && <CheckIcon className="text-white" />}
      </div>
      <div>
        <h5 className={`font-semibold ${isChecked ? 'text-emerald-900' : 'text-slate-700'}`}>{title}</h5>
        <p className={`text-sm mt-1 ${isChecked ? 'text-emerald-700' : 'text-slate-500'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default RequirementItem;
