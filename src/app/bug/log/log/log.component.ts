import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  currIdComment: number = 0;
  logArr: [] = [];
  projectsArr: [] = [];
  bugsArr: [] = [];

  isAddCommentMode: boolean = false;
  isEditCommentMode: boolean = false;
  newComment: string = '';

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
              this.currIdProject = this.bugsArr[i]['idProject'];
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

  onAddComment() {
    this.isAddCommentMode = true;
  }

  onEditComment(idComment: number) {
    this.currIdComment = idComment;
    console.log('onEditComment - idComment: ', idComment);
    this.isEditCommentMode = true;
  }

  onCancelAddComment() {
    this.isAddCommentMode = false;
  }

  onSubmitComment(form: NgForm) {
    if (!form.valid) {
      console.log("Submitted form is not valid"); // for debugging
      return;
    }
    this.newComment = form.value.notes;
    // this.newIdProject = form.value.idProject; // Need these variables??
    // this.newBugTitle = form.value.bugTitle;
    // this.newAssignedTo = form.value.assignedTo;
    // this.newBugDescription = form.value.bugDescription;

    console.log('New comment: ', this.newComment);
    // console.log('idProject: ', this.newIdProject);
    // console.log('bugName: ', this.newBugTitle);
    // console.log('assignedTo: ', this.newAssignedTo);
    // console.log('bugDescription: ', this.newBugDescription);

    if (this.isEditCommentMode) {
        console.log("In EDIT comment MODE - currIdComment ", this.currIdComment);
        this.dataService.editComments(this.currIdComment, this.newComment)
            .subscribe(res => {
                console.log('New comment has been edited: ', res);
                this.getAllLogs();
                this.isEditCommentMode = false;
            },
            err => {
                console.log('Error while editing comment: ', err);
                this.isEditCommentMode = false;
            });
    }
    else {
        console.log("In ADD comment MODE");
        this.dataService.addComments(this.currIdProject, this.idBug, this.newComment)
            .subscribe(res => {
                console.log('New comment added: ', res);
                this.getAllLogs();
                this.isAddCommentMode = false;
            },
            err => {
                console.log('Error while adding new comment: ', err);
                this.isAddCommentMode = false;
            });
    }

  
  }

}
