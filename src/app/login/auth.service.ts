import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


//-- Can add the 'providers' in the app.module.ts instead of here
@Injectable({providedIn: 'root'})

export class AuthService {

    constructor(private http: HttpClient) { }

    onSignUp(email: string, password: string) {
        return this.http.post('http://localhost:3000/register/', 
                                { fname: 'superman',
                                lname: 'kent',
                                email: email,
                                password: password,
                                deleted_flag: '0' }); 
            
    }

    // onLogin(email: string, password: string) {
    //     this.http.post('http://localhost:3000/register/');
    // }

}