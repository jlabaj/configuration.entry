import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

// App is our top level component
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/index';
import { HeroService } from './shared/hero.service';
import { InternalStateType  } from './app.service';

type StoreType = {
    state: InternalStateType,
    restoreInputValues: () => void,
    disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
      AppComponent,
      HeroDetailComponent,
      HeroesComponent,
      DashboardComponent,
      NKDatetime
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    routing,
    AlertModule
  ],
  providers: [appRoutingProviders, HeroService]
})


export class AppModule {

    //Hot module Replacement See: https://github.com/AngularClass/angular2-hmr and https://github.com/AngularClass/angular2-webpack-starter
    constructor(public appRef: ApplicationRef) { }

    hmrOnInit(store: StoreType) {
        if (!store) return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        //this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            let restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }

        this.appRef.tick();
        //delete store.state;
        delete store.restoreInputValues;
    }

    hmrOnDestroy(store: StoreType) {
        const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
        // save state
        //const state = this.appState._state;
        //store.state = state;
        // recreate root elements
        store.disposeOldHosts = createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = createInputTransfer();
        // remove styles
        removeNgStyles();
    }

    hmrAfterDestroy(store: StoreType) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    }

}
