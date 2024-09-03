import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // GET request
  getData(endpoint: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token here
    });
    return this.http.get(`${this.baseUrl}/${endpoint}`, { headers });
  }

  // POST request with Authorization header
  postData(endpoint: string, data: any): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Include the token here
    });
    return this.http.post(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

  login(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/users/login`, data, { headers });
  }
}
