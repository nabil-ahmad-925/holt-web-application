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
summary;
transcript;
summaryData: any = {}; // Your summary data object
transcriptSections;
summarySections: { title: string; points: string[] }[] = [];

  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, private config: DynamicDialogConfig , private toastr:ToastrService) { }

  ngOnInit(): void {
   
    const modalInputData = this.config.data;
    if (modalInputData) {
      this.summary = modalInputData.summary;
      this.transcript = modalInputData.transcript;

      const summaryData = {};
      const sections = this.summary.match(/\*\*([^*]+)\*\*/g);

      sections.forEach((section, index) => {
        const sectionName = section.replace(/\*\*/g, '');
        const nextSectionIndex =
          index + 1 < sections.length ? this.summary.indexOf(sections[index + 1]) : this.summary.length;
        const sectionContent = this.summary.substring(this.summary.indexOf(section) + section.length, nextSectionIndex).trim();

        const points = sectionContent.split('\n* ').map(point => point.trim());
        summaryData[sectionName] = points;
      });

      console.log("Sum dara +===", summaryData);

      // Convert the data into an array for easier rendering in the template
      this.summarySections = Object.keys(summaryData).map((section) => ({
        title: section,
        points: summaryData[section],
      }));

      console.log("Sec", this.summarySections);
      
      if (!Array.isArray(this.transcript)) {
          this.transcript = JSON.parse(this.transcript);
      }

      // Inside your component
  this.transcriptSections = [
  {
    title: modalInputData.title,
    points: this.transcript
  }
  // Add more sections if needed
];
    }
  }

  onSubmit() {
    this.ref.close('this.formGroup.value');
  }

  }
 
