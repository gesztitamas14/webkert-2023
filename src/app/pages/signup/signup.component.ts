import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormControl(''),
    isAdmin: new FormControl(false)
  });

  constructor(private userService: UserService, private location: Location, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSignup() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    
    this.authService.signup(email,password).then(cred=>{
        //console.log(cred);
        //console.log( this.signUpForm.get('isAdmin')?.value as boolean);
        
        const user: User = {
          id:cred.user?.uid as string,
          name: this.signUpForm.get('name')?.value as string,
          email: this.signUpForm.get('email')?.value as string,
          isAdmin: this.signUpForm.get('isAdmin')?.value as boolean
        };
        //TODO insert
        this.userService.create(user).then(_ =>{
          //console.log('User added successfully');
          this.router.navigateByUrl('/contact');
        }).catch(error=>{
          console.error(error);
        })
    }).catch(error=>{
      console.error(error);
    })
  }

  goBack() {
    this.location.back();
  }
}
