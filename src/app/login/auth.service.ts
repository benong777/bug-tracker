import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

//-- Can add the 'providers' in the app.module.ts instead of here
// @Injectable({providedIn: 'root'})
@Injectable()


export class AuthService {
    private registerUrl = 'http://localhost:3000/register';
    private loginUrl    = 'http://localhost:3000/login';
    private projectUrl  = 'http://localhost:3000/project';
    private bugUrl      = 'http://localhost:3000/bug';
    private commentUrl  = 'http://localhost:3000/comment';

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

    loginUser(email: string, password: string) {
        return this.http.post<any>( this.loginUrl, 
                                    { email: email, password: password });
    }

    submitComment(idProject: number, idBug: number, notes: string) {
        console.log("Comment submitted!",   'idProj: ', idProject,
                                            'idBug: ', idBug,
                                            'notes: ', notes);
        const token = this.getToken();
        console.log(token);

        return this.http.post(  this.commentUrl, 
                                {   idProject: idProject, 
                                    idBug: idBug, 
                                    notes: notes });
        console.log("Submit completed!");
    }


    loggedIn() {
        //-- The !! will return true/false (true if token exists)
        return !!localStorage.getItem('token');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    getProject() {
        return this.http.get<any>(this.projectUrl);
    }

    getBugs() {
        return this.http.get<any>(this.bugUrl);
    }

    submitBug() {
        
    }

    logout() {
        this.router.navigate(['']);
        this.isLoggedIn = false;
        return localStorage.removeItem('token');
    }
}