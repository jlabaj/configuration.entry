import { Component, ViewEncapsulation  } from '@angular/core';
import { DashboardComponent } from './dashboard/index';
import { HeroesComponent } from './heroes/index';
import { HeroDetailComponent } from './hero-detail/index';
import { HeroService } from './shared/index';
import './rxjs-operators';

@Component({
  selector: 'my-app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
  providers: [
    HeroService
  ]
})
export class AppComponent {
    title = 'Tour of Heroes haha';
}
