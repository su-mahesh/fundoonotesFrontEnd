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
//  autoHide: number = 10000;
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
    if (duration != 0)
    {
      config.duration = duration; 
    }
    this.snackBar.open(message, undefined, config);
  }
  forget(){

    if(this.ForgetForm.valid){
      this.openSnackBar('processing', 0); 
      let reqData ={
        Email: this.ForgetForm.get('email')?.value+this.EmailTld,
      }
      this.userSevice.ForgetPassword(reqData).subscribe(
        (response: any) => {
          this.openSnackBar('password reset link has been sent to your registered email', 2000);
        },
        error => {
          if(error['status'] == 0){
            this.openSnackBar('Sending password reset link failed: server offline', 2000,);
          }
          else{
            this.openSnackBar('Sending password reset link failed: '+error['error']['message'], 2000);
          }
        });
    } 
  }
}
