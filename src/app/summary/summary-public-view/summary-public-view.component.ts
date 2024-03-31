import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ApiService } from 'src/app/API.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-summary-public-view',
  templateUrl: './summary-public-view.component.html',
  styleUrls: ['./summary-public-view.component.scss']
})
export class SummaryPublicViewComponent implements OnInit {
 
  navbarOpen = false;
  cities: City[];
  summaries = [];
  summariesList = [];
  currentVideoId = 'VFEwxHoPw68'
  currentTitle:string = '';
  constructor(public apiService:ApiService){
  }

  selectedCity: City;

 async ngOnInit() {

  from(this.apiService.getAllSummaries()).subscribe((res)=>{
   
    this.summaries = res.data.summaries;
    this.summariesList = this.summaries.map((summary)=>{
      return{
        ...summary,
        name:summary.title,
        code:summary.videoid
      }
    });
    console.log(this.summariesList);

    this.currentVideoId = this.summariesList[0].code;
    this.currentTitle = this.summariesList[0].title;
    this.selectedCity = this.summariesList[0].title;

    }) ;

  
   

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  changeSummary(summary){
    console.log("sumary=====>",summary)
    this.currentVideoId = summary.code;
    this.currentTitle = summary.title;
  }

}
