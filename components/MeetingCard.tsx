import React, { useState } from 'react';
import type { ChapterMeeting } from '../types';

interface MeetingCardProps {
  meeting: ChapterMeeting;
  onEdit: () => void;
  onDelete: () => void;
}

const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
);

const DeleteIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
);

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>
);

const DocumentTextIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
);

const MeetingCard: React.FC<MeetingCardProps> = ({ meeting, onEdit, onDelete }) => {
    const [notesExpanded, setNotesExpanded] = useState(false);
    const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex items-center space-x-2">
            <h4 className="text-lg font-bold text-slate-800">{meeting.title}</h4>
            {meeting.notes && meeting.notes.trim() !== '' && (
                <div className="relative group">
                    <DocumentTextIcon className="text-slate-400 group-hover:text-slate-600" />
                    <div 
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-max invisible group-hover:visible"
                        role="tooltip"
                    >
                        Meeting notes recorded
                    </div>
                </div>
            )}
        </div>
        <p className="text-sm text-slate-500 mb-4">{formattedDate}</p>

        {/* Attendees */}
        <div>
            <h5 className="text-sm font-semibold text-slate-600 mb-2">Attendance ({meeting.attendees.length})</h5>
            <div className="max-h-32 overflow-y-auto bg-slate-50 rounded-md p-3 border">
                {meeting.attendees.length > 0 ? (
                    <ul className="text-sm text-slate-700 space-y-2">
                        {meeting.attendees.map((attendee, index) => (
                            <li key={index} className="flex items-center space-x-2">
                                <UserIcon className="text-slate-400 flex-shrink-0" />
                                <span className="truncate">{attendee}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                     <p className="text-sm text-slate-500 italic text-center py-4">No attendees listed.</p>
                )}
            </div>
        </div>
        
        {/* Notes */}
        <div className="mt-4">
            <button 
              onClick={() => setNotesExpanded(!notesExpanded)}
              className="w-full flex justify-between items-center text-left text-sm font-semibold text-slate-600"
            >
              Meeting Notes / Minutes
              <ChevronDownIcon className={`transition-transform duration-200 ${notesExpanded ? 'rotate-180' : ''}`} />
            </button>
            {notesExpanded && (
                <div className="mt-2 max-h-48 overflow-y-auto bg-slate-50 rounded-md p-3 border text-sm text-slate-700 prose prose-sm max-w-none">
                    {meeting.notes && meeting.notes.trim() !== '' ? (
                        <p style={{ whiteSpace: 'pre-wrap' }}>{meeting.notes}</p>
                    ) : (
                        <p className="italic text-slate-500">No notes recorded for this meeting.</p>
                    )}
                </div>
            )}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 flex justify-end space-x-2">
        <button onClick={onEdit} className="flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
            <EditIcon />
            <span>Edit</span>
        </button>
        <button onClick={onDelete} className="flex items-center space-x-1.5 px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-md hover:bg-red-200 transition-colors">
            <DeleteIcon />
            <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;