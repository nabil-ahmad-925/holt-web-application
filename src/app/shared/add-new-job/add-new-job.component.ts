import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
interface Status {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-new-job',
  templateUrl: './add-new-job.component.html',
  styleUrls: ['./add-new-job.component.scss']
})
export class AddNewJobComponent implements OnInit {
  form: FormGroup;
  formGroup: FormGroup | undefined;
  status: Status[];
  currentJobToUpdate;
  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, private config: DynamicDialogConfig , private toastr:ToastrService) {

 
    this.formGroup = new FormGroup({
        _id: new FormControl<string | null>(null),
        client: new FormControl<string | null>(null),
        contact: new FormControl<string | null>(null),
        invoiceTo: new FormControl<string | null>(null),
        site: new FormControl<string | null>(null),
        dateUp: new FormControl<Date | null>(null),
        tenderPrice: new FormControl<Number | null>(null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]), // Updated tenderPrice control
        overHireAmount: new FormControl<Number | null>(null),
        weeklyHirePeriod: new FormControl<Number | null>(null),
        endDate: new FormControl<Date | null>(null),
        invoiced: new FormControl<string | null>(null),
        overHireInvoicedTo: new FormControl<string | null>(null),
        status: new FormControl<Status | null>(null),
        handoverSigned: new FormControl<string | null>(null),
        notes:new FormControl<string | null>(null),
      
  });

  


  
    
  }

  ngOnInit(): void {
    const modalInputData = this.config.data;
    if(modalInputData){
      this.status = modalInputData.status;
      if(modalInputData.isEdit){
        this.currentJobToUpdate = modalInputData.jobToBeUpdated;
        this.initializeModal();
        console.log("EDIT ha ",this.currentJobToUpdate)
      }
    }
   
  }
  initializeModal() {
    this.formGroup.patchValue({
      _id: this.currentJobToUpdate._id,
      client: this.currentJobToUpdate.client,
      contact: this.currentJobToUpdate.contact,
      invoiceTo: this.currentJobToUpdate.invoiceTo,
      site: this.currentJobToUpdate.site,
      dateUp: this.formatDate(this.currentJobToUpdate.dateUp) ,
      tenderPrice: this.currentJobToUpdate.tenderPrice,
      overHireAmount: this.currentJobToUpdate.overHireAmount,
      weeklyHirePeriod: this.currentJobToUpdate.weeklyHirePeriod,
      endDate: this.formatDate(this.currentJobToUpdate.endDate),
      invoiced: this.currentJobToUpdate.invoiced? ['invoiced']:null,
      overHireInvoicedTo: this.currentJobToUpdate.overHireInvoicedTo,
      status: {name:this.currentJobToUpdate.status ,code:this.currentJobToUpdate.status.slice(0, 2) } ,
      handoverSigned: this.currentJobToUpdate.handoverSigned? ['handoverSigned']:null,
      notes: this.currentJobToUpdate.notes,
    });
  }

  onSubmit() {
 
      if (this.validateFormData()) {
        this.formGroup.value['isSubmitted'] = true;
        console.log("Form data ",this.formGroup.value );
        this.ref.close(this.formGroup.value);
      }

  }



  validateFormData(): boolean {
    const formData = this.formGroup.value;

 
    if (!formData.client) {
      this.toastr.error('Client is required.');
      return false;
    }

    if (!formData.contact) {
      this.toastr.error('Contact is required.');
      return false;
    }

    if (!formData.invoiceTo) {
      this.toastr.error('invoiceTo is required.');
      return false;
    }

    if (!formData.site) {
      this.toastr.error('Site is required.');
      return false;
    }

    if (typeof formData.tenderPrice !== 'number') {
      this.toastr.error('Tender Price should be a number.');
      return false;
    }

    if (typeof formData.overHireAmount !== 'number') {
      this.toastr.error('Over Hire Amount should be a number.');
      return false;
    }

    if (typeof formData.weeklyHirePeriod !== 'number') {
      this.toastr.error('Weekly Hire Period should be a number.');
      return false;
    }

    if (!formData.endDate) {
      this.toastr.error('End Date is required.');
      return false;
    }

    if (!formData.overHireInvoicedTo) {
      this.toastr.error('Over Hire Invoiced To is required.');
      return false;
    }

    if (typeof formData.status !== 'object') {
      this.toastr.error('Status is required.');
      return false;
    }

    return true;
  }


  formatDate(date){
    return moment(date, "DD-MMM-YYYY").toDate();
  }

}