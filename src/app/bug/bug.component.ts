import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { AuthGuardGuard } from '../auth-guard.guard';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})


export class BugComponent implements OnInit {
  bugObj: {} = {};
  projects: {} = {};
  bugArray: [] = [];

  projectArr: [] = [];
  projectNames: string [] = [];
  projectIds: number [] = [];

  projectBugNames: [] = [];

  bugNames: string[] = [];
  bugIds: number[] = [];

  isLoading = false;
  error: string;
  selectedProject: string = 'Select Project';
  selectedIdProject: number = 0;

  selectedBug: string = 'Select Bug';

  constructor(  private http: HttpClient,
                private router: Router,
                private authService: AuthService )  { }
    

  ngOnInit(): void {
    //-- GET all bugs whenever this page/route loads
    this.getAllBugs();
    this.getAllProjects();
    // this.onSelectProject('TE');
  }

  onSelectProject(projectName: string) {
    console.log('Project selected: ', projectName);
    console.log('projectArr', this.projectArr);
    this.selectedProject = 'Project: ' + projectName;
    console.log('Selected project: ', this.selectedProject);

    //-- Get Project ID
    for (let i=0; i<this.projectArr.length; i++) {
        console.log('Project name: ', this.projectArr[i]['projectName']);
        if (this.projectArr[i]['projectName'] === projectName) {
            console.log('Match found');
             this.selectedIdProject = this.projectArr[i]['idProject'];
             break;
        }
    }
    console.log('Selected idProject: ', this.selectedIdProject);
    //-- Grab all bugs for selected project
    this.getProjectBugs(projectName);
  }

  getProjectBugs(projectName: string) {
    // console.log('Beginning bug array: ', this.bugArray);
    this.projectBugNames = [];
    this.bugArray.forEach(element => {
        if (element['projectName'] === projectName) {
          // console.log(element['projectName'], element['bugTitle']);
          this.projectBugNames.push(element['bugTitle']);
        }
    });
    console.log('Final projectBugNames: ', this.projectBugNames);
  }

  onSelectBug(bugName: string) {
      this.selectedBug = 'Bug: ' + bugName;
  }

  private getAllProjects() {
    this.isLoading = true;
    this.projects = this.authService.getProject()
                        .subscribe(
                            res => { 
                                console.log('Got all projects');
                                // Grab all objects' project names and put into an array
                                console.log('res.data: ', res.data);
                                this.projectArr = res.data;
                                this.projectNames = this.projectArr.map( projectObj => {
                                    return projectObj['projectName'];
                                });
                                console.log('projectNames:', this.projectNames);
                                this.isLoading = false;
                            },
                            err => {
                                console.log('Error getting projects!');
                                this.isLoading = false;
                            });
  }

  onGetAllBugs() {
    this.getAllBugs();
  }

  private getAllBugs() {
    this.isLoading = true;
    this.authService.getBugs()
        .subscribe(
            res => { 
                this.bugArray = res.data;
                console.log('Getting all bugs');
                console.log(this.bugArray);
                this.isLoading = false;
            },
            err => {
                console.log('Error getting bugs!');
                this.isLoading = false;
            }
    );    
  }

  onSubmitComment(formComment: NgForm) {
      this.isLoading = true;
      console.log(formComment.value);
      const idProject = formComment.value.idProject;
      const idBug = formComment.value.idBug;
      const notes = formComment.value.notes;

      this.authService.submitComment(idProject, idBug, notes)
          .subscribe(
              res => {
                  console.log("Success! Comment added");
                  this.isLoading = false;
              },
              err => {
                  console.log(err);
                  this.isLoading = false;
              });
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
    console.log(this.bugObj);
  }

  onDeleteBug(id: string) {
      // this.http.delete('http://localhost:3000/users/' + id )
      //     .subscribe(responseData => {
      //         console.log(responseData);
      //     });
      console.log('Bug deleted');
  }
}
