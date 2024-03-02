import { Component, OnInit } from '@angular/core';
import { Job, columns } from '../dashboard.constants';
import {   faArchive } from '@fortawesome/free-solid-svg-icons';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddNewJobComponent } from 'src/app/shared/add-new-job/add-new-job.component';
import { MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';
import * as moment from 'moment';
import { ApiService } from 'src/app/API.service';
import { from } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-active-jobs',
  templateUrl: './active-jobs.component.html',
  styleUrls: ['./active-jobs.component.scss']
})
export class ActiveJobsComponent implements OnInit {

// component state starts from here
isEditMode:boolean = false;
checked: boolean = false;
archiveIcon = faArchive;
isAnyRowSelected : boolean = false;
searchText:string='';
filteredActiveJobs ;
selectedJob:Job;
ref: DynamicDialogRef | undefined;
  activeJobs : Job[] = []
// columns list of jobs table 
cols =  columns;

 activeJobsStatus = [ 
  { name: 'COMPLETED', code: 'CO' },
  { name: 'PENDING', code: 'PE' },
  { name: 'INPROGRESS', code: 'IN' },
];

constructor(private modalService: DialogService, private apiService:ApiService,private toastr:ToastrService){}

ngOnInit() {

 from(this.apiService.readJobs()).subscribe((response)=>{
  console.log("All Jobs +=======>",response);
  this.activeJobs = response.data.allJobs.filter((job)=>!job.isArchived && job.isActive);

  const formattedJobs = this.activeJobs.map((job)=>{
    return{
      ...job,
      'endDate':this.formatDate(job.endDate),
      'dateUp':this.formatDate(job.dateUp)
    }
  })
  this.filteredActiveJobs = [...formattedJobs];  
 }) ;
 




  
}

// get status colors 
getSeverity(status: string): string {
  switch (status) {
    case 'INPROGRESS':
      return 'warning';
    case 'PENDING':
      return 'danger';
    case 'COMPLETED':
      return 'success';
    default:
      return '';
  }
}
clearFilter(){}

addNewJob(){

  this.ref = this.modalService.open(AddNewJobComponent,  {
    header: 'Add New Job',
    width: '70vw',
    height:'75vh',
    modal:true,
    data:{
      source:"Add",
      isEdit:false,
      status:this.activeJobsStatus
    }
})

this.ref.onClose.subscribe(async (job:any) => {
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
      isActive:true
    }
     
        this.toastr.info("Adding new job");
       const res = await this.apiService.createJob(newJob);
       console.log("Saved job===>",res);
        this.filteredActiveJobs.push(res.data.newJob);
        if(res){
          this.toastr.success("New job added successfully");
        }


  }
 
});

}


selectRow(selectedRow:any){
  this.isAnyRowSelected = ! this.isAnyRowSelected;
  this.selectedJob = selectedRow.checked[selectedRow.checked.length-1];
  console.log("selected JOb",this.selectedJob);
}



formatDate(date){
 return moment(date).format("DD-MMM-YYYY");
}

onSearch() {
 
  const keyword = this.searchText.toLowerCase();
  this.filteredActiveJobs = this.activeJobs.filter(item => 
    item.client.toLowerCase().includes(keyword) || 
    item.contact.toLowerCase().includes(keyword)|| 
    item.site.toLowerCase().includes(keyword)|| 
    item.status.toLowerCase().includes(keyword)||
    item.invoiceTo.toLowerCase().includes(keyword)
  );
}

editJob(){


 this.selectedJob.dateUp = this.formatDate(this.selectedJob.dateUp);
 this.selectedJob.endDate = this.formatDate(this.selectedJob.endDate);
  
 
  this.ref = this.modalService.open(AddNewJobComponent,  {
    header: 'Update Job',
    width: '70vw',
    height:'75vh',
    modal:true,
    data:{
      source:"Add",
      isEdit:true,
      status:this.activeJobsStatus,
      jobToBeUpdated:this.selectedJob
    }
 
})

this.ref.onClose.subscribe(async(job:any) => {
   console.log("Final job",job);
  if(job?.isSubmitted){
    const updatedJob:Job = {
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
      isArchived:false
    }

 
        const res =await  this.apiService.updateJob('',updatedJob);
        console.log("data updated res-===========++>",res)
        if(res.data.newUpdatedJob){
          const idx = this.filteredActiveJobs.findIndex((job)=>job._id === this.selectedJob._id);
          if(idx > -1){
            this.filteredActiveJobs[idx] = res.data.newUpdatedJob;
          }
  
          this.toastr.success("Job updated successfully");
        }
     
  }
   
   this.isAnyRowSelected = false;
   this.checked = false;
});
}


deleteJob(){

  const idx = this.filteredActiveJobs.findIndex((job)=>job._id === this.selectedJob._id);
  if(idx > -1){
    this.filteredActiveJobs.splice(idx,1);
    this.isAnyRowSelected = false;
    this.apiService.deleteJob(this.selectedJob);
    this.toastr.success("Job deleted successfully");
  }

}

archiveJob(){
  const idx = this.filteredActiveJobs.findIndex((job)=>job._id === this.selectedJob._id);
  if(idx > -1){
    this.filteredActiveJobs.splice(idx,1);
    this.isAnyRowSelected = false;
 
       this.selectedJob.isArchived = true;
       this.apiService.archiveJob(this.selectedJob);
       this.toastr.success("Job archived successfully");
  }

}



}
