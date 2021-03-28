import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BaseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  post(url: any, data : any, headers: any)
  {
    if(headers != null)
    {return this.http.post(this.BaseUrl + url, data, headers);}
    return this.http.post(this.BaseUrl + url, data);
  }
}
