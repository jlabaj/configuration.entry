import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Configuration } from '../shared/app.constants';

import { Hero, HeroService } from '../shared/index';
import { Router } from '@angular/router';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataService, Configuration]
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(
    private _router: Router,
    private _heroService: HeroService,
    private _dataService: DataService)
  {
  }

  public myItems: string[];

  ngOnInit() {
    this._heroService.getHeroes()
          .then(heroes => this.heroes = heroes.slice(1, 5));

    //this.getAllItems();
  }

  private getAllItems = (): void => {
      this._dataService.GetAll().subscribe(
          data => console.log('Request returns: ' + data.json()),
          error => console.log(error));

      //this._dataService.Get().subscribe((data: any) => this.myItems = data,
      //    error => console.log(error),
      //    () => console.log('Get Item complete: ' + this.myItems));

      //this._dataService
      //    .Post()
      //    .subscribe((data: any) => this.myItems = data,
      //    error => console.log(error),
      //    () => console.log('Get all Items complete: ' + this.myItems));
  }

  gotoDetail(hero: Hero) {
      let link = ['HeroDetail', hero.id];
    this._router.navigate(link);
  }
}
