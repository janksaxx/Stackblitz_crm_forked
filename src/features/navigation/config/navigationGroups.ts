// Navigation group types
export type NavigationItem = {
  name: string;
  href: string;
  icon: any;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};