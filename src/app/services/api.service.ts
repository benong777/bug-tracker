import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private bugUrl      = 'http://localhost:3000/bug';
  private projectUrl  = 'http://localhost:3000/project';
  private commentUrl  = 'http://localhost:3000/comment';

  constructor(private http: HttpClient,
              private router: Router) { }

  getProject() {
      return this.http.get<any>(this.projectUrl);
  }

  addProject(projectName: string) {
      return this.http.post(this.projectUrl,
                            {projectName: projectName});

  } 

  deleteProject(idProject: number) {
      const options = { headers: new HttpHeaders({'Content-Type': 'application/json' }),
                        body: { idProject: idProject }
                      }
      return this.http.delete(this.projectUrl, 
                              options);
  }

  addBug(idProject: number, bugTitle: string, bugDescription: string, assignedTo: string) {
    // console.log('Adding Project: ', projectName);
    // const options = { headers: new HttpHeaders({'Content-Type': 'application/json' }),
    //                   body: { projectName: projectName }
    //                 };
    console.log('Frontend - addBug() idProject: ', idProject);
    return this.http.post(  this.bugUrl,
                            { idProject: idProject,
                              bugTitle: bugTitle,
                              bugDescription: bugDescription,
                              assignedTo: assignedTo 
                            } 
                         );

  } 

  deleteBug(idBug: number) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json' }),
                      body: { idBug: idBug }
                    }
    return this.http.delete(this.bugUrl, 
                            options);
  }
}
