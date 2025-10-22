import React, { useState } from 'react';
import type { ChapterMeeting } from '../types';
import MeetingCard from './MeetingCard';
import MeetingModal from './MeetingModal';

interface MeetingsSectionProps {
  meetings: ChapterMeeting[];
  onAddMeeting: (meetingData: Omit<ChapterMeeting, 'id'>) => void;
  onUpdateMeeting: (meeting: ChapterMeeting) => void;
  onDeleteMeeting: (meetingId: string) => void;
}

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const MeetingsSection: React.FC<MeetingsSectionProps> = ({ meetings, onAddMeeting, onUpdateMeeting, onDeleteMeeting }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<ChapterMeeting | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMeeting(null);
  };

  const handleEditMeeting = (meeting: ChapterMeeting) => {
    setEditingMeeting(meeting);
    setIsModalOpen(true);
  };

  const handleSaveMeeting = (meetingData: Omit<ChapterMeeting, 'id'> | ChapterMeeting) => {
    if ('id' in meetingData) {
      onUpdateMeeting(meetingData);
    } else {
      onAddMeeting(meetingData);
    }
    handleCloseModal();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <div>
            <h3 className="text-xl font-bold text-slate-800">Chapter Meetings</h3>
            <p className="text-slate-500">A log of all official chapter meetings and board syncs.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="flex items-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow"
        >
          <PlusIcon />
          <span>Add Meeting</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {meetings.length > 0 ? (
          meetings.map(meeting => (
            <MeetingCard
              key={meeting.id}
              meeting={meeting}
              onEdit={() => handleEditMeeting(meeting)}
              onDelete={() => onDeleteMeeting(meeting.id)}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 text-center py-12 px-6 bg-white rounded-xl shadow-lg border border-slate-200">
            <h4 className="text-lg font-semibold text-slate-700">No Meetings Logged Yet</h4>
            <p className="text-slate-500 mt-2">Click "Add Meeting" to start documenting your chapter's meetings.</p>
          </div>
        )}
      </div>

      {isModalOpen && (
        <MeetingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveMeeting}
          meeting={editingMeeting}
        />
      )}
    </div>
  );
};

export default MeetingsSection;
