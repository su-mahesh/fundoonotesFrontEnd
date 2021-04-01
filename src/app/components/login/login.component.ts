import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,} from '@angular/forms';
import {UserService} from '../../services/UserServices/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  MatSnackBarConfig,
MatSnackBarHorizontalPosition,
MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
 // encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public isActive: boolean;
  loginForm:FormGroup
  public EmailTld: string = '@gmail.com';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private formBuilder:FormBuilder, private userSevice:UserService,
    public snackBar: MatSnackBar, private route: Router) { 
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
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }

  login(){

    if(this.loginForm.valid){
      this.openSnackBar('Login in...', 0);
      let reqData ={
        Email: this.loginForm.get('email')?.value+this.EmailTld,
        password: this.loginForm.get('password')?.value
      }
      this.userSevice.login(reqData).subscribe(
        (response: any) => {
          localStorage.setItem('FunDooNotesJWT', response['token']);
          this.openSnackBar('Login success', 2000);
          this.route.navigate(['Dashboard']);
        },
        error => {
          try {
            if(error['status'] == 0){
              this.openSnackBar('Login failed: server offline', 2000,);
            }
            else{
              this.openSnackBar('Login failed: '+error['error']['message'], 2000);
            }
            } 
            catch (error) {
          }
        });
    } 
  }
}
