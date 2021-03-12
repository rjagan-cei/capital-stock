import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const userBasePath = '/api/v2/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  baseURL: string;

  constructor(private httpClient: HttpClient) { 
    this.baseURL = `http://${window.location.hostname}:8001` + userBasePath;
    console.log(this.baseURL);  
  }

  createUser(data): Observable<any> {
    return this.httpClient.post(this.baseURL, data);
  }

  authenticateUser(email: any, password: any) : Observable<any> {
    let params = new HttpParams();
    params = params.append('username', email);
    params = params.append('password', password);
    return this.httpClient.get(this.baseURL, {params: params});
  }
}