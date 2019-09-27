import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Instrument } from '../instrument/instrument.component';
import { FormGroup } from '@angular/forms';

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
export class InstrumentService {

    private api = environment.API_ROUTE;

    constructor( private http : HttpClient){}

    deleteInstrument(id) {
        return this.http.delete<Instrument>(this.api + instrumentRoute + '/' + id, httpOptions).toPromise();
    }

    sendFrom(instrumentForm: FormGroup) {
        let instrument = {} as Instrument
        if(instrumentForm.get('_id').value != undefined) instrument._id = instrumentForm.get('_id').value
        
        instrument.name = instrumentForm.get('name').value
        instrument.type = instrumentForm.get('type').value
        
        return(instrument._id == undefined)?  
              this.http.post<Instrument>(this.api + instrumentRoute,instrument,httpOptions).toPromise() : 
              this.http.put<Instrument>(this.api + instrumentRoute + '/',instrument,httpOptions).toPromise();
    }

    getInstruments(): Instrument[] | PromiseLike<Instrument[]> {
        return this.http.get<Instrument[]>(this.api + instrumentRoute, httpOptions).toPromise();
    }

}