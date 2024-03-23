import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/API.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  password!: string;
  email!: string;

  constructor(private authService:AuthService,private router:Router ,private apiService:ApiService, private toastr : ToastrService){}




  async login(){

    try{
      const response = await this.apiService.login(this.email,this.password);
      console.log("res=====>Login",response);

      if(response.data.status === 200){
        this.toastr.success("Logged In Sucessfully");
      }

      localStorage.setItem("token",response.data.accessToken);
      localStorage.setItem("refresh-token",response.data.refreshToken);
      
      this.authService.loggedInSubject.next(true); // Notify observers about the login
   
      if(response.data.token){
      this.router.navigate(['/dashboard'])
    }

    }catch(e){
      if(e.response.status === 401){
        this.toastr.error("Invalid crdentials ..")
      }
       
    }
   
  
  }

  signUp(){
    
    this.authService.isSignUpClicked.next(true);
    this.router.navigate(['/signup'])
  }


}
