import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Subscription } from 'rxjs/';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string };
  paramsSubscription: Subscription;

  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    }
    //-- Use Observable to subscribe to receive new data asynchronously
    //-- This way, whenever the parameters (id/name) change while you're 
    //-- in this same route/page, you get the new id/name and update it
    //-- in this route/page.
    this.paramsSubscription = this.route.params
        .subscribe(
            (params: Params) => {
                this.user.id = params['id'];
                this.user.name = params['name'];
            }
        );
  }

  //-- Good practice to unsubscribe to subscriptions
  ngOnDestroy() {
      this.paramsSubscription.unsubscribe();
  }

}
