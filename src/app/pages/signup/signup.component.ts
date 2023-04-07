import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
signup() {
}

  signUpForm = new FormGroup({
    signemail: new FormControl,
    signpassword: new FormControl,
    signrePassword : new FormControl
  })

  constructor( private location: Location){

  }
  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.signUpForm.value);
    
  }

  goBack(){
    this.location.back();
  }
}
