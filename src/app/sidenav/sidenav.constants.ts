// sidenav.constants.ts

import { faBriefcase, faArchive, faDashboard } from '@fortawesome/free-solid-svg-icons';
 
export interface NavItem {
  id: string;
  routerLink: string;
  icon: any;
  name: string;
}

  const DashboardIcon = faDashboard;
  const ActiveJobsIcon = faBriefcase;
  const ArchiveJobsIcon = faArchive;

export const NavItems: NavItem[] = [
  { id: '1', routerLink: '/dashboard', icon: '../../assets/icons/dashboard.svg', name: 'Dashboard' },
  { id: '2', routerLink: '/summary', icon: '../../assets/icons/summary.svg', name: 'Summaries' },
  { id: '3', routerLink: '/quotations', icon: '../../assets/icons/user-settings.svg', name: 'Settings' },
 
];