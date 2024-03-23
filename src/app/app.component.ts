import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Location } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'current-directory';
  isAuthenticated :boolean = false;
  isSignedUp:boolean = false;
  constructor(private authService:AuthService, private router:Router,private location: Location) {}
 
 

  ngOnInit(): void {

    this.authService.startTokenRefreshPolling();
    
    this.authService.getLoggedInObservable().subscribe((isLoggedIn) => {
      this.isAuthenticated  = isLoggedIn;
    });

    this.authService.isSignUpClicked.subscribe((signup)=>{
       console.log("signup");
       this.isSignedUp = signup;
    })
    // Retrieve the current URL
   
    this.isAuthenticated =  this.authService.isLoggedIn();
 
   if(!this.isAuthenticated ){
       this.router.navigate(['/login']);
   } 
 
  }

   

 

  
}
