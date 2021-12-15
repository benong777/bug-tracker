import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userArr: [] = [];

  constructor( private dataService: DataService) { }

  ngOnInit(): void {
      this.getUser();
  }

  getUser() {
    this.dataService.getUser()
        .subscribe(res => {
            console.log('User: ', res);
            this.userArr = res.data;
            console.log(this.userArr);
        },
        err => {
            console.log('ERROR getting user: ', err);
        });
  }

}
