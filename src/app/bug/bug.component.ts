import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})


export class BugComponent implements OnInit {

  isLoading: boolean = false;
  isAddingBugMode: boolean = false;
  bugsArr: [] = [];
  projectsArr: [] = [];
  newBugTitle: string = '';
  // newProjectName: string = '';
  newIdProject: number = 0;
  newAssignedTo: string = '';
  newBugDescription: string = '';

  selectedProject: string = '';
  selectedIdProject: number = 0;
  projectNames: string [] = [];



  bugObj: {} = {};
  projects: {} = {};
  bugArray: [] = [];

  projectArr: [] = [];
  projectIds: number [] = [];

  projectBugNames: [] = [];

  bugNames: string[] = [];
  bugIds: number[] = [];

  

  selectedBug: string = 'Select Bug';

  constructor(  private http: HttpClient,
                private router: Router,
                private dataService: DataService,
                private apiService: ApiService,
                private authService: AuthService )  { }
    

  ngOnInit(): void {
    //-- Initialize projects array
    this.projectsArr = this.dataService.projectsArr;
    //-- GET all bugs whenever this page/route loads
    this.getAllBugs();
    this.getProjects();
  }

  getAllBugs() {
    this.isLoading = true;
    this.authService.getBugs()
        .subscribe(
            res => { 
                this.bugsArr = res.data;
                console.log('Getting all bugs');
                console.log('bugsArr: ', this.bugsArr);
                this.dataService.bugsArr = this.bugsArr;
                this.isLoading = false;
            },
            err => {
                console.log('Error getting bugs!');
                this.isLoading = false;
            }
    );    
  }

  onAddBugMode() {
      this.isAddingBugMode = true;
  }

  onCancelAddBug() {
    this.isAddingBugMode = false;
  }

  onSubmitBug(form: NgForm) {
    if (!form.valid) {
      console.log("Submitted form is not valid"); // for debugging
      return;
    }
    this.newIdProject = form.value.idProject; // Need these variables??
    this.newBugTitle = form.value.bugTitle;
    this.newAssignedTo = form.value.assignedTo;
    this.newBugDescription = form.value.bugDescription;

    // console.log('idProject: ', this.newIdProject);
    // console.log('bugName: ', this.newBugTitle);
    // console.log('assignedTo: ', this.newAssignedTo);
    // console.log('bugDescription: ', this.newBugDescription);

    this.apiService.addBug(this.newIdProject, this.newBugTitle, this.newBugDescription, this.newAssignedTo)
        .subscribe(res => {
            console.log("Frontend - added new bug: ", this.newBugTitle);
            alert("The new bug has been added!");
            this.getAllBugs();
            // Reset variables (needed?)
            this.newIdProject = 0;
            this.newBugTitle = '';
            this.newAssignedTo = '';
            this.isAddingBugMode = false;
        },
        err => {
            console.log("Frontend: ERROR adding new bug. ", err);
            this.isAddingBugMode = false;

        });
  }

  onDeleteBug(idBug: number) {
    this.apiService.deleteBug(idBug)
        .subscribe(res => {
            console.log('idBug deleted: ', idBug);
            this.getAllBugs();
        },
        err => {
            console.log('ERROR deleting idBug: ', idBug);
        });
  }

  // getProjectNames(projectsArr: []) {
  //   this.projectNames = this.projectsArr.map( projectObj => {
  //       return projectObj['projectName'];
  //   });
  //   this.dataService.projectNames = this.projectNames;
  // }

  getProjects() {
    return this.apiService.getProject()
        .subscribe(
            res => {
                this.projectsArr = res.data;
                this.dataService.projectsArr = this.projectsArr;
                console.log('ProjectsArr from apiService: ', this.projectsArr);
            },
            err => {
                console.log('Get projects ERROR in apiService: ', err);
            }
        );
  }

  onSelectProject(projectName: string, idProject: number) {
    this.selectedProject = 'Project: ' + projectName;
    this.selectedIdProject = idProject;

    this.projectsArr = this.dataService.projectsArr;
    console.log('projectsArr: ', this.projectsArr);

    // //-- Grab all bugs for selected project
    // this.getProjectBugs(projectName);
  }

  onSelectBugRow(index: number) {
    console.log('Index: ', index);
    this.router.navigate(['/comment', index]);
  }



  //===========================================================================

  // onSelectProject(projectName: string) {
  //   console.log('Project selected: ', projectName);
  //   console.log('projectArr', this.projectArr);
  //   this.selectedProject = 'Project: ' + projectName;
  //   console.log('Selected project: ', this.selectedProject);

  //   //-- Get Project ID
  //   for (let i=0; i<this.projectArr.length; i++) {
  //       console.log('Project name: ', this.projectArr[i]['projectName']);
  //       if (this.projectArr[i]['projectName'] === projectName) {
  //           console.log('Match found');
  //            this.selectedIdProject = this.projectArr[i]['idProject'];
  //            break;
  //       }
  //   }
  //   console.log('Selected idProject: ', this.selectedIdProject);
  //   //-- Grab all bugs for selected project
  //   this.getProjectBugs(projectName);
  // }

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

  // onGetAllBugs() {
  //   this.getAllBugs();
  // }

  // private getAllBugs() {
  //   this.isLoading = true;
  //   this.authService.getBugs()
  //       .subscribe(
  //           res => { 
  //               this.bugArray = res.data;
  //               console.log('Getting all bugs');
  //               console.log(this.bugArray);
  //               this.isLoading = false;
  //           },
  //           err => {
  //               console.log('Error getting bugs!');
  //               this.isLoading = false;
  //           }
  //   );    
  // }

  onSubmitComment(formComment: NgForm) {
      this.isLoading = true;
      console.log(formComment.value);
      const idProject = formComment.value.idProject;
      const idBug = formComment.value.idBug;
      const notes = formComment.value.notes;

      this.authService.submitComment(idProject, idBug, notes)
          .subscribe(
              res => {
                  console.log("Front-end - Success! Comment added");
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

  // onSubmitBug(form: NgForm) {
  //   if (!form.valid) {
  //     console.log("Submitted form is not valid"); // for debugging
  //     return;
  //   }
  //   console.log(form.value);
  //   const title = form.value.bugTitle;
  //   const description = form.value.bugDescription;

  //   this.submitBug(title, description)
  //       .subscribe(
  //           res => {
  //               console.log("Login successful!");
  //               console.log(res);
  //               //-- Get the token string for the localStorage
  //               // const tokenStr = JSON.stringify(res).split('"');
  //               // localStorage.setItem('token', tokenStr[3]);
  //               // this.isLoading = false;
  //               // this.router.navigate(['/user']);
  //           }, 
  //           error => {
  //               console.log(error);
  //               this.error = 'Error submitting bug!';
  //               this.isLoading = false;
  //           }
  //   );
                          
  //   // this.http.post('http://localhost:3000/bug/', 
  //   //       { idUser: 4,
  //   //         idProject: 1,
  //   //         bugTitle: title,
  //   //         bugDescription: description,
  //   //         deleted_flag: '0' }) 
  //   //   .subscribe(responseData => { 
  //   //       console.log(responseData);
  //   //   });
  // }

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

  // onDeleteBug(id: string) {
  //     // this.http.delete('http://localhost:3000/users/' + id )
  //     //     .subscribe(responseData => {
  //     //         console.log(responseData);
  //     //     });
  //     console.log('Bug deleted');
  // }
}
