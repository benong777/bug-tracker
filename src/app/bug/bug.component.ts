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
      console.log("Submitted form is not valid");
      return;
    }
    this.newIdProject = form.value.idProject;
    this.newBugTitle = form.value.bugTitle;
    this.newAssignedTo = form.value.assignedTo;
    this.newBugDescription = form.value.bugDescription;

    this.apiService.addBug(this.newIdProject, this.newBugTitle, this.newBugDescription, this.newAssignedTo)
        .subscribe(res => {
            console.log("Frontend - added new bug: ", this.newBugTitle);
            alert("The new bug has been added!");
            this.getAllBugs();
            // Reset variables
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
    console.log('DeleteBug btn pressed - frontend');
    this.apiService.deleteBug(idBug)
        .subscribe(res => {
            this.getAllBugs();
            console.log('Delete completed - frontend');
        },
        err => {
            console.log('ERROR deleting idBug: ', idBug);
        });
  }

  getProjects() {
    return this.apiService.getProject()
        .subscribe(
            res => {
                this.projectsArr = res.data;
                this.dataService.projectsArr = this.projectsArr;
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
  }

  onSelectBugRow(index: number) {
    console.log('Index: ', index);
    this.router.navigate(['/comment', index]);
  }

}
