import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
        //-- Add Login Mode logic here
    } else {    //-- Sign Up Mode
        this.authService.onSignUp(email, password)
            .subscribe(
                responseData => {
                    console.log(responseData);
                    this.isLoading = false;
                }, 
                error => {
                    console.log(error);
                    this.error = 'An error occurred!';
                    this.isLoading = false;
                }
            );
    }
    
    form.reset();
  }

  // onLogin() {
  //     this.router.navigate(['/users']);
  // }

}
