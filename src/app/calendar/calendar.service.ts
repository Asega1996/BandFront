import { Injectable } from '@angular/core';
import { Concert } from './calendar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Instrument } from '../instrument/instrument.component';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common'

const concertsRoute : String = 'concert';

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
export class ConcertService {
  

    private api = environment.API_ROUTE;

    constructor(private http: HttpClient, public datepipe: DatePipe) { }

    getConcerts() {
      return this.http.get<Concert[]>(this.api + concertsRoute,httpOptions).toPromise();
    }

    sendFrom(concertForm: FormGroup) {
      let concert = {} as Concert
      if(concertForm.get('_id').value != undefined) concert._id = concertForm.get('_id').value
      
      console.log(concert._id)
      concert.name = concertForm.get('name').value

      concert.dateStart = new Date(concertForm.get('dateStart').value)
      concert.dateStart.setHours(concertForm.get('timeStart').value.hour)
      concert.dateStart.setMinutes(concertForm.get('timeStart').value.minute)
      concert.dateEnd = new Date(concertForm.get('dateEnd').value)
      concert.dateEnd.setHours(concertForm.get('timeEnd').value.hour)
      concert.dateEnd.setMinutes(concertForm.get('timeEnd').value.minute)

      
      return(concert._id == undefined)?  
            this.http.post<Concert>(this.api + concertsRoute,concert,httpOptions).toPromise() : 
            this.http.put<Concert>(this.api + concertsRoute + '/',concert,httpOptions).toPromise();
            

    }

    deleteConcert(id: String) {
      return this.http.delete<Concert>(this.api + concertsRoute + '/' + id, httpOptions).toPromise();
    }


}