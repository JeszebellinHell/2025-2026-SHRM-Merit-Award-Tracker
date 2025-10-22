import React, { useState, useEffect } from 'react';
import type { ChapterMeeting } from '../types';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meetingData: Omit<ChapterMeeting, 'id'> | ChapterMeeting) => void;
  meeting: ChapterMeeting | null;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose, onSave, meeting }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [attendees, setAttendees] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (meeting) {
      setTitle(meeting.title);
      setDate(meeting.date);
      setAttendees(meeting.attendees.join('\n'));
      setNotes(meeting.notes);
    } else {
      // Reset form for new meeting
      setTitle('');
      setDate(new Date().toISOString().split('T')[0]); // Default to today
      setAttendees('');
      setNotes('');
    }
  }, [meeting, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const meetingData = {
      title,
      date,
      attendees: attendees.split('\n').filter(name => name.trim() !== ''),
      notes,
    };

    if (meeting) {
      onSave({ ...meetingData, id: meeting.id });
    } else {
      onSave(meetingData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg mx-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-xl font-bold text-slate-800 mb-6">{meeting ? 'Edit Meeting' : 'Add New Meeting'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="meeting-title" className="block text-sm font-medium text-slate-700">Meeting Title / Topic</label>
            <input
              type="text"
              id="meeting-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="meeting-date" className="block text-sm font-medium text-slate-700">Date</label>
            <input
              type="date"
              id="meeting-date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="meeting-attendees" className="block text-sm font-medium text-slate-700">Attendees</
            label>
            <textarea
              id="meeting-attendees"
              value={attendees}
              onChange={e => setAttendees(e.target.value)}
              rows={5}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter one name per line"
            ></textarea>
          </div>
           <div>
            <label htmlFor="meeting-notes" className="block text-sm font-medium text-slate-700">Meeting Notes / Minutes</label>
            <textarea
              id="meeting-notes"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={6}
              className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Record key discussion points, decisions, and action items..."
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
              {meeting ? 'Save Changes' : 'Add Meeting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MeetingModal;
