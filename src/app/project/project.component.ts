import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  projects: {} = {};
  projectsArr: [] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      this.onGetProjects();
  }

  onGetProjects() {
    this.projects = this.apiService.getProject()
        .subscribe(
            res => {
                console.log('Pojects received: ', res.data);
                this.projectsArr = res.data;
                console.log('ProjectsArr: ', this.projectsArr);
            },
            err => {
                console.log('Get projects ERROR: ', err);
            }
        );
    console.log('Projects {}: ', this.projects);
  }

  onDeleteProject(idProject: number) {
      console.log('idProject: ', idProject);
      this.apiService.deleteProject(idProject)
          .subscribe(
              res => {
                  console.log('Frontend: Project deleted!');
                  this.onGetProjects(); // Update page
              },
              err => {
                  console.log('Frontend: Error deleting project');
              }
          );
  }
}
