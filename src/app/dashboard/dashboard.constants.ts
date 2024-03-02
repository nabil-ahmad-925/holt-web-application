export interface Job {
    _id:string;
    client: string;
    contact: string;
    invoiceTo: string;
    site: string;
    dateUp: string;
    tenderPrice: string;
    overHireAmount: string;
    weeklyHirePeriod: number;
    endDate: string;
    invoiced: boolean;
    overHireInvoicedTo: string;
    status: 'COMPLETED' | 'PENDING' | 'INPROGRESS';
    handoverSigned: boolean;
    notes:string;
    isArchived:boolean;
  }
  
  export const columns = [
    { field: 'client', header: 'Client' },
    { field: 'contact', header: 'Contact' },
    { field: 'invoiceTo', header: 'Invoice To' },
    { field: 'site', header: 'Site' },
    { field: 'dateUp', header: 'Date Up' },
    { field: 'tenderPrice', header: 'Tender Price' },
    { field: 'overHireAmount', header: 'Over Hire Amount' },
    { field: 'weeklyHirePeriod', header: 'Weekly Hire Period' },
    { field: 'endDate', header: 'End Date' },
    { field: 'invoiced', header: 'Invoiced' },
    { field: 'overHireInvoicedTo', header: 'Over Hire Invoiced To' },
    { field: 'status', header: 'Status' },
    { field: 'handoverSigned', header: 'Handover Signed' },
  ];
  
  