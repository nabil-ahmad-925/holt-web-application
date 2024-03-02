import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewJobComponent } from './add-new-job.component';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AddNewJobComponent
  ],
  imports: [
    CommonModule,
    CalendarModule,
    CheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RadioButtonModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
 
})
export class AddNewJobModule { }
