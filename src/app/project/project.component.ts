import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  newProjectName: string = '';
  projectsArr: [] = [];
  isAddingProjectMode = false;

  constructor(private apiService: ApiService,
              private dataService: DataService) { }

  ngOnInit(): void {
      this.getProjects();
  }

  getProjects() {
    this.apiService.getProject()
        .subscribe(
            res => {
                console.log('Projects received: ', res.data);
                this.projectsArr = res.data;
                this.dataService.projectsArr = this.projectsArr;
                console.log('ProjectsArr: ', this.projectsArr);
            },
            err => {
                console.log('Get projects ERROR: ', err);
            }
        );
  }

  onDeleteProject(idProject: number) {
      console.log('idProject: ', idProject);
      this.apiService.deleteProject(idProject)
          .subscribe(
              res => {
                  console.log('Frontend: Project deleted!');
                  this.getProjects(); // Update page
              },
              err => {
                  console.log('Frontend: Error deleting project');
              }
          );
  }

  onAddProjectMode() {
    this.isAddingProjectMode = true;
    console.log("isAddingProjectMode: ", this.isAddingProjectMode);
  }

  onSubmitProject(form: NgForm) {
    this.newProjectName = form.value.projectName;
    console.log('projectName: ', this.newProjectName);
    this.apiService.addProject(this.newProjectName)
        .subscribe(res => {
            console.log("Frontend - added new project: ", this.newProjectName);
            this.getProjects();
            this.newProjectName = '';   // reset name
        },
        err => {
            console.log("Frontend: ERROR adding new project. ", err);
        });
    this.isAddingProjectMode = false;
  }

  onCancelProjectAdd() {
    this.isAddingProjectMode = false;
  }
}
