import { HttpClient } from '@angular/common/http';
import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
// import { HttpClientModule } from '@angular/common/http'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})

export class BugComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
  }

  onSubmitBug(bugData: {  fname: string, 
                          lname: string, 
                          email: string, 
                          password: Blob } ) {
    this.http.post('http://localhost:3000/register/', 
          { fname: bugData.fname,
            lname: bugData.lname,
            email: bugData.email,
            password: bugData.password,
            deleted_flag: '0'
          }) 
      .subscribe(responseData => { 
          console.log(responseData);
      });
  }

onGetBug( ) {
    this.http.get('http://localhost:3000/users/') 
        .subscribe(responseData => { 
        console.log(responseData);
        });
}

////-- Works
// onDeleteBug(num: number) {
//     this.http.delete('http://localhost:3000/users/10/' )
//       .subscribe(responseData => {
//           console.log(responseData);
//       });
//     console.log('Bug deleted');
// }

  onDeleteBug(num: string) {
  // onDeleteBug() {
      // this.http.delete('http://localhost:3000/users/12/' )
      this.http.delete('http://localhost:3000/users/' + num )

        .subscribe(responseData => {
            console.log(responseData);
        });
      console.log('Bug deleted');
  }
}
