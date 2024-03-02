import { Component, OnInit } from '@angular/core';
import { Job, columns } from '../dashboard.constants';
import {   faArchive } from '@fortawesome/free-solid-svg-icons';
 
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
 
import { MessageService } from 'primeng/api';
 
import * as moment from 'moment';
import { from } from 'rxjs';
import { ApiService } from 'src/app/API.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-archive-jobs',
  templateUrl: './archive-jobs.component.html',
  styleUrls: ['./archive-jobs.component.scss']
})
export class ArchiveJobsComponent implements OnInit{

// component state starts from here
isEditMode:boolean = false;
checked: boolean = false;
archiveIcon = faArchive;
deleteSVG;
isAnyRowSelected : boolean = false;
searchText:string='';
filteredArchiveJobs  ;
selectedJob:Job;
ref: DynamicDialogRef | undefined;
archiveJobs : Job[] = [];

// columns list of jobs table 
cols =  columns;
 
constructor(private modalService: DialogService,   private apiService:ApiService, private toastr:ToastrService){

}

ngOnInit() {
  from(this.apiService.readJobs()).subscribe((response:any)=>{
    console.log("All Archived jobs  +=======>",response);
    this.archiveJobs = response?.data.allJobs.filter((job)=>job.isArchived);

    const formattedJobs = this.archiveJobs.map((job)=>{
      return{
        ...job,
        'endDate':this.formatDate(job.endDate),
        'dateUp':this.formatDate(job.dateUp)
      }
    })
    this.filteredArchiveJobs = [...formattedJobs];  
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
  this.filteredArchiveJobs = this.archiveJobs.filter(item => 
    item.client.toLowerCase().includes(keyword) || 
    item.contact.toLowerCase().includes(keyword)|| 
    item.site.toLowerCase().includes(keyword)|| 
    item.status.toLowerCase().includes(keyword)
  );
}
 


deleteJob(){
  const idx = this.filteredArchiveJobs.findIndex((job)=>job._id === this.selectedJob._id);
  if(idx > -1){
    this.filteredArchiveJobs.splice(idx,1);
    this.isAnyRowSelected = false;
    this.apiService.deleteJob(this.selectedJob);
    this.toastr.success("Job deleted successfully");
  }
}


unArchiveJob(){
  const idx = this.filteredArchiveJobs.findIndex((job)=>job._id === this.selectedJob._id);
  this.filteredArchiveJobs.splice(idx,1);
  this.isAnyRowSelected = false;
 
  this.selectedJob.isArchived = false;
  this.apiService.unArchiveJob(this.selectedJob);
  this.toastr.success("Job unarchived successfully");

}

}
