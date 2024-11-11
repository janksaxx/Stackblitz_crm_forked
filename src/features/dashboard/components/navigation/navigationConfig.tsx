import {
  LayoutDashboard,
  BarChart3,
  Users,
  Building2,
  FileText,
  DollarSign,
  Mail,
  Calendar,
  MessageSquare,
  Phone,
  Target,
  Briefcase,
  Settings
} from 'lucide-react';

export const navigationItems = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'CRM',
    items: [
      { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
      { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
      { name: 'Deals', href: '/dashboard/deals', icon: DollarSign },
      { name: 'Tasks', href: '/dashboard/tasks', icon: FileText },
    ],
  },
  {
    label: 'Communication',
    items: [
      { name: 'Email', href: '/dashboard/email', icon: Mail },
      { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar },
      { name: 'Chat', href: '/dashboard/chat', icon: MessageSquare },
      { name: 'Calls', href: '/dashboard/calls', icon: Phone },
    ],
  },
  {
    label: 'Sales',
    items: [
      { name: 'Opportunities', href: '/dashboard/opportunities', icon: Target },
      { name: 'Projects', href: '/dashboard/projects', icon: Briefcase },
    ],
  },
  {
    label: 'Settings',
    items: [
      { name: 'Preferences', href: '/dashboard/settings', icon: Settings },
    ],
  },
];