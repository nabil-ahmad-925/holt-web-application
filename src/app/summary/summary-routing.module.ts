import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { DashBoardAuthGuard } from '../dashboard/dashboard.guard';
import { SummaryPublicViewComponent } from './summary-public-view/summary-public-view.component';


const routes:  Routes = [
  { path: 'summary', component: SummaryComponent ,canActivate:[DashBoardAuthGuard]},
  { path: 'public-view/:videoId', component: SummaryPublicViewComponent  } // Define route parameter
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
