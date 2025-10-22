import React, { useMemo, useState } from 'react';
import type { ChapterEvent, ChapterMeeting } from '../types';

interface AttendanceRecord {
    name: string;
    eventCount: number;
    meetingCount: number;
    totalCount: number;
    attendedItems: { id: string; title: string; date: string; type: 'event' | 'meeting' }[];
}

const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const SortAscIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 16 4 4 4-4"/>
    <path d="M7 20V4"/>
    <path d="M11 4h10"/>
    <path d="M11 8h7"/>
    <path d="M11 12h4"/>
  </svg>
);

const SortDescIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="m3 8 4-4 4 4"/>
        <path d="M7 4v16"/>
        <path d="M11 4h10"/>
        <path d="M11 8h7"/>
        <path d="M11 12h4"/>
    </svg>
);

interface AttendanceTrackerProps {
  events: ChapterEvent[];
  meetings: ChapterMeeting[];
}

type SortKey = 'name' | 'totalCount' | 'eventCount' | 'meetingCount';
type SortDirection = 'asc' | 'desc';

const AttendanceTracker: React.FC<AttendanceTrackerProps> = ({ events, meetings }) => {
    const [sortKey, setSortKey] = useState<SortKey>('totalCount');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const attendanceData = useMemo<AttendanceRecord[]>(() => {
        const attendeeMap: { [key: string]: AttendanceRecord } = {};

        const processItem = (item: ChapterEvent | ChapterMeeting, type: 'event' | 'meeting') => {
            item.attendees.forEach(attendeeName => {
                const name = attendeeName.trim();
                if (!name) return;
                
                if (!attendeeMap[name]) {
                    attendeeMap[name] = { name, eventCount: 0, meetingCount: 0, totalCount: 0, attendedItems: [] };
                }
                if (type === 'event') {
                    attendeeMap[name].eventCount++;
                } else {
                    attendeeMap[name].meetingCount++;
                }
                attendeeMap[name].totalCount++;
                attendeeMap[name].attendedItems.push({ id: item.id, title: item.title, date: item.date, type });
            });
        };

        events.forEach(event => processItem(event, 'event'));
        meetings.forEach(meeting => processItem(meeting, 'meeting'));
        
        const sortedData = Object.values(attendeeMap).sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortDirection === 'asc' ? 1 : -1;
            // Secondary sort by name
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        return sortedData;
    }, [events, meetings, sortKey, sortDirection]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
    };
    
    const SortIcon = sortDirection === 'asc' ? SortAscIcon : SortDescIcon;

    const renderHeader = (key: SortKey, title: string) => (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
            <button onClick={() => handleSort(key)} className="flex items-center space-x-1 group">
                <span>{title}</span>
                {sortKey === key && <SortIcon />}
                <SortAscIcon className={`text-slate-400 group-hover:text-slate-600 ${sortKey !== key ? 'opacity-0 group-hover:opacity-100' : 'hidden'}`} />
            </button>
        </th>
    );

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center mb-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg mr-4">
                <UserGroupIcon />
            </div>
            <div>
                <h3 className="text-xl font-bold text-slate-800">Member Attendance Tracker</h3>
                <p className="text-slate-500">Summary of member participation in events and meetings.</p>
            </div>
        </div>
        
        <div className="flex justify-end items-center space-x-4 mb-2 text-xs text-slate-500">
            <span>Breakdown Legend:</span>
            <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-500"></div>
                <span>Events</span>
            </div>
            <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                <span>Meetings</span>
            </div>
        </div>

        <div className="overflow-x-auto">
            {attendanceData.length > 0 ? (
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            {renderHeader('name', 'Member Name')}
                            {renderHeader('totalCount', 'Total')}
                            {renderHeader('eventCount', 'Events')}
                            {renderHeader('meetingCount', 'Meetings')}
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Breakdown
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {attendanceData.map(person => (
                            <tr key={person.name}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{person.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center font-semibold">{person.totalCount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">{person.eventCount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">{person.meetingCount}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {person.totalCount > 0 && (
                                        <div 
                                            className="w-full max-w-[100px] h-4 bg-slate-200 rounded-full flex overflow-hidden" 
                                            title={`Events: ${person.eventCount}, Meetings: ${person.meetingCount}`}
                                        >
                                            <div
                                                className="h-full bg-blue-500 transition-all"
                                                style={{ width: `${(person.eventCount / person.totalCount) * 100}%` }}
                                            ></div>
                                            <div
                                                className="h-full bg-green-500 transition-all"
                                                style={{ width: `${(person.meetingCount / person.totalCount) * 100}%` }}
                                            ></div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="text-center py-12">
                    <h4 className="text-lg font-semibold text-slate-700">No Attendance Data</h4>
                    <p className="text-slate-500 mt-2">Add events and meetings with attendees to see participation stats.</p>
                </div>
            )}
        </div>
    </div>
  );
};

export default AttendanceTracker;