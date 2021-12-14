import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  bugsArr: [] = [];
  projectsArr: [] = [];
  projectNames: string[] = [];

  constructor(private apiService: ApiService) { }

  getBugs() {
    return this.apiService.getBugs();
  }

  getProjects() {
    return this.apiService.getProject();
  }

  getLogs(idBug: number) {
    // console.log("idBug from dataService: ", idBug);
    return this.apiService.getComment(idBug);
  }

  addComments(idProject: number, idBug: number, notes: string) {
    // this.apiService.addBug(this.newIdProject, this.newBugTitle, this.newBugDescription, this.newAssignedTo)
    //     .subscribe(res => {
    //         console.log("Frontend - added new bug: ", this.newBugTitle);
    //         alert("The new bug has been added!");
    //         this.getAllBugs();
    //         // Reset variables (needed?)
    //         this.newIdProject = 0;
    //         this.newBugTitle = '';
    //         this.newAssignedTo = '';
    //         this.isAddingBugMode = false;

    //     },
    //     err => {
    //         console.log("Frontend: ERROR adding new bug. ", err);
    //         this.isAddingBugMode = false;

    //     });
  };
}
