import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedInSubject = new Subject<boolean>();
  constructor(private router: Router) { }

  async login(payload):Promise<any> {
    try {
      
    
      // Additional logic for handling successful login
    } catch (error) {
      console.error('Login failed:', error);
      // Additional logic for handling login failure
    }
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
    this.loggedInSubject.next(false); // Notify observers about the login
  }

  isLoggedIn(){
    return localStorage.getItem("token")?true:false;
  }

  getLoggedInObservable() {
    return this.loggedInSubject.asObservable();
  }

}
