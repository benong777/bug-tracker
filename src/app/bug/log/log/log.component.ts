import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})

export class LogComponent implements OnInit {
  idBug: number = 0;
  currBugTitle: string = '';
  currIdProject: number = 0;
  currProjectName: string = '';
  logArr: [] = [];
  projectsArr: [] = [];
  bugsArr: [] = [];

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
      //-- Get ID and convert to a number
      this.idBug = +this.route.snapshot.params['id'];
      this.getAllBugs();

      this.bugsArr = this.dataService.bugsArr;
      // console.log('bugsArr - ngOnInit: ', this.bugsArr);
      // console.log('projectsArr - ngOnInit: ', this.projectsArr);
      // console.log('idBug from ngOnInit: ', this.idBug);
      // this.getProjects();
      this.getBugData(this.idBug);   // ?? Why was this ok even when idBug was a string and 
      this.getAllLogs();             //    getBugDetails(idBug: number) below!!!!
  }

  private getBugData(idBug: number) {
      // console.log('IDBUG: ', idBug, 'TYPEOF: ', typeof(idBug));
      // console.log('Length: ', this.bugsArr.length);
      for (let i=0; i<this.bugsArr.length; i++) {
          // console.log('Array[' + i + ']: ', this.bugsArr[i]);
          // console.log('bugsArr[' + i + ']: ', this.bugsArr[i]['idBug'], 'vs ', 'idBug: ', idBug);
          // console.log('TYPEOF: ', typeof(this.bugsArr[i]['idBug']));
          // console.log('TYPEOF idBug: ', typeof(idBug));
          if (this.bugsArr[i]['idBug'] === idBug) {
              this.currBugTitle = this.bugsArr[i]['bugTitle'];
              this.currProjectName = this.bugsArr[i]['projectName'];
              // console.log('MATCH found: idBug');
              // console.log('GET BUG DATA - bugTitle: ', this.currBugTitle);
              // console.log('GET BUG DATA - projectName: ', this.currProjectName);
          }
      }
      // console.log('bugTitle from bugsArr: ', this.currBugTitle);
      // console.log('bugDetails: bugsArr: ', this.bugsArr);
  }

  private getAllLogs() {
      console.log(this.idBug);
      this.dataService.getLogs(this.idBug)
          .subscribe(
              (res: any) => {
                  console.log("Logs: ", res);
                  console.log(res.data);
                  this.logArr = res.data;
              },
              err => {
                  console.log("Error");
              }
          );
  }

  getAllBugs() {
    this.dataService.getBugs()
        .subscribe(
            res => { 
                this.bugsArr = res.data;
                console.log('bugsArr - getAllBugs: ', this.bugsArr);
                this.dataService.bugsArr = this.bugsArr;
                this.getBugData(this.idBug);
            },
            err => {
                console.log('Error getting bugs!');
            }
    ); 
  }   

  getProjects() {
      this.dataService.getProjects()
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

  // getProjectName() {
  //     for (let i=0; i<this.dataService.projectsArr.length; i++) {
  //         if (this.dataService.projectsArr[i]['idProject'] === )
  //     }
  // }

}
