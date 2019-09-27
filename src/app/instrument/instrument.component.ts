import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InstrumentService } from './instrument.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
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
  styleUrls: ['./instrument.component.css']
})
export class InstrumentComponent implements OnInit {

  private newInstrumentVar: Boolean

  constructor(private instrumentService : InstrumentService, private _formBuilder: FormBuilder) { }

  public instruments = [] as Instrument[]
  
  dataSource = new MatTableDataSource<Instrument>(this.instruments);

  instrumentForm : FormGroup;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  displayedColumns: string[] = ['name', 'type', 'options'];

  ngOnInit() {
    this.newInstrumentVar = false;
    this.getInstruments();
    this.dataSource.paginator = this.paginator;
    this.instrumentForm = this._formBuilder.group({
      name: ['',Validators.required],
      type: ['',Validators.required],
      _id: ['','']
    })
  }

  newInstrument(){
    this.newInstrumentVar = (this.newInstrumentVar)? false : true
    if(this.newInstrumentVar) this.instrumentForm.reset();

  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async getInstruments(){
    this.instruments = await this.instrumentService.getInstruments();
    console.log(this.instruments)
    this.dataSource.data = this.instruments;
  }

  patchValue(element){
    console.log(element)
    this.instrumentForm.patchValue({
      name: element.name,
      type: element.type,
      _id: element._id
    })

    console.log(this.instrumentForm)
  }

  async onSubmit(){
    if (this.instrumentForm.valid) {
      await this.instrumentService.sendFrom(this.instrumentForm);
    }
    this.instrumentForm.reset()
    this.getInstruments();
  }

  async deleteInstrument(element){
    await this.instrumentService.deleteInstrument(element._id);
    this.getInstruments()
  }

}

export interface Instrument{
  _id: String
  name: String;
  type: String;
}