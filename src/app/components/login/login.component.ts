import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,} from '@angular/forms';
import {UserService} from '../../services/UserServices/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isActive: boolean;
  loginForm:FormGroup
 
  constructor(private formBuilder:FormBuilder, private userSevice:UserService) { 
    this.loginForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, 
          Validators.pattern('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*$')
        ]),
        password:  new FormControl('', [Validators.required, 
          Validators.pattern('^(?=.{8,20}$)(?=.*[\\d])(?=.*[A-Z])[\\w]*[\\W][\\w]*$')
        ]),}
    );   
    this.isActive = true;
 
  } 
  ngOnInit(): void {
  }
  TogglePassword(){
    this.isActive = this.isActive ? false : true 
  }
  
  login(){

    let reqData ={
      Email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    console.log('login calling', reqData);
    if(this.loginForm.valid){
      this.userSevice.login(reqData).subscribe(
        (response: any) => {
          console.log(response['token']);
          localStorage.setItem('FunDooNotesJWT', response['token']);
        });
    } 
  }
}
