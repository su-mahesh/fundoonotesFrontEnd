import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { from } from 'rxjs';
import {UserService} from '../../services/UserServices/user.service';
//import {AppRoutingModule} from '../../app-routing.module';
import { Router, RouterStateSnapshot, ActivatedRoute, Params  } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
 // public id: string;
  public isActive: boolean;
  public token: string;
  resetPassword:FormGroup;
  constructor(private formBuilder:FormBuilder,private Service : UserService,
    private activatedRoute: ActivatedRoute) { 
    
    this.resetPassword = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }
    );   
    this.isActive = true;
    this.token = '';
  } 
  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
      localStorage.setItem('FunDooNotesJWT', this.token);
    });
  }
  
  ResetPassword(){
    let reqData ={
      NewPassword: this.resetPassword.get('password')?.value
    }
    this.Service.resetPassword(reqData).subscribe(
      (response: any) => {
        console.log(response);
      });
  }
}
