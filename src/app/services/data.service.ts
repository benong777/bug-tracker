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
}
