import React, { useState, useEffect } from 'react';
import type { ChapterEvent } from '../types';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: Omit<ChapterEvent, 'id'> | ChapterEvent) => void;
  event: ChapterEvent | null;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [pdcs, setPdcs] = useState<number>(0);
  const [attendees, setAttendees] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(event.date);
      setPdcs(event.pdcs);
      setAttendees(event.attendees.join('\n'));
    } else {
      // Reset form for new event
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]); // Default to today
      setPdcs(1);
      setAttendees('');
    }
  }, [event, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eventData = {
      title,
      date,
      pdcs: Number(pdcs) || 0,
      attendees: attendees.split('\n').filter(name => name.trim() !== ''),
    };

    if (event) {
      onSave({ ...eventData, id: event.id });
    } else {
      onSave(eventData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-slate-800 mb-6">{event ? 'Edit Event' : 'Add New Event'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700">Event Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
                <input
                type="date"
                id="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
             <div>
                <label htmlFor="pdcs" className="block text-sm font-medium text-slate-700">PDCs Offered</label>
                <input
                type="number"
                id="pdcs"
                value={pdcs}
                onChange={e => setPdcs(Number(e.target.value))}
                min="0"
                className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                />
            </div>
          </div>
          <div>
            <label htmlFor="attendees" className="block text-sm font-medium text-slate-700">Attendees</label>
            <textarea
              id="attendees"
              value={attendees}
              onChange={e => setAttendees(e.target.value)}
              rows={6}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter one name per line"
            ></textarea>
          </div>
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow"
            >
              {event ? 'Save Changes' : 'Add Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
