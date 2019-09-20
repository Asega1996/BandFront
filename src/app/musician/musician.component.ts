import { Component, OnInit } from '@angular/core';
import { Instrument } from '../instrument/instrument.component';
import { MusicianService } from './musician.service';

@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.css']
})
export class MusicianComponent implements OnInit {

  constructor(private musicianService : MusicianService) { }

  public musicians = {} as Musician[]

  async getMusicians(){
    this.musicians = await this.musicianService.getMusicians();
    console.log(this.musicians);
  }

  ngOnInit() {
    this.getMusicians()
  }

}

export interface Musician{
  _id : String
  firstName:String;
  lastName:String
  phone: Number
  instrument: Instrument
}



