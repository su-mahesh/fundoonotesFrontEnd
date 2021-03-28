import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {UserService} from '../../services/UserServices/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
MatSnackBarConfig,
MatSnackBarHorizontalPosition,
MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  ForgetForm:FormGroup

  public EmailTld: string = '@gmail.com';
  action: boolean = false;
  setAutoHide: boolean = false;
  autoHide: number = 10000;
  constructor(private formBuilder:FormBuilder,private userSevice: UserService,
    public snackBar: MatSnackBar, private route: Router) { 
    this.ForgetForm = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, 
          Validators.pattern('^[a-zA-Z0-9]+([._+-][a-zA-Z0-9]+)*$')
        ])
      }
    );   
  } 

  ngOnInit(): void {
  }
  openSnackBar(message: string, duration: number) {
    let config = new MatSnackBarConfig();

    config.duration = duration == 0 ? this.autoHide : duration;
    this.snackBar.open(message, undefined, config);
  }
  forget(){

    if(this.ForgetForm.valid){
      let reqData ={
        Email: this.ForgetForm.get('email')?.value+this.EmailTld,
      }
      this.userSevice.ForgetPassword(reqData).subscribe(
        (response: any) => {
          this.openSnackBar('password reset link has been sent to registered email', 2000);
        },
        error => {
          console.log(error['error']['message']);
          this.openSnackBar('sending password reset link failed : '+error['error']['message'], 2000,);
        });
    } 
  }
}
