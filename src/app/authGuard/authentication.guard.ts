import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UserService } from '../services/UserServices/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private UserServices : UserService, private Router : Router){
    
  }

  canActivate(): boolean
  {
    if(this.UserServices.authenticateUser())
    {
      return true;
    } 
    this.Router.navigate(['/login']);
    return false;
  }  
}
