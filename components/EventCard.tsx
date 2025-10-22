import React from 'react';
import type { ChapterEvent } from '../types';

interface EventCardProps {
  event: ChapterEvent;
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

const EventCard: React.FC<EventCardProps> = ({ event, onEdit, onDelete }) => {
    const formattedDate = new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex justify-between items-start">
            <div>
                <h4 className="text-lg font-bold text-slate-800">{event.title}</h4>
                <p className="text-sm text-slate-500 mb-1">{formattedDate}</p>
            </div>
            <div className="flex-shrink-0 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                {event.pdcs} PDC{event.pdcs !== 1 ? 's' : ''}
            </div>
        </div>
        
        <div className="mt-4">
            <h5 className="text-sm font-semibold text-slate-600 mb-2">Attendance ({event.attendees.length})</h5>
            <div className="max-h-32 overflow-y-auto bg-slate-50 rounded-md p-3 border">
                {event.attendees.length > 0 ? (
                    <ul className="text-sm text-slate-700 space-y-2">
                        {event.attendees.map((attendee, index) => (
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

export default EventCard;