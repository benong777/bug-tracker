import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  
  constructor(private authService: AuthService,
              private router: Router) { }

  canActivate(): boolean {
    //-- If token is present (logged in)
    if (this.authService.loggedIn()) {
      return true;
    } 
    //-- If not logged in, go to the Login page
    else {
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
