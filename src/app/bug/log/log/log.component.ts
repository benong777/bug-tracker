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
  idBug = 0;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit(): void {
      this.idBug = this.route.snapshot.params['id'];
      console.log('idBug from ngOnInit: ', this.idBug);
      this.getAllLogs();
  }

  private getAllLogs() {
      console.log(this.idBug);
      this.dataService.getLogs(this.idBug)
          .subscribe(
              res => {
                  console.log("Logs: ", res);
              },
              err => {
                  console.log("Error");
              }
          );
  }

}
