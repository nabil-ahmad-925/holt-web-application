// axios-interceptor.ts

import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from wherever you store it (e.g., localStorage)
    const token = localStorage.getItem('token');
    
    // Add the token to the headers
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
