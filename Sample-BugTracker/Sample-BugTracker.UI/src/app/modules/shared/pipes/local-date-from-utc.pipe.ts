import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateFromUtc'
})
export class LocalDateFromUtcPipe implements PipeTransform {
  transform(date: Date, format: string = "DD-MM-YYYY hh:mm A"): string {
    let _date = moment.utc(date);
    if (_date.isValid()) {
        return _date.local().format(format);
    }
    else {
      throw new Error( "LocalDateFromUtcPipe: ".concat(JSON.stringify(_date.parsingFlags())));
    }
  }
}




