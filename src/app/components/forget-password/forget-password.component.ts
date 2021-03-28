import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {UserService} from '../../services/UserServices/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  ForgetForm:FormGroup
 
  constructor(private formBuilder:FormBuilder,private userSevice: UserService) { 
    this.ForgetForm = this.formBuilder.group(
      {
        email: ['', Validators.required]
      }
    );   
  } 

  ngOnInit(): void {
  }

  forget(){

    let reqData ={
      Email: this.ForgetForm.get('email')?.value,
    }

    if(this.ForgetForm.valid){
      this.userSevice.ForgetPassword(reqData).subscribe(
        (response: any) => {
          console.log(response);
        });
    } 
  }
}
