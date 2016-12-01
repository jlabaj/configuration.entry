import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';  
import { Configuration } from './app.constants';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithApiUrl + 'values/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<Response> => {
        return this._http.get(this.actionUrl);
    }

    public Get = (id: number): Observable<Response> => {
        return this._http.get(this.actionUrl + id);
    }

}