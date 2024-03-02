import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ActiveJobsComponent } from './active-jobs/active-jobs.component';
import { ArchiveJobsComponent } from './archive-jobs/archive-jobs.component';
import { QuotationsComponent } from './quotations/quotations.component';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    // Components declared in this module
    DashboardComponent,
    ActiveJobsComponent,
    ArchiveJobsComponent,
    QuotationsComponent
  ],

  imports: [
    // Angular modules
    CommonModule,
    FormsModule,

    // Third-party libraries
    FontAwesomeModule,
    TableModule,
    TagModule,
    InputTextModule,
    ButtonModule,
    DynamicDialogModule,
    CheckboxModule,
    DropdownModule,
    ToastModule,

    // Angular modules for root-level features (consider removing)
    BrowserModule,
    BrowserAnimationsModule,

    // Application-specific module for routing
    DashboardRoutingModule,
  ],
  providers:[MessageService]
})
export class DashboardModule { }
