import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import axios from 'axios';
import { Observable, Observer, Subject, timer } from 'rxjs';
import { ApiService } from '../API.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public loggedInSubject = new Subject<boolean>();
  public isSignUpClicked = new Subject<boolean>();

  private tokenExpirationThreshold = 3600; // in seconds, 1 hour
  private tokenRefreshInterval = 1000; // in milliseconds, 1 hour


  constructor(private router: Router,private apiService:ApiService) { }

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


  refreshToken(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      this.apiService.refreshToken().then((response: any) => {
        const newToken = response.data.token;
        const newRefreshToken = response.data.refreshToken;
        localStorage.setItem('token', newToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        observer.next(newToken);
        observer.complete();
      }).catch((error: any) => {
        observer.error(error);
      });
    });
  }

 

  startTokenRefreshPolling(): void {
    timer(0, this.tokenRefreshInterval).subscribe(() => {
      const tokenExpirationTime = parseInt(localStorage.getItem('tokenExpirationTime') || '0', 10);
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenExpirationTime - currentTime <= this.tokenExpirationThreshold) {
        this.refreshToken().subscribe({
          next: newToken => {
            console.log('Token refreshed:', newToken);
          },
          error: error => {
            console.error('Error refreshing token:', error);
          },
          complete: () => {} // Empty function for complete parameter
        });
      }
    });
  }
  
  

}
