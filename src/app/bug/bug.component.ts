import { HttpClient } from '@angular/common/http';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NodeWithI18n } from '@angular/compiler';


@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})


export class BugComponent implements OnInit {
  bugsObj: {} = {};
  testArray: [] = [];
  isLoading = false;
  error: string;

  constructor(  private http: HttpClient,
                private router: Router )  { }
    

  ngOnInit(): void {
    //-- GET all bugs whenever this page/route loads
    this.getAllBugs();
  }

  //-- For ALL (GET/POST/PUT/DELETE/...), you need the subscribe to send the request
  submitBug(title: string, description: string) {
    console.log('Submitting bug!');
    console.log({title: title, description: description});
    // return this.http.post('http://localhost:3000/login',
                        //   { email: email, password: password });
    // const loginData = this.http.post('http://localhost:3000/bug',
    //                       { idUser: 4,
    //                         idProject: 1,
    //                         title: title, 
    //                         description: description });
    // console.log('Login data returned: ', loginData);
    // return loginData;
    // return  this.http.post('http://localhost:3000/login',
    //                         { email: email, password: password });

    const loginData = this.http.get('http://localhost:3000/comment');
                                console.log('Login data returned: ', loginData);
                                return loginData;
  }

  onSubmitBug(form: NgForm) {
    if (!form.valid) {
      console.log("Submitted form is not valid"); // for debugging
      return;
    }
    console.log(form.value);
    const title = form.value.bugTitle;
    const description = form.value.bugDescription;

    this.submitBug(title, description)
        .subscribe(
            res => {
                console.log("Login successful!");
                console.log(res);
                //-- Get the token string for the localStorage
                // const tokenStr = JSON.stringify(res).split('"');
                // localStorage.setItem('token', tokenStr[3]);
                // this.isLoading = false;
                // this.router.navigate(['/user']);
            }, 
            error => {
                console.log(error);
                this.error = 'Error submitting bug!';
                this.isLoading = false;
            }
    );
                          
    // this.http.post('http://localhost:3000/bug/', 
    //       { idUser: 4,
    //         idProject: 1,
    //         bugTitle: title,
    //         bugDescription: description,
    //         deleted_flag: '0' }) 
    //   .subscribe(responseData => { 
    //       console.log(responseData);
    //   });
  }

  onUpdateBug(id: string, bugData: {  fname: string,
                                      lname: string, 
                                      email: string, 
                                      password: Blob }) {
      // this.http.put('http://localhost:3000/users/' + id, 
      //               { fname: bugData.fname,
      //                 lname: bugData.lname,
      //                 email: bugData.email,
      //                 password: bugData.password,
      //                 deleted_flag: '0' }) 
      //       .subscribe(responseData => {
      //           console.log(responseData);
      //       });
  }

  onGetBug(id: string ) {
      // this.http.get('http://localhost:3000/users/' + id) 
      //     .subscribe(responseData => { 
      //         console.log(responseData);
      //     });
  }

  onGetAllBugs() {
    this.getAllBugs();
  }

  private getAllBugs() {
    // this.isLoading = true;
    // this.http.get('http://localhost:3000/users/') 
    //     .subscribe(responseData => { 
    //         this.bugsObj = responseData;
    //         console.log(responseData);
    //         this.isLoading = false;
    //     });    
  }

  onGetAllArray() {
    // this.http.get('http://localhost:3000/users/') 
    //     // .pipe( map(responseData => {
    //     //     const bugsArray = [];
    //     //     for (const key in responseData) {
    //     //       if (responseData.hasOwnProperty(key)) {
    //     //         bugsArray.push(responseData[key]);
    //     //       }
    //     //     }
    //     //  })
    //     //  return bugsArray;
    //     // )
    //     .subscribe(responseData => { 
    //         this.bugsObj = responseData;
    //         console.log(responseData);
    //     });   
  }

  onDisplayObj() {
    console.log(this.bugsObj);
  }

  onDeleteBug(id: string) {
      // this.http.delete('http://localhost:3000/users/' + id )
      //     .subscribe(responseData => {
      //         console.log(responseData);
      //     });
      console.log('Bug deleted');
  }
}
