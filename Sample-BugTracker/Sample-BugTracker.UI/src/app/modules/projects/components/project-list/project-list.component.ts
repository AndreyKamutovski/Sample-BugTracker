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

import { AuthService } from '../../../../shared/services/auth.service';
import { InternationalizationService } from '../../../../shared/services/internationalization.service';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../project.service';
import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';


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
  // private russianMatPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  // private selection = new SelectionModel<Project>(false, []);


  constructor(
    private projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    private internationalizationService: InternationalizationService,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.dataSource.data = this._route.snapshot.data.projectList;
  }

  ngAfterViewInit() {
    if (this.dataSource.data.length > 0) {
      this.dataSource.paginator = this.projectPaginator;
      this.projectPaginator._intl = this.internationalizationService.RussianLabelMatTablePaginator;
      this.dataSource.sort = this.sort;
    }

  }

  private onClickRow(projectID: string) {
    sessionStorage.setItem('projectID', projectID);
    this._router.navigateByUrl('/app/project/dashboard');
  }

  private onClickMatMenuBtn(event: Event) {
    event.stopPropagation();
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
