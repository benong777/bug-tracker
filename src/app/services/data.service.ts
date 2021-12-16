import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  bugsArr: [] = [];
  projectsArr: [] = [];
  projectNames: string[] = [];

  currUser: string = '';

  constructor(private apiService: ApiService) { }

  getUser() {
    return this.apiService.getUser();
  }

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
    return this.apiService.addComment(idProject, idBug, notes);
  };

  editComments(idComment: number, notes: string) {
    return this.apiService.editComment(idComment, notes);
  }
}
