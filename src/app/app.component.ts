import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  loggedInUser?: firebase.default.User | null;

  constructor(private router: Router, private authService: AuthService) {
    // parameter adattagok
  }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      //console.log(user);
      this.loggedInUser = user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }
  title = 'menetrend';

}
