import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateFromUtc'
})
export class LocalDateFromUtcPipe implements PipeTransform {

  transform(date: Date, args?: any): string {
    let _date = moment.utc(date);
    if (_date.isValid()) {
      return _date.local().format("DD-MM-YYYY hh:mm A");
    }
    else {
      throw new Error( "LocalDateFromUtcPipe: ".concat(JSON.stringify(_date.parsingFlags())));
    }
  }
}