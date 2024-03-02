import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/API.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password!: string;
  email!: string;

  constructor(private authService:AuthService,private router:Router ,private apiService:ApiService){}




  async login(){

    const response = await this.apiService.login(this.email,this.password)
    localStorage.setItem("token",response.data.token);
    this.authService.loggedInSubject.next(true); // Notify observers about the login
 
    if(response.data.token){
    this.router.navigate(['/dashboard'])
   }
  
  }


}
