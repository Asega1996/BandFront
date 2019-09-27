import { Component, OnInit, ViewChild } from '@angular/core';
import { Instrument } from '../instrument/instrument.component';
import { MusicianService } from './musician.service';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormGroup, FormControl,Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-musician',
  templateUrl: './musician.component.html',
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      state('hidden', style({ display: 'none'})),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  styleUrls: ['./musician.component.css']
})
export class MusicianComponent implements OnInit {
  private newMusicianVar: Boolean

  constructor(private musicianService : MusicianService, private _formBuilder: FormBuilder) { }

  public musicians = [] as Musician[]
  public instruments = [] as Instrument[]
  
  dataSource = new MatTableDataSource<Musician>(this.musicians);

  musicianForm : FormGroup;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  displayedColumns: string[] = ['firstName', 'lastName', 'instrument', 'phone', 'options'];

  ngOnInit() {
    this.newMusicianVar = false;
    this.getMusicians()
    this.dataSource.paginator = this.paginator;
    this.musicianForm = this._formBuilder.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      phone: ['',Validators.required],
      instrument: ['',Validators.required],
      _id: ['','']
    })
    this.getInstruments();
  }

  newMusician(){
    this.newMusicianVar = (this.newMusicianVar)? false : true
    if(this.newMusicianVar) this.musicianForm.reset();

  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async getMusicians(){
    this.musicians = await this.musicianService.getMusicians();
    this.dataSource.data = this.musicians;
  }

  async getInstruments(){
    this.instruments = await this.musicianService.getInstruments();
  }

  patchValue(element){
    console.log(element)
    this.musicianForm.patchValue({
      firstName: element.firstName,
      lastName: element.lastName,
      phone: element.phone,
      instrument: element.instrument,
      _id: element._id
    })

    console.log(this.musicianForm)
  }

  async onSubmit(){
    if (this.musicianForm.valid) {
      await this.musicianService.sendFrom(this.musicianForm);
      this.getMusicians();
    }
    this.musicianForm.reset()
  }

  async deleteMusician(element){
    await this.musicianService.deleteMusician(element._id);
    this.getMusicians();
  }

}

export interface Musician{
  _id : String
  firstName:String;
  lastName:String
  phone: Number
  instrument: Instrument
}



