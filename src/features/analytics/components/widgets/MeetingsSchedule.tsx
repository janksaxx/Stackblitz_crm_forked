import { Calendar } from 'lucide-react';

const meetings = [
  {
    id: 1,
    title: 'Client Presentation',
    time: '10:00 AM',
    date: 'Today',
    attendees: ['John Doe', 'Sarah Smith'],
  },
  {
    id: 2,
    title: 'Team Sync',
    time: '2:30 PM',
    date: 'Today',
    attendees: ['Dev Team'],
  },
  {
    id: 3,
    title: 'Product Review',
    time: '11:00 AM',
    date: 'Tomorrow',
    attendees: ['Product Team', 'Stakeholders'],
  },
];

export function MeetingsSchedule() {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <div key={meeting.id} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-indigo-100">
            <Calendar className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{meeting.title}</p>
            <p className="text-xs text-gray-500">
              {meeting.date} at {meeting.time}
            </p>
            <p className="text-xs text-gray-500">
              {meeting.attendees.join(', ')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}