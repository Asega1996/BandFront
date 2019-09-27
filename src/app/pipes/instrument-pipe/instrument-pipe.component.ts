import { Pipe, PipeTransform } from '@angular/core';
import { Instrument } from 'src/app/instrument/instrument.component';

@Pipe({ name: 'instrumentStyle' })
export class InstrumentPipe implements PipeTransform{
  transform(instrument : Instrument) {
    return instrument.name + " (" + instrument.type + ")";
  }
}
