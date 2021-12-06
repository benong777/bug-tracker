import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { BugComponent } from './bug/bug.component';
import { ProfileComponent } from './profile/profile.component';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { AuthService } from './login/auth.service';
import { AuthGuardGuard } from './auth-guard.guard';
import { ProjectComponent } from './project/project.component';


const appRoutes: Routes = [
    // { path: '', component: HomeComponent },
    // If no path provided, redirect to /home
    { path: '',   redirectTo: '/bug', 
                  pathMatch: 'full', },
//  { path: 'home',             component: HomeComponent   },
    { path: 'user',             component: UsersComponent,
                                canActivate: [AuthGuardGuard] },
    { path: 'user/:id/:name',   component: UserComponent,   
                                canActivate: [AuthGuardGuard] },
    { path: 'profile',          component: ProfileComponent,
                                canActivate: [AuthGuardGuard] },
    { path: 'project',          component: ProjectComponent,
                                canActivate: [AuthGuardGuard] },
    { path: 'bug',              component: BugComponent,
                                canActivate: [AuthGuardGuard] },
    { path: 'bug/:id',          component: BugComponent,    
                                canActivate: [AuthGuardGuard] },

    { path: 'login',            component: LoginComponent  },
    { path: 'signup',           component: SignupComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    UserComponent,
    BugComponent,
    ProfileComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthService,
               AuthGuardGuard, 
               {
                  provide: HTTP_INTERCEPTORS,
                  useClass: TokenInterceptorService,
                  //-- Allow multiple interceptors
                  multi: true
               }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
