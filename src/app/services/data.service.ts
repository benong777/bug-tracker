import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  bugsArr: [] = [];
  projectsArr: [] = [];
  projectNames: string[] = [];

  returnStr: string = '';

  constructor(private apiService: ApiService) { }

  // getProjects() {
  //   return this.apiService.getProject()
  //       .subscribe(
  //           res => {
  //               this.projectsArr = res.data;
  //               console.log('ProjectsArr from dataService: ', this.projectsArr);
  //           },
  //           err => {
  //               console.log('Get projects ERROR in dataService: ', err);
  //           }
  //       );
  // }
}
