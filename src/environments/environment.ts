// src/environments/environment.ts

export enum ApiUrls {
    LocalBaseUrl = 'http://localhost:3000',
    DevBaseUrl = 'https://dev.scafolding.com',
  }
  
  export const environment = {
    production: false,
    apiUrl: ApiUrls.LocalBaseUrl,
  };
  