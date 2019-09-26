import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConcertService } from './calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  timeStart = {hour: 14, minute: 0};
  timeEnd = {hour: 20, minute: 0};

  private newConcertVar: Boolean

  constructor(private concertService : ConcertService, private _formBuilder: FormBuilder) { }

  public concerts = [] as Concert[]
  
  dataSource = new MatTableDataSource<Concert>(this.concerts);

  concertForm : FormGroup;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  displayedColumns: string[] = ['name', 'dateStart', 'dateEnd', 'options'];

  ngOnInit() {
    this.newConcertVar = false;
    this.getConcerts()
    this.dataSource.paginator = this.paginator;
    this.concertForm = this._formBuilder.group({
      name: ['',Validators.required],
      dateStart: ['',Validators.required],
      dateEnd: ['',Validators.required],
      timeStart: ['',Validators.required],
      timeEnd: ['',Validators.required],
      _id: ['','']
    })
  }

  newConcert(){
    this.newConcertVar = (this.newConcertVar)? false : true
    if(this.newConcertVar) this.concertForm.reset();

  }

  isOpen = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  async getConcerts(){
    this.concerts = await this.concertService.getConcerts();
    this.dataSource.data = this.concerts;
  }

  patchValue(element : Concert){
    this.concertForm.patchValue({
      name: element.name,
      dateStart: element.dateStart,
      dateEnd: element.dateEnd,
      _id: element._id
    })
    this .timeStart = {"hour": new Date(element.dateStart).getHours(),"minute": new Date(element.dateStart).getMinutes()}
    this.timeEnd = {"hour":  new Date(element.dateEnd).getHours(),"minute":  new Date(element.dateEnd).getMinutes()}
  
  }

  async onSubmit(){
    if (this.concertForm.valid) {
      await this.concertService.sendFrom(this.concertForm);
      this.getConcerts();
    }
    this.concertForm.reset()
    this.concertService.getConcerts();
    window.location.reload();
  }

  async deleteConcert(element){
    await this.concertService.deleteConcert(element._id);
    this.getConcerts();
    window.location.reload();
  }


}

export interface Concert{
  _id : String,
  dateStart: Date,
  dateEnd: Date,
  name: String
}
