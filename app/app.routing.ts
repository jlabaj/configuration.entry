import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    //{ path: '', component: DashboardComponent },
    {
        path: 'Dashboard',
        component: DashboardComponent
    },
    {
        path: 'HeroDetail/:id',
        component: HeroDetailComponent,
    },
    {
        path: 'Heroes',
        component: HeroesComponent
    }

    //{ path: '**', component: DashboardComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false, preloadingStrategy: PreloadAllModules });