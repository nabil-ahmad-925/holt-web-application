import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { marked} from 'marked';

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
formattedSummary;
markedSummary;
markedTranscript;
  constructor(private fb: FormBuilder, public ref: DynamicDialogRef, private config: DynamicDialogConfig , private toastr:ToastrService) { }

  ngOnInit(): void {
   
    const modalInputData = this.config.data;
    
      if (modalInputData) {
        
        this.markedSummary = marked(modalInputData.summary) ;
        this.transcript = modalInputData.transcript;

        if (!Array.isArray(this.transcript)) {
          this.transcript = JSON.parse(this.transcript); // Corrected typo
        }

        // Process transcript for UI display
        this.markedTranscript = this.transcript.map(object => {
          const formattedObject = {
            startTime: object.start,
            text: marked(object.text), // Apply marked for rich text formatting within the object
          };
          return formattedObject;
        });

    }
  }

 

  onSubmit() {
    this.ref.close('this.formGroup.value');
  }

  }
 
