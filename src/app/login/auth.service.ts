import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


//-- Can add the 'providers' in the app.module.ts instead of here
// @Injectable({providedIn: 'root'})
@Injectable()


export class AuthService {
    private registerUrl = 'http://localhost:3000/register';
    private loginUrl    = 'http://localhost:3000/login';
    private bugUrl   = 'http://localhost:3000/bug';
    private commentUrl   = 'http://localhost:3000/comment';

    isLoggedIn = false;

    constructor(private http: HttpClient,
                private router: Router) { }

    onSignUp(email: string, password: string) {
        return this.http.post(this.registerUrl, 
                              { fName: 'Clark',
                                lName: 'Kent',
                                email: email,
                                password: password,
                                deletedFlag: 0 }); 
            
    }

    onLogin(email: string, password: string) {
        return this.http.post<any>(this.loginUrl,
                              { email: email, password: password });
    }

    // registerUser(user) {
    //     return this.http.post<any>(this.registerUrl, user);
    // }

    // loginUser(user) {
    //     // return this.http.post<any>(this.loginUrl, user);
    // }
    loginUser(email: string, password: string) {
        return this.http.post<any>( this.loginUrl, 
                                    { email: email, password: password });
    }

    loggedIn() {
        //-- The !! will return true/false: will return true if token exists
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getBugs() {
        return this.http.get<any>( this.bugUrl);
    }

    logout() {
        return localStorage.removeItem('token');
        // this.isLoggedIn = false;
        this.router.navigate(['/home']);
    }
}