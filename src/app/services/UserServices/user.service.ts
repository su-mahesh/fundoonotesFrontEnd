import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../HttpServices/http.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService : HttpService) { }

  registerUser(data: any){
    
    return this.httpService.post('Account/RegisterUser', data, null);
  }

  login(data: any){

    return this.httpService.post('Account/Login', data, null);
  }

  resetPassword(data: any){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT'));  
    let options = { headers: headers };
    return this.httpService.post('Account/ResetPassword', data, options );
  }

  ForgetPassword(data: any){
    return this.httpService.post('Account/ForgetPassword', data, null );
  }
}
