import React, { useState } from 'react';
import type { ChapterEvent } from '../types';
import EventCard from './EventCard';
import EventModal from './EventModal';

interface EventsSectionProps {
  events: ChapterEvent[];
  onAddEvent: (eventData: Omit<ChapterEvent, 'id'>) => void;
  onUpdateEvent: (event: ChapterEvent) => void;
  onDeleteEvent: (eventId: string) => void;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const EventsSection: React.FC<EventsSectionProps> = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<ChapterEvent | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleEditEvent = (event: ChapterEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<ChapterEvent, 'id'> | ChapterEvent) => {
    if ('id' in eventData) {
      onUpdateEvent(eventData);
    } else {
      onAddEvent(eventData);
    }
    handleCloseModal();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h3 className="text-xl font-bold text-slate-800">Chapter Events & Workshops</h3>
            <p className="text-slate-500">Record of chapter meetings, workshops, and educational events.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow"
        >
          <PlusIcon />
          <span>Add Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onEdit={() => handleEditEvent(event)}
              onDelete={() => onDeleteEvent(event.id)}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 text-center py-12 px-6 bg-white rounded-xl shadow-lg border border-slate-200">
            <h4 className="text-lg font-semibold text-slate-700">No Events Logged Yet</h4>
            <p className="text-slate-500 mt-2">Click "Add Event" to start tracking your chapter's workshops and meetings.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveEvent}
          event={editingEvent}
        />
      )}
    </div>
  );
};

export default EventsSection;
