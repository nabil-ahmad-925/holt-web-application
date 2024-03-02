import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'current-directory';
  isAuthenticated :boolean = false;
  constructor(private authService:AuthService, private router:Router){} 

  ngOnInit(): void {

    this.authService.getLoggedInObservable().subscribe((isLoggedIn) => {
      this.isAuthenticated  = isLoggedIn;
    });

    this.isAuthenticated =  this.authService.isLoggedIn();

   if(!this.isAuthenticated){
       this.router.navigate(['/login']);
   } 
 
  }

 

  
}
