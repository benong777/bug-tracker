import { HttpClient } from '@angular/common/http';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})


export class BugComponent implements OnInit {
  bugsObj: {} = {};
  testArray: [] = [];
  isLoading = false;

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    //-- GET all bugs whenever this page/route loads
    this.getAllBugs();
  }

  //-- For ALL (GET/POST/PUT/DELETE/...), you need the subscribe to send the request
  onSubmitBug(bugData: {  fname: string, 
                          lname: string, 
                          email: string, 
                          password: Blob } ) {
    this.http.post('http://localhost:3000/register/', 
          { fname: bugData.fname,
            lname: bugData.lname,
            email: bugData.email,
            password: bugData.password,
            deleted_flag: '0' }) 
      .subscribe(responseData => { 
          console.log(responseData);
      });
  }

  onUpdateBug(id: string, bugData: {  fname: string,
                                      lname: string, 
                                      email: string, 
                                      password: Blob }) {
      this.http.put('http://localhost:3000/users/' + id, 
                    { fname: bugData.fname,
                      lname: bugData.lname,
                      email: bugData.email,
                      password: bugData.password,
                      deleted_flag: '0' }) 
            .subscribe(responseData => {
                console.log(responseData);
            });
  }

  onGetBug(id: string ) {
      this.http.get('http://localhost:3000/users/' + id) 
          .subscribe(responseData => { 
              console.log(responseData);
          });
  }

  onGetAllBugs() {
    this.getAllBugs();
  }

  private getAllBugs() {
    this.isLoading = true;
    this.http.get('http://localhost:3000/users/') 
        .subscribe(responseData => { 
            this.bugsObj = responseData;
            console.log(responseData);
            this.isLoading = false;
        });    
  }

  onGetAllArray() {
    this.http.get('http://localhost:3000/users/') 
        // .pipe( map(responseData => {
        //     const bugsArray = [];
        //     for (const key in responseData) {
        //       if (responseData.hasOwnProperty(key)) {
        //         bugsArray.push(responseData[key]);
        //       }
        //     }
        //  })
        //  return bugsArray;
        // )
        .subscribe(responseData => { 
            this.bugsObj = responseData;
            console.log(responseData);
        });   
  }

  onDisplayObj() {
    console.log(this.bugsObj);
  }

  onDeleteBug(id: string) {
      this.http.delete('http://localhost:3000/users/' + id )
          .subscribe(responseData => {
              console.log(responseData);
          });
      console.log('Bug deleted');
  }
}
