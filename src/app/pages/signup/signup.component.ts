import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';

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

  constructor( private location: Location, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSignup() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    
    this.authService.signup(email,password).then(cred=>{
        //console.log(cred);
    }).catch(error=>{
      console.error(error);
    })
  }

  goBack() {
    this.location.back();
  }
}
