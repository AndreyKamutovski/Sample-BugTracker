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
import { Project } from '../../models/project.model';
import { ProjectService } from '../../project.service';
import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';
import { EditProjectFormComponent } from '../edit-project-form/edit-project-form.component';
import { ConfirmDeletingProjectComponent } from '../confirm-deleting-project/confirm-deleting-project.component';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  // @ViewChild('projectTable') private projectTable: MatTable<Project>;
  // @ViewChild('projectPaginator') private projectPaginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // private displayedColumns = ['Title', 'countError', 'DateStart', 'DateEnd', 'select'];
  // private dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  // private russianMatPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  // private selection = new SelectionModel<Project>(false, []);


  private projects: Project[];
  private cols: any[];

  constructor(
    private projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.projects = this._route.snapshot.data.projectList;
    this.cols = [
      { field: 'Title', header: 'Проект' },
      { field: 'ErrorStatistics.ProgressPercentage', header: 'Ошибки' },
      { field: 'DateStart', header: 'Начало' },
      { field: 'DateEnd', header: 'Окончание' },
    ];
  }

  ngAfterViewInit() {
  }

  private onRowSelect(event) {
    sessionStorage.setItem('projectID', event.data.ProjectId);
    this._router.navigateByUrl('/app/project/dashboard');
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
          let projcs = [...this.projects];
          projcs.push(newProject);
          this.projects = projcs;
          this.snackBar.open("Проект успешно создан", '', { duration: 2000 });
        });
      }
    }
  }

  openEditProjectDialog(event: Event, project: Project): void {
    event.stopPropagation();
    let dialogRef = this.dialog.open(EditProjectFormComponent, {
      width: '50%',
      data: { 'editedProject': project }
    });

    dialogRef.afterClosed().subscribe(this.afterClosedEditProjectDialog.bind(this));
  };

  private afterClosedEditProjectDialog(res: any) {
    if (res != undefined && res != null) {
      this.projectService.updateProject(res.projectData.ProjectId, res.projectData).toPromise().then(updateProject => {
        let projcs = [...this.projects];
        let idx = projcs.findIndex(p => p.ProjectId == updateProject.ProjectId);
        projcs[idx] = updateProject;
        this.projects = projcs;
        this.snackBar.open("Проект успешно обновлён", '', { duration: 2000 });
      });
    }
  }

  private openDeleteProjectDialog(event: Event, delProject: Project): void {
    event.stopPropagation();    
    let delDialogRef = this.dialog.open(ConfirmDeletingProjectComponent, {
      width: '30%',
      data: { 'projectTitle': delProject.Title }
    });
    delDialogRef.afterClosed().toPromise().then(userChoice => {
      if (userChoice) {
        this.projects.splice(this.projects.indexOf(delProject), 1);
        this.projectService.deleteProject(delProject.ProjectId).toPromise().then(res => {
          this.snackBar.open("Проект успешно удалён", '', { duration: 2000 });
        });
      }
    });
  }
}
