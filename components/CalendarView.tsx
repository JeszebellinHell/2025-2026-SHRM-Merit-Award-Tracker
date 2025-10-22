import React, { useMemo } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import type { ChapterEvent, ChapterMeeting } from '../types';

interface CalendarViewProps {
  events: ChapterEvent[];
  meetings: ChapterMeeting[];
  onSelectItem: (item: any) => void;
}

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarView: React.FC<CalendarViewProps> = ({ events, meetings, onSelectItem }) => {
  const calendarItems = useMemo(() => {
    const combined = [
      ...events.map(event => ({
        title: event.title,
        start: new Date(event.date + 'T00:00:00'),
        end: new Date(event.date + 'T23:59:59'),
        allDay: true,
        resource: { ...event, type: 'event' },
      })),
      ...meetings.map(meeting => ({
        title: meeting.title,
        start: new Date(meeting.date + 'T00:00:00'),
        end: new Date(meeting.date + 'T23:59:59'),
        allDay: true,
        resource: { ...meeting, type: 'meeting' },
      })),
    ];
    return combined;
  }, [events, meetings]);

  const eventPropGetter = (event: any) => {
    const backgroundColor = event.resource.type === 'event' ? '#2563eb' : '#16a34a'; // Blue for events, Green for meetings
    const style = {
      backgroundColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  };

  return (
    <div className="mt-8 bg-white p-4 md:p-6 rounded-xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 mb-4">Chapter Calendar</h3>
      <Calendar
        localizer={localizer}
        events={calendarItems}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventPropGetter}
        onSelectEvent={onSelectItem}
        views={['month', 'week', 'day']}
      />
    </div>
  );
};

export default CalendarView;
