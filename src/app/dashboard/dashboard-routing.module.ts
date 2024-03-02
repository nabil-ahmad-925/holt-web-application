import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArchiveJobsComponent } from './archive-jobs/archive-jobs.component';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { QuotationsComponent } from './quotations/quotations.component';
import { DashBoardAuthGuard } from './dashboard.guard';

const routes:  Routes = [
  { path: 'dashboard', component: DashboardComponent ,canActivate:[DashBoardAuthGuard]},
  { path: 'archive-jobs', component: ArchiveJobsComponent,canActivate:[DashBoardAuthGuard] },
  { path: 'active-jobs', component: ActiveJobsComponent,canActivate:[DashBoardAuthGuard] },
  { path: 'quotations', component: QuotationsComponent ,canActivate:[DashBoardAuthGuard]},
  // { path: 'dashboard', component: DashboardComponent  },
  // { path: 'archive-jobs', component: ArchiveJobsComponent  },
  // { path: 'active-jobs', component: ActiveJobsComponent  },
  // { path: 'quotations', component: QuotationsComponent  },
 
    // Redirect to the login page for any other unknown routes
    // { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
