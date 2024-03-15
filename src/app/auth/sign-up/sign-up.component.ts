import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/API.service';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  password!: string;
  email!: string;
  confirmPassword: string = '';

  constructor(private authService:AuthService,private router:Router ,private apiService:ApiService, private toastr:ToastrService){}

  async login(){
    this.authService.isSignUpClicked.next(false);
    this.router.navigate(['/login']);

  }

  async signUp(){
    try{
      if(this.password !== this.confirmPassword){
      this.toastr.error("Password and Confirm Password not matched");
      return
      }
      const response = await this.apiService.signup(this.email,this.password);
      if(response.status === 201){
        this.toastr.success("User Created successfully");
      }

      this.authService.isSignUpClicked.next(false);
      this.router.navigate(['/login']);
    }catch(e){
      if(e.response.status === 409){
        this.toastr.error("User email alreasy exists..")
      }
       

    }

  }


}