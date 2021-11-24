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

  loginUserData = { email: '', password: ''};
  isLoginMode = true;
  isLoading = false;
  error: string;

  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  // onLoginUser(){
  //   console.log(this.loginUserData);
  // this.authService.loginUser(this.loginUserData);
  // }
  onLoginUser(){
    console.log(this.loginUserData);
    this.authService.loginUser(this.loginUserData.email, this.loginUserData.password)
        .subscribe(
            res => {
              console.log('Login successful: ', res)
              //-- Get the token string for the localStorage
              const tokenStr = JSON.stringify(res).split('"');
              console.log('TOKEN: ', tokenStr[3]);
              localStorage.setItem('token', tokenStr[3]);
              this.isLoading = false;
              this.authService.isLoggedIn = true;
              this.router.navigate(['/bug']);
            },
            err => {
              console.log(err);
              console.log('Email or password incorrect: ', err)
            }
        );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      console.log("Submitted form is not valid"); // for debugging
      return;
    }
    // console.log(form.value);
    const email = form.value.email;
    const password = form.value.password;
    console.log('Submitted data is valid');
    console.log('Email: ', email);
    console.log('Password: ', password);

    this.isLoading = true;
    if (this.isLoginMode) {
        console.log('In LOGIN Mode!');
        //-- Add Login Mode logic here
        this.authService.onLogin(email, password)
            .subscribe(
                res => {
                    console.log("Login successful!");
                    //-- Get the token string for the localStorage
                    const tokenStr = JSON.stringify(res).split('"');
                    localStorage.setItem('token', tokenStr[3]);
                    this.isLoading = false;
                    this.router.navigate(['/users']);
                }, 
                error => {
                    console.log(error);
                    this.error = 'Email or password is incorrect!';
                    this.isLoading = false;
                }
            );
        // this.router.navigate(['/users']);
    } else {    //-- Sign Up Mode
        this.authService.onSignUp(email, password)
            .subscribe(
                res => {
                    console.log(res);
                    localStorage.setItem('token', res.toLocaleString());
                    this.isLoading = false;
                    this.router.navigate(['/bug']);
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
}
