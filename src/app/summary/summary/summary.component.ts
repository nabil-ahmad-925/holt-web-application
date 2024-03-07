import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { from } from 'rxjs';
import { ApiService } from 'src/app/API.service';
import { AddNewJobComponent } from 'src/app/shared/add-new-job/add-new-job.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  summaries = [{
    id: 1000,
    name: 'James Butt',
    country: {
        name: 'Algeria',
        code: 'dz'
    },
    company: 'Benton, John B Jr',
    date: '2015-09-13',
    status: 'unqualified',
    verified: true,
    activity: 17,
    representative: {
        name: 'Ioni Bowcher',
        image: 'ionibowcher.png'
    },
    balance: 70663
}];

searchText;
ref: DynamicDialogRef | undefined;
  representatives;

  statuses!: any[];
  filteredSummaries;
  loading: boolean = true;

  activityValues: number[] = [0, 100];

  constructor(private apiService: ApiService,private modalService: DialogService, private toastr:ToastrService) {}

  async ngOnInit() {

  from(this.apiService.getAllSummaries()).subscribe((res)=>{
    this.summaries =     res.data.summaries  
    this.filteredSummaries = [...this.summaries]
    console.log("SUmmaries ===>",this.summaries);
    this.loading = false;
  })

      // this.customerService.getCustomersLarge().then((customers) => {
      //     this.customers = customers;
      //     this.loading = false;

      //     this.customers.forEach((customer) => (customer.date = new Date(<Date>customer.date)));
      // });

      this.representatives = [
          { name: 'Amy Elsner', image: 'amyelsner.png' },
          { name: 'Anna Fali', image: 'annafali.png' },
          { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
          { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
          { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
          { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
          { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
          { name: 'Onyama Limba', image: 'onyamalimba.png' },
          { name: 'Stephen Shaw', image: 'stephenshaw.png' },
          { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
      ];

      this.statuses = [
          { label: 'Unqualified', value: 'unqualified' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'New', value: 'new' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Renewal', value: 'renewal' },
          { label: 'Proposal', value: 'proposal' }
      ];

  
  }

  clear(table: Table) {
      table.clear();
  }

  filter(){}

  getSeverity(status: string) {
    switch (status.toLowerCase()) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;

        default:
            return 'default';
    }
}


onSearch() {
 
  const keyword = this.searchText.toLowerCase();
  // this.filteredSummaries = this.summaries.filter(item => 
  //   item.name.toLowerCase().includes(keyword) || 
  //   item.status.toLowerCase().includes(keyword) 
  // );

}

openSummaryModal(data){
  console.log("Modal summary",data);
  this.ref = this.modalService.open(AddNewJobComponent,  {
    header: 'Add New Job',
    width: '70vw',
    height:'75vh',
    modal:true,
    data:data
})
}

}
