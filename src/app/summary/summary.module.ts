import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SummaryRoutingModule } from './summary-routing.module';
import { SummaryComponent } from './summary/summary.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SliderModule } from 'primeng/slider';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { SummaryPublicViewComponent } from './summary-public-view/summary-public-view.component';
 
@NgModule({
  declarations: [
    SummaryComponent,
    SummaryPublicViewComponent,
 
  ],
  imports: [
    CommonModule,
    SummaryRoutingModule,
    TableModule,
    TagModule,
    SliderModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    ProgressBarModule,
   
    ButtonModule
  ]
})
export class SummaryModule { }
