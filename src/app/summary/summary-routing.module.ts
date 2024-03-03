import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { DashBoardAuthGuard } from '../dashboard/dashboard.guard';


const routes:  Routes = [
  { path: 'summary', component: SummaryComponent ,canActivate:[DashBoardAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SummaryRoutingModule { }
