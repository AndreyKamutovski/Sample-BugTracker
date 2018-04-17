import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';

@Injectable()
export class InternationalizationService {


  constructor() {
    this.setRussianLabelToPaginator();
   }

  private russianMatPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();  
  get RussianLabelMatTablePaginator(): MatPaginatorIntl {
    return this.russianMatPaginatorIntl;
  }

  private setRussianLabelToPaginator(): void {
    this.russianMatPaginatorIntl.firstPageLabel = "Первая страница";
    this.russianMatPaginatorIntl.lastPageLabel = "Последняя страница";
    this.russianMatPaginatorIntl.previousPageLabel = "Предыдущая страница";
    this.russianMatPaginatorIntl.nextPageLabel = "Следующая страница";
    this.russianMatPaginatorIntl.itemsPerPageLabel = "Количество строк на страницу:";
    this.russianMatPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      let totalPage = Math.ceil(length / pageSize);
      let fromPage = -1;
      let toPage = -1;
      if ((page + 1) < totalPage) {
        fromPage = page * pageSize + 1;
        toPage = pageSize * (page + 1);
      }
      if ((page + 1) === totalPage) {
        let shank = length % pageSize;
        fromPage = page * pageSize + 1;
        toPage = page * pageSize + shank;
      }
      return fromPage + ' - ' + toPage + ' из ' + length;
    }
  }
}
