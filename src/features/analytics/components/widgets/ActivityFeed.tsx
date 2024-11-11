import { Mail, Phone, Calendar, MessageSquare } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'email',
    title: 'Email sent to John Doe',
    time: '2 hours ago',
    icon: Mail,
  },
  {
    id: 2,
    type: 'call',
    title: 'Call with Sarah Smith',
    time: '4 hours ago',
    icon: Phone,
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Meeting scheduled with Tech Team',
    time: '1 day ago',
    icon: Calendar,
  },
];

export function ActivityFeed() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-indigo-100">
            <activity.icon className="h-4 w-4 text-indigo-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}