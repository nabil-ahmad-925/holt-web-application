import { Injectable } from '@angular/core';
 
import { Router } from '@angular/router';
import axios from 'axios';
import { Observable, Observer, Subject, Subscription, timer } from 'rxjs';
import { ApiService } from '../API.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedInSubject = new Subject<boolean>();
  public isSignUpClicked = new Subject<boolean>();

  private tokenExpirationThreshold = 3600; // in seconds, 1 hour
  private tokenRefreshInterval = 3600000; // in milliseconds, 1 hour
  private tokenRefreshSubscription: Subscription;


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
    localStorage.removeItem("refresh-token");
    if (this.tokenRefreshSubscription) {
      this.tokenRefreshSubscription.unsubscribe();
    }
    this.router.navigate(['/login']);
    this.loggedInSubject.next(false); // Notify observers about the login
  }

  isLoggedIn(){
    return localStorage.getItem("token")?true:false;
  }

  getLoggedInObservable() {
    return this.loggedInSubject.asObservable();
  }


  refreshToken(){
 
      this.apiService.refreshToken().then((response: any) => {
        console.log("new token is coming ============++>")
        const newToken = response.data.accessToken;
        localStorage.setItem('token', newToken);

      }).catch((error: any) => {
        const res = error.response;
        if(res.status === 401 && res.data.message.includes("expired") ){
          console.log("refresh token expired ------>FR---->");

          this.logout();
        }
       
      });
 
  }

 



  startTokenRefreshPolling(): void {
    this.tokenRefreshSubscription = timer(0, this.tokenRefreshInterval).subscribe(() => {

      console.log("Pooling from FE ..........");
      
      // Retrieve token from local storage
      const token = localStorage.getItem('token');
      
      // Check if token exists
      if (!token) {
        console.error('No token found in local storage.');
        return;
      }
  
      // Decode the token
      let decodedToken;
      try {
        decodedToken = this.decodeToken(token);
        console.log("deode---token",decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
        return;
      }
  
      // Check if decoding was successful and if the token has an expiration time
      if (!decodedToken || !decodedToken.exp) {
        console.error('Unable to decode token or expiration time missing.');
        return;
      }
  
      // Get the current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);
      
      // Extract expiration time from decoded token
      const tokenExpirationTime = decodedToken.exp;
      
      // Check if token is expired or about to expire
      if (tokenExpirationTime - currentTime <= this.tokenExpirationThreshold) {
        console.log("Toke is near to expire---->")
        // Token needs to be refreshed
        this.refreshToken();
      }
    });
  }

  // Helper function to decode JWT token
private decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decoded = JSON.parse(atob(base64));
    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
  
  

}
