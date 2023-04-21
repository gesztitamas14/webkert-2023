import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { Feedback } from '../../shared/models/Feedback';
import { FeedbackService } from '../../shared/services/feedback.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedInUser?: firebase.default.User | null;
  userFeedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;



  constructor(
    private router: Router,
    private authService: AuthService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
        localStorage.setItem('user', JSON.stringify(this.loggedInUser));
        if (this.loggedInUser) {
          this.feedbackService.getAll().subscribe((feedbacks) => {
            this.userFeedbacks = feedbacks.filter(
              (f) => f.user_id === this.loggedInUser?.uid
            );
          });
        }
      },
      (error) => {
        console.error(error);
        localStorage.setItem('user', JSON.stringify('null'));
      }
    );
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigateByUrl('/main');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  deleteComment(feedback: Feedback) {
    this.feedbackService.delete(feedback.id)
      .then(() => {
        console.log('Comment deleted successfully');
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateComment(feedback: Feedback) {

    if (this.selectedFeedback) {
      const updatedComment: Feedback = { ...this.selectedFeedback, content: feedback.content };
      this.feedbackService.update(updatedComment)
        .then(() => {
          console.log('Comment updated successfully');
          this.selectedFeedback = null;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  

  editComment(comment: Feedback) {
    this.selectedFeedback = comment;
    //console.log(comment);
    //console.log(this.selectedComment)
    
  }
  
  

  cancelUpdate(){
    this.selectedFeedback = null;
    this.router.navigateByUrl('/profile');
  }
  
}
