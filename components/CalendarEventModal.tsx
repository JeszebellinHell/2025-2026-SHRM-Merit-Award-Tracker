import React from 'react';
import type { CalendarItem } from '../types';

interface CalendarEventModalProps {
  item: CalendarItem;
  onClose: () => void;
}

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const CalendarEventModal: React.FC<CalendarEventModalProps> = ({ item, onClose }) => {
  const isEvent = 'pdcs' in item;
  const formattedDate = new Date(item.date + 'T00:00:00').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start">
            <div>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${isEvent ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                    {isEvent ? 'Event / Workshop' : 'Meeting'}
                </span>
                <h2 className="text-xl font-bold text-slate-800 mt-2">{item.title}</h2>
                <p className="text-sm text-slate-500">{formattedDate}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">&times;</button>
        </div>

        <div className="mt-6 border-t border-slate-200 pt-6 space-y-4">
          {isEvent && (
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-1">PDCs Offered</h3>
              <p className="text-slate-800">{item.pdcs} PDC{item.pdcs !== 1 ? 's' : ''}</p>
            </div>
          )}

          {!isEvent && item.notes && (
            <div>
              <h3 className="text-sm font-semibold text-slate-600 mb-2">Notes / Minutes</h3>
              <div className="max-h-32 overflow-y-auto bg-slate-50 rounded-md p-3 border text-sm text-slate-700">
                <p style={{ whiteSpace: 'pre-wrap' }}>{item.notes}</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold text-slate-600 mb-2">Attendees ({item.attendees.length})</h3>
            <div className="max-h-32 overflow-y-auto bg-slate-50 rounded-md p-3 border">
              {item.attendees.length > 0 ? (
                <ul className="text-sm text-slate-700 space-y-2">
                  {item.attendees.map((attendee, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <UserIcon className="text-slate-400 flex-shrink-0" />
                      <span>{attendee}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-500 italic">No attendees listed.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarEventModal;
