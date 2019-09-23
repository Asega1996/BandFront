import { Component, OnInit, ViewChild } from '@angular/core';
import { Instrument } from '../instrument/instrument.component';
import { MusicianService } from './musician.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

let ELEMENT_DATA: Musician[] = [];

@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  styleUrls: ['./musician.component.css']
})
export class MusicianComponent implements OnInit {

  constructor(private musicianService : MusicianService) { }

  public musicians = [] as Musician[]
  
  dataSource = new MatTableDataSource<Musician>(this.musicians);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['firstName', 'lastName', 'instrument', 'phone'];

  ngOnInit() {
    this.getMusicians()
  }

  async getMusicians(){
    this.musicians = await this.musicianService.getMusicians();
    this.dataSource.data = this.musicians;
  }

}

export interface Musician{
  _id : String
  firstName:String;
  lastName:String
  phone: Number
  instrument: Instrument
}



