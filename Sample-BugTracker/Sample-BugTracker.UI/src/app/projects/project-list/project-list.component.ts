import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatPaginator,
  MatPaginatorIntl,
  MatSnackBar,
  MatSort,
  MatTable,
  MatTableDataSource,
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';
import { ProjectDataSourceService } from '../services/project-data-source.service';
import { ProjectService } from '../shared/../services/project.service';
import { Project } from '../shared/project.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @ViewChild('projectTable') private projectTable: MatTable<Project>;
  @ViewChild('projectPaginator') private projectPaginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  private displayedColumns = ['Title', 'countError', 'DateStart', 'DateEnd', 'select'];
  private dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  private russianMatPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  // private selection = new SelectionModel<Project>(false, []);


  constructor(
    private projectService: ProjectService,
    private projectDataSource: ProjectDataSourceService,
    private _router: Router,
    private _route: ActivatedRoute,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar) {
    this.setRussianLabelToPaginator();
  }

  ngOnInit() {
    // this.projectService.getProjects().subscribe(projects => this.dataSource.data = projects);
    this.dataSource.data = this.projectDataSource.Projects;
  }

  ngAfterViewInit() {
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.projectPaginator;
      this.projectPaginator._intl = this.russianMatPaginatorIntl;
      this.dataSource.sort = this.sort;
    }

  }

  private onClickRow(projectID: number) {
    this._router.navigate([projectID, 'dashboard'], { relativeTo: this._route });
  }

  private onClickMatMenuBtn(event: Event) {
    event.stopPropagation();
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

  openAddProjectDialog(): void {
    let dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '50%',
     data: {}
    });

    dialogRef.afterClosed().subscribe(this.afterClosedAddProjectDialog.bind(this));
  };

  private afterClosedAddProjectDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('projectData')) {
        this.projectService.addProject(res.projectData).toPromise().then(newProject => {
          this.dataSource.data.push(newProject);
          this.projectTable.renderRows();
          this.dataSource.paginator = this.projectPaginator;
          this.snackBar.open("Проект успешно создан", '', { duration: 2000 });
        });
      }
    }
  }
}
