import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { BugComponent } from './bug/bug.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
//  { path: 'home',             component: HomeComponent   },
    { path: 'users',            component: UsersComponent  },
    { path: 'users/:id/:name',  component: UserComponent   },
    { path: 'login',            component: LoginComponent  },
    { path: 'signup',           component: SignupComponent },
    { path: 'bug',              component: BugComponent    },
    { path: 'bug/:id',          component: BugComponent    }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    UsersComponent,
    UserComponent,
    BugComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
