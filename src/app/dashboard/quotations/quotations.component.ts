import { Component } from '@angular/core';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { from } from 'rxjs';
import { ApiService } from 'src/app/API.service';
import { Job, columns } from '../dashboard.constants';
import { AddNewJobComponent } from 'src/app/shared/add-new-job/add-new-job.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotations',
  templateUrl: './quotations.component.html',
  styleUrls: ['./quotations.component.scss']
})
export class QuotationsComponent {

// component state starts from here
isEditMode:boolean = false;
checked: boolean = false;
archiveIcon = faArchive;
deleteSVG;
isAnyRowSelected : boolean = false;
searchText:string='';
filteredQuotationJobs  ;
selectedJob:Job;
ref: DynamicDialogRef | undefined;
quotationJobs : Job[] = [];
extensionToken;

   
QuotationStatus = [ 
  { name: 'Quote Sent', code: 'Qu' },
  { name: 'Job Confirmed', code: 'Jo' },
];
// columns list of jobs table 
cols =  columns;
 
constructor(private modalService: DialogService, private messageService: MessageService , private apiService:ApiService, private toastr:ToastrService){

}

ngOnInit() {
  from(this.apiService.readJobs()).subscribe((response:any)=>{
    console.log("All Archived jobs  +=======>",response);
    this.quotationJobs = response?.data.allJobs.filter((job)=>!job.isArchived && !job.isActive);
    this.filteredQuotationJobs = [...this.quotationJobs];  
   }) ;

   this.extensionToken = localStorage.getItem("token");
}

// get status colors 
getSeverity(status: string): string {
  switch (status) {
    case 'Quote Sent':
      return 'warning';
 
    case 'Job Confirmed':
      return 'success';
    default:
      return '';
  }
}
clearFilter(){}

 


selectRow(selectedRow:any){
  this.isAnyRowSelected = ! this.isAnyRowSelected;
  this.selectedJob = selectedRow.checked[selectedRow.checked.length-1];
  console.log("selected JOb",this.selectedJob);

}

formatDate(date){
 return moment(date).format("DD-MMM-YYYY");
}

onSearch() {
  // Implement your search logic using this.searchKeyword
  const keyword = this.searchText.toLowerCase();
  this.filteredQuotationJobs = this.quotationJobs.filter(item => 
    item.client.toLowerCase().includes(keyword) || 
    item.contact.toLowerCase().includes(keyword)|| 
    item.site.toLowerCase().includes(keyword)|| 
    item.status.toLowerCase().includes(keyword)
  );
}
 


deleteJob(){
  const idx = this.filteredQuotationJobs.findIndex((job)=>job._id === this.selectedJob._id);
  if(idx > -1){
    this.filteredQuotationJobs.splice(idx,1);
    this.isAnyRowSelected = false;
    this.apiService.deleteJob(this.selectedJob);
    this.toastr.success("Job deleted successfully");
  }
}

 



addNewJob(){

  this.ref = this.modalService.open(AddNewJobComponent,  {
    header: 'Add New Quotation',
    width: '70vw',
    height:'75vh',
    modal:true,
    data:{
      source:"Quotations",
      isEdit:false,
      status:this.QuotationStatus,
    }

})

this.ref.onClose.subscribe(async(job:any) => {
  if(job?.isSubmitted){
    const newJob = {
      client: job?.client,
      contact: job?.contact,
      invoiceTo: job?.invoiceTo,
      site: job?.site,
      dateUp: this.formatDate(job?.dateUp) ,
      tenderPrice: job?.tenderPrice,
      overHireAmount: job?.overHireAmount,
      weeklyHirePeriod: job?.weeklyHirePeriod,
      endDate: this.formatDate( job?.endDate),
      invoiced: job?.invoiced?.length?true:false,
      overHireInvoicedTo: job?.overHireInvoicedTo,
      status: job?.status?.name,
      handoverSigned: job?.handoverSigned?.length?true:false,
      notes:job?.notes,
      isArchived:false,
      isActive:false
    }
    
    
       const res = await this.apiService.createJob(newJob);
       if(res){
        this.filteredQuotationJobs.push(res.data.newJob);
        this.toastr.success("Job added successfully");
       }

 
  }
 
});

}

editJob(){

 
 this.selectedJob.dateUp = this.formatDate(this.selectedJob.dateUp);
 this.selectedJob.endDate = this.formatDate(this.selectedJob.endDate);
  
 
  this.ref = this.modalService.open(AddNewJobComponent,  {
    header: 'Update Quotation',
    width: '70vw',
    height:'75vh',
    modal:true,
    data:{
      source:"Quotations",
      isEdit:true,
      status:this.QuotationStatus,
      jobToBeUpdated:this.selectedJob
    }
 
    
})

this.ref.onClose.subscribe(async(job:any) => {
   console.log("Final job",job);
  if(job?.isSubmitted){
    const updatedJob = {
      _id: job._id,
      client: job?.client,
      contact: job?.contact,
      invoiceTo: job?.invoiceTo,
      site: job?.site,
      dateUp: this.formatDate(job?.dateUp) ,
      tenderPrice: job?.tenderPrice,
      overHireAmount: job?.overHireAmount,
      weeklyHirePeriod: job?.weeklyHirePeriod,
      endDate: this.formatDate( job?.endDate),
      invoiced: job?.invoiced?.length?true:false,
      overHireInvoicedTo: job?.overHireInvoicedTo,
      status: job?.status?.name,
      handoverSigned: job?.handoverSigned?.length?true:false,
      notes:job?.notes,
      isArchived:false,
      isActive:job.status.name === 'Job Confirmed'?true:false
    }

    const res= await this.apiService.updateJob('',updatedJob);

    console.log("Updated quote job =====>",res);

    const idx = this.filteredQuotationJobs.findIndex((job)=>job._id === this.selectedJob._id);

    if(res.data.newUpdatedJob){
      this.filteredQuotationJobs[idx] = res.data.newUpdatedJob;
          
      this.toastr.success("Job Updated successfully");
    }


      if(res.data.newUpdatedJob.isActive){
          if(idx > -1){
            this.filteredQuotationJobs.splice(idx,1);
        }
      }
 
      

  }
   
   this.isAnyRowSelected = false;
   this.checked = false;
});
}
 
copyExtensionToken() {
  const textArea = document.createElement('textarea');
  textArea.value = this.extensionToken;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
 this.toastr.success("Token Copied Successfully")
}
}
