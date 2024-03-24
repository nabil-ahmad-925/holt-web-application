// api.service.ts

import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl; // Replace with your API base URL

  constructor() {}

  // Function to perform a login using a Promise
  public login(email: string, password: string): Promise<any> {
    const url = `${this.baseUrl}/login`;
    const data = { email, password };
    return this.sendRequest({ method: 'post', url, data });
  }

    // Function to perform a login using a Promise
    public async signup(email: string, password: string): Promise<any> {
 
        const url = `${this.baseUrl}/signup`;
        const data = { email, password };
         return  this.sendRequest({ method: 'post', url, data });
       
    
    }

  // Function to read jobs using a Promise
    public readJobs(): Promise<any> {
      const url = `${this.baseUrl}/jobs/active/read`;
      return this.sendRequest({ method: 'get', url});
  }
  

  // Function to create a job using a Promise
  public createJob(jobData: any): Promise<any> {
    const url = `${this.baseUrl}/jobs/active/create`;
    return this.sendRequest({ method: 'post', url, data: jobData });
}


  // Function to update a job using a Promise
  public updateJob(jobId: string, updatedJobData: any): Promise<any> {
    jobId = '567567876787787874567887656789';
    const url = `${this.baseUrl}/jobs/active/update`;
    return this.sendRequest({ method: 'put', url, data: updatedJobData });
  }

    // Function to update a job using a Promise
    public deleteJob(deleteJob:any): Promise<any> {
      const url = `${this.baseUrl}/jobs/active/delete`;
      return this.sendRequest({ method: 'delete', url, data: deleteJob });
    }

      // Function to archiive a job using a Promise
  public archiveJob(archiveJobData: any): Promise<any> {
    const url = `${this.baseUrl}/jobs/active/archive`;
    return this.sendRequest({ method: 'put', url, data: archiveJobData });
  }

        // Function to archiive a job using a Promise
  public unArchiveJob(unArchiveJobData: any): Promise<any> {
    const url = `${this.baseUrl}/jobs/active/unArchive`;
    return this.sendRequest({ method: 'put', url, data: unArchiveJobData });
  }

    // Function to archiive a job using a Promise
    public getAllSummaries( ): Promise<any> {
      const url = `${this.baseUrl}/summaries`;
      return this.sendRequest({ method: 'get', url});
    }


    public refreshToken(): Promise<any> {
      const url = `${this.baseUrl}/refresh-token`;
      const refreshToken = localStorage.getItem('refresh-token');
      console.log("sending refresh token to BE.........")

      return this.sendRequest({ method: 'post', url, data: { refreshToken } });
    }


  private sendRequest(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return axios(config);
  }
}
