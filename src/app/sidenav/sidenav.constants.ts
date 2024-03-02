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
  { id: '1', routerLink: '/dashboard', icon: DashboardIcon, name: 'Dashboard' },
  { id: '2', routerLink: '/active-jobs', icon: ActiveJobsIcon, name: 'Active Jobs' },
  { id: '3', routerLink: '/quotations', icon: ActiveJobsIcon, name: 'Quotations' },
  { id: '4', routerLink: '/archive-jobs', icon: ArchiveJobsIcon, name: 'Archive Jobs' },
];