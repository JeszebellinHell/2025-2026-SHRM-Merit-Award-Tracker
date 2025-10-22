import React, { useState, useEffect, useMemo } from 'react';
import type { AwardLevel, ChapterEvent, ChapterMeeting, RequirementCategory, CalendarItem } from './types';
import { AWARD_DATA, AWARD_LEVELS } from './constants';
import Header from './components/Header';
import AwardProgress from './components/AwardProgress';
import RequirementSection from './components/RequirementSection';
import AwardStatusCharts from './components/AwardStatusCharts';
import EventsSection from './components/EventsSection';
import MeetingsSection from './components/MeetingsSection';
import PDCSummary from './components/PDCSummary';
import CalendarView from './components/CalendarView';
import CalendarEventModal from './components/CalendarEventModal';
import AttendanceTracker from './components/AttendanceTracker';

const App: React.FC = () => {
    // State management with localStorage persistence
    const [completionStatus, setCompletionStatus] = useState<{ [key: string]: boolean }>(() => {
        try {
            const saved = localStorage.getItem('completionStatus');
            return saved ? JSON.parse(saved) : {};
        } catch (error) {
            console.error("Failed to parse completionStatus from localStorage", error);
            return {};
        }
    });

    const [events, setEvents] = useState<ChapterEvent[]>(() => {
        try {
            const saved = localStorage.getItem('events');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to parse events from localStorage", error);
            return [];
        }
    });

    const [meetings, setMeetings] = useState<ChapterMeeting[]>(() => {
        try {
            const saved = localStorage.getItem('meetings');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to parse meetings from localStorage", error);
            return [];
        }
    });
    
    const [selectedCalendarItem, setSelectedCalendarItem] = useState<CalendarItem | null>(null);

    useEffect(() => {
        localStorage.setItem('completionStatus', JSON.stringify(completionStatus));
    }, [completionStatus]);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    useEffect(() => {
        localStorage.setItem('meetings', JSON.stringify(meetings));
    }, [meetings]);

    const handleToggleRequirement = (id: string) => {
        setCompletionStatus(prev => ({ ...prev, [id]: !prev[id] }));
    };

    // Event handlers
    const handleAddEvent = (eventData: Omit<ChapterEvent, 'id'>) => {
        const newEvent = { ...eventData, id: `evt-${Date.now()}` };
        setEvents(prev => [...prev, newEvent].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    const handleUpdateEvent = (updatedEvent: ChapterEvent) => {
        setEvents(prev => prev.map(e => e.id === updatedEvent.id ? updatedEvent : e).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    const handleDeleteEvent = (eventId: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            setEvents(prev => prev.filter(e => e.id !== eventId));
        }
    };

    // Meeting handlers
    const handleAddMeeting = (meetingData: Omit<ChapterMeeting, 'id'>) => {
        const newMeeting = { ...meetingData, id: `mtg-${Date.now()}` };
        setMeetings(prev => [...prev, newMeeting].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    const handleUpdateMeeting = (updatedMeeting: ChapterMeeting) => {
        setMeetings(prev => prev.map(m => m.id === updatedMeeting.id ? updatedMeeting : m).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    const handleDeleteMeeting = (meetingId: string) => {
        if (window.confirm('Are you sure you want to delete this meeting?')) {
            setMeetings(prev => prev.filter(m => m.id !== meetingId));
        }
    };

    // Progress Calculation
    const {
        prerequisiteSections,
        activitySection,
        totalPrerequisites,
        completedPrerequisites,
        completedActivities,
        currentAwardLevel,
        categoryProgress
    } = useMemo(() => {
        const prerequisiteSections = AWARD_DATA.filter(s => s.isPrerequisite);
        const activitySection = AWARD_DATA.find(s => !s.isPrerequisite);

        const allPrerequisites = prerequisiteSections.flatMap(s => s.categories.flatMap(c => c.requirements));
        const totalPrerequisites = allPrerequisites.length;
        const completedPrerequisites = allPrerequisites.filter(r => completionStatus[r.id]).length;

        const allActivities = activitySection?.categories.flatMap(c => c.requirements) || [];
        const completedActivities = allActivities.filter(r => completionStatus[r.id]).length;

        const arePrerequisitesMet = completedPrerequisites === totalPrerequisites;
        let currentAwardLevel: AwardLevel | null = null;
        if (arePrerequisitesMet) {
            currentAwardLevel = [...AWARD_LEVELS].reverse().find(level => completedActivities >= level.minActivities) || null;
        }
        
        const categoryProgress = activitySection?.categories.map((cat: RequirementCategory) => ({
            name: cat.title,
            completed: cat.requirements.filter(req => completionStatus[req.id]).length,
            total: cat.requirements.length,
        })) || [];

        return {
            prerequisiteSections,
            activitySection,
            totalPrerequisites,
            completedPrerequisites,
            completedActivities,
            currentAwardLevel,
            categoryProgress,
        };
    }, [completionStatus]);

    const isPrerequisitesMetForActivities = completedPrerequisites === totalPrerequisites;
    
    const handleSelectCalendarItem = (item: any) => {
        setSelectedCalendarItem(item.resource);
    };

    const handleCloseCalendarModal = () => {
        setSelectedCalendarItem(null);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <Header />
            <main className="container mx-auto px-4 md:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                    <div className="lg:col-span-4">
                        <AwardProgress
                            completedPrerequisites={completedPrerequisites}
                            totalPrerequisites={totalPrerequisites}
                            completedActivities={completedActivities}
                            currentAwardLevel={currentAwardLevel}
                        />
                    </div>

                    {prerequisiteSections.map(section => (
                        <RequirementSection
                            key={section.title}
                            section={section}
                            completionStatus={completionStatus}
                            onToggleRequirement={handleToggleRequirement}
                            isPrerequisitesMetForActivities={true} // Prerequisites are always enabled
                            className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 lg:col-span-4"
                        />
                    ))}

                    {activitySection && (
                        <RequirementSection
                            key={activitySection.title}
                            section={activitySection}
                            completionStatus={completionStatus}
                            onToggleRequirement={handleToggleRequirement}
                            isPrerequisitesMetForActivities={isPrerequisitesMetForActivities}
                        />
                    )}
                    
                    <div className="lg:col-span-4">
                         <AwardStatusCharts
                            categoryProgress={categoryProgress}
                            completedActivities={completedActivities}
                            totalActivities={activitySection?.categories.flatMap(c => c.requirements).length || 12}
                        />
                    </div>
                    
                    <div className="lg:col-span-4">
                        <EventsSection 
                            events={events}
                            onAddEvent={handleAddEvent}
                            onUpdateEvent={handleUpdateEvent}
                            onDeleteEvent={handleDeleteEvent}
                        />
                    </div>

                    <div className="lg:col-span-4">
                        <MeetingsSection
                            meetings={meetings}
                            onAddMeeting={handleAddMeeting}
                            onUpdateMeeting={handleUpdateMeeting}
                            onDeleteMeeting={handleDeleteMeeting}
                        />
                    </div>
                    
                    <div className="lg:col-span-4">
                        <PDCSummary events={events} />
                    </div>

                    <div className="lg:col-span-4">
                        <AttendanceTracker events={events} meetings={meetings} />
                    </div>

                    <div className="lg:col-span-4">
                        <CalendarView 
                            events={events} 
                            meetings={meetings}
                            onSelectItem={handleSelectCalendarItem}
                        />
                    </div>
                </div>
            </main>
             {selectedCalendarItem && (
                <CalendarEventModal item={selectedCalendarItem} onClose={handleCloseCalendarModal} />
            )}
        </div>
    );
};

export default App;
