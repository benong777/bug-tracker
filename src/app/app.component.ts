//-- Q's
//-- When getting all bugs vs getting the bugs for a particular user..
//-- Do you handle it all in the backend or do you grab all the data
//-- and then select the data you're interested in the frontend?

import { Component, OnInit } from '@angular/core';
import { AuthService } from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'bug-tracker';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
      // this.isLoggedIn = this.authService.isLoggedIn;
  }

  //-- Need to create these methods since authService is PRIVATE and can't be accessed
  //-- from the HTML.  So can either make it public OR create the methods here and 
  //-- keep it private.
  isLoggedIn() {
    return this.authService.loggedIn();
  }

  onLogout() {
      this.authService.logout();
  }
}
