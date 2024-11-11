import { Mail, Phone, Calendar, MessageSquare } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'email',
    title: 'Email sent to John Doe',
    time: '2 hours ago',
    icon: Mail,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    id: 2,
    type: 'call',
    title: 'Call with Sarah Smith',
    time: '4 hours ago',
    icon: Phone,
    color: 'text-green-500 bg-green-50',
  },
  {
    id: 3,
    type: 'meeting',
    title: 'Meeting scheduled with Tech Team',
    time: '1 day ago',
    icon: Calendar,
    color: 'text-purple-500 bg-purple-50',
  },
  {
    id: 4,
    type: 'message',
    title: 'New message from David Wilson',
    time: '1 day ago',
    icon: MessageSquare,
    color: 'text-yellow-500 bg-yellow-50',
  },
];

export function RecentActivities() {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, index) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {index !== activities.length - 1 && (
                <span
                  className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex items-start space-x-3">
                <div className={`relative px-1.5 py-1.5 rounded-full ${activity.color}`}>
                  <activity.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">{activity.title}</p>
                  <p className="mt-0.5 text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}