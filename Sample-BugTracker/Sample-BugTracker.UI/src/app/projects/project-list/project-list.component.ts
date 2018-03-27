import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl, MatSort, MatTable, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @ViewChild('projectsTable') private projectsTable: MatTable<Project>;
  @ViewChild('projectPaginator') private projectPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private displayedColumns = ['title', 'countError', 'dateStart', 'dateEnd', 'select'];
  private dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  private russianMatPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  // private selection = new SelectionModel<Project>(false, []);


  constructor(
    private projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute) {
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

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => this.dataSource.data = projects);
    this.projectPaginator._intl = this.russianMatPaginatorIntl;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.projectPaginator;
    this.dataSource.sort = this.sort;
  }

  /** Add row in table and update its */
  public addRow(row: Project): void {
    this.dataSource.data.push(row);
    this.projectsTable.renderRows();
  }

  private onClickRow(projectID: number) {
    this._router.navigate(['description', projectID], { relativeTo: this._route });
  }

  private onClickMatMenuBtn(event: Event) {
    event.stopPropagation();
  }
}
