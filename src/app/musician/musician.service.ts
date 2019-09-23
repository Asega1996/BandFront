import { Injectable } from '@angular/core';
import { Musician } from './musician.component';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';

const musiciansRoute : String = 'musician';

const httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };


@Injectable({
  providedIn: 'root',
})
export class MusicianService {

    private api = environment.API_ROUTE;

    constructor(private http: HttpClient) { }

    getMusicians() {
        return this.http.get<Musician[]>(this.api + musiciansRoute,httpOptions).toPromise();
    }

}