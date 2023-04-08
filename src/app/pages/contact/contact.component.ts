import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FeedbackService } from '../../shared/services/feedback.service';
import { Feedback } from 'src/app/shared/models/Feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  feedbackForm: any;
  loginForm : any; // declare a variable to hold the form instance
  loggedInUser?: firebase.default.User |null;



  constructor(private feedbackService: FeedbackService,   private router: Router, private authService: AuthService) {}

  logout(){
    this.authService.logout().then(()=>{
      //console.log('Logged out succesfully')
    }).catch(error=>{
      console.error(error);
    });
  }

  ngOnInit(): void {
    // create the form group and its form controls
    this.loginForm = new FormGroup({
      email: new FormControl(''), // add email form control with validation
      password: new FormControl('') // add password form control with validation
    });

    // check if the user is logged in
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    },error =>{
        console.error(error);
    })


    this.feedbackForm = new FormGroup({
      content: new FormControl('', Validators.required), // add content form control with validation
    });
  }

  async login() {
    if (this.loginForm.valid) { // check if the form is valid
      const { email, password } = this.loginForm.value; // get the email and password values from the form
      this.authService.login(email, password) // call the login method on the auth service with email and password
        .then(cred => { // if the login was successful
          //console.log(cred); log the credential
          this.router.navigateByUrl('/contact'); // navigate to the main page
        })
        .catch(error => { // if there was an error with the login
          console.error(error); // log the error
        });
    }
  }
  async submitFeedback() {
    console.log('katt');
    if (this.feedbackForm.valid) {
      const feedback: Feedback = {
        id: '',
        user_id: this.loggedInUser?.uid ?? '',
        content: this.feedbackForm.get('content')?.value,
        date_submitted: new Date(),
      };
      this.feedbackService.create(feedback).then(() => {
        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  

}
