import { Injectable } from '@angular/core';
import { Musician } from './musician.component';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Instrument } from '../instrument/instrument.component';
import { FormGroup } from '@angular/forms';

const musiciansRoute : String = 'musician';
const instrumentRoute : String = 'instrument';

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

    getInstruments() {
      return this.http.get<Instrument[]>(this.api + instrumentRoute,httpOptions).toPromise();
    }


    sendFrom(musicianForm: FormGroup) {
      let musician = {} as Musician
      if(musicianForm.get('_id').value != undefined) musician._id = musicianForm.get('_id').value
      
      musician.firstName = musicianForm.get('firstName').value
      musician.lastName = musicianForm.get('lastName').value
      musician.phone = musicianForm.get('phone').value
      musician.instrument = musicianForm.get('instrument').value

      
      return(musician._id == undefined)?  
            this.http.post<Musician>(this.api + musiciansRoute,musician,httpOptions).toPromise() : 
            this.http.put<Musician>(this.api + musiciansRoute + '/',musician,httpOptions).toPromise();

    }

    deleteMusician(id: String) {
      return this.http.delete<Musician>(this.api + musiciansRoute + '/' + id, httpOptions).toPromise();
    }


}