import React from 'react';
import type { ChapterEvent } from '../types';

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);


interface PDCSummaryProps {
  events: ChapterEvent[];
}

const PDCSummary: React.FC<PDCSummaryProps> = ({ events }) => {
  const eventsWithPDCs = events.filter(event => event.pdcs > 0);
  const totalPDCs = eventsWithPDCs.reduce((sum, event) => sum + event.pdcs, 0);

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">PDC Tracking Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Summary Stats */}
            <div className="space-y-4">
                <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mr-4">
                        <CalendarIcon />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Events Offering PDCs</p>
                        <p className="text-2xl font-bold text-slate-700">{eventsWithPDCs.length}</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                    <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg mr-4">
                        <StarIcon />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Total PDCs Offered</p>
                        <p className="text-2xl font-bold text-slate-700">{totalPDCs}</p>
                    </div>
                </div>
            </div>

            {/* Breakdown List */}
            <div>
                <h4 className="font-semibold text-slate-700 mb-2">PDCs per Event</h4>
                <div className="max-h-48 overflow-y-auto border rounded-lg bg-white">
                    {eventsWithPDCs.length > 0 ? (
                        <ul className="divide-y divide-slate-200">
                            {eventsWithPDCs.map(event => (
                                <li key={event.id} className="p-3 flex justify-between items-center text-sm">
                                    <span className="text-slate-600 truncate pr-2">{event.title}</span>
                                    <span className="flex-shrink-0 font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">{event.pdcs} PDC{event.pdcs !== 1 ? 's' : ''}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-slate-500 text-sm">No events with PDCs have been logged.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
};

export default PDCSummary;