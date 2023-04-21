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
  loginForm : any;
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
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });

    // check if the user is logged in
    this.authService.isUserLoggedIn().subscribe(user => {
      this.loggedInUser = user;
    },error =>{
        console.error(error);
    })


    this.feedbackForm = new FormGroup({
      content: new FormControl('', Validators.required),
    });
  }

  async login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .then(cred => {
          this.router.navigateByUrl('/contact');
        })
        .catch(error => {
          alert("Hibás bejelentkezési adatok");
        });
    }
  }
  async submitFeedback() {
    //console.log('katt');
    if (this.feedbackForm.valid) {
      const feedback: Feedback = {
        id: '',
        user_id: this.loggedInUser?.uid ?? '',
        content: this.feedbackForm.get('content')?.value,
        date_submitted: new Date(),
      };
      this.feedbackService.create(feedback).then(() => {
        this.router.navigateByUrl('/profile');
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }


}
